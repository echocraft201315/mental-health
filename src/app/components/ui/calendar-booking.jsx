"use client"

import { useState } from "react"
import { Calendar } from "@/app/components/ui/calendar"
import { Button } from "@/app/components/ui/button"
import { Textarea } from "@/app/components/ui/textarea"
import { Badge } from "@/app/components/ui/badge"
import { Clock, User } from "lucide-react"
import { format } from "date-fns"

export const CalendarBooking = ({ 
  onClose, 
  onBook, 
  isReschedule = false,
  currentBooking 
}) => {
  const [selectedDate, setSelectedDate] = useState(currentBooking?.date)
  const [selectedTime, setSelectedTime] = useState(currentBooking?.time || "")
  const [notes, setNotes] = useState("")

  const availableTimes = [
    "9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", 
    "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ]

  const handleBooking = () => {
    if (selectedDate && selectedTime) {
      onBook(selectedDate, selectedTime, notes)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-foreground/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-strong">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                {isReschedule ? "Reschedule Session" : "Book 1-1 Session"}
              </h2>
              <p className="text-sm text-muted-foreground1 mt-1">
                Select your preferred date and time
              </p>
            </div>
            <Button variant="ghost" onClick={onClose}>✕</Button>
          </div>

          {isReschedule && currentBooking && (
            <div className="mb-6 p-4 rounded-lg bg-gradient-warm/10 border border-warning1/20">
              <p className="text-sm font-medium text-foreground mb-1">Current Session:</p>
              <p className="text-sm text-muted-foreground1">
                {format(currentBooking.date, "PPP")} at {currentBooking.time}
              </p>
            </div>
          )}

          <div className="space-y-6">
            {/* Calendar */}
            <div>
              <h3 className="font-medium text-foreground mb-3">Select Date</h3>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => date < new Date()}
                className="rounded-lg border border-border pointer-events-auto"
              />
            </div>

            {/* Time Slots */}
            {selectedDate && (
              <div>
                <h3 className="font-medium text-foreground mb-3">Available Times</h3>
                <div className="grid grid-cols-2 gap-2">
                  {availableTimes.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                        selectedTime === time
                          ? "bg-primary1 text-primary-foreground border-primary1"
                          : "border-border hover:border-primary1/50 hover:bg-primary1/5"
                      }`}
                    >
                      <Clock className="w-4 h-4 inline mr-2" />
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Session Notes */}
            <div>
              <h3 className="font-medium text-foreground1 mb-3">Session Notes (Optional)</h3>
              <Textarea
                placeholder="What would you like to discuss in this session?"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-[80px]"
              />
            </div>

            {/* Therapist Info */}
            <div className="p-4 rounded-lg bg-gradient-primary1/10 border border-primary1/20">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-primary1 flex items-center justify-center">
                  <User className="w-5 h-5 text-primary-foreground1" />
                </div>
                <div>
                  <p className="font-medium text-foreground1">Dr. Sarah Wilson</p>
                  <p className="text-sm text-muted-foreground1">Licensed Therapist</p>
                </div>
                <Badge variant="secondary1" className="ml-auto">
                  Available
                </Badge>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <Button variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button 
                onClick={handleBooking}
                disabled={!selectedDate || !selectedTime}
                className="flex-1"
              >
                {isReschedule ? "Reschedule" : "Book Session"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}