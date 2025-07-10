import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/app/components/ui/dialog"
import { Button } from "@/app/components/ui/button"
import { Badge } from "@/app/components/ui/badge"
import { Separator } from "@/app/components/ui/separator"
import { Mail, Phone, Calendar, MapPin, Edit3, Camera } from "lucide-react"

export const UserProfileModal = ({ isOpen, onClose }) => {
  const userProfile = {
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "January 15, 1990",
    location: "San Francisco, CA",
    therapist: "Dr. Sarah Wilson",
    memberSince: "March 2024",
    plan: "Premium Wellness",
    goals: ["Reduce Anxiety", "Better Sleep", "Mindfulness"],
    completedSessions: 12,
    nextSession: "Tomorrow at 2:00 PM"
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>My Profile</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Profile Picture */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-primary1 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-foreground1">JD</span>
              </div>
              <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary1 rounded-full flex items-center justify-center shadow-medium">
                <Camera className="w-4 h-4 text-primary-foreground1" />
              </button>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-foreground">{userProfile.name}</h3>
              <Badge variant="secondary1" className="mt-1">{userProfile.plan}</Badge>
            </div>
          </div>

          <Separator />

          {/* Contact Info */}
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Contact Information</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-wellness-orange" />
                <span className="text-sm text-muted-foreground1">{userProfile.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-wellness-yellow" />
                <span className="text-sm text-muted-foreground1">{userProfile.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-wellness-coral" />
                <span className="text-sm text-muted-foreground1">{userProfile.location}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="w-4 h-4 text-wellness-gold" />
                <span className="text-sm text-muted-foreground1">Born {userProfile.dateOfBirth}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Wellness Journey */}
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Wellness Journey</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 rounded-lg bg-gradient-primary1/10">
                <p className="text-2xl font-bold text-primary1">{userProfile.completedSessions}</p>
                <p className="text-xs text-muted-foreground1">Sessions Completed</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-gradient-warm/10">
                <p className="text-sm font-semibold text-foreground">Dr. Sarah Wilson</p>
                <p className="text-xs text-muted-foreground1">Your Therapist</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Current Goals:</p>
              <div className="flex flex-wrap gap-2">
                {userProfile.goals.map((goal, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {goal}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button variant="outline" className="flex-1">
              <Edit3 className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
            <Button className="flex-1">
              View Progress
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}