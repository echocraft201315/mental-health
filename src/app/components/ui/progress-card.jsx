import { cn } from "@/app/lib/utils"

export const ProgressCard = ({ 
  title, 
  value, 
  maxValue, 
  unit = "", 
  color = "primary",
  icon 
}) => {
  const percentage = Math.round((value / maxValue) * 100)
  
  const colorMap = {
    primary: {
      bg: "bg-primary1/10",
      bar: "bg-primary1",
      text: "text-primary1"
    },
    success: {
      bg: "bg-success1/10", 
      bar: "bg-success1",
      text: "text-success1"
    },
    warning: {
      bg: "bg-warning1/10",
      bar: "bg-warning1", 
      text: "text-warning1"
    },
    wellness: {
      bg: "bg-wellness-purple1/10",
      bar: "bg-wellness-purple1",
      text: "text-wellness-purple1"
    }
  }

  const colors = colorMap[color]

  return (
    <div className="p-4 rounded-xl bg-card1 border border-border shadow-soft">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          {icon && (
            <div className={cn("p-2 rounded-lg", colors.bg)}>
              {icon}
            </div>
          )}
          <h3 className="font-medium text-foreground1">{title}</h3>
        </div>
        <span className={cn("text-sm font-semibold", colors.text)}>
          {percentage}%
        </span>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground1">
            {value} {unit}
          </span>
          <span className="text-muted-foreground1">
            {maxValue} {unit}
          </span>
        </div>
        
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className={cn("h-2 rounded-full transition-all duration-500", colors.bar)}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
      </div>
    </div>
  )
}