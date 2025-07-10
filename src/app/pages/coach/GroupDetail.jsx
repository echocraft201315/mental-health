"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Button } from "@/app/components/ui/button"
import { 
  ArrowLeft, 
  Users, 
  Calendar, 
  Plus,
  Trash2,
  MessageCircle,
  Video,
  Settings
} from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/app/components/ui/dialog"
import { Input } from "@/app/components/ui/input"
import { Checkbox } from "@/app/components/ui/checkbox"

const GroupDetail = ({ id }) => {
  const router = useRouter()
  const [selectedClients, setSelectedClients] = useState([])

  // Mock group data
  const group = {
    id: id,
    name: `Group ${id}`,
    members: [
      { id: 1, name: "John Doe", mood: "😊", status: "Active", joinDate: "Jan 15" },
      { id: 2, name: "Alice Smith", mood: "😐", status: "Active", joinDate: "Jan 18" },
      { id: 3, name: "Bob Wilson", mood: "😊", status: "Active", joinDate: "Jan 20" },
      { id: 4, name: "Carol Brown", mood: "😔", status: "Active", joinDate: "Jan 22" },
      { id: 5, name: "David Lee", mood: "😊", status: "Active", joinDate: "Jan 25" },
      { id: 6, name: "Emma Davis", mood: "😐", status: "Active", joinDate: "Jan 28" },
    ],
    nextSession: "15 June",
    totalSessions: 12,
    createdDate: "Jan 10, 2025"
  }

  const availableClients = [
    { id: 7, name: "Frank Miller", status: "Available" },
    { id: 8, name: "Grace Wilson", status: "Available" },
    { id: 9, name: "Henry Taylor", status: "Available" },
  ]

  const handleClientSelection = (clientId, checked) => {
    if (checked) {
      setSelectedClients([...selectedClients, clientId])
    } else {
      setSelectedClients(selectedClients.filter(id => id !== clientId))
    }
  }

  return (
    <div className="min-h-screen bg-luxury-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              onClick={() => router.push("/groups")}
              className="mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Groups
            </Button>
            <h1 className="text-3xl font-bold text-luxury-dark">{group.name}</h1>
          </div>
          <div className="flex space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  Manage Members
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Manage Group Members</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Add New Members</h4>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {availableClients.map((client) => (
                        <div key={client.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`client-${client.id}`}
                            checked={selectedClients.includes(client.id.toString())}
                            onCheckedChange={(checked) => 
                              handleClientSelection(client.id.toString(), checked)
                            }
                          />
                          <label htmlFor={`client-${client.id}`} className="text-sm">
                            {client.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button className="w-full bg-luxury-pink hover:bg-luxury-pink/90">
                    Add Selected Members
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button className="bg-luxury-pink hover:bg-luxury-pink/90">
              <MessageCircle className="w-4 h-4 mr-2" />
              Group Chat
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Group Info */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-luxury-dark">Group Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span>{group.members.length} members</span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span>Next session: {group.nextSession}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Video className="w-4 h-4 text-muted-foreground" />
                <span>{group.totalSessions} total sessions</span>
              </div>
              <div className="pt-4 space-y-2">
                <Button className="w-full bg-luxury-pink hover:bg-luxury-pink/90">
                  Schedule Session
                </Button>
                <Button variant="outline" className="w-full">
                  View Session History
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Members List */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-luxury-dark">Group Members</CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" className="bg-luxury-pink hover:bg-luxury-pink/90">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Member
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Member</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Select from existing clients:</label>
                        <div className="mt-2 space-y-2 max-h-48 overflow-y-auto">
                          {availableClients.map((client) => (
                            <div key={client.id} className="flex items-center space-x-2 p-2 border rounded">
                              <Checkbox id={`add-${client.id}`} />
                              <label htmlFor={`add-${client.id}`} className="flex-1">
                                {client.name}
                              </label>
                              <Badge variant="secondary">{client.status}</Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                      <Button className="w-full bg-luxury-pink hover:bg-luxury-pink/90">
                        Add to Group
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {group.members.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-luxury-pink/20 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-luxury-pink">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">Joined {member.joinDate}</p>
                      </div>
                      <div className="text-xl">{member.mood}</div>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        {member.status}
                      </Badge>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="ghost" onClick={() => router.push(`/clients/${member.id}`)}>
                        View Profile
                      </Button>
                      <Button size="sm" variant="ghost">
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Group Statistics */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-luxury-dark mb-6">Group Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-luxury-pink mb-2">85%</div>
                  <div className="text-muted-foreground">Avg. Attendance</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-luxury-gold mb-2">92%</div>
                  <div className="text-muted-foreground">Goal Achievement</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-luxury-dark mb-2">4.8</div>
                  <div className="text-muted-foreground">Avg. Rating</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">6</div>
                  <div className="text-muted-foreground">Active Members</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GroupDetail