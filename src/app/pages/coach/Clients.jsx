"use client"

import { useState } from "react"
import { useRouter } from "next/router"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Badge } from "@/app/components/ui/badge"
import { Button } from "@/app/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/app/components/ui/tooltip"
import { Search, MoreHorizontal, MessageCircle, Edit, Eye, List, LayoutGrid, StickyNote, Users, User } from "lucide-react"

const Clients = () => {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [viewMode, setViewMode] = useState("list") // "list" or "funnel"

  const clients = [
    { 
      id: 1, 
      name: "John Doe", 
      type: "1-1", 
      status: "Active", 
      stage: "session-booked",
      mood: "😊", 
      lastActive: "Today", 
      created: "13 Jan 2025",
      note: "Very motivated and consistent with exercises"
    },
    { 
      id: 2, 
      name: "Alex Bob", 
      type: "Group", 
      status: "Active", 
      stage: "follow-up",
      mood: "😐", 
      lastActive: "Yesterday", 
      created: "4 May 2025",
      note: "Needs more support with goal setting"
    },
    { 
      id: 3, 
      name: "Sarah Wilson", 
      type: "1-1", 
      status: "Active", 
      stage: "new-lead",
      mood: "😊", 
      lastActive: "Today", 
      created: "13 Jan 2025",
      note: "Interested in stress management coaching"
    },
    { 
      id: 4, 
      name: "Mike Johnson", 
      type: "Group", 
      status: "Active", 
      stage: "completed",
      mood: "😔", 
      lastActive: "Yesterday", 
      created: "4 May 2025",
      note: "Successfully completed 12-week program"
    },
    { 
      id: 5, 
      name: "Emma Davis", 
      type: "1-1", 
      status: "Active", 
      stage: "churned",
      mood: "😊", 
      lastActive: "Today", 
      created: "13 Jan 2025",
      note: "Stopped responding to follow-ups"
    },
    { 
      id: 6, 
      name: "Lisa Brown", 
      type: "Group", 
      status: "Active", 
      stage: "session-booked",
      mood: "😊", 
      lastActive: "Yesterday", 
      created: "4 May 2025",
      note: "Excellent progress with team building"
    },
  ]

  const stages = [
    { id: "new-lead", title: "New Leads", color: "bg-blue-100 border-blue-200" },
    { id: "follow-up", title: "Follow Up", color: "bg-yellow-100 border-yellow-200" },
    { id: "session-booked", title: "Session Booked", color: "bg-green-100 border-green-200" },
    { id: "completed", title: "Completed", color: "bg-purple-100 border-purple-200" },
    { id: "churned", title: "Churned", color: "bg-red-100 border-red-200" }
  ]

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterStatus === "all" || client.status.toLowerCase() === filterStatus)
  )

  const getClientsByStage = (stageId) => {
    return filteredClients.filter(client => client.stage === stageId)
  }

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
                <div className="flex border rounded-lg">
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className={viewMode === "list" ? "bg-luxury-pink hover:bg-luxury-pink/90" : ""}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "funnel" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("funnel")}
                    className={viewMode === "funnel" ? "bg-luxury-pink hover:bg-luxury-pink/90" : ""}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Client Views */}
        {viewMode === "list" ? (
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
                            className="flex items-center space-x-3 cursor-pointer hover:bg-muted/50 rounded p-2 -m-2"
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
                            <Button size="sm" variant="ghost" className="p-2"
                                                        onClick={() => router.push(`/clients/${client.id}`)}
>
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
        ) : (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-luxury-dark">Client Funnel</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <TooltipProvider>
                {stages.map((stage) => {
                  const stageClients = getClientsByStage(stage.id)
                  return (
                    <Card key={stage.id} className={`${stage.color} min-h-[400px]`}>
                      <CardHeader>
                        <CardTitle className="text-center text-sm font-medium">
                          {stage.title}
                        </CardTitle>
                        <div className="text-center text-2xl font-bold text-luxury-dark">
                          {stageClients.length}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {stageClients.map((client) => (
                          <Card 
                            key={client.id} 
                            className="cursor-pointer hover:shadow-md transition-shadow bg-white/50"
                            onClick={() => navigate(`/clients/${client.id}`)}
                          >
                            <CardContent className="p-3">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-2">
                                  <div className="w-6 h-6 bg-luxury-pink/20 rounded-full flex items-center justify-center">
                                    <span className="text-luxury-pink font-medium text-xs">
                                      {client.name.split(' ').map(n => n[0]).join('')}
                                    </span>
                                  </div>
                                  <span className="font-medium text-sm">{client.name}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  {client.type === "Group" ? (
                                    <Users className="w-3 h-3 text-muted-foreground" />
                                  ) : (
                                    <User className="w-3 h-3 text-muted-foreground" />
                                  )}
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <StickyNote className="w-3 h-3 text-muted-foreground hover:text-luxury-pink" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p className="max-w-xs">{client.note}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </div>
                              </div>
                              <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <span>{client.lastActive}</span>
                                <span className="text-lg">{client.mood}</span>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </CardContent>
                    </Card>
                  )
                })}
              </TooltipProvider>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Clients