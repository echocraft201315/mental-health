"use client"

import { useState } from "react"
import { Button } from "@/app/components/ui/button"
import { Badge } from "@/app/components/ui/badge"
import { 
  ArrowLeft, 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  PhoneOff, 
  Users, 
  MessageSquare,
  Hand,
  Settings
} from "lucide-react"

export const LiveSession = ({ onBack, sessionTitle }) => {
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [isHandRaised, setIsHandRaised] = useState(false)

  const participants = [
    { id: "1", name: "Dr. Sarah", role: "Therapist", speaking: true },
    { id: "2", name: "Emma", role: "Member", handRaised: false },
    { id: "3", name: "Mike", role: "Member", handRaised: true },
    { id: "4", name: "You", role: "Member", handRaised: isHandRaised }
  ]

  return (
    <div className="flex-1 flex flex-col h-full bg-background1">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-card1 border-b border-border shadow-soft rounded-t-xl">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h2 className="font-semibold text-foreground1">{sessionTitle}</h2>
            <p className="text-xs text-muted-foreground1">Live Session • 4 participants</p>
          </div>
        </div>
        <Badge variant="destructive1" className="animate-pulse">
          LIVE
        </Badge>
      </div>

      {/* Main Video Area */}
      <div className="flex-1 p-4">
        <div className="h-full rounded-xl bg-foreground1/10 border-2 border-dashed border-border flex items-center justify-center relative overflow-hidden">
          {/* Main Speaker Video */}
          <div className="w-full h-full bg-gradient-primary1/20 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 rounded-full bg-gradient-primary1 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-foreground1">DS</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground1">Dr. Sarah Wilson</h3>
              <Badge variant="secondary1" className="mt-2">Speaking</Badge>
            </div>
          </div>

          {/* Participant Thumbnails */}
          <div className="absolute bottom-4 right-4 flex space-x-2">
            {participants.slice(1).map((participant) => (
              <div key={participant.id} className="relative">
                <div className="w-16 h-12 rounded-lg bg-card1 border border-border flex items-center justify-center">
                  <span className="text-xs font-medium text-foreground1">
                    {participant.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                {participant.handRaised && (
                  <div className="absolute -top-2 -right-2 w-5 h-5 bg-warning1 rounded-full flex items-center justify-center">
                    <Hand className="w-3 h-3 text-warning1-foreground1" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Session Info Overlay */}
          <div className="absolute top-4 left-4 bg-background1/90 backdrop-blur-sm rounded-lg p-3">
            <div className="flex items-center space-x-2 text-sm">
              <Users className="w-4 h-4 text-muted-foreground1" />
              <span className="text-foreground1">{participants.length} participants</span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="p-4 bg-card1 border-t border-border">
        <div className="flex items-center justify-center space-x-4">
          {/* Mute/Unmute */}
          <Button
            variant={isMuted ? "destructive1" : "secondary1"}
            size="lg"
            onClick={() => setIsMuted(!isMuted)}
            className="w-14 h-14 rounded-full"
          >
            {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </Button>

          {/* Video On/Off */}
          <Button
            variant={isVideoOff ? "destructive1" : "secondary1"}
            size="lg"
            onClick={() => setIsVideoOff(!isVideoOff)}
            className="w-14 h-14 rounded-full"
          >
            {isVideoOff ? <VideoOff className="w-6 h-6" /> : <Video className="w-6 h-6" />}
          </Button>

          {/* Raise Hand */}
          <Button
            variant={isHandRaised ? "warm" : "secondary1"}
            size="lg"
            onClick={() => setIsHandRaised(!isHandRaised)}
            className="w-14 h-14 rounded-full"
          >
            <Hand className="w-6 h-6" />
          </Button>

          {/* Chat */}
          <Button
            variant="secondary1"
            size="lg"
            className="w-14 h-14 rounded-full"
          >
            <MessageSquare className="w-6 h-6" />
          </Button>

          {/* Settings */}
          <Button
            variant="secondary1"
            size="lg"
            className="w-14 h-14 rounded-full"
          >
            <Settings className="w-6 h-6" />
          </Button>

          {/* Leave Session */}
          <Button
            variant="destructive1"
            size="lg"
            onClick={onBack}
            className="w-14 h-14 rounded-full"
          >
            <PhoneOff className="w-6 h-6" />
          </Button>
        </div>

        {/* Status Indicators */}
        <div className="flex justify-center space-x-4 mt-4">
          {isMuted && (
            <Badge variant="destructive1" className="text-xs">
              <MicOff className="w-3 h-3 mr-1" />
              Muted
            </Badge>
          )}
          {isVideoOff && (
            <Badge variant="destructive1" className="text-xs">
              <VideoOff className="w-3 h-3 mr-1" />
              Camera Off
            </Badge>
          )}
          {isHandRaised && (
            <Badge variant="secondary1" className="text-xs bg-warning1 text-warning1-foreground1">
              <Hand className="w-3 h-3 mr-1" />
              Hand Raised
            </Badge>
          )}
        </div>
      </div>
    </div>
  )
}