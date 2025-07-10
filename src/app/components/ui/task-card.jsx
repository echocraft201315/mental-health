import { cn } from "@/app/lib/utils"
import { CheckCircle2, Circle, Clock } from "lucide-react"

export const TaskCard = ({ task, onToggle }) => {
  const priorityColors = {
    low: "border-success1/30 bg-success1/5",
    medium: "border-warning1/30 bg-warning1/5", 
    high: "border-destructive1/30 bg-destructive1/5"
  }

  const priorityDots = {
    low: "bg-success1",
    medium: "bg-warning1",
    high: "bg-destructive1"
  }

  return (
    <div className={cn(
      "p-4 rounded-xl border transition-all duration-200 hover:shadow-soft",
      task.completed 
        ? "bg-muted1/30 border-muted1" 
        : priorityColors[task.priority]
    )}>
      <div className="flex items-start space-x-3">
        <button
          onClick={() => onToggle(task.id)}
          className="mt-0.5 transition-colors hover:scale-105"
        >
          {task.completed ? (
            <CheckCircle2 className="w-5 h-5 text-success1" />
          ) : (
            <Circle className="w-5 h-5 text-muted-foreground1 hover:text-primary1" />
          )}
        </button>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <div className={cn("w-2 h-2 rounded-full", priorityDots[task.priority])} />
            <h3 className={cn(
              "font-medium",
              task.completed 
                ? "text-muted-foreground1 line-through" 
                : "text-foreground"
            )}>
              {task.title}
            </h3>
          </div>
          
          {task.description && (
            <p className={cn(
              "text-sm mb-2",
              task.completed 
                ? "text-muted-foreground1/70" 
                : "text-muted-foreground1"
            )}>
              {task.description}
            </p>
          )}
          
          {task.estimatedTime && (
            <div className="flex items-center space-x-1 text-xs text-muted-foreground1">
              <Clock className="w-3 h-3" />
              <span>{task.estimatedTime}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}