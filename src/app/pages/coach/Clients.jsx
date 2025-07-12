"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
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
    { id: "new-lead", title: "New Leads", color: "bg-gradient-gentle-primary/20 border-gradient-gentle-primary/30" },
    { id: "follow-up", title: "Follow Up", color: "bg-gradient-gentle-accent/20 border-gradient-gentle-accent/30" },
    { id: "session-booked", title: "Session Booked", color: "bg-gradient-gentle-secondary/20 border-gradient-gentle-secondary/30" },
    { id: "completed", title: "Completed", color: "bg-gradient-gentle-cool/20 border-gradient-gentle-cool/30" },
    { id: "churned", title: "Churned", color: "bg-gradient-gentle-warm/20 border-gradient-gentle-warm/30" }
  ]

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterStatus === "all" || client.status.toLowerCase() === filterStatus)
  )

  const getClientsByStage = (stageId) => {
    return filteredClients.filter(client => client.stage === stageId)
  }

  return (
    <div className="min-h-screen bg-gradient-gentle-neutral bg-pattern-subtle p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
          Clients
        </h1>
        
        {/* Search and Filter */}
        <Card className="mb-6 bg-gradient-card shadow-soft border-0">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search clients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gradient-gentle-neutral/30 border-0 shadow-soft"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filterStatus === "all" ? "default" : "outline"}
                  onClick={() => setFilterStatus("all")}
                  className={filterStatus === "all" ? "bg-gradient-gentle-primary hover:bg-gradient-gentle-secondary" : "bg-gradient-gentle-neutral/50 hover:bg-gradient-gentle-primary/20"}
                >
                  All
                </Button>
                <Button
                  variant={filterStatus === "active" ? "default" : "outline"}
                  onClick={() => setFilterStatus("active")}
                  className={filterStatus === "active" ? "bg-gradient-gentle-primary hover:bg-gradient-gentle-secondary" : "bg-gradient-gentle-neutral/50 hover:bg-gradient-gentle-primary/20"}
                >
                  Active
                </Button>
                <div className="flex border border-gradient-gentle-neutral/30 rounded-lg bg-gradient-gentle-neutral/20">
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className={viewMode === "list" ? "bg-gradient-gentle-primary hover:bg-gradient-gentle-secondary" : "hover:bg-gradient-gentle-neutral/30"}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "funnel" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("funnel")}
                    className={viewMode === "funnel" ? "bg-gradient-gentle-primary hover:bg-gradient-gentle-secondary" : "hover:bg-gradient-gentle-neutral/30"}
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
          <Card className="bg-gradient-card shadow-soft border-0">
            <CardHeader>
              <CardTitle>Client List</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gradient-gentle-neutral/30">
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
                      <tr key={client.id} className="border-b border-gradient-gentle-neutral/20 hover:bg-gradient-gentle-neutral/10 transition-all duration-300">
                        <td className="py-3 px-4">
                          <div 
                            className="flex items-center space-x-3 cursor-pointer hover:bg-gradient-gentle-neutral/20 rounded p-2 -m-2 transition-all duration-300"
                            onClick={() => router.push(`/coach/clients/${client.id}`)}
                          >
                            <div className="w-8 h-8 bg-gradient-gentle-primary rounded-full flex items-center justify-center shadow-soft">
                              <span className="text-white font-medium text-sm">
                                {client.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <span className="font-medium">{client.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">{client.type}</td>
                        <td className="py-3 px-4">
                          <Badge variant="secondary" className="bg-gradient-gentle-secondary/20 text-foreground">
                            {client.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-2xl">{client.mood}</td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">{client.lastActive}</td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">{client.created}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0 hover:bg-gradient-gentle-primary/20"
                                    onClick={() => router.push(`/coach/clients/${client.id}`)}
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>View Profile</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {stages.map((stage) => (
              <Card key={stage.id} className="bg-gradient-card shadow-soft border-0">
                <CardHeader>
                  <CardTitle className="text-sm font-medium">{stage.title}</CardTitle>
                  <div className="text-2xl font-bold text-muted-foreground">
                    {getClientsByStage(stage.id).length}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {getClientsByStage(stage.id).map((client) => (
                    <div
                      key={client.id}
                      className={`p-3 rounded-lg border ${stage.color} cursor-pointer hover:shadow-soft transition-all duration-300`}
                      onClick={() => router.push(`/coach/clients/${client.id}`)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-gradient-gentle-primary rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-medium">
                              {client.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <span className="font-medium text-sm">{client.name}</span>
                        </div>
                        <span className="text-2xl">{client.mood}</span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">{client.note}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Clients