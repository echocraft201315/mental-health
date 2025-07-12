"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Button } from "@/app/components/ui/button"
import { CheckCircle, Clock, TrendingUp, User, Circle } from "lucide-react"
import React from "react"

const Dashboard = () => {
  const router = useRouter()
  const [tasks, setTasks] = React.useState([
    { id: 1, client: "Henry", task: "Call about work", completed: false },
    { id: 2, client: "", task: "Invoice pending - Send reminder", completed: false },
  ])

  const clientStats = {
    active: 64,
    newThisMonth: 35,
    churnedThisMonth: 4,
  }

  const recentActivity = [
    { id: 1, user: "John", action: "completed task", time: "2 hours ago" },
    { id: 2, user: "Louis", action: "got 5 days streak", time: "4 hours ago" },
    { id: 3, user: "Bob", action: "logged in after 2 weeks", time: "1 day ago" },
  ]

  // Add toggle handler
  const handleToggleTask = (taskId) => {
    setTasks(tasks => tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t));
  }

  return (
    <div className="min-h-screen bg-gradient-gentle-neutral bg-pattern-subtle p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-luxury-dark mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover-lift">
          Dashboard
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* My Tasks */}
          <Card className="lg:col-span-1 bg-gradient-card component-enhanced">
            <CardHeader>
              <CardTitle className="text-luxury-dark">My Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {tasks.map((task) => (
                  <button
                    key={task.id}
                    className={`w-full flex items-start space-x-3 p-3 rounded-lg transition-all duration-200 group text-left focus:outline-none ${
                      task.completed
                        ? "bg-transparent border-0 shadow-none"
                        : "bg-gradient-gentle-cool/30 hover-lift"
                    }`}
                    onClick={() => handleToggleTask(task.id)}
                    aria-label={task.completed ? "Completed" : "Mark as completed"}
                    type="button"
                  >
                    {task.completed ? (
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1" />
                    ) : (
                      <Circle className="w-4 h-4 text-muted-foreground mt-1" />
                    )}
                    <div>
                      <p className={`text-sm ${task.completed ? "text-muted-foreground line-through" : "text-foreground"}`}>
                        {task.client && <span className="font-medium">{task.client}: </span>}
                        {task.task}
                      </p>
                    </div>
                  </button>
                ))}
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">• Today's tasks: 2</span>
                  <span className="text-muted-foreground">• Overdue tasks: 8</span>
                </div>
              <Button 
                variant="outline" 
                className="w-full mt-4 bg-gradient-gentle-primary hover:bg-gradient-gentle-secondary border-0 text-white"
                onClick={() => router.push("/coach/tasks/all")}
              >
                View all
              </Button>
              </div>
            </CardContent>
          </Card>

          {/* Client Statistics */}
          <Card className="lg:col-span-2 bg-gradient-card component-enhanced">
            <CardHeader>
              <CardTitle className="text-luxury-dark">Client Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 rounded-lg bg-gradient-gentle-primary/20 hover-lift">
                  <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {clientStats.active}
                  </div>
                  <div className="text-sm text-muted-foreground">Active clients</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-gradient-gentle-secondary/20 hover-lift">
                  <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                    {clientStats.newThisMonth}
                  </div>
                  <div className="text-sm text-muted-foreground">New clients this month</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-gradient-gentle-warm/20 hover-lift">
                  <div className="text-2xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                    {clientStats.churnedThisMonth}
                  </div>
                  <div className="text-sm text-muted-foreground">Churned clients this month</div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-luxury-dark mb-3">Latest Activity</h3>
                <div className="space-y-3">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-gentle-neutral/30 hover-lift">
                      <div className="w-8 h-8 bg-gradient-gentle-primary rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-medium">{activity.user}</span> {activity.action}
                        </p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Earnings Chart */}
        <Card className="bg-gradient-card component-enhanced">
          <CardHeader>
            <CardTitle className="text-luxury-dark">Earnings Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-center space-x-2">
              {[40, 65, 30, 80, 45, 90, 70, 85, 95, 75, 60, 50].map((height, index) => (
                <div
                  key={index}
                  className="bg-gradient-gentle-primary rounded-t-sm w-8 transition-all hover:bg-gradient-gentle-secondary hover-scale shadow-card"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Aug</span>
              <span>Sep</span>
              <span>Oct</span>
              <span>Nov</span>
              <span>Dec</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard