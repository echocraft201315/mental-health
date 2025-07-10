import { useState } from "react"
import { DayNavigation } from "@/app/components/ui/day-navigation"
import { TaskCard } from "@/app/components/ui/task-card"
import { ProgressCard } from "@/app/components/ui/progress-card"
import { Heart, Droplets, Moon, Target } from "lucide-react"

export const TodayScreen = ({ currentDate, onDateChange }) => {
  const [tasks, setTasks] = useState([
    {
      id: "1",
      title: "Morning Meditation",
      description: "Start your day with 10 minutes of mindfulness",
      completed: true,
      priority: "high",
      estimatedTime: "10 min"
    },
    {
      id: "2", 
      title: "Drink 8 glasses of water",
      description: "Stay hydrated throughout the day",
      completed: false,
      priority: "medium",
      estimatedTime: "All day"
    },
    {
      id: "3",
      title: "Evening Journal",
      description: "Reflect on your day and gratitude",
      completed: false,
      priority: "medium",
      estimatedTime: "15 min"
    },
    {
      id: "4",
      title: "30-minute walk",
      description: "Get some fresh air and movement",
      completed: false,
      priority: "high",
      estimatedTime: "30 min"
    }
  ])

  const toggleTask = (taskId) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ))
  }

  const completedTasks = tasks.filter(task => task.completed).length
  const progressPercentage = Math.round((completedTasks / tasks.length) * 100)

  return (
    <div className="flex-1 overflow-y-auto pb-20">
      {/* Header with day navigation */}
      <div className="bg-gradient-card border-b border-border">
        <DayNavigation currentDate={currentDate} onDateChange={onDateChange} />
      </div>

      <div className="p-6 space-y-6">
        {/* Daily Progress Overview */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground1">Today's Progress</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <ProgressCard
              title="Tasks"
              value={completedTasks}
              maxValue={tasks.length}
              color="primary"
              icon={<Target className="w-4 h-4 text-primary1" />}
            />
            <ProgressCard
              title="Water"
              value={5}
              maxValue={8}
              unit="glasses"
              color="wellness"
              icon={<Droplets className="w-4 h-4 text-wellness-blue1" />}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <ProgressCard
              title="Wellness"
              value={75}
              maxValue={100}
              unit="%"
              color="success"
              icon={<Heart className="w-4 h-4 text-success1" />}
            />
            <ProgressCard
              title="Sleep"
              value={7.5}
              maxValue={8}
              unit="hours"
              color="warning"
              icon={<Moon className="w-4 h-4 text-warning1" />}
            />
          </div>
        </div>

        {/* Assigned Tasks */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground1">Today's Tasks</h2>
            <span className="text-sm text-muted-foreground1">
              {completedTasks}/{tasks.length} completed
            </span>
          </div>
          
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

        {/* Daily Inspiration */}
        <div className="p-6 rounded-xl bg-gradient-primary1 text-primary-foreground1">
          <h3 className="font-semibold mb-2">Daily Inspiration</h3>
          <p className="text-sm opacity-90">
            "Progress, not perfection. Every small step you take today brings you closer to your wellness goals."
          </p>
        </div>
      </div>
    </div>
  )
}