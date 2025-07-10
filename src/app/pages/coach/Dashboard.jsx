"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Button } from "@/app/components/ui/button"
import { CheckCircle, Clock, TrendingUp, User } from "lucide-react"

const Dashboard = () => {
  const router = useRouter()
  const tasks = [
    { id: 1, client: "Henry", task: "Call about work", completed: false },
    { id: 2, client: "", task: "Invoice pending - Send reminder", completed: false },
  ]

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

  return (
    <div className="min-h-screen bg-luxury-background p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-luxury-dark mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* My Tasks */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-luxury-dark">My Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div key={task.id} className="flex items-start space-x-3">
                    <div className="w-4 h-4 border-2 border-muted-foreground rounded mt-1" />
                    <div>
                      <p className="text-sm text-foreground">
                        {task.client && <span className="font-medium">{task.client}: </span>}
                        {task.task}
                      </p>
                    </div>
                  </div>
                ))}
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">• Today's tasks: 2</span>
                  <span className="text-muted-foreground">• Overdue tasks: 8</span>
                </div>
              <Button 
                variant="outline" 
                className="w-full mt-4"
                onClick={() => router.push("/coach/tasks/all")}
              >
                View all
              </Button>
              </div>
            </CardContent>
          </Card>

          {/* Client Statistics */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-luxury-dark">Client Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-luxury-pink">{clientStats.active}</div>
                  <div className="text-sm text-muted-foreground">Active clients</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-luxury-gold">{clientStats.newThisMonth}</div>
                  <div className="text-sm text-muted-foreground">New clients this month</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-destructive">{clientStats.churnedThisMonth}</div>
                  <div className="text-sm text-muted-foreground">Churned clients this month</div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-luxury-dark mb-3">Latest Activity</h3>
                <div className="space-y-3">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                        <User className="w-4 h-4" />
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
        <Card>
          <CardHeader>
            <CardTitle className="text-luxury-dark">Earnings Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-center space-x-2">
              {[40, 65, 30, 80, 45, 90, 70, 85, 95, 75, 60, 50].map((height, index) => (
                <div
                  key={index}
                  className="bg-luxury-pink rounded-t-sm w-8 transition-all hover:bg-primary1/80"
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