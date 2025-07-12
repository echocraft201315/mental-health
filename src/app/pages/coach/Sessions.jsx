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
  Trash,
  Send
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
  // Don't render if session is null
  if (!session) return null;
  
  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <div className="bg-gradient-to-r from-blue-400 to-purple-400 p-[2px] rounded-2xl shadow-2xl">
        <DialogContent className="bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 border-0 rounded-2xl shadow-2xl p-0">
          <DialogHeader className="px-8 pt-8 pb-2">
            <DialogTitle className="text-2xl font-bold text-blue-900 flex items-center gap-2"><Eye className="w-6 h-6 text-blue-400" /> Session Details</DialogTitle>
          </DialogHeader>
          <div className="px-8 pb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <div className="font-semibold text-blue-700 mb-1 flex items-center gap-2"><CalendarIcon className="w-4 h-4" /> Date & Time</div>
                <div className="bg-white/70 rounded-lg p-3 mb-2 flex items-center gap-2"><span>{session.date}</span><span className="text-muted-foreground">{session.time}</span></div>
                <div className="font-semibold text-blue-700 mb-1 flex items-center gap-2"><Users className="w-4 h-4" /> Type</div>
                <div className="bg-white/70 rounded-lg p-3 mb-2 flex items-center gap-2"><span>{session.type}</span></div>
                <div className="font-semibold text-blue-700 mb-1 flex items-center gap-2"><User className="w-4 h-4" /> Client/Group</div>
                <div className="bg-white/70 rounded-lg p-3 mb-2 flex items-center gap-2"><span>{session.client}</span></div>
              </div>
              <div>
                <div className="font-semibold text-blue-700 mb-1 flex items-center gap-2"><Badge className="bg-gradient-gentle-secondary/20 text-foreground" /> Status</div>
                <div className="bg-white/70 rounded-lg p-3 mb-2 flex items-center gap-2"><span>{session.status}</span></div>
                <div className="font-semibold text-blue-700 mb-1 flex items-center gap-2">Mood</div>
                <div className="bg-white/70 rounded-lg p-3 mb-2 flex items-center gap-2 text-2xl">{session.mood}</div>
              </div>
            </div>
            <div className="border-b border-blue-100 my-4" />
            <div className="font-semibold text-blue-700 mb-2 flex items-center gap-2"><MessageCircle className="w-4 h-4" /> Notes</div>
            <div className="bg-white/70 rounded-lg p-4 text-muted-foreground mb-6">Session notes and resources...</div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={onClose} className="bg-gradient-gentle-neutral/50 hover:bg-gradient-gentle-primary/20">Close</Button>
            </div>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
}

function SessionEditModal({ session, open, onClose }) {
  const [date, setDate] = useState(session?.date || "");
  const [time, setTime] = useState(session?.time || "");
  
  // Don't render if session is null
  if (!session) return null;
  
  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <div className="bg-gradient-to-r from-blue-400 to-purple-400 p-[2px] rounded-2xl shadow-2xl">
        <DialogContent className="bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 border-0 rounded-2xl shadow-2xl p-0">
          <DialogHeader className="px-8 pt-8 pb-2">
            <DialogTitle className="text-2xl font-bold text-blue-900 flex items-center gap-2"><Edit className="w-6 h-6 text-blue-400" /> Edit Session</DialogTitle>
          </DialogHeader>
          <div className="px-8 pb-8">
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input 
                  type="date" 
                  className="w-full border-0 bg-white/90 rounded-lg px-3 py-2 shadow-soft focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none" 
                  value={date} 
                  onChange={e => setDate(e.target.value)} 
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Time</label>
                <input 
                  type="time" 
                  className="w-full border-0 bg-white/90 rounded-lg px-3 py-2 shadow-soft focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none" 
                  value={time} 
                  onChange={e => setTime(e.target.value)} 
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={onClose} className="bg-gradient-gentle-neutral/50 hover:bg-gradient-gentle-primary/20">Cancel</Button>
                <Button type="submit" className="bg-gradient-gentle-primary hover:bg-gradient-gentle-secondary">Save</Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
}

function SessionDeleteModal({ session, open, onClose, onDelete }) {
  // Don't render if session is null
  if (!session) return null;
  
  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <div className="bg-gradient-to-r from-blue-400 to-purple-400 p-[2px] rounded-2xl shadow-2xl">
        <DialogContent className="bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 border-0 rounded-2xl shadow-2xl p-0">
          <DialogHeader className="px-8 pt-8 pb-2">
            <DialogTitle className="text-2xl font-bold text-blue-900 flex items-center gap-2"><Trash className="w-6 h-6 text-blue-400" /> Delete Session?</DialogTitle>
          </DialogHeader>
          <div className="px-8 pb-8">
            <div className="mb-4 p-3 bg-gradient-gentle-warm/20 rounded-lg">
              Are you sure you want to delete this session? This action cannot be undone.
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={onClose} className="bg-gradient-gentle-neutral/50 hover:bg-gradient-gentle-primary/20">Cancel</Button>
              <Button variant="destructive" onClick={() => { onDelete(session.id); onClose(); }} className="bg-gradient-gentle-warm hover:bg-gradient-gentle-warm/90">
                Delete
              </Button>
            </div>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
}

