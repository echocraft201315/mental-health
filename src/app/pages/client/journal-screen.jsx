"use client"

import { useState } from "react"
import { Button } from "@/app/components/ui/button"
import { Textarea } from "@/app/components/ui/textarea"
import { Badge } from "@/app/components/ui/badge"
import { Slider } from "@/app/components/ui/slider"
import { ArrowLeft, Save, Heart, Brain, Zap } from "lucide-react"
import { format } from "date-fns"

export const JournalScreen = ({ onBack }) => {
  const [mood, setMood] = useState([7])
  const [energy, setEnergy] = useState([6])
  const [stress, setStress] = useState([4])
  const [journalEntry, setJournalEntry] = useState("")
  const [gratitude, setGratitude] = useState("")

  const handleSave = () => {
    // Save journal entry logic
    console.log("Saving journal entry...")
    onBack()
  }

  return (
    <div className="flex-1 overflow-y-auto pb-20 bg-background1">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground1">Daily Journal</h1>
            <p className="text-sm text-muted-foreground1">
              {format(new Date(), "EEEE, MMMM do, yyyy")}
            </p>
          </div>
        </div>

        {/* Mood Tracking */}
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-foreground1">How are you feeling?</h2>
          
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-wellness-coral" />
                  <span className="font-medium text-foreground1">Mood</span>
                </div>
                <Badge variant="secondary1">{mood[0]}/10</Badge>
              </div>
              <Slider
                value={mood}
                onValueChange={setMood}
                max={10}
                min={1}
                step={1}
                className="w-full"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-wellness-yellow" />
                  <span className="font-medium text-foreground1">Energy</span>
                </div>
                <Badge variant="secondary1">{energy[0]}/10</Badge>
              </div>
              <Slider
                value={energy}
                onValueChange={setEnergy}
                max={10}
                min={1}
                step={1}
                className="w-full"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-wellness-orange" />
                  <span className="font-medium text-foreground1">Stress Level</span>
                </div>
                <Badge variant="secondary1">{stress[0]}/10</Badge>
              </div>
              <Slider
                value={stress}
                onValueChange={setStress}
                max={10}
                min={1}
                step={1}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Journal Entry */}
        <div className="space-y-3">
          <h3 className="font-medium text-foreground1">Today's Reflection</h3>
          <Textarea
            placeholder="How was your day? What thoughts and feelings would you like to capture?"
            value={journalEntry}
            onChange={(e) => setJournalEntry(e.target.value)}
            className="min-h-[120px]"
          />
        </div>

        {/* Gratitude */}
        <div className="space-y-3">
          <h3 className="font-medium text-foreground1">What are you grateful for today?</h3>
          <Textarea
            placeholder="Write down 3 things you're grateful for..."
            value={gratitude}
            onChange={(e) => setGratitude(e.target.value)}
            className="min-h-[80px]"
          />
        </div>

        {/* Quick Tags */}
        <div className="space-y-3">
          <h3 className="font-medium text-foreground1">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {["Happy", "Anxious", "Productive", "Tired", "Motivated", "Peaceful"].map((tag) => (
              <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-primary1 hover:text-primary-foreground1">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <Button onClick={handleSave} className="w-full">
          <Save className="w-4 h-4 mr-2" />
          Save Journal Entry
        </Button>
      </div>
    </div>
  )
}