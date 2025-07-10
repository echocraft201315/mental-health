"use client"

import { useState } from "react"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Badge } from "@/app/components/ui/badge"
import { ArrowLeft, Send, MoreVertical, Users } from "lucide-react"
import { format } from "date-fns"

export const GroupChat = ({ onBack, groupName }) => {
  const [messages, setMessages] = useState([
    {
      id: "1",
      sender: "Dr. Sarah",
      message: "Good morning everyone! How is everyone feeling today?",
      timestamp: new Date(Date.now() - 3600000),
      isOwn: false
    },
    {
      id: "2",
      sender: "Emma",
      message: "Feeling much better after yesterday's session. Thank you for the breathing techniques!",
      timestamp: new Date(Date.now() - 3000000),
      isOwn: false
    },
    {
      id: "3",
      sender: "You",
      message: "I tried the morning meditation and it really helped set a positive tone for my day.",
      timestamp: new Date(Date.now() - 2400000),
      isOwn: true
    },
    {
      id: "4",
      sender: "Mike",
      message: "That's great to hear! I'm still working on making it a consistent habit.",
      timestamp: new Date(Date.now() - 1800000),
      isOwn: false
    }
  ])
  const [newMessage, setNewMessage] = useState("")

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now().toString(),
        sender: "You",
        message: newMessage.trim(),
        timestamp: new Date(),
        isOwn: true
      }
      setMessages(prev => [...prev, message])
      setNewMessage("")
    }
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-card1 border-b border-border">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-gradient-primary1 flex items-center justify-center">
              <Users className="w-5 h-5 text-primary-foreground1" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground1">{groupName}</h2>
              <p className="text-xs text-muted-foreground1">5 members • 3 online</p>
            </div>
          </div>
        </div>
        <Button variant="ghost" size="icon">
          <MoreVertical className="w-5 h-5" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}
          >
            <div className={`max-w-[80%] ${message.isOwn ? "order-2" : "order-1"}`}>
              {!message.isOwn && (
                <p className="text-xs font-medium text-muted-foreground1 mb-1 px-3">
                  {message.sender}
                </p>
              )}
              <div
                className={`px-4 py-3 rounded-2xl ${
                  message.isOwn
                    ? "bg-primary1 text-primary-foreground1 ml-4"
                    : "bg-muted1 text-foreground1 mr-4"
                }`}
              >
                <p className="text-sm">{message.message}</p>
                <p className={`text-xs mt-1 ${
                  message.isOwn ? "text-primary-foreground1/70" : "text-muted-foreground1"
                }`}>
                  {format(message.timestamp, "HH:mm")}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="p-4 bg-card1 border-t border-border">
        <div className="flex space-x-3">
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1"
          />
          <Button onClick={sendMessage} disabled={!newMessage.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Group Guidelines */}
      <div className="p-4 bg-gradient-warm/10 border-t border-border">
        <p className="text-xs text-muted-foreground1 text-center">
          💡 Remember to be supportive and respectful to all group members
        </p>
      </div>
    </div>
  )
}