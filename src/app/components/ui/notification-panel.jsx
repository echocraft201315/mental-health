"use client"

import { useState } from "react"
import { X, MessageSquare, Calendar, Target, Heart } from "lucide-react"
import { cn } from "@/app/lib/utils"
import { Button } from "@/app/components/ui/button"

export const NotificationPanel = ({ isOpen, onClose, onNavigate }) => {
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      type: "message",
      title: "New message from Dr. Sarah",
      description: "Your wellness journey is progressing well...",
      time: "5 min ago",
      unread: true
    },
    {
      id: "2", 
      type: "session",
      title: "Upcoming 1-1 Session",
      description: "Tomorrow at 2:00 PM with Dr. Sarah",
      time: "1 hour ago",
      unread: true
    },
    {
      id: "3",
      type: "task",
      title: "Task reminder",
      description: "Don't forget your evening meditation",
      time: "3 hours ago",
      unread: false
    },
    {
      id: "4",
      type: "wellness",
      title: "Weekly progress summary",
      description: "You've completed 85% of your wellness goals",
      time: "1 day ago",
      unread: false
    }
  ])

  const getIcon = (type) => {
    switch (type) {
      case "message": return <MessageSquare className="w-4 h-4" />
      case "session": return <Calendar className="w-4 h-4" />
      case "task": return <Target className="w-4 h-4" />
      case "wellness": return <Heart className="w-4 h-4" />
      default: return <MessageSquare className="w-4 h-4" />
    }
  }

  const getIconColor = (type) => {
    switch (type) {
      case "message": return "text-wellness-orange"
      case "session": return "text-wellness-yellow"
      case "task": return "text-wellness-coral"
      case "wellness": return "text-wellness-gold"
      default: return "text-wellness-orange"
    }
  }

  const handleNotificationClick = (notification) => {
    setNotifications(prev => prev.filter(n => n.id !== notification.id))
    onNavigate(notification)
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      <div 
        className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 animate-fade-in"
        onClick={onClose}
      />
      
      <div className={cn(
        "fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-background shadow-strong z-50 transition-transform duration-300",
        isOpen ? "animate-slide-in-right" : "animate-slide-out-right"
      )}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="text-xl font-semibold text-foreground">Notifications</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="Close notifications"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-6 text-center">
                <p className="text-muted-foreground">No notifications</p>
              </div>
            ) : (
              <div className="p-4 space-y-3">
                {notifications.map((notification) => (
                  <button
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification)}
                    className={cn(
                      "w-full p-4 rounded-xl text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-card hover-lift",
                      notification.unread 
                        ? "bg-gradient-primary/10 border border-primary/20" 
                        : "bg-card1 border border-border hover:bg-muted/50"
                    )}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={cn(
                        "flex items-center justify-center w-10 h-10 rounded-lg bg-background",
                        getIconColor(notification.type)
                      )}>
                        {getIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className={cn(
                            "font-medium truncate",
                            notification.unread ? "text-foreground" : "text-muted-foreground"
                          )}>
                            {notification.title}
                          </h3>
                          {notification.unread && (
                            <div className="w-2 h-2 bg-primary rounded-full ml-2 flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {notification.description}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}