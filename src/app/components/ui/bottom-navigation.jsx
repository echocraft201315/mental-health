"use client"

import { cn } from "@/app/lib/utils"
import { Home, MessageSquare, Plus, Circle } from "lucide-react"
import { useState } from "react"

export const BottomNavigation = ({ activeTab, onTabChange, onAddClick }) => {
  const tabs = [
    { id: "today", label: "Today", icon: Home },
    { id: "chat", label: "1-1", icon: MessageSquare },
    { id: "add", label: "", icon: Plus, isSpecial: true },
    { id: "circles", label: "Circles", icon: Circle },
    { id: "explore", label: "Explore", icon: Circle },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card1 border-t border-border z-50">
      <div className="flex items-center justify-around py-2 px-4 max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          
          if (tab.isSpecial) {
            return (
              <button
                key={tab.id}
                onClick={onAddClick}
                className="flex flex-col items-center justify-center w-14 h-14 bg-gradient-primary1 rounded-full shadow-medium hover:scale-105 transition-transform duration-200"
                aria-label="Add new entry"
              >
                <Icon className="w-6 h-6 text-primary-foreground" />
              </button>
            )
          }

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex flex-col items-center justify-center px-3 py-2 rounded-lg transition-all duration-200",
                isActive 
                  ? "text-primary bg-primary1/10" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted1/50"
              )}
            >
              <Icon className={cn("w-5 h-5 mb-1", isActive && "text-primary")} />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}