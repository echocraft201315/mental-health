"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Badge } from "@/app/components/ui/badge"

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gradient-gentle-cool bg-pattern-subtle p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Professional & Gentle Design System
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the new gradient colors and background patterns designed for a professional and gentle mental health coaching platform.
          </p>
        </div>

        {/* Gradient Backgrounds */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
            Gradient Backgrounds
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="h-32 bg-gradient-gentle-primary rounded-xl flex items-center justify-center">
              <span className="text-white font-semibold">Gentle Primary</span>
            </div>
            <div className="h-32 bg-gradient-gentle-secondary rounded-xl flex items-center justify-center">
              <span className="text-white font-semibold">Gentle Secondary</span>
            </div>
            <div className="h-32 bg-gradient-gentle-accent rounded-xl flex items-center justify-center">
              <span className="text-white font-semibold">Gentle Accent</span>
            </div>
            <div className="h-32 bg-gradient-gentle-warm rounded-xl flex items-center justify-center">
              <span className="text-white font-semibold">Gentle Warm</span>
            </div>
            <div className="h-32 bg-gradient-gentle-cool rounded-xl flex items-center justify-center">
              <span className="text-white font-semibold">Gentle Cool</span>
            </div>
            <div className="h-32 bg-gradient-gentle-neutral rounded-xl flex items-center justify-center">
              <span className="text-foreground font-semibold">Gentle Neutral</span>
            </div>
          </div>
        </section>

        {/* Background Patterns */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Background Patterns
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-32 bg-gradient-gentle-neutral bg-pattern-subtle rounded-xl flex items-center justify-center">
              <span className="text-foreground font-semibold">Subtle Pattern</span>
            </div>
            <div className="h-32 bg-gradient-gentle-neutral bg-pattern-soft rounded-xl flex items-center justify-center">
              <span className="text-foreground font-semibold">Soft Pattern</span>
            </div>
            <div className="h-32 bg-gradient-gentle-neutral bg-pattern-gentle rounded-xl flex items-center justify-center">
              <span className="text-foreground font-semibold">Gentle Pattern</span>
            </div>
          </div>
        </section>

        {/* UI Components */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
            UI Components
          </h2>
          
          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Professional Card</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  This card uses the new gradient styling with soft shadows and gentle colors.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Gentle Design</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Notice the smooth transitions and professional appearance.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Mental Health Focus</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Designed specifically for mental health coaching environments.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Buttons */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Buttons</h3>
            <div className="flex flex-wrap gap-4">
              <Button>Default Button</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
          </div>

          {/* Badges */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Badges</h3>
            <div className="flex flex-wrap gap-4">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </div>
        </section>

        {/* Color Palette */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
            Color Palette
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-gradient-gentle-primary rounded-lg mx-auto"></div>
              <span className="text-xs font-medium">Primary</span>
            </div>
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-gradient-gentle-secondary rounded-lg mx-auto"></div>
              <span className="text-xs font-medium">Secondary</span>
            </div>
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-gradient-gentle-accent rounded-lg mx-auto"></div>
              <span className="text-xs font-medium">Accent</span>
            </div>
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-gradient-gentle-warm rounded-lg mx-auto"></div>
              <span className="text-xs font-medium">Warm</span>
            </div>
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-gradient-gentle-cool rounded-lg mx-auto"></div>
              <span className="text-xs font-medium">Cool</span>
            </div>
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-gradient-gentle-neutral rounded-lg mx-auto"></div>
              <span className="text-xs font-medium">Neutral</span>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
            Design Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Professional Appearance</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Gradient backgrounds for depth</li>
                  <li>• Soft shadows for elevation</li>
                  <li>• Smooth transitions and animations</li>
                  <li>• Consistent color palette</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Gentle Experience</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Calming color combinations</li>
                  <li>• Subtle background patterns</li>
                  <li>• Rounded corners for softness</li>
                  <li>• Accessible contrast ratios</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
} 