import { Button } from "@/app/components/ui/button"
import { Badge } from "@/app/components/ui/badge"
import { ArrowLeft, Bookmark, Share2, Clock, User } from "lucide-react"

export const GuideViewer = ({ onBack, title }) => {
  const guideContent = {
    title: "The Complete Guide to Managing Anxiety",
    author: "Dr. Sarah Wilson",
    readTime: "15 min read",
    content: `
# Understanding Anxiety

Anxiety is a natural response to stress or danger. When we feel threatened, our bodies react by releasing stress hormones that trigger a "fight-or-flight" response. This can be helpful when we're facing real danger, but sometimes our bodies react this way even when there's no real threat.

## Common Symptoms

Anxiety can affect you physically, mentally, and behaviorally. Here are some common symptoms:

### Physical Symptoms
- Racing or pounding heart
- Sweating or trembling
- Shortness of breath
- Muscle tension
- Headaches
- Fatigue

### Mental Symptoms
- Excessive worrying
- Racing thoughts
- Difficulty concentrating
- Feeling restless or on edge
- Irritability

### Behavioral Symptoms
- Avoiding certain situations
- Difficulty sleeping
- Changes in appetite
- Procrastination

## Effective Coping Strategies

### 1. Deep Breathing Exercises
When you feel anxious, try this simple breathing technique:
- Breathe in slowly through your nose for 4 counts
- Hold your breath for 4 counts
- Exhale slowly through your mouth for 6 counts
- Repeat this cycle 5-10 times

### 2. Progressive Muscle Relaxation
This technique involves tensing and then relaxing different muscle groups:
- Start with your toes and work your way up
- Tense each muscle group for 5 seconds
- Then relax for 10 seconds
- Notice the difference between tension and relaxation

### 3. Mindfulness and Meditation
Regular mindfulness practice can help reduce anxiety:
- Set aside 10-15 minutes daily
- Focus on your breath or use a guided meditation
- When your mind wanders, gently bring attention back
- Be patient with yourself as you learn

### 4. Physical Exercise
Regular exercise is one of the most effective ways to manage anxiety:
- Aim for at least 30 minutes of moderate exercise most days
- Choose activities you enjoy
- Even a short walk can help reduce stress

### 5. Healthy Lifestyle Choices
- Maintain a regular sleep schedule
- Limit caffeine and alcohol
- Eat a balanced diet
- Stay connected with supportive friends and family

## When to Seek Professional Help

Consider reaching out to a mental health professional if:
- Anxiety interferes with your daily life
- You're avoiding important activities
- You're using substances to cope
- You're having thoughts of self-harm

Remember, seeking help is a sign of strength, not weakness. There are effective treatments available, including therapy and medication.

## Building Your Support System

Having a strong support system is crucial for managing anxiety:
- Talk to trusted friends or family members
- Consider joining a support group
- Work with a therapist or counselor
- Use apps and online resources

## Final Thoughts

Managing anxiety is a journey, not a destination. Be patient with yourself as you learn new coping strategies. What works for one person might not work for another, so it's important to find the techniques that work best for you.

Remember that anxiety is treatable, and with the right tools and support, you can learn to manage it effectively.
    `
  }

  return (
    <div className="flex-1 overflow-y-auto pb-20">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-card1 border-b border-border sticky top-0 z-10">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-lg font-bold text-foreground1">{guideContent.title}</h1>
            <div className="flex items-center space-x-3 text-sm text-muted-foreground1">
              <div className="flex items-center space-x-1">
                <User className="w-3 h-3" />
                <span>{guideContent.author}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{guideContent.readTime}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <Bookmark className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Share2 className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="prose prose-sm max-w-none">
          {guideContent.content.split('\n').map((line, index) => {
            if (line.startsWith('# ')) {
              return (
                <h1 key={index} className="text-2xl font-bold text-foreground1 mt-8 mb-4">
                  {line.replace('# ', '')}
                </h1>
              )
            } else if (line.startsWith('## ')) {
              return (
                <h2 key={index} className="text-xl font-semibold text-foreground1 mt-6 mb-3">
                  {line.replace('## ', '')}
                </h2>
              )
            } else if (line.startsWith('### ')) {
              return (
                <h3 key={index} className="text-lg font-medium text-foreground1 mt-4 mb-2">
                  {line.replace('### ', '')}
                </h3>
              )
            } else if (line.startsWith('- ')) {
              return (
                <li key={index} className="text-muted-foreground1 ml-4 mb-1">
                  {line.replace('- ', '')}
                </li>
              )
            } else if (line.trim() === '') {
              return <br key={index} />
            } else {
              return (
                <p key={index} className="text-muted-foreground1 mb-3 leading-relaxed">
                  {line}
                </p>
              )
            }
          })}
        </div>
      </div>

      {/* Bottom Action */}
      <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-10">
        <Button className="shadow-medium">
          <Bookmark className="w-4 h-4 mr-2" />
          Save Guide
        </Button>
      </div>
    </div>
  )
}