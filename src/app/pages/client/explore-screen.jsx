"use client"

import { useState } from "react"
import { Button } from "@/app/components/ui/button"
import { Badge } from "@/app/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/app/components/ui/dialog"
import { Input } from "@/app/components/ui/input"
import { Textarea } from "@/app/components/ui/textarea"
import { CategoryDetailModal } from "./category-detail-modal"
import { AudioPlayer } from "./audio-player"
import { ProgramDetail } from "./program-detail"
import { GuideViewer } from "./guide-viewer"
import { Play, BookOpen, Headphones, Clock, Star } from "lucide-react"

export const ExploreScreen = () => {
  const [currentScreen, setCurrentScreen] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isJoinProgramOpen, setIsJoinProgramOpen] = useState(false)
  const categories = [
    { name: "Meditation", color: "bg-wellness-purple1", count: 24 },
    { name: "Sleep", color: "bg-wellness-blue1", count: 18 },
    { name: "Nutrition", color: "bg-wellness-green1", count: 32 },
    { name: "Exercise", color: "bg-wellness-teal1", count: 28 }
  ]

  const featuredContent = [
    {
      id: "1",
      title: "Morning Mindfulness",
      description: "Start your day with intention and clarity",
      type: "audio",
      duration: "10 min",
      rating: 4.8,
      category: "Meditation",
      thumbnail: "🧘‍♀️"
    },
    {
      id: "2", 
      title: "Healthy Sleep Habits",
      description: "Build a bedtime routine that works",
      type: "program",
      duration: "7 days",
      rating: 4.9,
      category: "Sleep",
      thumbnail: "🌙"
    },
    {
      id: "3",
      title: "Mindful Eating Guide",
      description: "Transform your relationship with food",
      type: "guide",
      duration: "15 min read",
      rating: 4.7,
      category: "Nutrition", 
      thumbnail: "🥗"
    }
  ]

  const programs = [
    {
      id: "1",
      title: "21-Day Wellness Challenge",
      description: "Transform your habits in just 3 weeks",
      duration: "21 days",
      participants: 1247,
      difficulty: "Beginner",
      thumbnail: "🎯"
    },
    {
      id: "2",
      title: "Stress Relief Masterclass", 
      description: "Learn effective techniques to manage daily stress",
      duration: "5 sessions",
      participants: 892,
      difficulty: "Intermediate",
      thumbnail: "🧘"
    }
  ]

  const handleItemClick = (item) => {
    setSelectedItem(item)
    setIsModalOpen(true)
  }

  const handlePlayAudio = (item) => {
    setSelectedItem(item)
    setCurrentScreen("audio-player")
    setIsModalOpen(false)
  }

  const handleStartProgram = (item) => {
    setSelectedItem(item)
    setCurrentScreen("program-detail")
    setIsModalOpen(false)
  }

  const handleReadGuide = (item) => {
    setSelectedItem(item)
    setCurrentScreen("guide-viewer")
    setIsModalOpen(false)
  }

  const handleJoinProgram = (item) => {
    setIsJoinProgramOpen(true)
    setIsModalOpen(false)
  }

  const handleBack = () => {
    setCurrentScreen(null)
    setSelectedItem(null)
  }

  // Render special screens
  if (currentScreen === "audio-player" && selectedItem) {
    return (
      <AudioPlayer
        onBack={handleBack}
        title={selectedItem.title}
        author="Dr. Sarah Wilson"
        duration={selectedItem.duration}
      />
    )
  }

  if (currentScreen === "program-detail" && selectedItem) {
    return (
      <ProgramDetail
        onBack={handleBack}
        title={selectedItem.title}
      />
    )
  }

  if (currentScreen === "guide-viewer" && selectedItem) {
    return (
      <GuideViewer
        onBack={handleBack}
        title={selectedItem.title}
      />
    )
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case "audio": return <Headphones className="w-4 h-4" />
      case "program": return <Play className="w-4 h-4" />
      case "guide": return <BookOpen className="w-4 h-4" />
      default: return <Play className="w-4 h-4" />
    }
  }

  return (
    <div className="flex-1 overflow-y-auto pb-20 bg-background1">
      {/* Header */}
      <div className="bg-card1 border-b border-border p-6">
        <h1 className="text-2xl font-bold text-foreground1 mb-2">Explore</h1>
        <p className="text-muted-foreground1">Discover programs, guides, and resources for your wellness journey</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Categories */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground1">Categories</h2>
          <div className="grid grid-cols-2 gap-3">
            {categories.map((category) => (
              <Button
                key={category.name}
                variant="outline"
                className="h-auto p-4 justify-start hover:shadow-soft transition-all duration-200"
              >
                <div className="flex items-center space-x-3 w-full">
                  <div className={`w-10 h-10 rounded-lg ${category.color} flex items-center justify-center`}>
                    <span className="text-white text-lg">
                      {category.name === "Meditation" && "🧘"}
                      {category.name === "Sleep" && "🌙"}
                      {category.name === "Nutrition" && "🥗"}
                      {category.name === "Exercise" && "💪"}
                    </span>
                  </div>
                  <div className="text-left">
                    <p className="font-medium">{category.name}</p>
                    <p className="text-xs text-muted-foreground1">{category.count} resources</p>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Content */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground1">Featured Content</h2>
          <div className="space-y-4">
            {featuredContent.map((content) => (
              <div key={content.id} className="p-4 rounded-xl bg-gradient-card shadow-soft border-0 hover:shadow-medium transition-all">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-primary1 flex items-center justify-center text-2xl">
                    {content.thumbnail}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-foreground1">{content.title}</h3>
                        <p className="text-sm text-muted-foreground1">{content.description}</p>
                      </div>
                      <Badge variant="secondary1">{content.category}</Badge>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground1 mb-3">
                      <div className="flex items-center space-x-1">
                        {getTypeIcon(content.type)}
                        <span>{content.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-warning1 text-warning1" />
                        <span>{content.rating}</span>
                      </div>
                    </div>
                    
                    <Button 
                      size="sm" 
                      className="w-full"
                      onClick={() => {
                        if (content.type === "audio") handlePlayAudio(content)
                        else if (content.type === "program") handleStartProgram(content) 
                        else if (content.type === "guide") handleReadGuide(content)
                      }}
                    >
                      {content.type === "audio" && "Listen Now"}
                      {content.type === "program" && "Start Program"}
                      {content.type === "guide" && "Read Guide"}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Programs */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground1">Wellness Programs</h2>
          <div className="space-y-4">
            {programs.map((program) => (
              <div key={program.id} className="p-4 rounded-xl bg-gradient-card shadow-soft border-0 hover:shadow-medium transition-all">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-warm flex items-center justify-center text-2xl">
                    {program.thumbnail}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground1 mb-1">{program.title}</h3>
                    <p className="text-sm text-muted-foreground1 mb-3">{program.description}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground1 mb-3">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{program.duration}</span>
                      </div>
                      <span>•</span>
                      <span>{program.participants} participants</span>
                      <span>•</span>
                      <Badge variant="outline" className="text-xs">{program.difficulty}</Badge>
                    </div>
                    
                    <Button 
                      size="sm" 
                      className="w-full"
                      onClick={() => handleJoinProgram(program)}
                    >
                      Join Program
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Detail Modal */}
        <CategoryDetailModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          item={selectedItem}
          onPlayAudio={handlePlayAudio}
          onStartProgram={handleStartProgram}
          onReadGuide={handleReadGuide}
          onJoinProgram={handleJoinProgram}
        />

        {/* Join Program Dialog */}
        <Dialog open={isJoinProgramOpen} onOpenChange={setIsJoinProgramOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Join Program</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground1">Full Name</label>
                <Input placeholder="Enter your full name" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground1">Email</label>
                <Input type="email" placeholder="Enter your email" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground1">Why do you want to join this program?</label>
                <Textarea placeholder="Share your motivation..." />
              </div>
              <div className="flex space-x-3">
                <Button variant="outline" onClick={() => setIsJoinProgramOpen(false)} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={() => setIsJoinProgramOpen(false)} className="flex-1">
                  Join Program
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}