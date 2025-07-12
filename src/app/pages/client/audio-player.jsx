"use client"

import { useState, useRef } from "react"
import { Button } from "@/app/components/ui/button"
import { Slider } from "@/app/components/ui/slider"
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  ArrowLeft,
  Heart,
  Share2
} from "lucide-react"

export const AudioPlayer = ({ onBack, title, author, duration }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState([0])
  const [volume, setVolume] = useState([75])
  const [isLiked, setIsLiked] = useState(false)

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-background1">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-card1 border-b border-border shadow-soft rounded-t-xl">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="font-semibold text-foreground1">Now Playing</h2>
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-current text-destructive1' : ''}`} />
          </Button>
          <Button variant="ghost" size="icon">
            <Share2 className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Album Art */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-64 h-64 rounded-2xl bg-gradient-primary1 flex items-center justify-center shadow-strong">
          <div className="text-center text-primary-foreground1">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
              <Play className="w-8 h-8" />
            </div>
            <p className="text-sm opacity-90">Audio Meditation</p>
          </div>
        </div>
      </div>

      {/* Track Info */}
      <div className="px-6 py-4 text-center">
        <h3 className="text-xl font-bold text-foreground1 mb-2">{title}</h3>
        <p className="text-muted-foreground1">{author}</p>
      </div>

      {/* Progress */}
      <div className="px-6 py-2">
        <Slider
          value={currentTime}
          onValueChange={setCurrentTime}
          max={300} // 5 minutes example
          step={1}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground1 mt-1">
          <span>{formatTime(currentTime[0])}</span>
          <span>{duration}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="p-6">
        <div className="flex items-center justify-center space-x-6 mb-6">
          <Button variant="ghost" size="icon" className="w-12 h-12">
            <SkipBack className="w-6 h-6" />
          </Button>
          
          <Button
            onClick={togglePlay}
            size="icon"
            className="w-16 h-16 rounded-full bg-gradient-primary1 hover:scale-105 transition-transform"
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 text-primary-foreground1" />
            ) : (
              <Play className="w-8 h-8 text-primary-foreground1 ml-1" />
            )}
          </Button>
          
          <Button variant="ghost" size="icon" className="w-12 h-12">
            <SkipForward className="w-6 h-6" />
          </Button>
        </div>

        {/* Volume */}
        <div className="flex items-center space-x-3">
          <Volume2 className="w-4 h-4 text-muted-foreground1" />
          <Slider
            value={volume}
            onValueChange={setVolume}
            max={100}
            step={1}
            className="flex-1"
          />
        </div>
      </div>
    </div>
  )
}