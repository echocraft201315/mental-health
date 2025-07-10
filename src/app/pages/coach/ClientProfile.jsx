"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Button } from "@/app/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { 
  ArrowLeft, 
  Phone, 
  Mail, 
  User, 
  Calendar,
  Plus,
  Check,
  FileText,
  MessageCircle,
  TrendingUp
} from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/app/components/ui/dialog"
import { Input } from "@/app/components/ui/input"
import { Textarea } from "@/app/components/ui/textarea"

const ClientProfile = ({ id }) => {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")

  // Mock client data - in real app, fetch based on id
  const client = {
    id: id,
    name: "John Doe",
    phone: "+1 (555) 123-4567",
    email: "john@doe.com",
    type: "1-1",
    status: "Active",
    mood: "😊",
    lastActive: "Today",
    created: "13 Jan 2025",
    avatar: "JD"
  }

  const progressData = [
    { month: "Nov", value: 65 },
    { month: "Dec", value: 78 },
    { month: "Jan", value: 85 },
    { month: "Feb", value: 92 }
  ]

  const tasks = [
    { id: 1, task: "Meditate 30 min", completed: true, date: "Today" },
    { id: 2, task: "Call parent", completed: true, date: "Yesterday" },
    { id: 3, task: "Call friend", completed: false, date: "Tomorrow" }
  ]

  const notes = [
    { id: 1, content: "Client showing great progress with daily meditation", date: "2 days ago" },
    { id: 2, content: "Discussed family relationships in today's session", date: "1 week ago" }
  ]

  const files = [
    { id: 1, name: "Progress Assessment", type: "PDF", date: "1 week ago" },
    { id: 2, name: "Goal Setting Worksheet", type: "DOC", date: "2 weeks ago" }
  ]

  return (
    <div className="min-h-screen bg-luxury-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button 
            variant="ghost" 
            onClick={() => router.push("/clients")}
            className="mr-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Clients
          </Button>
          <h1 className="text-3xl font-bold text-luxury-dark">Client Profile</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Client Info Card */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-luxury-pink/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-luxury-pink">
                    {client.avatar}
                  </span>
                </div>
                <div>
                  <CardTitle className="text-luxury-dark">{client.name}</CardTitle>
                  <p className="text-muted-foreground">Last login: {client.lastActive}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span>{client.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span>{client.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <User className="w-4 h-4 text-muted-foreground" />
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  {client.status}
                </Badge>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span>Member since {client.created}</span>
              </div>
              
              <div className="pt-4 space-y-2">
                <Button className="w-full bg-luxury-pink hover:bg-luxury-pink/90">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Message Client
                </Button>
                <Button variant="outline" className="w-full">
                  Schedule Session
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="tasks">Tasks</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
                <TabsTrigger value="files">Files</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Progress Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-luxury-dark flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Progress Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-end justify-center space-x-8">
                      {progressData.map((item, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <div
                            className="bg-luxury-pink rounded-t-sm w-16 transition-all hover:bg-luxury-pink/80"
                            style={{ height: `${item.value * 2}px` }}
                          />
                          <span className="text-sm text-muted-foreground mt-2">{item.month}</span>
                          <span className="text-xs text-luxury-dark font-medium">{item.value}%</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <div className="text-2xl font-bold text-luxury-pink mb-1">85%</div>
                      <div className="text-sm text-muted-foreground">Goal Completion</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <div className="text-2xl font-bold text-luxury-gold mb-1">12</div>
                      <div className="text-sm text-muted-foreground">Sessions</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <div className="text-2xl font-bold text-luxury-dark mb-1">4.9</div>
                      <div className="text-sm text-muted-foreground">Rating</div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="tasks" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-luxury-dark">Client Tasks</h3>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" className="bg-luxury-pink hover:bg-luxury-pink/90">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Task
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Task</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Input placeholder="Task description" />
                        <Textarea placeholder="Task details" />
                        <Button className="w-full bg-luxury-pink hover:bg-luxury-pink/90">
                          Create Task
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                
                {tasks.map((task) => (
                  <Card key={task.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Button size="sm" variant="ghost" className="p-2">
                            {task.completed ? (
                              <Check className="w-4 h-4 text-green-500" />
                            ) : (
                              <div className="w-4 h-4 border-2 border-muted-foreground rounded" />
                            )}
                          </Button>
                          <div>
                            <p className={`${task.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>
                              {task.task}
                            </p>
                            <p className="text-sm text-muted-foreground">{task.date}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="notes" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-luxury-dark">Session Notes</h3>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" className="bg-luxury-pink hover:bg-luxury-pink/90">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Note
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Session Note</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Textarea placeholder="Session notes..." rows={6} />
                        <Button className="w-full bg-luxury-pink hover:bg-luxury-pink/90">
                          Save Note
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                
                {notes.map((note) => (
                  <Card key={note.id}>
                    <CardContent className="pt-6">
                      <p className="text-foreground mb-2">{note.content}</p>
                      <p className="text-sm text-muted-foreground">{note.date}</p>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="files" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-luxury-dark">Client Files</h3>
                  <Button size="sm" className="bg-luxury-pink hover:bg-luxury-pink/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Upload File
                  </Button>
                </div>
                
                {files.map((file) => (
                  <Card key={file.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <FileText className="w-5 h-5 text-luxury-pink" />
                          <div>
                            <p className="font-medium">{file.name}</p>
                            <p className="text-sm text-muted-foreground">{file.type} • {file.date}</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClientProfile