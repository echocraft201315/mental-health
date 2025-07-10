import { useState } from "react"
import { Button } from "@/app/components/ui/button"
import { Badge } from "@/app/components/ui/badge"
import { Progress } from "@/app/components/ui/progress"
import { 
  ArrowLeft, 
  Play, 
  CheckCircle, 
  Clock, 
  Users, 
  Star,
  Calendar,
  Target
} from "lucide-react"

export const ProgramDetail = ({ onBack, title }) => {
  const [currentWeek, setCurrentWeek] = useState(1)
  
  const programInfo = {
    title: "21-Day Mindfulness Challenge",
    description: "Transform your daily routine with guided mindfulness practices designed to reduce stress and improve focus.",
    instructor: "Dr. Sarah Wilson",
    duration: "21 Days",
    level: "Beginner",
    rating: 4.8,
    participants: 1247,
    progress: 35
  }

  const weeks = [
    {
      week: 1,
      title: "Foundation Week",
      description: "Learn the basics of mindfulness",
      sessions: [
        { day: 1, title: "What is Mindfulness?", duration: "10 min", completed: true },
        { day: 2, title: "Breathing Basics", duration: "15 min", completed: true },
        { day: 3, title: "Body Scan", duration: "20 min", completed: false },
        { day: 4, title: "Mindful Walking", duration: "15 min", completed: false },
        { day: 5, title: "Gratitude Practice", duration: "10 min", completed: false },
        { day: 6, title: "Loving Kindness", duration: "18 min", completed: false },
        { day: 7, title: "Week 1 Reflection", duration: "12 min", completed: false }
      ]
    },
    {
      week: 2,
      title: "Building Habits",
      description: "Establish your daily practice",
      sessions: [
        { day: 8, title: "Morning Routine", duration: "15 min", completed: false },
        { day: 9, title: "Mindful Eating", duration: "20 min", completed: false },
        { day: 10, title: "Stress Relief", duration: "25 min", completed: false },
        { day: 11, title: "Focus Training", duration: "18 min", completed: false },
        { day: 12, title: "Emotional Awareness", duration: "22 min", completed: false },
        { day: 13, title: "Sleep Preparation", duration: "15 min", completed: false },
        { day: 14, title: "Week 2 Reflection", duration: "12 min", completed: false }
      ]
    },
    {
      week: 3,
      title: "Integration Week",
      description: "Make mindfulness part of your life",
      sessions: [
        { day: 15, title: "Workplace Mindfulness", duration: "20 min", completed: false },
        { day: 16, title: "Relationship Awareness", duration: "25 min", completed: false },
        { day: 17, title: "Difficult Emotions", duration: "30 min", completed: false },
        { day: 18, title: "Compassion Practice", duration: "22 min", completed: false },
        { day: 19, title: "Future Planning", duration: "18 min", completed: false },
        { day: 20, title: "Community Connection", duration: "15 min", completed: false },
        { day: 21, title: "Program Completion", duration: "20 min", completed: false }
      ]
    }
  ]

  return (
    <div className="flex-1 overflow-y-auto pb-20">
      {/* Header */}
      <div className="flex items-center space-x-4 p-4 bg-card1 border-b border-border">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-lg font-bold text-foreground1">{programInfo.title}</h1>
          <p className="text-sm text-muted-foreground1">with {programInfo.instructor}</p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Program Overview */}
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Badge variant="secondary1">{programInfo.level}</Badge>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground1">
              <Clock className="w-3 h-3" />
              <span>{programInfo.duration}</span>
            </div>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground1">
              <Users className="w-3 h-3" />
              <span>{programInfo.participants}</span>
            </div>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground1">
              <Star className="w-3 h-3 fill-current text-warning1" />
              <span>{programInfo.rating}</span>
            </div>
          </div>

          <p className="text-muted-foreground1">{programInfo.description}</p>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-foreground1">Your Progress</span>
              <span className="text-muted-foreground1">{programInfo.progress}%</span>
            </div>
            <Progress value={programInfo.progress} className="h-2" />
          </div>
        </div>

        {/* Week Selector */}
        <div>
          <h3 className="font-semibold text-foreground1 mb-3">Select Week</h3>
          <div className="flex space-x-2">
            {weeks.map((week) => (
              <Button
                key={week.week}
                variant={currentWeek === week.week ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentWeek(week.week)}
              >
                Week {week.week}
              </Button>
            ))}
          </div>
        </div>

        {/* Current Week */}
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-foreground1">{weeks[currentWeek - 1].title}</h3>
            <p className="text-sm text-muted-foreground1">{weeks[currentWeek - 1].description}</p>
          </div>

          {/* Sessions */}
          <div className="space-y-3">
            {weeks[currentWeek - 1].sessions.map((session) => (
              <div
                key={session.day}
                className={`p-4 rounded-xl border transition-all ${
                  session.completed
                    ? "bg-success1/10 border-success1/20"
                    : "bg-card1 border-border hover:border-primary1/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      session.completed
                        ? "bg-success1 text-success-foreground1"
                        : "bg-muted text-muted-foreground1"
                    }`}>
                      {session.completed ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <span className="text-xs font-bold">{session.day}</span>
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground1">{session.title}</h4>
                      <p className="text-xs text-muted-foreground1">{session.duration}</p>
                    </div>
                  </div>
                  
                  {!session.completed && (
                    <Button size="sm" variant="outline">
                      <Play className="w-3 h-3 mr-2" />
                      Start
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community */}
        <div className="p-4 rounded-xl bg-gradient-primary1/10 border border-primary1/20">
          <h4 className="font-medium text-foreground1 mb-2">Join the Community</h4>
          <p className="text-sm text-muted-foreground1 mb-3">
            Connect with other participants and share your journey
          </p>
          <Button variant="outline" size="sm" className="w-full">
            <Users className="w-4 h-4 mr-2" />
            Join Discussion
          </Button>
        </div>
      </div>
    </div>
  )
}