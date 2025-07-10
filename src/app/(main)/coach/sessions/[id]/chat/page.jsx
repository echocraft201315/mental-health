"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/app/components/ui/dialog";

const mockSession = {
  id: 1,
  client: "Group 3",
  type: "Group",
};

const mockMessages = [
  { id: 1, sender: "Coach", text: "Welcome to the session chat!", time: "09:00" },
  { id: 2, sender: "Alice", text: "Thank you!", time: "09:01" },
  { id: 3, sender: "Bob", text: "Looking forward to it!", time: "09:02" },
];

function ZoomBookingDialog({ open, onClose }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const handleBook = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onClose();
      alert("Zoom call booked!");
    }, 1200);
  };
  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Book Zoom Call</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleBook}>
          <input type="date" className="w-full border rounded-md px-3 py-2" value={date} onChange={e => setDate(e.target.value)} required />
          <input type="time" className="w-full border rounded-md px-3 py-2" value={time} onChange={e => setTime(e.target.value)} required />
          <DialogFooter>
            <Button variant="outline" onClick={onClose} disabled={loading}>Cancel</Button>
            <Button type="submit" className="bg-luxury-pink" disabled={loading}>{loading ? "Booking..." : "Book"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function SessionChatPage() {
  const router = useRouter();
  const [messages, setMessages] = useState(mockMessages);
  const [input, setInput] = useState("");
  const [zoomOpen, setZoomOpen] = useState(false);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([
        ...messages,
        { id: messages.length + 1, sender: "Coach", text: input, time: "09:03" },
      ]);
      setInput("");
    }
  };

  return (
    <div className="min-h-screen bg-luxury-background p-0 flex flex-col items-center w-full">
      <div className="w-full max-w-5xl px-0 sm:px-8">
        <div className="flex justify-between items-center mb-4 mt-8">
          <Button variant="outline" onClick={() => router.back()}>
            ← Back to Sessions
          </Button>
          <Button className="bg-luxury-pink" onClick={() => setZoomOpen(true)}>
            Book Zoom Call
          </Button>
        </div>
        <Card className="w-full shadow-xl">
          <CardHeader>
            <CardTitle>Chat - {mockSession.type === "Group" ? mockSession.client : mockSession.client}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[60vh] overflow-y-auto bg-muted rounded-lg p-4 mb-4 flex flex-col gap-2">
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
          </CardContent>
        </Card>
        <ZoomBookingDialog open={zoomOpen} onClose={() => setZoomOpen(false)} />
      </div>
    </div>
  );
} 