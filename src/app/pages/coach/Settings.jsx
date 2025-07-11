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
      // Only update main background and text colors, not sidebar
      root.style.setProperty('--luxury-background', '#d0f4f0');
      root.style.setProperty('--luxury-dark', '#f1f5f9');
    } else if (theme === "light") {
      root.classList.remove("dark");
      // Reset main colors for light mode, keep sidebar unchanged
      root.style.setProperty('--luxury-background', '#d0f4f0');
      root.style.setProperty('--luxury-dark', '#0b0e19');
    } else if (theme === "auto") {
      // Auto theme logic - check system preference
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        root.classList.add("dark");
        root.style.setProperty('--luxury-background', '#d0f4f0');
        root.style.setProperty('--luxury-dark', '#f1f5f9');
      } else {
        root.classList.remove("dark");
        root.style.setProperty('--luxury-background', '#fff2f4');
        root.style.setProperty('--luxury-dark', '#0b0e19');
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
      background: var(--luxury-pink);
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      z-index: 9999;
      font-weight: 500;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
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
    <div className="min-h-screen bg-luxury-background p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-luxury-dark mb-8">Settings</h1>
        
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-[#8082fc96]">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="text-luxury-dark flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Profile Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-6">
                  <div className="w-20 h-20 bg-luxury-pink/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-luxury-pink">CD</span>
                  </div>
                  <div className="space-y-2">
                    <Button className="bg-luxury-pink hover:bg-luxury-pink/90">
                      Change Photo
                    </Button>
                    <Button variant="outline" size="sm">
                      Remove
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="Coach" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Dashboard" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="coach@example.com" />
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="+1 (555) 123-4567" />
                </div>
                
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <textarea 
                    id="bio" 
                    className="w-full p-3 border rounded-md"
                    rows={4}
                    defaultValue="Experienced life coach specializing in personal development and goal achievement."
                  />
                </div>
                
                <Button className="bg-luxury-pink hover:bg-luxury-pink/90">
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="text-luxury-dark flex items-center">
                  <Bell className="w-5 h-5 mr-2" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
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
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
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
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
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
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
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
                
                <Button className="bg-luxury-pink hover:bg-luxury-pink/90">
                  Save Notification Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle className="text-luxury-dark flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Privacy & Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Profile Visibility</h4>
                      <p className="text-sm text-muted-foreground">Make your profile visible to clients</p>
                    </div>
                    <Switch 
                      checked={privacy.profileVisible}
                      onCheckedChange={(checked) => 
                        setPrivacy({...privacy, profileVisible: checked})
                      }
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Show Online Status</h4>
                      <p className="text-sm text-muted-foreground">Let clients see when you're online</p>
                    </div>
                    <Switch 
                      checked={privacy.showOnlineStatus}
                      onCheckedChange={(checked) => 
                        setPrivacy({...privacy, showOnlineStatus: checked})
                      }
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Data Sharing</h4>
                      <p className="text-sm text-muted-foreground">Share anonymized data for research</p>
                    </div>
                    <Switch 
                      checked={privacy.dataSharing}
                      onCheckedChange={(checked) => 
                        setPrivacy({...privacy, dataSharing: checked})
                      }
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium">Password & Security</h4>
                  <Button variant="outline" className="w-full">
                    Change Password
                  </Button>
                  <Button variant="outline" className="w-full">
                    Enable Two-Factor Authentication
                  </Button>
                </div>
                
                <Button className="bg-luxury-pink hover:bg-luxury-pink/90">
                  Save Privacy Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle className="text-luxury-dark flex items-center">
                  <Palette className="w-5 h-5 mr-2" />
                  Appearance & Theme
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium mb-4">Theme Preference</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <Card 
                      className={`cursor-pointer transition-all ${currentTheme === "light" ? "border-2 border-luxury-pink" : "border hover:border-luxury-pink/50"}`}
                      onClick={() => handleThemeChange("light")}
                    >
                      <CardContent className="pt-6 text-center">
                        <div className="w-12 h-12 bg-luxury-background rounded-full mx-auto mb-2"></div>
                        <p className="text-sm font-medium">Light</p>
                        {currentTheme === "light" && <Badge className="mt-2 bg-luxury-pink">Current</Badge>}
                      </CardContent>
                    </Card>
                    <Card 
                      className={`cursor-pointer transition-all ${currentTheme === "dark" ? "border-2 border-luxury-pink" : "border hover:border-luxury-pink/50"}`}
                      onClick={() => handleThemeChange("dark")}
                    >
                      <CardContent className="pt-6 text-center">
                        <div className="w-12 h-12 bg-gray-800 rounded-full mx-auto mb-2"></div>
                        <p className="text-sm font-medium">Dark</p>
                        {currentTheme === "dark" && <Badge className="mt-2 bg-luxury-pink">Current</Badge>}
                      </CardContent>
                    </Card>
                    <Card 
                      className={`cursor-pointer transition-all ${currentTheme === "auto" ? "border-2 border-luxury-pink" : "border hover:border-luxury-pink/50"}`}
                      onClick={() => handleThemeChange("auto")}
                    >
                      <CardContent className="pt-6 text-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-luxury-background to-gray-800 rounded-full mx-auto mb-2"></div>
                        <p className="text-sm font-medium">Auto</p>
                        {currentTheme === "auto" && <Badge className="mt-2 bg-luxury-pink">Current</Badge>}
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-4">Font Size</h4>
                  <div className="space-y-2">
                    <Label htmlFor="fontSize">Text Size</Label>
                    <select className="w-full p-2 border rounded-md">
                      <option>Small</option>
                      <option selected>Medium</option>
                      <option>Large</option>
                    </select>
                  </div>
                </div>
                
                <Button className="bg-luxury-pink hover:bg-luxury-pink/90">
                  Save Appearance Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing">
            <Card>
              <CardHeader>
                <CardTitle className="text-luxury-dark flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Billing & Subscription
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-green-800">Pro Plan</h4>
                      <p className="text-sm text-green-600">$29/month • Next billing: Feb 15, 2025</p>
                    </div>
                    <Badge className="bg-green-100 text-green-700">Active</Badge>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-4">Payment Method</h4>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                          <CreditCard className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">•••• •••• •••• 4242</p>
                          <p className="text-sm text-muted-foreground">Expires 12/25</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Update
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-4">Billing History</h4>
                  <div className="space-y-2">
                    {[
                      { date: "Jan 15, 2025", amount: "$29.00", status: "Paid" },
                      { date: "Dec 15, 2024", amount: "$29.00", status: "Paid" },
                      { date: "Nov 15, 2024", amount: "$29.00", status: "Paid" },
                    ].map((invoice, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <p className="font-medium">{invoice.amount}</p>
                          <p className="text-sm text-muted-foreground">{invoice.date}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary" className="bg-green-100 text-green-700">
                            {invoice.status}
                          </Badge>
                          <Button size="sm" variant="ghost">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button className="bg-luxury-pink hover:bg-luxury-pink/90">
                    Upgrade Plan
                  </Button>
                  <Button variant="outline">
                    Cancel Subscription
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advanced">
            <Card>
              <CardHeader>
                <CardTitle className="text-luxury-dark flex items-center">
                  <Globe className="w-5 h-5 mr-2" />
                  Advanced Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium mb-4">Data Management</h4>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="w-4 h-4 mr-2" />
                      Export All Data
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Import Data
                    </Button>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-medium mb-4">Account Management</h4>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      Deactivate Account
                    </Button>
                    <Button variant="destructive" className="w-full justify-start">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Account
                    </Button>
                  </div>
                </div>
                
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-medium text-yellow-800 mb-2">Danger Zone</h4>
                  <p className="text-sm text-yellow-700">
                    Account deletion is permanent and cannot be undone. All your data will be lost.
                  </p>
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