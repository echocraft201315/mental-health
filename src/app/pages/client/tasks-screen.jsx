import { useState } from "react"
import { Button } from "@/app/components/ui/button"
import { TaskCard } from "@/app/components/ui/task-card"
import { Badge } from "@/app/components/ui/badge"
import { ArrowLeft, CheckCircle, Clock, Target } from "lucide-react"

export const TasksScreen = ({ onBack }) => {
  const [tasks, setTasks] = useState([
    {
      id: "1",
      title: "Morning Meditation",
      description: "Start your day with 10 minutes of mindfulness",
      completed: true,
      priority: "high",
      estimatedTime: "10 min",
      category: "Mindfulness"
    },
    {
      id: "2", 
      title: "Drink 8 glasses of water",
      description: "Stay hydrated throughout the day",
      completed: false,
      priority: "medium",
      estimatedTime: "All day",
      category: "Health"
    },
    {
      id: "3",
      title: "Evening Journal",
      description: "Reflect on your day and gratitude",
      completed: false,
      priority: "medium",
      estimatedTime: "15 min",
      category: "Reflection"
    },
    {
      id: "4",
      title: "30-minute walk",
      description: "Get some fresh air and movement",
      completed: false,
      priority: "high",
      estimatedTime: "30 min",
      category: "Exercise"
    },
    {
      id: "5",
      title: "Practice deep breathing",
      description: "5 minutes of breathing exercises",
      completed: false,
      priority: "low",
      estimatedTime: "5 min",
      category: "Mindfulness"
    }
  ])

  const toggleTask = (taskId) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ))
  }

  const completedTasks = tasks.filter(task => task.completed).length
  const totalTasks = tasks.length
  const progressPercentage = Math.round((completedTasks / totalTasks) * 100)

  const getStatsIcon = (type) => {
    switch (type) {
      case "completed": return <CheckCircle className="w-5 h-5 text-success1" />
      case "pending": return <Clock className="w-5 h-5 text-wellness-orange" />
      case "total": return <Target className="w-5 h-5 text-primary1" />
      default: return null
    }
  }

  return (
    <div className="flex-1 overflow-y-auto pb-20 bg-background1">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground1">Your Tasks</h1>
            <p className="text-sm text-muted-foreground1">
              Complete your daily wellness activities
            </p>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="p-6 rounded-xl bg-gradient-primary1 text-primary-foreground1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Today's Progress</h3>
            <Badge variant="secondary1" className="bg-white/20 text-primary-foreground1">
              {progressPercentage}%
            </Badge>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3 mb-4">
            <div 
              className="bg-white rounded-full h-3 transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-sm opacity-90">
            {completedTasks} of {totalTasks} tasks completed
          </p>
        </div>

        {/* Task Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 rounded-xl bg-success1/10 border border-success1/20">
            {getStatsIcon("completed")}
            <p className="text-2xl font-bold text-success1 mt-2">{completedTasks}</p>
            <p className="text-xs text-muted-foreground1">Completed</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-wellness-orange/10 border border-wellness-orange/20">
            {getStatsIcon("pending")}
            <p className="text-2xl font-bold text-wellness-orange mt-2">{totalTasks - completedTasks}</p>
            <p className="text-xs text-muted-foreground1">Pending</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-primary1/10 border border-primary1/20">
            {getStatsIcon("total")}
            <p className="text-2xl font-bold text-primary1 mt-2">{totalTasks}</p>
            <p className="text-xs text-muted-foreground1">Total</p>
          </div>
        </div>

        {/* Task Categories */}
        <div>
          <h3 className="font-medium text-foreground1 mb-3">Filter by Category</h3>
          <div className="flex flex-wrap gap-2">
            {["All", "Mindfulness", "Health", "Exercise", "Reflection"].map((category) => (
              <Badge key={category} variant="outline" className="cursor-pointer hover:bg-primary1 hover:text-primary-foreground1">
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-4">
          <h3 className="font-medium text-foreground1">Your Tasks</h3>
          <div className="space-y-3">
            {tasks.map((task) => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onToggle={toggleTask}
              />
            ))}
          </div>
        </div>

        {/* Motivational Message */}
        {progressPercentage === 100 && (
          <div className="p-6 rounded-xl bg-gradient-wellness text-white text-center">
            <h3 className="font-semibold mb-2">🎉 Amazing Work!</h3>
            <p className="text-sm opacity-90">
              You've completed all your tasks for today. Keep up the great work on your wellness journey!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}