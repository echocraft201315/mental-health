"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Button } from "@/app/components/ui/button"
import { Badge } from "@/app/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/app/components/ui/accordion"
import { 
  Search, 
  MessageCircle, 
  Mail, 
  Phone, 
  Book, 
  Video, 
  FileText,
  HelpCircle,
  ExternalLink
} from "lucide-react"
import { useRouter } from "next/navigation"

const Help = () => {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const faqs = [
    {
      id: "1",
      question: "How do I schedule a session with my clients?",
      answer: "You can schedule sessions by navigating to the Sessions tab and clicking 'Schedule Session'. Select your client or group, choose a date and time, and add any session notes."
    },
    {
      id: "2", 
      question: "How can I add new clients to my dashboard?",
      answer: "Go to the Clients tab and click the 'Add Client' button. Fill in their information including name, contact details, and preferred session type (1-1 or group)."
    },
    {
      id: "3",
      question: "Can I create custom groups for my clients?",
      answer: "Yes! In the Groups tab, click 'Create Group' to form new groups. You can add existing clients or invite new ones to join the group sessions."
    },
    {
      id: "4",
      question: "How do I track client progress?",
      answer: "Each client profile contains a progress overview with charts, task completion rates, and session history. You can also add notes after each session."
    },
    {
      id: "5",
      question: "What types of content can I store in the Library?",
      answer: "The Library supports videos, images, articles, audio files, templates, and structured program materials. You can organize content by categories and share with specific clients."
    },
    {
      id: "6",
      question: "How do I manage tasks for my clients?",
      answer: "Use the Tasks tab to create, assign, and track tasks. You can set priorities, due dates, and monitor completion status for both client tasks and your own coaching tasks."
    }
  ]

  const resources = [
    {
      title: "Getting Started Guide",
      description: "Complete walkthrough for new coaches",
      type: "Guide",
      icon: Book
    },
    {
      title: "Video Tutorials",
      description: "Step-by-step video instructions",
      type: "Video",
      icon: Video
    },
    {
      title: "Best Practices",
      description: "Coaching tips and methodologies",
      type: "Article",
      icon: FileText
    },
    {
      title: "API Documentation",
      description: "Technical integration guide",
      type: "Technical",
      icon: ExternalLink
    }
  ]

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-gentle-neutral bg-pattern-subtle p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
          Help & Support
        </h1>

        {/* Search */}
        <Card className="mb-8 bg-gradient-card shadow-soft border-0">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for help articles, tutorials, or FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gradient-gentle-neutral/30 border-0 shadow-soft"
              />
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-medium transition-all duration-300 cursor-pointer bg-gradient-card shadow-soft border-0">
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 bg-gradient-gentle-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Live Chat</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get instant help from our support team
              </p>
              <Button className="bg-gradient-gentle-primary hover:bg-gradient-gentle-secondary">
                Start Chat
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-medium transition-all duration-300 cursor-pointer bg-gradient-card shadow-soft border-0">
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 bg-gradient-gentle-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Email Support</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Send us a detailed message
              </p>
              <Button variant="outline" className="bg-gradient-gentle-neutral/50 hover:bg-gradient-gentle-primary/20">
                Send Email
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-medium transition-all duration-300 cursor-pointer bg-gradient-card shadow-soft border-0">
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 bg-gradient-gentle-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Phone Support</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Call us at +1 (555) 123-HELP
              </p>
              <Button variant="outline" className="bg-gradient-gentle-neutral/50 hover:bg-gradient-gentle-primary/20">
                Call Now
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Learning Resources */}
        <Card className="mb-8 bg-gradient-card shadow-soft border-0">
          <CardHeader>
            <CardTitle>Learning Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resources.map((resource, index) => (
                <div key={index} className="flex items-center p-4 bg-gradient-gentle-neutral/20 rounded-lg hover:bg-gradient-gentle-neutral/30 cursor-pointer transition-all duration-300">
                  <div className="p-3 bg-gradient-gentle-primary/20 rounded-lg mr-4">
                    <resource.icon className="w-6 h-6 text-foreground" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{resource.title}</h4>
                    <p className="text-sm text-muted-foreground">{resource.description}</p>
                  </div>
                  <Badge variant="secondary">{resource.type}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card className="bg-gradient-card shadow-soft border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <HelpCircle className="w-5 h-5 mr-2" />
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredFaqs.length > 0 ? (
              <Accordion type="single" collapsible className="w-full">
                {filteredFaqs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id} className="border-b border-gradient-gentle-neutral/30">
                    <AccordionTrigger className="text-left hover:bg-gradient-gentle-neutral/10 rounded-lg px-4 py-2 transition-all duration-300">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground px-4 py-2">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No results found for "{searchQuery}"</p>
                <Button 
                  variant="outline" 
                  className="mt-4 bg-gradient-gentle-neutral/50 hover:bg-gradient-gentle-primary/20"
                  onClick={() => setSearchQuery("")}
                >
                  Clear Search
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Contact Info */}
        <Card className="mt-8 bg-gradient-card shadow-soft border-0">
          <CardHeader>
            <CardTitle>Still Need Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-gradient-gentle-neutral/20 rounded-lg">
                <h4 className="font-medium mb-2">Support Hours</h4>
                <p className="text-sm text-muted-foreground mb-1">Monday - Friday: 9AM - 6PM EST</p>
                <p className="text-sm text-muted-foreground mb-1">Saturday: 10AM - 4PM EST</p>
                <p className="text-sm text-muted-foreground">Sunday: Closed</p>
              </div>
              <div className="p-4 bg-gradient-gentle-warm/20 rounded-lg">
                <h4 className="font-medium mb-2">Emergency Contact</h4>
                <p className="text-sm text-muted-foreground mb-1">For urgent technical issues:</p>
                <p className="text-sm font-medium bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                  +1 (555) 911-HELP
                </p>
                <p className="text-sm text-muted-foreground">Available 24/7</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Help