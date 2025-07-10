"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Button } from "@/app/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { CheckCircle, Circle, Plus, Edit, MoreHorizontal, ArrowLeft } from "lucide-react"

const AllTasks = () => {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("open")

  const myTasks = [
    { id: 1, task: "Review client progress reports", status: "completed", priority: "high", dueDate: "Today", client: null },
    { id: 2, task: "Prepare group session materials", status: "open", priority: "medium", dueDate: "Tomorrow", client: null },
    { id: 3, task: "Update client assessment forms", status: "open", priority: "low", dueDate: "This week", client: null },
    { id: 4, task: "Schedule follow-up sessions", status: "open", priority: "high", dueDate: "Today", client: null },
    { id: 5, task: "Prepare monthly reports", status: "completed", priority: "medium", dueDate: "Yesterday", client: null },
    { id: 6, task: "Review team feedback", status: "open", priority: "low", dueDate: "Next week", client: null },
  ]

  const TaskCard = ({ task }) => (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className="mt-1">
              {task.status === "completed" ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <Circle className="w-5 h-5 text-muted-foreground" />
              )}
            </div>
            <div className="flex-1">
              <p className={`${task.status === "completed" ? "line-through text-muted-foreground" : "text-foreground"}`}>
                {task.task}
              </p>
              <div className="flex items-center space-x-2 mt-2">
                <Badge 
                  variant={task.priority === "high" ? "destructive" : task.priority === "medium" ? "default" : "secondary"}
                  className={
                    task.priority === "high" ? "" : 
                    task.priority === "medium" ? "bg-luxury-gold/20 text-luxury-dark" : 
                    "bg-muted1"
                  }
                >
                  {task.priority}
                </Badge>
                <Badge variant="outline">
                  {task.dueDate}
                </Badge>
                <Badge variant="outline">
                  {task.status}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button size="sm" variant="ghost" className="p-2">
              <Edit className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost" className="p-2">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const openTasks = myTasks.filter(task => task.status === "open")
  const completedTasks = myTasks.filter(task => task.status === "completed")

  return (
    <div className="min-h-screen bg-luxury-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <Button 
            variant="ghost" 
            onClick={() => router.push("/")}
            className="mr-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold text-luxury-dark">All My Tasks</h1>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-luxury-dark">My Tasks</CardTitle>
              <Button className="bg-luxury-pink hover:bg-luxury-pink/90">
                <Plus className="w-4 h-4 mr-2" />
                Add Task
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="open">Open Tasks ({openTasks.length})</TabsTrigger>
                <TabsTrigger value="completed">Completed ({completedTasks.length})</TabsTrigger>
              </TabsList>
              
              <TabsContent value="open" className="mt-4">
                <div className="max-h-96 overflow-y-auto space-y-4">
                  {openTasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                  {openTasks.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      No open tasks
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="completed" className="mt-4">
                <div className="max-h-96 overflow-y-auto space-y-4">
                  {completedTasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                  {completedTasks.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      No completed tasks
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AllTasks