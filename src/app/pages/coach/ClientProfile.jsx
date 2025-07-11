"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Button } from "@/app/components/ui/button"
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
  TrendingUp,
  Target,
  Clock,
  Star,
  Send,
  CalendarIcon,
  Upload,
  Download,
  X
} from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/app/components/ui/dialog"
import { Input } from "@/app/components/ui/input"
import { Textarea } from "@/app/components/ui/textarea"
import { Label } from "@/app/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/app/components/ui/popover"
import { Calendar as CalendarComponent } from "@/app/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/app/lib/utils"
import { useToast } from "@/app/hooks/use-toast"

const ClientProfile = () => {
  const params = useParams()
  const id = params.id
  const router = useRouter()
  const { toast } = useToast()

  // State management
  const [tasks, setTasks] = useState([
    { id: 1, task: "Meditate 30 min", completed: true, date: "Today" },
    { id: 2, task: "Call parent", completed: true, date: "Yesterday" },
    { id: 3, task: "Call friend", completed: false, date: "Tomorrow" }
  ])
  
  const [notes, setNotes] = useState([
    { id: 1, content: "Client showing great progress with daily meditation", date: "2 days ago" },
    { id: 2, content: "Discussed family relationships in today's session", date: "1 week ago" }
  ])
  
  const [files, setFiles] = useState([
    { id: 1, name: "Progress Assessment", type: "PDF", date: "1 week ago" },
    { id: 2, name: "Goal Setting Worksheet", type: "DOC", date: "2 weeks ago" }
  ])

  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: "client", message: "Hi! How are you doing today?", time: "10:30 AM" },
    { id: 2, sender: "coach", message: "Hello! I'm doing great, thank you. How about you?", time: "10:32 AM" },
    { id: 3, sender: "client", message: "I've been working on the meditation exercises you gave me", time: "10:35 AM" }
  ])

  const [newMessage, setNewMessage] = useState("")
  const [newTask, setNewTask] = useState("")
  const [newTaskDetails, setNewTaskDetails] = useState("")
  const [newNote, setNewNote] = useState("")
  const [sessionDate, setSessionDate] = useState()
  const [sessionTime, setSessionTime] = useState("")
  const [sessionType, setSessionType] = useState("")

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

  // Functions
  const toggleTask = (taskId) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ))
    toast({
      title: "Task Updated",
      description: "Task status has been changed successfully."
    })
  }

  const addTask = () => {
    if (!newTask.trim()) return
    
    const task = {
      id: tasks.length + 1,
      task: newTask,
      completed: false,
      date: "Today"
    }
    setTasks(prev => [...prev, task])
    setNewTask("")
    setNewTaskDetails("")
    toast({
      title: "Task Added",
      description: "New task has been created successfully."
    })
  }

  const addNote = () => {
    if (!newNote.trim()) return
    
    const note = {
      id: notes.length + 1,
      content: newNote,
      date: "Just now"
    }
    setNotes(prev => [note, ...prev])
    setNewNote("")
    toast({
      title: "Note Added",
      description: "Session note has been saved successfully."
    })
  }

  const sendMessage = () => {
    if (!newMessage.trim()) return
    
    const message = {
      id: chatMessages.length + 1,
      sender: "coach",
      message: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    setChatMessages(prev => [...prev, message])
    setNewMessage("")
  }

  const scheduleSession = () => {
    if (!sessionDate || !sessionTime || !sessionType) {
      toast({
        title: "Missing Information",
        description: "Please fill in all session details.",
        variant: "destructive"
      })
      return
    }
    
    toast({
      title: "Session Scheduled",
      description: `${sessionType} session scheduled for ${format(sessionDate, "PPP")} at ${sessionTime}.`
    })
    setSessionDate(undefined)
    setSessionTime("")
    setSessionType("")
  }

  return (
    <div className="min-h-screen bg-luxury-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button 
            variant="ghost" 
            onClick={() => router.push("/coach/clients")}
            className="mr-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Clients
          </Button>
          <h1 className="text-3xl font-bold text-luxury-dark">Client Profile</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Client Info Card */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <div className="text-center">
                <div className="w-20 h-20 bg-luxury-pink/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-luxury-pink">
                    {client.avatar}
                  </span>
                </div>
                <CardTitle className="text-luxury-dark">{client.name}</CardTitle>
                <p className="text-muted-foreground">Last login: {client.lastActive}</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{client.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{client.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <User className="w-4 h-4 text-muted-foreground" />
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  {client.status}
                </Badge>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">Member since {client.created}</span>
              </div>
              
              <div className="pt-4 space-y-2">
                <Button className="w-full bg-luxury-pink hover:bg-luxury-pink/90">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Message Client
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      Schedule Session
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Schedule New Session</DialogTitle>
                      <DialogDescription>
                        Choose a date and time for your session with {client.name}.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Session Type</Label>
                        <select 
                          className="w-full p-2 border rounded-md"
                          value={sessionType}
                          onChange={(e) => setSessionType(e.target.value)}
                        >
                          <option value="">Select session type</option>
                          <option value="1-on-1 Coaching">1-on-1 Coaching</option>
                          <option value="Follow-up">Follow-up</option>
                          <option value="Goal Setting">Goal Setting</option>
                          <option value="Progress Review">Progress Review</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label>Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !sessionDate && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {sessionDate ? format(sessionDate, "PPP") : "Pick a date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <CalendarComponent
                              mode="single"
                              selected={sessionDate}
                              onSelect={setSessionDate}
                              disabled={(date) => date < new Date()}
                              initialFocus
                              className={cn("p-3 pointer-events-auto")}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="space-y-2">
                        <Label>Time</Label>
                        <Input
                          type="time"
                          value={sessionTime}
                          onChange={(e) => setSessionTime(e.target.value)}
                        />
                      </div>
                      <Button 
                        onClick={scheduleSession}
                        className="w-full bg-luxury-pink hover:bg-luxury-pink/90"
                      >
                        Schedule Session
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>

          {/* Main Content - Box Layout */}
          <div className="lg:col-span-3 space-y-6">
            {/* Chat Box */}
            <Card>
              <CardHeader>
                <CardTitle className="text-luxury-dark flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Chat with {client.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="h-48 overflow-y-auto space-y-3 p-3 bg-muted/20 rounded-lg">
                    {chatMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.sender === 'coach' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs px-3 py-2 rounded-lg ${
                            msg.sender === 'coach'
                              ? 'bg-luxury-pink text-white'
                              : 'bg-white border'
                          }`}
                        >
                          <p className="text-sm">{msg.message}</p>
                          <p className="text-xs opacity-70 mt-1">{msg.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    />
                    <Button 
                      onClick={sendMessage}
                      className="bg-luxury-pink hover:bg-luxury-pink/90"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Progress & Stats Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Progress Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-luxury-dark flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Progress Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48 flex items-end justify-center space-x-4">
                    {progressData.map((item, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div
                          className="bg-luxury-pink rounded-t-sm w-12 transition-all hover:bg-luxury-pink/80"
                          style={{ height: `${item.value * 1.5}px` }}
                        />
                        <span className="text-xs text-muted-foreground mt-2">{item.month}</span>
                        <span className="text-xs text-luxury-dark font-medium">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="pt-6 text-center">
                    <Target className="w-6 h-6 text-luxury-pink mx-auto mb-2" />
                    <div className="text-xl font-bold text-luxury-pink mb-1">85%</div>
                    <div className="text-xs text-muted-foreground">Goal Completion</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 text-center">
                    <Clock className="w-6 h-6 text-luxury-gold mx-auto mb-2" />
                    <div className="text-xl font-bold text-luxury-gold mb-1">12</div>
                    <div className="text-xs text-muted-foreground">Sessions</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 text-center">
                    <Star className="w-6 h-6 text-luxury-dark mx-auto mb-2" />
                    <div className="text-xl font-bold text-luxury-dark mb-1">4.9</div>
                    <div className="text-xs text-muted-foreground">Rating</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 text-center">
                    <span className="text-2xl mb-2 block">{client.mood}</span>
                    <div className="text-xs text-muted-foreground">Current Mood</div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Tasks Box */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-luxury-dark flex items-center">
                    <Check className="w-5 h-5 mr-2" />
                    Recent Tasks
                  </CardTitle>
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
                        <DialogDescription>
                          Create a new task for {client.name} to complete.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Task Description</Label>
                          <Input 
                            placeholder="e.g. Meditate 30 minutes"
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Task Details (Optional)</Label>
                          <Textarea 
                            placeholder="Additional details or instructions"
                            value={newTaskDetails}
                            onChange={(e) => setNewTaskDetails(e.target.value)}
                          />
                        </div>
                        <Button 
                          onClick={addTask}
                          className="w-full bg-luxury-pink hover:bg-luxury-pink/90"
                          disabled={!newTask.trim()}
                        >
                          Create Task
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {tasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="p-1"
                          onClick={() => toggleTask(task.id)}
                        >
                          {task.completed ? (
                            <Check className="w-4 h-4 text-green-500" />
                          ) : (
                            <div className="w-4 h-4 border-2 border-muted-foreground rounded" />
                          )}
                        </Button>
                        <div>
                          <p className={`text-sm ${task.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>
                            {task.task}
                          </p>
                          <p className="text-xs text-muted-foreground">{task.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Notes and Files Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Notes Box */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-luxury-dark flex items-center text-lg">
                      <FileText className="w-5 h-5 mr-2" />
                      Session Notes
                    </CardTitle>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" className="bg-luxury-pink hover:bg-luxury-pink/90">
                          <Plus className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add Session Note</DialogTitle>
                          <DialogDescription>
                            Record notes from your session with {client.name}.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>Session Notes</Label>
                            <Textarea 
                              placeholder="Enter your session notes here..."
                              rows={6}
                              value={newNote}
                              onChange={(e) => setNewNote(e.target.value)}
                            />
                          </div>
                          <Button 
                            onClick={addNote}
                            className="w-full bg-luxury-pink hover:bg-luxury-pink/90"
                            disabled={!newNote.trim()}
                          >
                            Save Note
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-48 overflow-y-auto">
                    {notes.map((note) => (
                      <div key={note.id} className="p-3 bg-muted/30 rounded-lg">
                        <p className="text-sm text-foreground mb-1">{note.content}</p>
                        <p className="text-xs text-muted-foreground">{note.date}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Files Box */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-luxury-dark flex items-center text-lg">
                      <FileText className="w-5 h-5 mr-2" />
                      Client Files
                    </CardTitle>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" className="bg-luxury-pink hover:bg-luxury-pink/90">
                          <Upload className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Upload File</DialogTitle>
                          <DialogDescription>
                            Upload a file for {client.name}.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>File Name</Label>
                            <Input placeholder="Enter file name" />
                          </div>
                          <div className="space-y-2">
                            <Label>File</Label>
                            <Input type="file" />
                          </div>
                          <Button className="w-full bg-luxury-pink hover:bg-luxury-pink/90">
                            <Upload className="w-4 h-4 mr-2" />
                            Upload File
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-48 overflow-y-auto">
                    {files.map((file) => (
                      <div key={file.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileText className="w-4 h-4 text-luxury-pink" />
                          <div>
                            <p className="text-sm font-medium">{file.name}</p>
                            <p className="text-xs text-muted-foreground">{file.type} • {file.date}</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClientProfile