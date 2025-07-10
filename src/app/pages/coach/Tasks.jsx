"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Button } from "@/app/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { CheckCircle, Circle, Plus, Edit, MoreHorizontal } from "lucide-react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/app/components/ui/dialog";
import { useEffect } from "react";

function TaskEditModal({ task, open, onClose, onSave }) {
  const [value, setValue] = useState(task?.task || "");
  useEffect(() => { setValue(task?.task || ""); }, [task]);
  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={e => { e.preventDefault(); onSave({ ...task, task: value }); onClose(); }}>
          <input className="w-full border rounded-md px-3 py-2" value={value} onChange={e => setValue(e.target.value)} />
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" className="bg-luxury-pink">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function TaskDetailsModal({ task, open, onClose }) {
  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Task Details</DialogTitle>
        </DialogHeader>
        <div className="mb-4">
          <div><b>Task:</b> {task.task}</div>
          {task.client && <div><b>Client:</b> {task.client}</div>}
          <div><b>Status:</b> {task.status}</div>
          <div><b>Priority:</b> {task.priority}</div>
          <div className="mt-2"><b>Comments:</b> No comments yet.</div>
          <div className="mt-2"><b>Activity Log:</b> Created, last updated...</div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ViewAllModal({ tasks, open, onClose }) {
  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>All Open Tasks</DialogTitle>
        </DialogHeader>
        <div className="max-h-96 overflow-y-auto space-y-2">
          {tasks.map(task => (
            <div key={task.id} className="p-3 border rounded flex items-center gap-3">
              <span className="font-medium">{task.task}</span>
              {task.client && <span className="text-xs text-muted-foreground ml-2">({task.client})</span>}
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const Tasks = () => {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("client-tasks")
  const [clientTasks, setClientTasks] = useState([
    { id: 1, client: "John Doe", task: "Complete daily reflection", status: "open", priority: "high" },
    { id: 2, client: "Bob Dylan", task: "Submit weekly progress report", status: "open", priority: "medium" },
  ]);
  const [myTasks, setMyTasks] = useState([
    { id: 1, task: "Review client progress reports", status: "completed", priority: "high" },
    { id: 2, task: "Prepare group session materials", status: "open", priority: "medium" },
  ]);
  const [editTask, setEditTask] = useState(null);
  const [detailsTask, setDetailsTask] = useState(null);
  const [viewAllOpen, setViewAllOpen] = useState(false);

  const handleToggleTask = (task, isClientTask) => {
    if (task.status === "completed") return;
    if (isClientTask) {
      setClientTasks(clientTasks.map(t => t.id === task.id ? { ...t, status: "completed" } : t));
    } else {
      setMyTasks(myTasks.map(t => t.id === task.id ? { ...t, status: "completed" } : t));
    }
  };
  const handleEditTask = (updatedTask, isClientTask) => {
    if (isClientTask) {
      setClientTasks(clientTasks.map(t => t.id === updatedTask.id ? updatedTask : t));
    } else {
      setMyTasks(myTasks.map(t => t.id === updatedTask.id ? updatedTask : t));
    }
  };

  const TaskCard = ({ task, isClientTask = false }) => (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <button
              className="mt-1 focus:outline-none"
              onClick={() => handleToggleTask(task, isClientTask)}
              aria-label={task.status === "completed" ? "Completed" : "Mark as completed"}
            >
              {task.status === "completed" ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <Circle className="w-5 h-5 text-muted-foreground hover:text-green-500 transition-colors" />
              )}
            </button>
            <div className="flex-1">
              {isClientTask && (
                <div className="flex items-center space-x-2 mb-1">
                  <div className="w-6 h-6 bg-luxury-pink/20 rounded-full flex items-center justify-center">
                    <span className="text-xs text-luxury-pink font-medium">
                      {task.client?.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-luxury-dark">{task.client}</span>
                </div>
              )}
              <p className={`${task.status === "completed" ? "line-through text-muted-foreground" : "text-foreground"}`}>
                {task.task}
              </p>
              <div className="flex items-center space-x-2 mt-2">
                <Badge 
                  variant={task.priority === "high" ? "destructive" : "secondary"}
                  className={task.priority === "high" ? "" : "bg-luxury-gold/20 text-luxury-dark"}
                >
                  {task.priority}
                </Badge>
                <Badge variant="outline">
                  {task.status}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button size="sm" variant="ghost" className="p-2" onClick={() => setEditTask({ ...task, isClientTask })}>
              <Edit className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost" className="p-2" onClick={() => setDetailsTask({ ...task, isClientTask })}>
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  // Mock data for chart
  const chartData = [
    { month: "May", client: 45, coach: 30 },
    { month: "June", client: 65, coach: 40 },
    { month: "July", client: 80, coach: 55 },
    { month: "Aug", client: 90, coach: 60 },
  ];

  return (
    <div className="min-h-screen bg-luxury-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-luxury-dark">Tasks</h1>
          <Button className="bg-luxury-pink hover:bg-luxury-pink/90">
            <Plus className="w-4 h-4 mr-2" />
            Add Task
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Client Tasks */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-luxury-dark">Client Tasks</CardTitle>
                <Button size="sm" variant="ghost">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="open" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="open">Open Tasks</TabsTrigger>
                  <TabsTrigger value="closed">Closed</TabsTrigger>
                </TabsList>
                <TabsContent value="open" className="mt-4">
                  {clientTasks.filter(task => task.status === "open").map((task) => (
                    <TaskCard key={task.id} task={task} isClientTask={true} />
                  ))}
                </TabsContent>
                <TabsContent value="closed" className="mt-4">
                  {clientTasks.filter(task => task.status === "completed").map((task) => (
                    <TaskCard key={task.id} task={task} isClientTask={true} />
                  ))}
                </TabsContent>
              </Tabs>
              <Button variant="outline" className="w-full mt-4" onClick={() => setViewAllOpen(true)}>
                View all
              </Button>
            </CardContent>
          </Card>

          {/* My Tasks */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-luxury-dark">My Tasks</CardTitle>
                <Button size="sm" variant="ghost">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="open" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="open">Open Tasks</TabsTrigger>
                  <TabsTrigger value="closed">Closed</TabsTrigger>
                </TabsList>
                <TabsContent value="open" className="mt-4">
                  {myTasks.filter(task => task.status === "open").map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </TabsContent>
                <TabsContent value="closed" className="mt-4">
                  {myTasks.filter(task => task.status === "completed").map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </TabsContent>
              </Tabs>
              <Button variant="outline" className="w-full mt-4" onClick={() => setViewAllOpen(true)}>
                View all
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Task Overview Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-luxury-dark">Task Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-center space-x-8">
              {chartData.map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="flex gap-1">
                    <div
                      className="bg-luxury-pink rounded-t-sm w-6 transition-all hover:bg-primary1/80"
                      style={{ height: `${item.client * 2}px` }}
                      title={`Client tasks: ${item.client}`}
                    />
                    <div
                      className="bg-luxury-gold rounded-t-sm w-6 transition-all hover:bg-accent/80"
                      style={{ height: `${item.coach * 2}px` }}
                      title={`Coach tasks: ${item.coach}`}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground mt-2">{item.month}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        {editTask && (
          <TaskEditModal task={editTask} open={!!editTask} onClose={() => setEditTask(null)} onSave={t => handleEditTask(t, editTask?.isClientTask)} />
        )}
        {detailsTask && (
          <TaskDetailsModal task={detailsTask} open={!!detailsTask} onClose={() => setDetailsTask(null)} />
        )}
        <ViewAllModal tasks={[...clientTasks.filter(t => t.status === "open"), ...myTasks.filter(t => t.status === "open")]} open={viewAllOpen} onClose={() => setViewAllOpen(false)} />
      </div>
    </div>
  )
}

export default Tasks