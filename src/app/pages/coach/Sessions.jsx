"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Button } from "@/app/components/ui/button"
import { Calendar } from "@/app/components/ui/calendar"
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Users, 
  User, 
  Plus,
  Eye,
  Edit,
  MessageCircle,
  Trash
} from "lucide-react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/app/components/ui/dialog";

function SessionViewModal({ session, open, onClose }) {
  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Session Details</DialogTitle>
        </DialogHeader>
        <div className="mb-4">
          <div><b>Date:</b> {session.date} {session.time}</div>
          <div><b>Type:</b> {session.type}</div>
          <div><b>Client/Group:</b> {session.client}</div>
          <div><b>Status:</b> {session.status}</div>
          <div><b>Mood:</b> {session.mood}</div>
          <div className="mt-2"><b>Members:</b> {session.type === "Group" ? "Alice, Bob, Charlie" : session.client}</div>
          <div className="mt-2"><b>Notes:</b> Session notes and resources...</div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function SessionEditModal({ session, open, onClose }) {
  const [date, setDate] = useState(session.date);
  const [time, setTime] = useState(session.time);
  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Session</DialogTitle>
        </DialogHeader>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input type="date" className="w-full border rounded-md px-3 py-2" value={date} onChange={e => setDate(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Time</label>
            <input type="time" className="w-full border rounded-md px-3 py-2" value={time} onChange={e => setTime(e.target.value)} />
          </div>
          <Button type="submit" className="bg-luxury-pink">Save</Button>
        </form>
        <Button variant="outline" onClick={onClose}>Cancel</Button>
      </DialogContent>
    </Dialog>
  );
}

function SessionDeleteModal({ session, open, onClose, onDelete }) {
  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Session?</DialogTitle>
        </DialogHeader>
        <div className="mb-4">Are you sure you want to delete this session? This action cannot be undone.</div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="destructive" onClick={() => { onDelete(session.id); onClose(); }}>Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function SessionChatModal({ session, open, onClose }) {
  const [messages, setMessages] = useState([
    { id: 1, sender: "Coach", text: "Welcome to the session chat!", time: "09:00" },
    { id: 2, sender: session.type === "Group" ? "Alice" : session.client, text: "Thank you!", time: "09:01" },
  ]);
  const [input, setInput] = useState("");
  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { id: messages.length + 1, sender: "Coach", text: input, time: "09:02" }]);
      setInput("");
    }
  };
  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Chat - {session.type === "Group" ? session.client : session.client}</DialogTitle>
        </DialogHeader>
        <div className="h-64 overflow-y-auto bg-muted rounded-lg p-4 mb-4 flex flex-col gap-2">
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.sender === "Coach" ? "justify-end" : "justify-start"}`}>
              <div className={`rounded-lg px-3 py-2 ${msg.sender === "Coach" ? "bg-luxury-pink text-white" : "bg-white text-luxury-dark border"}`}>
                <div className="text-xs font-semibold mb-1">{msg.sender}</div>
                <div>{msg.text}</div>
                <div className="text-[10px] text-muted-foreground mt-1 text-right">{msg.time}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            className="flex-1 border rounded-md px-3 py-2"
            placeholder="Type a message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") handleSend(); }}
          />
          <Button onClick={handleSend} className="bg-luxury-pink">Send</Button>
        </div>
        <Button variant="outline" onClick={onClose} className="mt-4">Close</Button>
      </DialogContent>
    </Dialog>
  );
}

function ScheduleSessionModal({ open, onClose }) {
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Schedule New Session</DialogTitle>
        </DialogHeader>
        <form className="space-y-4">
          <select className="w-full border rounded-md px-3 py-2" value={type} onChange={e => setType(e.target.value)}>
            <option value="">Select Group or Client...</option>
            <option value="Group 3">Group 3</option>
            <option value="1-1">1-1</option>
          </select>
          <input type="date" className="w-full border rounded-md px-3 py-2" value={date} onChange={e => setDate(e.target.value)} />
          <input type="time" className="w-full border rounded-md px-3 py-2" value={time} onChange={e => setTime(e.target.value)} />
          <Button type="submit" className="bg-luxury-pink">Schedule</Button>
        </form>
        <Button variant="outline" onClick={onClose}>Cancel</Button>
      </DialogContent>
    </Dialog>
  );
}

const Sessions = () => {
  const router = useRouter()
  const [date, setDate] = useState(new Date())
  const [viewMode, setViewMode] = useState("list")
  const [viewSession, setViewSession] = useState(null);
  const [editSession, setEditSession] = useState(null);
  const [deleteSession, setDeleteSession] = useState(null);
  const [scheduleModal, setScheduleModal] = useState(false);
  const [sessions, setSessions] = useState([
    {
      id: 1,
      date: "2024-01-13",
      client: "Group 3",
      type: "Group",
      time: "06:00",
      status: "Scheduled",
      mood: "😊"
    },
    {
      id: 2,
      date: "2024-05-05",
      client: "1-1",
      type: "Individual",
      time: "10:00",
      status: "Scheduled",
      mood: "😐"
    },
    {
      id: 3,
      date: "2024-05-06",
      client: "1-1",
      type: "Individual", 
      time: "14:00",
      status: "Scheduled",
      mood: "😊"
    },
    {
      id: 4,
      date: "2024-05-06",
      client: "1-1",
      type: "Individual",
      time: "14:00", 
      status: "Scheduled",
      mood: "😊"
    }
  ]);
  const monthDays = Array.from({ length: 31 }, (_, i) => i + 1)

  return (
    <div className="min-h-screen bg-luxury-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-luxury-dark">Sessions</h1>
          <div className="flex gap-2">
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              onClick={() => setViewMode("list")}
              className={viewMode === "list" ? "bg-luxury-pink hover:bg-luxury-pink/90" : ""}
            >
              List View
            </Button>
            <Button
              variant={viewMode === "calendar" ? "default" : "outline"}
              onClick={() => setViewMode("calendar")}
              className={viewMode === "calendar" ? "bg-luxury-pink hover:bg-luxury-pink/90" : ""}
            >
              Calendar View
            </Button>
            <Button className="bg-luxury-pink hover:bg-luxury-pink/90" onClick={() => setScheduleModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Schedule Session
            </Button>
          </div>
        </div>
        <ScheduleSessionModal open={scheduleModal} onClose={() => setScheduleModal(false)} />
        {viewMode === "list" ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Upcoming Sessions */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-luxury-dark">Upcoming Sessions This Month</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-[500px] overflow-y-auto">
                    {sessions.map((session) => (
                      <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                        <div className="flex items-center space-x-4">
                          <div className="text-center">
                            <div className="text-sm font-medium text-luxury-dark">{session.date}</div>
                            <div className="text-xs text-muted-foreground">{session.time}</div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {session.type === "Group" ? (
                              <Users className="w-4 h-4 text-muted-foreground" />
                            ) : (
                              <User className="w-4 h-4 text-muted-foreground" />
                            )}
                            <span className="font-medium">{session.client}</span>
                          </div>
                          <div className="text-xl">{session.mood}</div>
                          <Badge variant="secondary" className="bg-green-100 text-green-700">
                            {session.status}
                          </Badge>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="ghost" onClick={() => setViewSession(session)}>
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => setEditSession(session)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => router.push(`/coach/sessions/${session.id}/chat`)}>
                            <MessageCircle className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => setDeleteSession(session)}>
                            <Trash className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Mini Calendar */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-luxury-dark">Calendar</CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          /* Calendar View */
          <Card>
            <CardHeader>
              <CardTitle className="text-luxury-dark flex items-center">
                <CalendarIcon className="w-5 h-5 mr-2" />
                May 2024 - Week/Month View
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                  <div key={day} className="text-center font-medium text-muted-foreground p-2">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {monthDays.map((day) => (
                  <div key={day} className="border rounded-lg p-2 h-24 hover:bg-muted/50">
                    <div className="text-sm font-medium mb-1">{day}</div>
                    {/* Sample sessions on specific days */}
                    {(day === 5 || day === 13 || day === 20) && (
                      <div className="text-xs bg-luxury-pink/20 rounded px-1 py-0.5 mb-1">
                        Session
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
        {viewSession && (
          <SessionViewModal session={viewSession} open={!!viewSession} onClose={() => setViewSession(null)} />
        )}
        {editSession && (
          <SessionEditModal session={editSession} open={!!editSession} onClose={() => setEditSession(null)} />
        )}
        {deleteSession && (
          <SessionDeleteModal session={deleteSession} open={!!deleteSession} onClose={() => setDeleteSession(null)} onDelete={id => setSessions(sessions.filter(s => s.id !== id))} />
        )}
        {/* Session Statistics */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-luxury-dark mb-6">Session Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-luxury-pink mb-2">24</div>
                  <div className="text-muted-foreground">Total Sessions</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-luxury-gold mb-2">18</div>
                  <div className="text-muted-foreground">Completed</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-luxury-dark mb-2">6</div>
                  <div className="text-muted-foreground">Upcoming</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-destructive mb-2">2</div>
                  <div className="text-muted-foreground">Cancelled</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sessions