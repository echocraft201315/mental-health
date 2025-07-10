import { cn } from "@/app/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { format, addDays, subDays, isToday } from "date-fns"

export const DayNavigation = ({ currentDate, onDateChange }) => {
  const goToPreviousDay = () => {
    onDateChange(subDays(currentDate, 1))
  }

  const goToNextDay = () => {
    onDateChange(addDays(currentDate, 1))
  }

  const formatDisplayDate = (date) => {
    if (isToday(date)) {
      return "Today"
    }
    return format(date, "MMM d")
  }

  return (
    <div className="flex items-center justify-center space-x-4 py-4">
      <button
        onClick={goToPreviousDay}
        className="p-2 rounded-full hover:bg-muted transition-colors"
        aria-label="Previous day"
      >
        <ChevronLeft className="w-5 h-5 text-muted-foreground" />
      </button>
      
      <div className="min-w-[100px] text-center">
        <h2 className="text-lg font-semibold text-foreground">
          {formatDisplayDate(currentDate)}
        </h2>
        <p className="text-xs text-muted-foreground">
          {format(currentDate, "EEEE")}
        </p>
      </div>
      
      <button
        onClick={goToNextDay}
        className="p-2 rounded-full hover:bg-muted transition-colors"
        aria-label="Next day"
      >
        <ChevronRight className="w-5 h-5 text-muted-foreground" />
      </button>
    </div>
  )
}