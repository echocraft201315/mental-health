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
  X,
  Film,
  Image as ImageIcon
} from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/app/components/ui/dialog"
import { Input } from "@/app/components/ui/input"
import { Textarea } from "@/app/components/ui/textarea"
import { Label } from "@/app/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/app/components/ui/popover"
import { Calendar as CalendarComponent } from "@/app/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/app/lib/utils"
import { toast } from "sonner";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"


const ClientProfile = () => {
  const params = useParams()
  const id = params.id
  const router = useRouter()

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
  
  // 1. Update files state to include type: 'video', 'image', 'article', etc.
  // 2. Compute file counts by category.
  // 3. Render summary lines for each category.
  // 4. Add a modal for 'View all' to show detailed file items.
  const [files, setFiles] = useState([
    { id: 1, name: "Progress Assessment", type: "article", date: "1 week ago" },
    { id: 2, name: "Goal Setting Worksheet", type: "article", date: "2 weeks ago" },
    { id: 3, name: "Breathing Exercise", type: "video", date: "3 days ago" },
    { id: 4, name: "Session Recording", type: "video", date: "5 days ago" },
    { id: 5, name: "Mood Chart", type: "image", date: "1 day ago" },
    { id: 6, name: "Progress Photo", type: "image", date: "2 days ago" }
  ])

  // File category labels
  const fileCategoryLabels = {
    video: "videos",
    image: "images",
    article: "articles"
  }

  // File category icons
  const fileCategoryIcons = {
    video: <Film className="w-4 h-4 text-blue-500 mr-2" />,
    image: <ImageIcon className="w-4 h-4 text-green-500 mr-2" />,
    article: <FileText className="w-4 h-4 text-purple-500 mr-2" />
  }

  // Count files by category
  const fileCategoryCounts = files.reduce((acc, file) => {
    acc[file.type] = (acc[file.type] || 0) + 1
    return acc
  }, {})

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

  // State for Show All modals
  const [showAllTasks, setShowAllTasks] = useState(false)
  const [showAllFiles, setShowAllFiles] = useState(false)

  // Task counts
  const totalTasks = tasks.length
  const completedTasks = tasks.filter(t => t.completed).length
  const pendingTasks = totalTasks - completedTasks

  // File counts by type
  const totalFiles = files.length
  const fileTypeCounts = files.reduce((acc, file) => {
    acc[file.type] = (acc[file.type] || 0) + 1
    return acc
  }, {})

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
    <div className="min-h-screen bg-gradient-gentle-neutral bg-pattern-subtle p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button 
            variant="ghost" 
            onClick={() => router.push("/coach/clients")}
            className="mr-4 bg-gradient-gentle-neutral/50 hover:bg-gradient-gentle-primary/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Clients
          </Button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {client.name}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Profile Card */}
            <Card className="bg-gradient-card shadow-soft border-0">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-gentle-primary rounded-full flex items-center justify-center shadow-soft">
                    <span className="text-white font-bold text-xl">{client.avatar}</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{client.name}</h2>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="secondary" className="bg-gradient-gentle-secondary/20 text-foreground">
                        {client.status}
                      </Badge>
                      <span className="text-2xl">{client.mood}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
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
                    <span className="text-sm">{client.type}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Created {client.created}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Progress Chart */}
            <Card className="bg-gradient-card shadow-soft border-0">
              <CardHeader>
                <CardTitle>Progress Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-56 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={progressData} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                      <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="#7c3aed" strokeWidth={3} dot={{ r: 5, fill: '#6366f1' }} activeDot={{ r: 7 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center mt-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-gradient-gentle-primary rounded"></div>
                    <span className="text-sm text-muted-foreground">Progress Score</span>
                  </div>
                </div>
              </CardContent>
            </Card>

   {/* Notes */}
   <Card className="bg-gradient-card shadow-soft border-0">
              <CardHeader>
              <div className="flex items-center justify-between">
                  <CardTitle>Notes</CardTitle>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="bg-gradient-gentle-neutral/50 hover:bg-gradient-gentle-primary/20 flex items-center gap-1 px-3 font-medium"
                  >
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">Add Note</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4">
                  {notes.slice(0, 2).map((note) => (
                    <button
                      key={note.id}
                      className="w-full text-left p-3 rounded-lg border border-gray-200 shadow-sm bg-gradient-gentle-neutral/20 hover:bg-gradient-gentle-primary/10 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/40"
                      type="button"
                      // onClick={() => handleNoteClick(note)} // Placeholder for future click handler
                    >
                      <p className="text-sm">{note.content}</p>
                      <p className="text-xs text-muted-foreground mt-1">{note.date}</p>
                    </button>
                  ))}
                </div>
                
              </CardContent>
            </Card>

            {/* Tasks */}
            <Card className="bg-gradient-card shadow-soft border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Tasks</CardTitle>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="bg-gradient-gentle-neutral/50 hover:bg-gradient-gentle-primary/20 flex items-center gap-1 px-3 font-medium"
                  >
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">Add Task</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {tasks.slice(0, 3).map((task) => (
                    <div key={task.id} className="flex items-center space-x-3 p-3 bg-gradient-gentle-neutral/20 rounded-lg hover:bg-gradient-gentle-neutral/30 transition-all duration-300">
                      <button
                        onClick={() => toggleTask(task.id)}
                        className="focus:outline-none"
                      >
                        {task.completed ? (
                          <Check className="w-5 h-5 text-green-500" />
                        ) : (
                          <div className="w-5 h-5 border-2 border-muted-foreground rounded-full" />
                        )}
                      </button>
                      <span className={`flex-1 ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                        {task.task}
                      </span>
                      <span className="text-xs text-muted-foreground">{task.date}</span>
                    </div>
                  ))}
                </div>

              </CardContent>
            </Card>

            {/* Chat Card */}
            <Card className="bg-gradient-card shadow-soft border-0">
              <CardHeader>
                <CardTitle>Chat</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {chatMessages.slice(-3).map((msg) => (
                    <div key={msg.id} className="flex items-start space-x-3 p-3 bg-gradient-gentle-neutral/20 rounded-lg">
                      <span className={`font-semibold text-xs ${msg.sender === 'coach' ? 'text-blue-600' : 'text-purple-600'}`}>{msg.sender === 'coach' ? 'Coach' : 'Client'}</span>
                      <span className="flex-1 text-sm">{msg.message}</span>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">{msg.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Files */}
            <Card className="bg-gradient-card shadow-soft border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Files & Documents</CardTitle>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="bg-gradient-gentle-neutral/50 hover:bg-gradient-gentle-primary/20 flex items-center gap-1 px-3 font-medium"
                  >
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">Add File</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(fileCategoryCounts).map(([type, count]) => (
                    <div key={type} className="flex items-center justify-between p-2 rounded bg-gradient-gentle-neutral/20">
                      <span className="flex items-center text-sm font-medium">
                        {fileCategoryIcons[type]}
                        {count} {fileCategoryLabels[type] || type + 's'}
                      </span>
                    </div>
                  ))}
                </div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="mt-4 w-full bg-gradient-gentle-neutral/50 hover:bg-gradient-gentle-primary/20"
                  onClick={() => setShowAllFiles(true)}
                >
                  View all
                </Button>
                {/* Modal for all files */}
                {showAllFiles && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
                      <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700" onClick={() => setShowAllFiles(false)}>
                        <X className="w-5 h-5" />
                      </button>
                      <h2 className="text-lg font-bold mb-4">All Files</h2>
                      <div className="space-y-3 max-h-80 overflow-y-auto">
                        {files.map(file => (
                          <div key={file.id} className="flex items-center justify-between p-3 border rounded-lg bg-gradient-gentle-neutral/10">
                            <div>
                              <p className="text-sm font-medium">{file.name}</p>
                              <p className="text-xs text-muted-foreground">{file.date}</p>
                            </div>
                            <Badge variant="secondary" className="bg-gradient-gentle-accent/20 text-foreground">
                              {fileCategoryLabels[file.type] ? file.type.charAt(0).toUpperCase() + file.type.slice(1) : file.type}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

        </div>
      </div>
    </div>
  )
}

export default ClientProfile