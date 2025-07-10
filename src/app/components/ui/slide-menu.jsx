"use client"

import { cn } from "@/app/lib/utils"
import { X, MessageSquare, Calendar, FileText } from "lucide-react"
import { useEffect } from "react"

export const SlideMenu = ({ isOpen, onClose, onOptionSelect }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const options = [
    {
      id: "log-progress",
      title: "Log Progress",
      description: "Record your daily wellness journey",
      icon: FileText,
      gradient: "bg-gradient-wellness"
    },
    {
      id: "complete-tasks",
      title: "Complete Tasks",
      description: "Check off your assigned activities",
      icon: MessageSquare,
      gradient: "bg-gradient-warm"
    },
    {
      id: "book-session",
      title: "Book 1-1 Session",
      description: "Schedule time with your coach",
      icon: Calendar,
      gradient: "bg-gradient-primary1"
    }
  ]

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-foreground1/20 backdrop-blur-sm z-40 animate-fade-in"
        onClick={onClose}
      />
      
      {/* Menu */}
      <div className={cn(
        "fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-background shadow-strong z-50 transition-transform duration-300",
        isOpen ? "animate-slide-in-right" : "animate-slide-out-right"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="text-xl font-semibold text-foreground1">Quick Actions</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-muted1 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 text-muted-foreground1" />
            </button>
          </div>

          {/* Options */}
          <div className="flex-1 p-6 space-y-4">
            {options.map((option) => {
              const Icon = option.icon
              return (
                <button
                  key={option.id}
                  onClick={() => {
                    onOptionSelect(option.id)
                    onClose()
                  }}
                  className="w-full p-4 rounded-xl bg-card1 hover:bg-muted1/50 border border-border transition-all duration-200 hover:scale-[1.02] hover:shadow-soft text-left group"
                >
                  <div className="flex items-start space-x-4">
                    <div className={cn(
                      "flex items-center justify-center w-12 h-12 rounded-xl text-white",
                      option.gradient
                    )}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground1 group-hover:text-primary1 transition-colors">
                        {option.title}
                      </h3>
                      <p className="text-sm text-muted-foreground1 mt-1">
                        {option.description}
                      </p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}