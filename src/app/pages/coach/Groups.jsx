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
        <Button className="bg-luxury-pink hover:bg-luxury-pink/90">
          <Plus className="w-4 h-4 mr-2" />
          Create Group
        </Button>
      </DialogTrigger>
      <DialogContent>
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
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-luxury-pink"
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
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-luxury-pink"
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
              className="w-full border rounded-md px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-luxury-pink"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search clients..."
              disabled={loading}
            />
            <div className="flex flex-wrap gap-2 mb-2">
              {selectedClients.map(client => (
                <span key={client.id} className="flex items-center bg-luxury-pink/20 text-luxury-dark rounded-full px-3 py-1 text-xs">
                  <span className="mr-1">{client.avatar}</span>{client.name}
                  <button type="button" className="ml-2 text-destructive hover:text-destructive-foreground" onClick={() => handleRemoveClient(client.id)} disabled={loading}>&times;</button>
                </span>
              ))}
            </div>
            {filteredClients.length > 0 && search && (
              <div className="border rounded-md bg-white shadow-md max-h-32 overflow-y-auto">
                {filteredClients.map(client => (
                  <div
                    key={client.id}
                    className="px-3 py-2 hover:bg-luxury-pink/10 cursor-pointer flex items-center"
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
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>Cancel</Button>
            <Button type="submit" className="bg-luxury-pink hover:bg-luxury-pink/90" disabled={loading}>
              {loading ? <span className="animate-spin mr-2">⏳</span> : <Plus className="w-4 h-4 mr-2" />}
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}const Groups = () => {
  const router = useRouter()
  const groups = [
    {
      id: 1,
      name: "Group 1",
      members: 8,
      memberAvatars: ["😊", "😐", "😊", "😔", "😊", "😐", "😊", "😐"],
      nextSession: "1 June",
    },
    {
      id: 2,
      name: "Group 2",
      members: 8,
      memberAvatars: ["😊", "😐", "😊", "😔", "😊", "😐", "😊", "😐"],
      nextSession: "15 June",
    },
    {
      id: 3,
      name: "Group 3",
      members: 8,
      memberAvatars: ["😊", "😐", "😊", "😔", "😊", "😐", "😊", "😐"],
      nextSession: "30 June",
    },
    {
      id: 4,
      name: "Group 4",
      members: 8,
      memberAvatars: ["😊", "😐", "😊", "😔", "😊", "😐", "😊", "😐"],
      nextSession: "8 July",
    },
  ]

  return (
    <div className="min-h-screen bg-luxury-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-luxury-dark">Groups</h1>
          <CreateGroupDialog onCreate={(group) => {/* TODO: handle new group */}} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {groups.map((group) => (
            <Card key={group.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-luxury-dark">{group.name}</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Member Avatars */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {group.memberAvatars.map((avatar, index) => (
                      <div
                        key={index}
                        className="w-8 h-8 bg-luxury-pink/20 rounded-full flex items-center justify-center text-sm"
                      >
                        {avatar}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <Users className="w-4 h-4 inline mr-1" />
                    {group.members} members
                  </p>
                </div>

                {/* Next Session */}
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Next session: {group.nextSession}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => router.push(`/coach/groups/${group.id}`)}
                  >
                    View
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => router.push(`/coach/groups/${group.id}`)}
                  >
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Group Statistics */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-luxury-dark mb-6">Group Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-luxury-pink mb-2">4</div>
                  <div className="text-muted-foreground">Total Groups</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-luxury-gold mb-2">32</div>
                  <div className="text-muted-foreground">Total Members</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-luxury-dark mb-2">8</div>
                  <div className="text-muted-foreground">Avg. Group Size</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Groups

