"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Switch } from "@/app/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { Separator } from "@/app/components/ui/separator"
import { Badge } from "@/app/components/ui/badge"
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  CreditCard,
  Download,
  Trash2
} from "lucide-react"
import { useRouter } from "next/navigation"

const Settings = () => {
  const router = useRouter()
  const [currentTheme, setCurrentTheme] = useState("light")
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
    reminders: true
  })

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    showOnlineStatus: false,
    dataSharing: false
  })

  // Load theme from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setCurrentTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (theme) => {
    const root = document.documentElement;
    
    if (theme === "dark") {
      root.classList.add("dark");
      root.style.setProperty('--luxury-background', 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)');
      root.style.setProperty('--luxury-dark', '#f8fafc');
    } else if (theme === "light") {
      root.classList.remove("dark");
      root.style.setProperty('--luxury-background', 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)');
      root.style.setProperty('--luxury-dark', '#1e293b');
    } else if (theme === "auto") {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        root.classList.add("dark");
        root.style.setProperty('--luxury-background', 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)');
        root.style.setProperty('--luxury-dark', '#f8fafc');
      } else {
        root.classList.remove("dark");
        root.style.setProperty('--luxury-background', 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)');
        root.style.setProperty('--luxury-dark', '#1e293b');
      }
    }
  };

  const handleThemeChange = (theme) => {
    setCurrentTheme(theme);
    localStorage.setItem("theme", theme);
    applyTheme(theme);
    
    // Add a subtle animation feedback for the entire app
    document.body.style.transition = "background-color 0.3s ease, color 0.3s ease";
    document.documentElement.style.transition = "background-color 0.3s ease, color 0.3s ease";
    
    // Show a brief toast-like feedback
    const feedback = document.createElement('div');
    feedback.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, #ec4899 0%, #be185d 100%);
      color: white;
      padding: 12px 20px;
      border-radius: 12px;
      z-index: 9999;
      font-weight: 500;
      box-shadow: 0 8px 30px rgba(236, 72, 153, 0.3);
      transform: translateX(100%);
      transition: transform 0.3s ease;
    `;
    feedback.textContent = `Switched to ${theme} theme`;
    document.body.appendChild(feedback);
    
    // Animate in
    setTimeout(() => feedback.style.transform = 'translateX(0)', 10);
    
    // Remove feedback and transitions
    setTimeout(() => {
      feedback.style.transform = 'translateX(100%)';
      setTimeout(() => document.body.removeChild(feedback), 300);
      document.body.style.transition = "";
      document.documentElement.style.transition = "";
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-gentle-neutral bg-pattern-subtle p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
          Settings
        </h1>
        
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-gradient-gentle-primary/20 border-0 shadow-soft">
            <TabsTrigger value="profile" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-medium data-[state=active]:font-semibold">Profile</TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-medium data-[state=active]:font-semibold">Notifications</TabsTrigger>
            <TabsTrigger value="privacy" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-medium data-[state=active]:font-semibold">Privacy</TabsTrigger>
            <TabsTrigger value="appearance" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-medium data-[state=active]:font-semibold">Appearance</TabsTrigger>
            <TabsTrigger value="billing" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-medium data-[state=active]:font-semibold">Billing</TabsTrigger>
            <TabsTrigger value="advanced" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-medium data-[state=active]:font-semibold">Advanced</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card className="bg-gradient-card shadow-soft border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Profile Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-6">
                  <div className="w-20 h-20 bg-gradient-gentle-primary rounded-full flex items-center justify-center shadow-soft">
                    <span className="text-2xl font-bold text-white">CD</span>
                  </div>
                  <div className="space-y-2">
                    <Button className="bg-gradient-gentle-primary hover:bg-gradient-gentle-secondary">
                      Change Photo
                    </Button>
                    <Button variant="outline" size="sm" className="bg-gradient-gentle-neutral/50 hover:bg-gradient-gentle-primary/20">
                      Remove
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="Coach" className="bg-gradient-gentle-neutral/30 border-0 shadow-soft" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Dashboard" className="bg-gradient-gentle-neutral/30 border-0 shadow-soft" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="coach@example.com" className="bg-gradient-gentle-neutral/30 border-0 shadow-soft" />
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="+1 (555) 123-4567" className="bg-gradient-gentle-neutral/30 border-0 shadow-soft" />
                </div>
                
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <textarea 
                    id="bio" 
                    className="w-full p-3 bg-gradient-gentle-neutral/30 border-0 rounded-lg shadow-soft focus:outline-none focus:border-2 focus:border-blue-600 focus:shadow-lg selection:bg-blue-200 selection:text-blue-900"
                    rows={4}
                    defaultValue="Experienced life coach specializing in personal development and goal achievement."
                  />
                </div>
                
                <Button className="bg-gradient-gentle-primary hover:bg-gradient-gentle-secondary">
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="bg-gradient-card shadow-soft border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="w-5 h-5 mr-2" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gradient-gentle-neutral/20 rounded-lg">
                    <div>
                      <h4 className="font-medium">Email Notifications</h4>
                      <p className="text-sm text-muted-foreground">Receive updates via email</p>
                    </div>
                    <Switch 
                      checked={notifications.email}
                      onCheckedChange={(checked) => 
                        setNotifications({...notifications, email: checked})
                      }
                    />
                  </div>
                  
                  <Separator className="bg-gradient-gentle-neutral/30" />
                  
                  <div className="flex items-center justify-between p-4 bg-gradient-gentle-neutral/20 rounded-lg">
                    <div>
                      <h4 className="font-medium">Push Notifications</h4>
                      <p className="text-sm text-muted-foreground">Browser notifications</p>
                    </div>
                    <Switch 
                      checked={notifications.push}
                      onCheckedChange={(checked) => 
                        setNotifications({...notifications, push: checked})
                      }
                    />
                  </div>
                  
                  <Separator className="bg-gradient-gentle-neutral/30" />
                  
                  <div className="flex items-center justify-between p-4 bg-gradient-gentle-neutral/20 rounded-lg">
                    <div>
                      <h4 className="font-medium">SMS Notifications</h4>
                      <p className="text-sm text-muted-foreground">Text message alerts</p>
                    </div>
                    <Switch 
                      checked={notifications.sms}
                      onCheckedChange={(checked) => 
                        setNotifications({...notifications, sms: checked})
                      }
                    />
                  </div>
                  
                  <Separator className="bg-gradient-gentle-neutral/30" />
                  
                  <div className="flex items-center justify-between p-4 bg-gradient-gentle-neutral/20 rounded-lg">
                    <div>
                      <h4 className="font-medium">Session Reminders</h4>
                      <p className="text-sm text-muted-foreground">Automated session reminders</p>
                    </div>
                    <Switch 
                      checked={notifications.reminders}
                      onCheckedChange={(checked) => 
                        setNotifications({...notifications, reminders: checked})
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy">
            <Card className="bg-gradient-card shadow-soft border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Privacy Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gradient-gentle-neutral/20 rounded-lg">
                    <div>
                      <h4 className="font-medium">Profile Visibility</h4>
                      <p className="text-sm text-muted-foreground">Allow other coaches to see your profile</p>
                    </div>
                    <Switch 
                      checked={privacy.profileVisible}
                      onCheckedChange={(checked) => 
                        setPrivacy({...privacy, profileVisible: checked})
                      }
                    />
                  </div>
                  
                  <Separator className="bg-gradient-gentle-neutral/30" />
                  
                  <div className="flex items-center justify-between p-4 bg-gradient-gentle-neutral/20 rounded-lg">
                    <div>
                      <h4 className="font-medium">Online Status</h4>
                      <p className="text-sm text-muted-foreground">Show when you're available</p>
                    </div>
                    <Switch 
                      checked={privacy.showOnlineStatus}
                      onCheckedChange={(checked) => 
                        setPrivacy({...privacy, showOnlineStatus: checked})
                      }
                    />
                  </div>
                  
                  <Separator className="bg-gradient-gentle-neutral/30" />
                  
                  <div className="flex items-center justify-between p-4 bg-gradient-gentle-neutral/20 rounded-lg">
                    <div>
                      <h4 className="font-medium">Data Sharing</h4>
                      <p className="text-sm text-muted-foreground">Share anonymous usage data</p>
                    </div>
                    <Switch 
                      checked={privacy.dataSharing}
                      onCheckedChange={(checked) => 
                        setPrivacy({...privacy, dataSharing: checked})
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance">
            <Card className="bg-gradient-card shadow-soft border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Palette className="w-5 h-5 mr-2" />
                  Appearance Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-4">Theme</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div 
                        className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                          currentTheme === "light" 
                            ? "bg-gradient-gentle-primary text-white shadow-medium" 
                            : "bg-gradient-gentle-neutral/50 hover:bg-gradient-gentle-neutral/70"
                        }`}
                        onClick={() => handleThemeChange("light")}
                      >
                        <div className="text-center">
                          <div className="w-8 h-8 bg-white rounded mx-auto mb-2"></div>
                          <span className="text-sm font-medium">Light</span>
                        </div>
                      </div>
                      
                      <div 
                        className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                          currentTheme === "dark" 
                            ? "bg-gradient-gentle-primary text-white shadow-medium" 
                            : "bg-gradient-gentle-neutral/50 hover:bg-gradient-gentle-neutral/70"
                        }`}
                        onClick={() => handleThemeChange("dark")}
                      >
                        <div className="text-center">
                          <div className="w-8 h-8 bg-gray-800 rounded mx-auto mb-2"></div>
                          <span className="text-sm font-medium">Dark</span>
                        </div>
                      </div>
                      
                      <div 
                        className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                          currentTheme === "auto" 
                            ? "bg-gradient-gentle-primary text-white shadow-medium" 
                            : "bg-gradient-gentle-neutral/50 hover:bg-gradient-gentle-neutral/70"
                        }`}
                        onClick={() => handleThemeChange("auto")}
                      >
                        <div className="text-center">
                          <div className="w-8 h-8 bg-gradient-to-r from-white to-gray-800 rounded mx-auto mb-2"></div>
                          <span className="text-sm font-medium">Auto</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing">
            <Card className="bg-gradient-card shadow-soft border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Billing & Subscription
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-6 bg-gradient-gentle-secondary/20 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-semibold">Professional Plan</h4>
                      <p className="text-sm text-muted-foreground">$29/month</p>
                    </div>
                    <Badge variant="secondary">Current</Badge>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Up to 50 clients</li>
                    <li>• Advanced analytics</li>
                    <li>• Priority support</li>
                    <li>• Custom branding</li>
                  </ul>
                </div>
                
                <div className="flex space-x-4">
                  <Button className="bg-gradient-gentle-primary hover:bg-gradient-gentle-secondary">
                    Upgrade Plan
                  </Button>
                  <Button variant="outline" className="bg-gradient-gentle-neutral/50 hover:bg-gradient-gentle-primary/20">
                    View Invoice
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advanced">
            <Card className="bg-gradient-card shadow-soft border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="w-5 h-5 mr-2" />
                  Advanced Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gradient-gentle-neutral/20 rounded-lg">
                    <div>
                      <h4 className="font-medium">Export Data</h4>
                      <p className="text-sm text-muted-foreground">Download your data as CSV</p>
                    </div>
                    <Button variant="outline" size="sm" className="bg-gradient-gentle-neutral/50 hover:bg-gradient-gentle-primary/20">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                  
                  <Separator className="bg-gradient-gentle-neutral/30" />
                  
                  <div className="flex items-center justify-between p-4 bg-gradient-gentle-warm/20 rounded-lg">
                    <div>
                      <h4 className="font-medium">Delete Account</h4>
                      <p className="text-sm text-muted-foreground">Permanently delete your account</p>
                    </div>
                    <Button variant="destructive" size="sm" className="bg-gradient-gentle-warm hover:bg-gradient-gentle-warm/90">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Settings