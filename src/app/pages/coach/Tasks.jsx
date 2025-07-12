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
  
  useEffect(() => { 
    setValue(task?.task || ""); 
  }, [task]);
  
  // Don't render if task is null
  if (!task) return null;
  
  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent className="bg-gradient-card shadow-soft border-0">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={e => { e.preventDefault(); onSave({ ...task, task: value }); onClose(); }}>
          <input 
            className="w-full border-0 bg-gradient-gentle-neutral/30 rounded-lg px-3 py-2 shadow-soft" 
            value={value} 
            onChange={e => setValue(e.target.value)} 
          />
          <DialogFooter>
            <Button variant="outline" onClick={onClose} className="bg-gradient-gentle-neutral/50 hover:bg-gradient-gentle-primary/20">
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-gentle-primary hover:bg-gradient-gentle-secondary">
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function TaskDetailsModal({ task, open, onClose }) {
  // Don't render if task is null
  if (!task) return null;
  
  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent className="bg-gradient-card shadow-soft border-0">
        <DialogHeader>
          <DialogTitle>Task Details</DialogTitle>
        </DialogHeader>
        <div className="mb-4 space-y-2">
          <div className="p-3 bg-gradient-gentle-neutral/20 rounded-lg">
            <div><b>Task:</b> {task.task}</div>
            {task.client && <div><b>Client:</b> {task.client}</div>}
            <div><b>Status:</b> {task.status}</div>
            <div><b>Priority:</b> {task.priority}</div>
          </div>
          <div className="p-3 bg-gradient-gentle-neutral/20 rounded-lg">
            <div className="mb-2"><b>Comments:</b></div>
            <div className="text-sm text-muted-foreground">No comments yet.</div>
          </div>
          <div className="p-3 bg-gradient-gentle-neutral/20 rounded-lg">
            <div className="mb-2"><b>Activity Log:</b></div>
            <div className="text-sm text-muted-foreground">Created, last updated...</div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="bg-gradient-gentle-neutral/50 hover:bg-gradient-gentle-primary/20">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ViewAllModal({ tasks, open, onClose }) {
  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent className="max-w-2xl bg-gradient-card shadow-soft border-0">
        <DialogHeader>
          <DialogTitle>All Open Tasks</DialogTitle>
        </DialogHeader>
        <div className="max-h-96 overflow-y-auto space-y-2">
          {tasks.map(task => (
            <div key={task.id} className="p-3 bg-gradient-gentle-neutral/20 rounded-lg flex items-center gap-3 hover:bg-gradient-gentle-neutral/30 transition-all duration-300">
              <span className="font-medium">{task.task}</span>
              {task.client && <span className="text-xs text-muted-foreground ml-2">({task.client})</span>}
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="bg-gradient-gentle-neutral/50 hover:bg-gradient-gentle-primary/20">
            Close
          </Button>
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
    <Card className="mb-4 bg-gradient-card shadow-soft border-0">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <button
              className="mt-1 focus:outline-none transition-all duration-300 hover:scale-110"
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
                  <div className="w-6 h-6 bg-gradient-gentle-primary rounded-full flex items-center justify-center shadow-soft">
                    <span className="text-xs text-white font-medium">
                      {task.client?.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <span className="text-sm font-medium">{task.client}</span>
                </div>
              )}
              <p className={`${task.status === "completed" ? "line-through text-muted-foreground" : "text-foreground"}`}>
                {task.task}
              </p>
              <div className="flex items-center space-x-2 mt-2">
                <Badge 
                  variant={task.priority === "high" ? "destructive" : "secondary"}
                  className={task.priority === "high" ? "bg-gradient-gentle-warm" : "bg-gradient-gentle-accent/20 text-foreground"}
                >
                  {task.priority}
                </Badge>
                <Badge variant="outline" className="bg-gradient-gentle-neutral/50">
                  {task.status}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button 
              size="sm" 
              variant="ghost" 
              className="p-2 hover:bg-gradient-gentle-primary/20" 
              onClick={() => setEditTask({ ...task, isClientTask })}
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              className="p-2 hover:bg-gradient-gentle-primary/20" 
              onClick={() => setDetailsTask({ ...task, isClientTask })}
            >
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
    <div className="min-h-screen bg-gradient-gentle-neutral bg-pattern-subtle p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Tasks
          </h1>
          <Button className="bg-gradient-gentle-primary hover:bg-gradient-gentle-secondary">
            <Plus className="w-4 h-4 mr-2" />
            Add Task
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Client Tasks */}
          <Card className="bg-gradient-card shadow-soft border-0">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Client Tasks</CardTitle>
                <Button size="sm" variant="ghost" className="hover:bg-gradient-gentle-primary/20">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {clientTasks.map(task => (
                <TaskCard key={task.id} task={task} isClientTask={true} />
              ))}
              <Button 
                variant="outline" 
                className="w-full bg-gradient-gentle-neutral/50 hover:bg-gradient-gentle-primary/20"
                onClick={() => setViewAllOpen(true)}
              >
                View All Open Tasks
              </Button>
            </CardContent>
          </Card>

          {/* My Tasks */}
          <Card className="bg-gradient-card shadow-soft border-0">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>My Tasks</CardTitle>
                <Button size="sm" variant="ghost" className="hover:bg-gradient-gentle-primary/20">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {myTasks.map(task => (
                <TaskCard key={task.id} task={task} isClientTask={false} />
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Task Analytics */}
        <Card className="bg-gradient-card shadow-soft border-0">
          <CardHeader>
            <CardTitle>Task Completion Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-center space-x-2">
              {chartData.map((data, index) => (
                <div key={index} className="flex flex-col items-center space-y-2">
                  <div className="flex space-x-1 items-end h-52">
                    <div
                      className="w-8 bg-gradient-gentle-primary rounded-t-sm transition-all hover:bg-gradient-gentle-secondary shadow-soft"
                      style={{ height: `${(data.client / 100) * 200}px` }}
                    />
                    <div
                      className="w-8 bg-gradient-gentle-secondary rounded-t-sm transition-all hover:bg-gradient-gentle-primary shadow-soft"
                      style={{ height: `${(data.coach / 100) * 200}px` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{data.month}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-center space-x-6 mt-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gradient-gentle-primary rounded"></div>
                <span className="text-sm text-muted-foreground">Client Tasks</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gradient-gentle-secondary rounded"></div>
                <span className="text-sm text-muted-foreground">Coach Tasks</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <TaskEditModal 
        task={editTask} 
        open={!!editTask} 
        onClose={() => setEditTask(null)} 
        onSave={handleEditTask}
      />
      <TaskDetailsModal 
        task={detailsTask} 
        open={!!detailsTask} 
        onClose={() => setDetailsTask(null)} 
      />
      <ViewAllModal 
        tasks={clientTasks.filter(t => t.status === "open")} 
        open={viewAllOpen} 
        onClose={() => setViewAllOpen(false)} 
      />
    </div>
  )
}

export default Tasks