function SessionChatModal({ session, open, onClose }) {
  const [messages, setMessages] = useState([
    { id: 1, sender: "Coach", text: "Welcome to the session chat!", time: "09:00" },
    { id: 2, sender: session?.type === "Group" ? "Alice" : session?.client, text: "Thank you!", time: "09:01" },
  ]);
  const [input, setInput] = useState("");
  
  // Don't render if session is null
  if (!session) return null;
  
  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { id: messages.length + 1, sender: "Coach", text: input, time: "09:02" }]);
      setInput("");
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <div className="bg-gradient-to-r from-blue-400 to-purple-400 p-[2px] rounded-2xl shadow-2xl">
        <DialogContent className="bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 border-0 rounded-2xl shadow-2xl p-0">
          <DialogHeader className="px-8 pt-8 pb-2">
            <DialogTitle className="text-2xl font-bold text-blue-900 flex items-center gap-2"><MessageCircle className="w-6 h-6 text-blue-400" /> Chat - {session.type === "Group" ? session.client : session.client}</DialogTitle>
          </DialogHeader>
          <div className="px-8 pb-8">
            <div className="h-64 overflow-y-auto bg-gradient-gentle-neutral/20 rounded-lg p-4 mb-4 flex flex-col gap-3">
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.sender === "Coach" ? "justify-end" : "justify-start"}`}>
                  <div className={`rounded-xl px-4 py-2 max-w-xs shadow-soft text-sm flex flex-col ${msg.sender === "Coach" ? "bg-gradient-to-r from-blue-400 to-blue-600 text-white" : "bg-white/90 text-blue-900 border border-blue-100"}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <User className="w-4 h-4 text-blue-400" />
                      <span className="font-semibold">{msg.sender}</span>
                    </div>
                    <div>{msg.text}</div>
                    <div className="text-[10px] text-muted-foreground mt-1 text-right">{msg.time}</div>
                  </div>
                </div>
              ))}
            </div>
            <form className="flex gap-2 mt-2" onSubmit={e => { e.preventDefault(); handleSend(); }}>
              <input
                className="flex-1 border-0 bg-white/90 rounded-lg px-3 py-2 shadow-soft focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none"
                placeholder="Type a message..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter") handleSend(); }}
              />
              <Button type="submit" className="bg-gradient-gentle-primary hover:bg-gradient-gentle-secondary flex items-center gap-1 px-4">
                <Send className="w-4 h-4" />
                Send
              </Button>
            </form>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={onClose} className="bg-gradient-gentle-neutral/50 hover:bg-gradient-gentle-primary/20">Close</Button>
            </div>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
}

