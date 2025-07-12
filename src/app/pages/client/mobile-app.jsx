"use client"

import { useState } from "react"
import { BottomNavigation } from "@/app/components/ui/bottom-navigation"
import { SlideMenu } from "@/app/components/ui/slide-menu"
import { TodayScreen } from "@/app/pages/client/today-screen"
import { ChatScreen } from "@/app/pages/client/chat-screen"
import { CirclesScreen } from "@/app/pages/client/circles-screen"
import { ExploreScreen } from "@/app/pages/client/explore-screen"
import { JournalScreen } from "@/app/pages/client/journal-screen"
import { TasksScreen } from "@/app/pages/client/tasks-screen"
import { GroupChat } from "@/app/pages/client/group-chat"
import { LiveSession } from "@/app/pages/client/live-session"
import { Button } from "@/app/components/ui/button"
import { NotificationPanel } from "@/app/components/ui/notification-panel"
import { UserProfileModal } from "@/app/components/ui/user-profile-modal"
import { SettingsDropdown } from "@/app/components/ui/settings-dropdown"
import { CalendarBooking } from "@/app/components/ui/calendar-booking"
import { User, Settings, Bell } from "lucide-react"
import { toast } from "sonner";

export const MobileApp = () => {
  const [activeTab, setActiveTab] = useState("today")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [currentScreen, setCurrentScreen] = useState("main")
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [bookingMode, setBookingMode] = useState("book")


  const handleAddClick = () => {
    setIsMenuOpen(true)
  }

  const handleMenuOptionSelect = (option) => {
    switch (option) {
      case "log-progress":
        setCurrentScreen("journal")
        break
      case "complete-tasks":
        setCurrentScreen("tasks")
        break
      case "book-session":
        setBookingMode("book")
        setIsBookingOpen(true)
        break
    }
  }

  const handleNotificationNavigate = (notification) => {
    switch (notification.type) {
      case "message":
        setActiveTab("chat")
        break
      case "session":
        setActiveTab("chat")
        break
      case "task":
        setCurrentScreen("tasks")
        break
      case "wellness":
        setActiveTab("today")
        break
    }
  }

  const handleBookSession = (date, time, notes) => {
    toast({
      title: bookingMode === "book" ? "Session Booked" : "Session Rescheduled",
      description: `Your session is ${bookingMode === "book" ? "booked" : "rescheduled"} for ${date.toDateString()} at ${time}`,
    })
  }

  const renderScreen = () => {
    // Handle special screens first
    if (currentScreen === "journal") {
      return <JournalScreen onBack={() => setCurrentScreen("main")} />
    }
    if (currentScreen === "tasks") {
      return <TasksScreen onBack={() => setCurrentScreen("main")} />
    }
    if (currentScreen === "group-chat") {
      return <GroupChat onBack={() => setCurrentScreen("main")} groupName="Anxiety Support Group" />
    }
    if (currentScreen === "live-session") {
      return <LiveSession onBack={() => setCurrentScreen("main")} sessionTitle="Weekly Group Session" />
    }

    // Handle main tab screens
    switch (activeTab) {
      case "today":
        return (
          <TodayScreen 
            currentDate={currentDate}
            onDateChange={setCurrentDate}
          />
        )
      case "chat":
        return (
          <ChatScreen 
            onBookSession={() => {
              setBookingMode("book")
              setIsBookingOpen(true)
            }}
            onReschedule={() => {
              setBookingMode("reschedule")
              setIsBookingOpen(true)
            }}
          />
        )
      case "circles":
        return (
          <CirclesScreen 
            onJoinChat={() => setCurrentScreen("group-chat")}
            onJoinSession={() => setCurrentScreen("live-session")}
          />
        )
      case "explore":
        return <ExploreScreen />
      default:
        return (
          <TodayScreen 
            currentDate={currentDate}
            onDateChange={setCurrentDate}
          />
        )
    }
  }

  return (
    <div className="min-h-screen bg-background1 bg-pattern-subtle flex flex-col max-w-md mx-auto relative">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-card1 border-b border-border shadow-component">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-gradient-gentle-primary flex items-center justify-center shadow-card hover-lift">
            <span className="text-sm font-semibold text-primary-foreground1">JD</span>
          </div>
          <div>
            <p className="text-sm font-medium text-foreground1">Good morning</p>
            <p className="text-xs text-muted-foreground1">John Doe</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 relative">
          <Button 
            size="sm" 
            variant="ghost" 
            className="h-8 w-8 p-0 relative bg-gradient-gentle-neutral/50 hover:bg-gradient-gentle-primary/50 hover-lift"
            onClick={() => setIsNotificationOpen(true)}
          >
            <Bell className="w-4 h-4" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-gentle-warm rounded-full flex items-center justify-center shadow-card animate-gentle-pulse">
              <span className="text-xs text-white font-bold">2</span>
            </div>
          </Button>
          <Button 
            size="sm" 
            variant="ghost" 
            className="h-8 w-8 p-0 bg-gradient-gentle-neutral/50 hover:bg-gradient-gentle-primary/50 hover-lift"
            onClick={() => setIsProfileOpen(true)}
          >
            <User className="w-4 h-4" />
          </Button>
          <div className="relative">
            <Button 
              size="sm" 
              variant="ghost" 
              className="h-8 w-8 p-0 bg-gradient-gentle-neutral/50 hover:bg-gradient-gentle-primary/50 hover-lift"
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            >
              <Settings className="w-4 h-4" />
            </Button>
            <SettingsDropdown 
              isOpen={isSettingsOpen} 
              onClose={() => setIsSettingsOpen(false)} 
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {renderScreen()}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onAddClick={handleAddClick}
      />

      {/* Slide Menu */}
      <SlideMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onOptionSelect={handleMenuOptionSelect}
      />

      {/* Notification Panel */}
      <NotificationPanel
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        onNavigate={handleNotificationNavigate}
      />

      {/* User Profile Modal */}
      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />

      {/* Calendar Booking */}
      {/* <CalendarBooking
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        onBook={handleBookSession}
        mode={bookingMode}
      /> */}
    </div>
  )
}