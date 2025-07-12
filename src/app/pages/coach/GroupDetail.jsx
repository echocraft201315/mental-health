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
  Settings,
  CheckCircle,
  Circle
} from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/app/components/ui/dialog"
import { Input } from "@/app/components/ui/input"
import { Checkbox } from "@/app/components/ui/checkbox"

const GroupDetail = ({ id }) => {
  const router = useRouter()
  const [selectedClients, setSelectedClients] = useState([])
  const [addDialogSelected, setAddDialogSelected] = useState([])

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

  const handleAddDialogSelection = (clientId) => {
    if (addDialogSelected.includes(clientId)) {
      setAddDialogSelected(addDialogSelected.filter(id => id !== clientId))
    } else {
      setAddDialogSelected([...addDialogSelected, clientId])
    }
  }

  return (
    <div className="min-h-screen bg-gradient-gentle-neutral bg-pattern-subtle p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              onClick={() => router.push("/groups")}
              className="mr-4 bg-gradient-gentle-neutral/50 hover:bg-gradient-gentle-primary/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Groups
            </Button>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {group.name}
            </h1>
          </div>
          <div className="flex space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="bg-gradient-gentle-neutral/50 hover:bg-gradient-gentle-primary/20">
                  <Settings className="w-4 h-4 mr-2" />
                  Manage Members
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md bg-blue-50 border-2 border-blue-400 shadow-2xl rounded-xl p-8">
                <h2 className="text-blue-900 font-bold text-xl mb-1">Create New Group</h2>
                <p className="text-blue-700 mb-6">Fill in the details below to create a new group and add clients.</p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-blue-900 font-medium mb-1">Group Name *</label>
                    <input className="w-full border border-blue-200 rounded-lg p-2 bg-white text-blue-900 focus:border-blue-500 focus:outline-none" placeholder="Enter group name" />
                  </div>
                  <div>
                    <label className="block text-blue-900 font-medium mb-1">Description</label>
                    <textarea className="w-full border border-blue-200 rounded-lg p-2 bg-white text-blue-900 focus:border-blue-500 focus:outline-none" placeholder="Optional group description" />
                  </div>
                  <div>
                    <label className="block text-blue-900 font-medium mb-1">Add Clients *</label>
                    <input className="w-full border border-blue-200 rounded-lg p-2 bg-white text-blue-900 focus:border-blue-500 focus:outline-none" placeholder="Search clients..." />
                  </div>
                  <div className="flex justify-end space-x-2 pt-4">
                    <button className="px-4 py-2 rounded-lg border border-blue-200 text-blue-700 bg-white hover:bg-blue-100">Cancel</button>
                    <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold shadow hover:from-blue-600 hover:to-blue-800">+ Create</button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Button className="bg-gradient-gentle-primary hover:bg-gradient-gentle-secondary">
              <MessageCircle className="w-4 h-4 mr-2" />
              Group Chat
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Group Info */}
          <Card className="lg:col-span-1 bg-gradient-card shadow-soft border-0">
            <CardHeader>
              <CardTitle>Group Information</CardTitle>
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
                <Button className="w-full bg-gradient-gentle-primary hover:bg-gradient-gentle-secondary">
                  Schedule Session
                </Button>
                <Button variant="outline" className="w-full bg-gradient-gentle-neutral/50 hover:bg-gradient-gentle-primary/20">
                  View Session History
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Members List */}
          <Card className="lg:col-span-2 bg-gradient-card shadow-soft border-0">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Group Members</CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" className="bg-gradient-gentle-primary hover:bg-gradient-gentle-secondary">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Member
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md bg-blue-50 border-2 border-blue-400 shadow-lg rounded-lg">
                    <DialogHeader>
                      <DialogTitle className="text-blue-900">Add New Member</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 p-6">
                      <div>
                        <label className="text-sm font-medium text-blue-900">Select from existing clients:</label>
                        <div className="mt-2 space-y-2 max-h-48 overflow-y-auto">
                          {availableClients.map((client) => (
                            <button
                              key={client.id}
                              type="button"
                              onClick={() => handleAddDialogSelection(client.id)}
                              className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 text-left border-2 ${
                                addDialogSelected.includes(client.id)
                                  ? 'bg-blue-100 border-blue-400'
                                  : 'bg-blue-50 border-blue-200 hover:bg-blue-100'
                              }`}
                            >
                              <span>
                                {addDialogSelected.includes(client.id) ? (
                                  <CheckCircle className="w-6 h-6 text-green-600" />
                                ) : (
                                  <Circle className="w-6 h-6 text-blue-200" />
                                )}
                              </span>
                              <span className="flex-1">
                                <span className="block font-medium text-blue-800">{client.name}</span>
                                <span className="block text-sm text-blue-700">{client.status}</span>
                              </span>
                              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                                {client.status}
                              </Badge>
                            </button>
                          ))}
                        </div>
                      </div>
                      <Button className="w-full bg-gradient-gentle-primary hover:bg-gradient-gentle-secondary text-white font-semibold">
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
                  <div key={member.id} className="flex items-center justify-between p-4 bg-gradient-gentle-neutral/20 rounded-lg hover:bg-gradient-gentle-neutral/30 transition-all duration-300">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-gentle-primary rounded-full flex items-center justify-center shadow-soft">
                        <span className="text-sm font-medium text-white">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">Joined {member.joinDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-2xl">{member.mood}</span>
                      <Badge variant="secondary" className="bg-gradient-gentle-secondary/20 text-foreground">
                        {member.status}
                      </Badge>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="hover:bg-gradient-gentle-warm/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default GroupDetail