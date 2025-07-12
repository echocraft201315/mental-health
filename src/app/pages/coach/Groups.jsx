"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Button } from "@/app/components/ui/button"
import { Calendar, Users, Plus } from "lucide-react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/app/components/ui/dialog";
import { useState } from "react";

const mockClients = [
  { id: 1, name: "Alice Smith", avatar: "🧑‍🦰" },
  { id: 2, name: "Bob Johnson", avatar: "🧑‍🦱" },
  { id: 3, name: "Charlie Rose", avatar: "🧑‍🦳" },
  { id: 4, name: "Dana Lee", avatar: "🧑‍🦲" },
];

function CreateGroupDialog({ onCreate }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [selectedClients, setSelectedClients] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const filteredClients = mockClients.filter(
    c => c.name.toLowerCase().includes(search.toLowerCase()) && !selectedClients.some(s => s.id === c.id)
  );

  const handleAddClient = (client) => {
    setSelectedClients([...selectedClients, client]);
    setSearch("");
  };
  const handleRemoveClient = (id) => {
    setSelectedClients(selectedClients.filter(c => c.id !== id));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!name.trim()) {
      setError("Group name is required.");
      return;
    }
    if (selectedClients.length === 0) {
      setError("Please add at least one client.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
      setName("");
      setDesc("");
      setSelectedClients([]);
      if (onCreate) onCreate({ name, desc, clients: selectedClients });
    }, 1200);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-gentle-primary hover:bg-gradient-gentle-secondary">
          <Plus className="w-4 h-4 mr-2" />
          Create Group
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gradient-card shadow-soft border-0">
        <DialogHeader>
          <DialogTitle>Create New Group</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new group and add clients.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Group Name <span className="text-destructive">*</span></label>
            <input
              className="w-full border-0 bg-gradient-gentle-neutral/30 rounded-lg px-3 py-2 shadow-soft focus:outline-none focus:border-2 focus:border-blue-600 focus:shadow-lg selection:bg-blue-200 selection:text-blue-900"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              placeholder="Enter group name"
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              className="w-full border-0 bg-gradient-gentle-neutral/30 rounded-lg px-3 py-2 shadow-soft focus:outline-none focus:border-2 focus:border-blue-600 focus:shadow-lg selection:bg-blue-200 selection:text-blue-900"
              value={desc}
              onChange={e => setDesc(e.target.value)}
              placeholder="Optional group description"
              rows={2}
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Add Clients <span className="text-destructive">*</span></label>
            <input
              className="w-full border-0 bg-gradient-gentle-neutral/30 rounded-lg px-3 py-2 mb-2 shadow-soft focus:outline-none focus:border-2 focus:border-blue-600 focus:shadow-lg selection:bg-blue-200 selection:text-blue-900"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search clients..."
              disabled={loading}
            />
            <div className="flex flex-wrap gap-2 mb-2">
              {selectedClients.map(client => (
                <span key={client.id} className="flex items-center bg-gradient-gentle-primary/20 text-foreground rounded-full px-3 py-1 text-xs">
                  <span className="mr-1">{client.avatar}</span>{client.name}
                  <button type="button" className="ml-2 text-destructive hover:text-destructive-foreground" onClick={() => handleRemoveClient(client.id)} disabled={loading}>&times;</button>
                </span>
              ))}
            </div>
            {filteredClients.length > 0 && search && (
              <div className="border-0 bg-gradient-gentle-neutral/20 rounded-lg shadow-soft max-h-32 overflow-y-auto">
                {filteredClients.map(client => (
                  <div
                    key={client.id}
                    className="px-3 py-2 hover:bg-gradient-gentle-primary/20 cursor-pointer flex items-center transition-all duration-300"
                    onClick={() => handleAddClient(client)}
                  >
                    <span className="mr-2">{client.avatar}</span>{client.name}
                  </div>
                ))}
              </div>
            )}
          </div>
          {error && <div className="text-destructive text-sm">{error}</div>}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading} className="bg-gradient-gentle-neutral/50 hover:bg-gradient-gentle-primary/20">
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-gentle-primary hover:bg-gradient-gentle-secondary" disabled={loading}>
              {loading ? <span className="animate-spin mr-2">⏳</span> : <Plus className="w-4 h-4 mr-2" />}
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

const Groups = () => {
  const router = useRouter()
  const groups = [
    {
      id: 1,
      name: "Anxiety Support Group",
      members: 8,
      memberAvatars: ["😊", "😐", "😊", "😔", "😊", "😐", "😊", "😐"],
      nextSession: "1 June",
      description: "Weekly support group for anxiety management"
    },
    {
      id: 2,
      name: "Stress Management",
      members: 6,
      memberAvatars: ["😊", "😐", "😊", "😔", "😊", "😐"],
      nextSession: "15 June",
      description: "Techniques for managing daily stress"
    },
    {
      id: 3,
      name: "Mindfulness Practice",
      members: 10,
      memberAvatars: ["😊", "😐", "😊", "😔", "😊", "😐", "😊", "😐", "😊", "😐"],
      nextSession: "30 June",
      description: "Daily mindfulness and meditation practice"
    },
    {
      id: 4,
      name: "Goal Setting Workshop",
      members: 5,
      memberAvatars: ["😊", "😐", "😊", "😔", "😊"],
      nextSession: "8 July",
      description: "Setting and achieving personal goals"
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-gentle-neutral bg-pattern-subtle p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Groups
          </h1>
          <CreateGroupDialog onCreate={(group) => {/* TODO: handle new group */}} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {groups.map((group) => (
            <Card key={group.id} className="hover:shadow-medium transition-all duration-300 cursor-pointer bg-gradient-card shadow-soft border-0" onClick={() => router.push(`/coach/groups/${group.id}`)}>
              <CardHeader>
                <CardTitle className="text-lg">{group.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{group.description}</p>
              </CardHeader>
              <CardContent>
                {/* Member Avatars */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {group.memberAvatars.slice(0, 6).map((avatar, index) => (
                      <div key={index} className="w-8 h-8 bg-gradient-gentle-primary rounded-full flex items-center justify-center text-sm shadow-soft">
                        {avatar}
                      </div>
                    ))}
                    {group.members > 6 && (
                      <div className="w-8 h-8 bg-gradient-gentle-neutral rounded-full flex items-center justify-center text-xs font-medium shadow-soft">
                        +{group.members - 6}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>{group.members} members</span>
                  </div>
                </div>
                
                {/* Next Session */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Next: {group.nextSession}</span>
                  </div>
                  <Badge variant="secondary" className="bg-gradient-gentle-secondary/20 text-foreground">
                    Active
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Groups

