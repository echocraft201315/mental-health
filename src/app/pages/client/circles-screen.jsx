"use client"

import { useState } from "react"
import { Button } from "@/app/components/ui/button"
import { Badge } from "@/app/components/ui/badge"
import { CircleDetailModal } from "./circle-detail-modal"
import { Users, Calendar, MessageCircle, Heart, Clock } from "lucide-react"
import { toast } from "sonner";


export const CirclesScreen = ({ onJoinChat, onJoinSession }) => {
  const [selectedCircle, setSelectedCircle] = useState(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [joinedCircles] = useState([
    {
      id: "1",
      name: "Mindful Living",
      description: "A supportive community for those practicing mindfulness and meditation",
      members: 124,
      isJoined: true,
      nextSession: "Today at 6:00 PM",
      category: "Meditation",
      color: "bg-wellness-purple1"
    }
  ])

  const [availableCircles] = useState([
    {
      id: "2", 
      name: "Healthy Habits",
      description: "Build sustainable wellness routines together",
      members: 89,
      isJoined: false,
      nextSession: "Tomorrow at 7:00 PM", 
      category: "Wellness",
      color: "bg-wellness-green1"
    },
    {
      id: "3",
      name: "Sleep Better",
      description: "Improve your sleep quality and nighttime routines",
      members: 156,
      isJoined: false,
      nextSession: "Thu at 8:00 PM",
      category: "Sleep",
      color: "bg-wellness-blue1"
    }
  ])

  const recentActivity = [
    {
      id: "1",
      user: "Emma K.",
      action: "shared a meditation tip",
      time: "2h ago",
      circle: "Mindful Living"
    },
    {
      id: "2", 
      user: "Mike R.",
      action: "completed 7-day streak",
      time: "4h ago", 
      circle: "Mindful Living"
    },
    {
      id: "3",
      user: "Sarah L.",
      action: "asked for support",
      time: "6h ago",
      circle: "Mindful Living"
    }
  ]

  const handleJoinCircle = (circle) => {
    setSelectedCircle(circle)
    setIsDetailModalOpen(true)
  }

  const handleJoinRequest = (formData) => {
    toast({
      title: "Join Request Sent",
      description: `Your request to join ${selectedCircle?.name} has been sent to the group admin.`,
    })
  }

  return (
    <div className="flex-1 overflow-y-auto pb-20">
      {/* Header */}
      <div className="bg-gradient-card1 border-b border-border p-6">
        <h1 className="text-2xl font-bold text-foreground1 mb-2">Wellness Circles</h1>
        <p className="text-muted-foreground1">Connect with others on similar wellness journeys</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Joined Circles */}
        {joinedCircles.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground1">Your Circles</h2>
            {joinedCircles.map((circle) => (
              <div key={circle.id} className="p-4 rounded-xl bg-card1 border border-border shadow-soft">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-full ${circle.color} flex items-center justify-center`}>
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground1">{circle.name}</h3>
                      <p className="text-sm text-muted-foreground1">{circle.members} members</p>
                    </div>
                  </div>
                  <Badge variant="secondary1">{circle.category}</Badge>
                </div>
                
                <p className="text-sm text-muted-foreground1 mb-4">{circle.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground1">
                    <Clock className="w-4 h-4" />
                    <span>{circle.nextSession}</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" onClick={onJoinChat}>
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Chat
                    </Button>
                    <Button size="sm" onClick={onJoinSession}>
                      <Calendar className="w-4 h-4 mr-2" />
                      Join Session
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Recent Activity */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground1">Recent Activity</h2>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="p-3 rounded-lg bg-muted1/30 border border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-primary1/10 flex items-center justify-center">
                      <Heart className="w-4 h-4 text-primary1" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground1">
                        <span className="text-primary1">{activity.user}</span> {activity.action}
                      </p>
                      <p className="text-xs text-muted-foreground1">in {activity.circle}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground1">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Available Circles */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground1">Discover Circles</h2>
          <div className="space-y-4">
            {availableCircles.map((circle) => (
              <div key={circle.id} className="p-4 rounded-xl bg-card1 border border-border shadow-soft">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-full ${circle.color} flex items-center justify-center`}>
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground1">{circle.name}</h3>
                      <p className="text-sm text-muted-foreground1">{circle.members} members</p>
                    </div>
                  </div>
                  <Badge variant="outline">{circle.category}</Badge>
                </div>
                
                <p className="text-sm text-muted-foreground1 mb-4">{circle.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground1">
                    <Clock className="w-4 h-4" />
                    <span>Next: {circle.nextSession}</span>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => handleJoinCircle(circle)}>
                    Join Circle
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Circle Detail Modal */}
      <CircleDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        circle={selectedCircle}
        onJoin={handleJoinRequest}
      />
    </div>
  )
}