"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Badge } from "@/app/components/ui/badge"
import { Button } from "@/app/components/ui/button"
import { Search, MoreHorizontal, MessageCircle, Edit, Eye } from "lucide-react"

const Clients = () => {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const clients = [
    { 
      id: 1, 
      name: "John Doe", 
      type: "1-1", 
      status: "Active", 
      mood: "😊", 
      lastActive: "Today", 
      created: "13 Jan 2025" 
    },
    { 
      id: 2, 
      name: "Alex Bob", 
      type: "Group 3", 
      status: "Active", 
      mood: "😐", 
      lastActive: "Yesterday", 
      created: "4 May 2025" 
    },
    { 
      id: 3, 
      name: "John Doe", 
      type: "1-1", 
      status: "Active", 
      mood: "😊", 
      lastActive: "Today", 
      created: "13 Jan 2025" 
    },
    { 
      id: 4, 
      name: "Alex Bob", 
      type: "Group 3", 
      status: "Active", 
      mood: "😔", 
      lastActive: "Yesterday", 
      created: "4 May 2025" 
    },
    { 
      id: 5, 
      name: "John Doe", 
      type: "1-1", 
      status: "Active", 
      mood: "😊", 
      lastActive: "Today", 
      created: "13 Jan 2025" 
    },
    { 
      id: 6, 
      name: "Alex Bob", 
      type: "Group 3", 
      status: "Active", 
      mood: "😊", 
      lastActive: "Yesterday", 
      created: "4 May 2025" 
    },
  ]

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterStatus === "all" || client.status.toLowerCase() === filterStatus)
  )

  return (
    <div className="min-h-screen bg-luxury-background p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-luxury-dark mb-8">Clients</h1>
        
        {/* Search and Filter */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search clients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filterStatus === "all" ? "default" : "outline"}
                  onClick={() => setFilterStatus("all")}
                  className="bg-luxury-pink hover:bg-luxury-pink/90"
                >
                  All
                </Button>
                <Button
                  variant={filterStatus === "active" ? "default" : "outline"}
                  onClick={() => setFilterStatus("active")}
                  className="bg-luxury-pink hover:bg-luxury-pink/90"
                >
                  Active
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Client List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-luxury-dark">Client List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Name</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Type</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Mood</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Last Active</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Created</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClients.map((client) => (
                    <tr key={client.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4">
                        <div 
                          className="flex items-center space-x-3 rounded p-2 -m-2"
                        >
                          <div className="w-8 h-8 bg-luxury-pink/20 rounded-full flex items-center justify-center">
                            <span className="text-luxury-pink font-medium text-sm">
                              {client.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <span className="font-medium">{client.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">{client.type}</td>
                      <td className="py-3 px-4">
                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                          {client.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-xl">{client.mood}</td>
                      <td className="py-3 px-4 text-muted-foreground">{client.lastActive}</td>
                      <td className="py-3 px-4 text-muted-foreground">{client.created}</td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="ghost" className="p-2" onClick={() => router.push(`/coach/clients/${client.id}`)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Clients