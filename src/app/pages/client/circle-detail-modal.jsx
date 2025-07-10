import { Button } from "@/app/components/ui/button"
import { Badge } from "@/app/components/ui/badge"
import { Input } from "@/app/components/ui/input"
import { Textarea } from "@/app/components/ui/textarea"
import { Users, Calendar, MessageCircle, X, Star } from "lucide-react"

export const CircleDetailModal = ({ isOpen, onClose, circle, onJoin }) => {
  if (!isOpen || !circle) return null

  const handleJoin = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    onJoin({
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      motivation: formData.get('motivation')
    })
    onClose()
  }

  const members = [
    { name: "Sarah J.", joined: "2 months ago", avatar: "👩" },
    { name: "Mike R.", joined: "1 month ago", avatar: "👨" },
    { name: "Emma K.", joined: "3 weeks ago", avatar: "👩‍🦰" },
    { name: "David L.", joined: "2 weeks ago", avatar: "👨‍🦲" },
    { name: "Lisa M.", joined: "1 week ago", avatar: "👩‍🦱" }
  ]

  return (
    <div className="fixed inset-0 bg-1/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-background1 rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-strong">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className={`w-12 h-12 rounded-full ${circle.color} flex items-center justify-center`}>
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground1">{circle.name}</h2>
                <p className="text-sm text-muted-foreground1">{circle.members} members</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Circle Details */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary1" className="mb-3">{circle.category}</Badge>
              <p className="text-foreground1 mb-4">{circle.description}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="p-3 rounded-lg bg-muted1/30">
                  <p className="font-medium text-foreground1">Next Session</p>
                  <p className="text-muted-foreground1">{circle.nextSession}</p>
                </div>
                <div className="p-3 rounded-lg bg-muted1/30">
                  <p className="font-medium text-foreground1">Privacy</p>
                  <p className="text-muted-foreground1">Closed Group</p>
                </div>
              </div>
            </div>

            {/* Guidelines */}
            <div className="p-4 rounded-lg bg-gradient-primary1/10 border border-primary1/20">
              <h3 className="font-medium text-foreground1 mb-2">Group Guidelines</h3>
              <ul className="text-sm text-muted-foreground1 space-y-1">
                <li>• Be respectful and supportive to all members</li>
                <li>• Share experiences constructively</li>
                <li>• Maintain confidentiality of shared information</li>
                <li>• Attend sessions regularly when possible</li>
              </ul>
            </div>

            {/* Recent Members */}
            <div>
              <h3 className="font-medium text-foreground1 mb-3">Recent Members</h3>
              <div className="space-y-2">
                {members.slice(0, 3).map((member, index) => (
                  <div key={index} className="flex items-center space-x-3 p-2 rounded-lg bg-muted/20">
                    <span className="text-lg">{member.avatar}</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground1">{member.name}</p>
                      <p className="text-xs text-muted-foreground1">Joined {member.joined}</p>
                    </div>
                    <div className="flex space-x-1">
                      {[1,2,3,4,5].map((star) => (
                        <Star key={star} className="w-3 h-3 fill-warning1 text-warning1" />
                      ))}
                    </div>
                  </div>
                ))}
                <p className="text-xs text-muted-foreground1 text-center">
                  +{circle.members - 3} more members
                </p>
              </div>
            </div>

            {/* Join Form */}
            <form onSubmit={handleJoin} className="space-y-4">
              <h3 className="font-medium text-foreground1">Join This Circle</h3>
              
              <div>
                <label className="text-sm font-medium text-foreground1">Full Name</label>
                <Input name="fullName" placeholder="Enter your full name" required />
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground1">Email</label>
                <Input name="email" type="email" placeholder="Enter your email" required />
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground1">Why do you want to join?</label>
                <Textarea 
                  name="motivation"
                  placeholder="Share your motivation and what you hope to gain from this circle..."
                  className="min-h-[80px]"
                  required
                />
              </div>

              <div className="flex space-x-3">
                <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">
                  Request to Join
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}