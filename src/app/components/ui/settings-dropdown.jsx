"use client"

import { useState } from "react"
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  HelpCircle, 
  LogOut, 
  Moon, 
  Sun,
  ChevronRight 
} from "lucide-react"
import { cn } from "@/app/lib/utils"
import { Button } from "@/app/components/ui/button"
import { Switch } from "@/app/components/ui/switch"
import { Separator } from "@/app/components/ui/separator"


export const SettingsDropdown = ({ isOpen, onClose }) => {
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)

  const settingsItems = [
    {
      icon: User,
      label: "Account Settings",
      action: () => console.log("Account settings")
    },
    {
      icon: Bell,
      label: "Notifications",
      action: () => console.log("Notifications"),
      hasSwitch: true,
      switchValue: notifications,
      onSwitchChange: setNotifications
    },
    {
      icon: darkMode ? Sun : Moon,
      label: "Dark Mode",
      action: () => console.log("Dark mode"),
      hasSwitch: true,
      switchValue: darkMode,
      onSwitchChange: setDarkMode
    },
    {
      icon: Shield,
      label: "Privacy & Security",
      action: () => console.log("Privacy")
    },
    {
      icon: HelpCircle,
      label: "Help & Support",
      action: () => console.log("Help")
    }
  ]

  if (!isOpen) return null

  return (
    <>
      <div 
        className="fixed inset-0 z-30"
        onClick={onClose}
      />
      
      <div className="absolute top-full right-0 mt-2 w-72 bg-background border border-border rounded-xl shadow-strong z-40 animate-scale-in">
        <div className="p-4">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-primary1 flex items-center justify-center">
              <Settings className="w-5 h-5 text-primary-foreground1" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground1">Settings</h3>
              <p className="text-sm text-muted-foreground1">Manage your preferences</p>
            </div>
          </div>

          <Separator className="mb-4" />

          <div className="space-y-2">
            {settingsItems.map((item, index) => (
              <button
                key={index}
                onClick={item.action}
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted1/50 transition-colors text-left"
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="w-5 h-5 text-muted-foreground1" />
                  <span className="text-sm font-medium text-foreground1">{item.label}</span>
                </div>
                
                {item.hasSwitch ? (
                  <Switch
                    checked={item.switchValue}
                    onCheckedChange={item.onSwitchChange}
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <ChevronRight className="w-4 h-4 text-muted-foreground1" />
                )}
              </button>
            ))}
          </div>

          <Separator className="my-4" />

          <Button 
            variant="destructive" 
            className="w-full justify-start"
            onClick={() => console.log("Logout")}
          >
            <LogOut className="w-4 h-4 mr-3" />
            Sign Out
          </Button>
        </div>
      </div>
    </>
  )
}