function ScheduleSessionModal({ open, onClose }) {
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <div className="rounded-2xl">
        <DialogContent className="bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 border-0 rounded-2xl shadow-2xl p-0">
          <DialogHeader className="px-8 pt-8 pb-2">
            <DialogTitle className="text-2xl font-bold text-blue-900 flex items-center gap-2"><Plus className="w-6 h-6 text-blue-400" /> Schedule New Session</DialogTitle>
          </DialogHeader>
          <div className="px-8 pb-8">
            <form className="space-y-4">
              <select 
                className="w-full border-0 bg-gradient-gentle-neutral/30 rounded-lg px-3 py-2 shadow-soft" 
                value={type} 
                onChange={e => setType(e.target.value)}
              >
                <option value="">Select Group or Client...</option>
                <option value="Group 3">Group 3</option>
                <option value="1-1">1-1</option>
              </select>
              <input 
                type="date" 
                className="w-full border-0 bg-gradient-gentle-neutral/30 rounded-lg px-3 py-2 shadow-soft" 
                value={date} 
                onChange={e => setDate(e.target.value)} 
              />
              <input 
                type="time" 
                className="w-full border-0 bg-gradient-gentle-neutral/30 rounded-lg px-3 py-2 shadow-soft" 
                value={time} 
                onChange={e => setTime(e.target.value)} 
              />
              <Button type="submit" className="bg-gradient-gentle-primary hover:bg-gradient-gentle-secondary">
                Schedule
              </Button>
            </form>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={onClose} className="bg-gradient-gentle-neutral/50 hover:bg-gradient-gentle-primary/20">Cancel</Button>
            </div>
          </div>
        </DialogContent>
      </div>
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
  const [chatSession, setChatSession] = useState(null);
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
      date: "2024-05-07",
      client: "Group 1",
      type: "Group",
      time: "16:00",
      status: "Scheduled",
      mood: "😔"
    },
    {
      id: 5,
      date: "2024-05-08",
      client: "1-1",
      type: "Individual",
      time: "11:00",
      status: "Scheduled",
      mood: "😊"
    },
    {
      id: 6,
      date: "2024-05-09",
      client: "Group 2",
      type: "Group",
      time: "15:00",
      status: "Scheduled",
      mood: "😐"
    }
  ]);

  const handleDeleteSession = (sessionId) => {
    setSessions(sessions.filter(s => s.id !== sessionId));
  };

  const SessionCard = ({ session }) => (
    <Card className="bg-gradient-card shadow-soft border-0 hover:shadow-medium transition-all duration-300">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-gradient-gentle-primary rounded-full flex items-center justify-center shadow-soft">
              {session.type === "Group" ? (
                <Users className="w-5 h-5 text-white" />
              ) : (
                <User className="w-5 h-5 text-white" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className="font-medium">{session.client}</span>
                <Badge variant="secondary" className="bg-gradient-gentle-secondary/20 text-foreground">
                  {session.type}
                </Badge>
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <CalendarIcon className="w-4 h-4" />
                  <span>{session.date}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{session.time}</span>
                </div>
                <span className="text-2xl">{session.mood}</span>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button 
              size="sm" 
              variant="ghost" 
              className="p-2 hover:bg-gradient-gentle-primary/20" 
              onClick={() => setViewSession(session)}
            >
              <Eye className="w-4 h-4" />
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              className="p-2 hover:bg-gradient-gentle-primary/20" 
              onClick={() => setEditSession(session)}
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              className="p-2 hover:bg-gradient-gentle-primary/20" 
              onClick={() => setChatSession(session)}
            >
              <MessageCircle className="w-4 h-4" />
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              className="p-2 hover:bg-gradient-gentle-warm/20" 
              onClick={() => setDeleteSession(session)}
            >
              <Trash className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // 1. Compute scheduledDates from sessions
  const scheduledDates = sessions.map(s => new Date(s.date));

  // 2. Calendar modifiers for scheduled days
  const calendarModifiers = {
    scheduled: scheduledDates
  };
  const calendarModifiersClassNames = {
    scheduled: 'bg-gradient-to-r from-blue-400 to-purple-400 !text-blue-900 !text-black font-bold border-2 border-blue-500',
    selected: '!text-blue-900 !text-black font-bold',
  };

  // 3. Calendar onSelect handler
  const handleCalendarSelect = (selectedDate) => {
    setDate(selectedDate);
    const found = sessions.find(s => new Date(s.date).toDateString() === selectedDate?.toDateString());
    if (found) setViewSession(found);
  };

  return (
    <div className="min-h-screen bg-gradient-gentle-neutral bg-pattern-subtle p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Sessions
          </h1>
          <Button 
            className="bg-gradient-gentle-primary hover:bg-gradient-gentle-secondary"
            onClick={() => setScheduleModal(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Schedule Session
          </Button>
        </div>


          {/* Sessions List */}
          <div className="lg:col-span-2">
            <Card className="bg-gradient-card shadow-soft border-0">
              <CardHeader>
                <CardTitle>Upcoming Sessions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {sessions.map((session) => (
                  <SessionCard key={session.id} session={session} />
                ))}
              </CardContent>
            </Card>
          </div>
          
          <div>
          <div className="lg:col-span-1 mt-[20px] flex">
            <Card className="bg-gradient-card shadow-none border-0 w-full max-w-xl mx-auto">
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleCalendarSelect}
                  className="rounded-md border-0 bg-gradient-gentle-neutral/20 text-base min-w-[420px] min-h-[420px]"
                  modifiers={calendarModifiers}
                  modifiersClassNames={calendarModifiersClassNames}
                  style={{ '--cell-size': '56px' }}
                />
              </CardContent>
            </Card>
          </div>
          </div>


      </div>

      {viewSession && (
        <SessionViewModal session={viewSession} open={true} onClose={() => setViewSession(null)} />
      )}
      <SessionEditModal 
        session={editSession} 
        open={!!editSession} 
        onClose={() => setEditSession(null)} 
      />
      <SessionDeleteModal 
        session={deleteSession} 
        open={!!deleteSession} 
        onClose={() => setDeleteSession(null)} 
        onDelete={handleDeleteSession}
      />
      <ScheduleSessionModal 
        open={scheduleModal} 
        onClose={() => setScheduleModal(false)} 
      />
    </div>
  )
}

export default Sessions