"use client"

import { useState } from "react"
import { Button } from "@/app/components/ui/button"
import { Calendar, MessageCircle, Video, Clock } from "lucide-react"

export const ChatScreen = ({ onBookSession, onReschedule }) => {
  const [messages] = useState([
    {
      id: "1",
      sender: "coach",
      content: "Good morning! How are you feeling today? I noticed you completed your morning meditation - that's fantastic!",
      timestamp: "9:30 AM",
      avatar: "👩‍⚕️"
    },
    {
      id: "2", 
      sender: "user",
      content: "Thank you! I'm feeling more centered. The meditation really helped me start the day mindfully.",
      timestamp: "9:45 AM"
    },
    {
      id: "3",
      sender: "coach", 
      content: "That's wonderful to hear! Remember to stay hydrated today and don't forget about your evening walk. How do you feel about scheduling our next 1-1 session?",
      timestamp: "10:00 AM",
      avatar: "👩‍⚕️"
    }
  ])

  return (
    <div className="flex flex-col h-full bg-background1">
      {/* Header */}
      <div className="bg-card1 border-b border-border p-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full bg-gradient-primary1 flex items-center justify-center text-xl">
            👩‍⚕️
          </div>
          <div>
            <h2 className="font-semibold text-foreground1">Dr. Sarah Wilson</h2>
            <p className="text-sm text-success1">Online • Wellness Coach</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-b border-border">
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="flex items-center space-x-2" onClick={onBookSession}>
            <Calendar className="w-4 h-4" />
            <span>Book Session</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <Video className="w-4 h-4" />
            <span>Video Call</span>
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
              {message.sender === 'coach' && (
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-lg">{message.avatar}</span>
                  <span className="text-xs text-muted-foreground1">Dr. Wilson</span>
                </div>
              )}
              <div
                className={`rounded-2xl px-4 py-3 ${
                  message.sender === 'user'
                    ? 'bg-primary1 text-primary-foreground1'
                    : 'bg-card1 border border-border'
                }`}
              >
                <p className="text-sm">{message.content}</p>
              </div>
              <p className="text-xs text-muted-foreground1 mt-1 px-2">
                {message.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Next Session Info */}
      <div className="p-4 bg-muted1/30 border-t border-border">
        <div className="flex items-center space-x-3 p-3 bg-card rounded-lg border border-border">
          <div className="p-2 bg-primary1/10 rounded-lg">
            <Clock className="w-4 h-4 text-primary1" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground1">Next Session</p>
            <p className="text-xs text-muted-foreground1">Tomorrow at 2:00 PM</p>
          </div>
          <Button size="sm" variant="outline" onClick={onReschedule}>
            Reschedule
          </Button>
        </div>
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-border">
        <div className="flex space-x-2">
          <div className="flex-1 p-3 bg-muted1 rounded-full">
            <p className="text-sm text-muted-foreground1">Type your message...</p>
          </div>
          <Button size="sm" className="rounded-full px-6">
            Send
          </Button>
        </div>
      </div>
    </div>
  )
}