"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Button } from "@/app/components/ui/button"
import { 
  Play, 
  Image, 
  FileText, 
  Volume2, 
  Layout, 
  FolderOpen,
  Plus,
  Search
} from "lucide-react"
import { Input } from "@/app/components/ui/input"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/app/components/ui/dialog";
import { useState } from "react";

const mockLibrary = {
  Videos: [
    { id: 1, title: "Mindfulness Meditation", type: "Video", url: "#", duration: "15 min", thumbnail: "https://placehold.co/320x180?text=Video+1" },
    { id: 2, title: "Stress Relief", type: "Video", url: "#", duration: "10 min", thumbnail: "https://placehold.co/320x180?text=Video+2" },
  ],
  Images: [
    { id: 1, title: "Motivation Poster", type: "Image", url: "#", thumbnail: "https://placehold.co/320x180?text=Image+1" },
    { id: 2, title: "Calm Beach", type: "Image", url: "#", thumbnail: "https://placehold.co/320x180?text=Image+2" },
  ],
  Articles: [
    { id: 1, title: "Success Mindset", type: "Article", url: "#", readTime: "8 min read" },
  ],
  Sounds: [
    { id: 1, title: "Ocean Waves", type: "Sound", url: "#", duration: "30 min" },
  ],
  Templates: [
    { id: 1, title: "Goal Setting Worksheet", type: "Template", url: "#", pages: "3 pages" },
  ],
  Programs: [
    { id: 1, title: "4 Week Mindfulness", type: "Program", url: "#" },
  ],
};

function BrowseContentDialog({ category, open, onClose }) {
  const items = mockLibrary[category] || [];
  const [preview, setPreview] = useState(null);
  const [edit, setEdit] = useState(null);
  const [del, setDel] = useState(null);
  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Browse {category}</DialogTitle>
        </DialogHeader>
        <div className="flex justify-between items-center mb-4">
          <Button className="bg-luxury-pink" onClick={() => setEdit({})}>Create New</Button>
        </div>
        <div className="max-h-80 overflow-y-auto space-y-4">
          {items.map(item => (
            <div key={item.id} className="flex items-center gap-4 p-2 border rounded-lg bg-white">
              <div className="w-24 h-16 flex items-center justify-center bg-muted rounded-md overflow-hidden">
                {item.thumbnail ? (
                  <img src={item.thumbnail} alt={item.title} className="object-cover w-full h-full" />
                ) : (
                  <span className="text-muted-foreground">No Preview</span>
                )}
              </div>
              <div className="flex-1">
                <div className="font-medium text-luxury-dark">{item.title}</div>
                <div className="text-xs text-muted-foreground">{item.type} {item.duration || item.pages || item.readTime || ""}</div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => setPreview(item)}>Preview</Button>
                <Button size="sm" variant="outline" onClick={() => setEdit(item)}>Edit</Button>
                <Button size="sm" variant="destructive" onClick={() => setDel(item)}>Delete</Button>
              </div>
            </div>
          ))}
        </div>
        {/* Preview Modal */}
        {preview && (
          <Dialog open={!!preview} onOpenChange={() => setPreview(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Preview: {preview.title}</DialogTitle>
              </DialogHeader>
              <div className="mb-4">
                {preview.type === "Video" && (
                  <video src={preview.url} controls className="w-full rounded-lg" poster={preview.thumbnail} />
                )}
                {preview.type === "Image" && (
                  <img src={preview.thumbnail} alt={preview.title} className="w-full rounded-lg" />
                )}
                {preview.type === "Article" && (
                  <div className="bg-muted p-4 rounded-lg">Article content preview...</div>
                )}
                {preview.type === "Sound" && (
                  <audio src={preview.url} controls className="w-full" />
                )}
                {preview.type === "Template" && (
                  <div className="bg-muted p-4 rounded-lg">Template preview...</div>
                )}
                {preview.type === "Program" && (
                  <div className="bg-muted p-4 rounded-lg">Program preview...</div>
                )}
              </div>
              <Button onClick={() => setPreview(null)}>Close</Button>
            </DialogContent>
          </Dialog>
        )}
        {/* Edit/Create Modal */}
        {edit && (
          <Dialog open={!!edit} onOpenChange={() => setEdit(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{edit.id ? "Edit" : "Create New"} {category}</DialogTitle>
              </DialogHeader>
              <form className="space-y-4">
                <input className="w-full border rounded-md px-3 py-2" placeholder="Title" defaultValue={edit.title || ""} />
                <input className="w-full border rounded-md px-3 py-2" placeholder="URL or upload" defaultValue={edit.url || ""} />
                <Button type="submit" className="bg-luxury-pink">{edit.id ? "Save" : "Create"}</Button>
              </form>
              <Button variant="outline" onClick={() => setEdit(null)}>Cancel</Button>
            </DialogContent>
          </Dialog>
        )}
        {/* Delete Confirmation */}
        {del && (
          <Dialog open={!!del} onOpenChange={() => setDel(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete {del.title}?</DialogTitle>
              </DialogHeader>
              <div className="mb-4">Are you sure you want to delete this {category.toLowerCase()}? This action cannot be undone.</div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDel(null)}>Cancel</Button>
                <Button variant="destructive" onClick={() => { setDel(null); /* TODO: handle delete */ }}>Delete</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </DialogContent>
    </Dialog>
  );
}

function AddContentDialog({ open, onClose }) {
  const [type, setType] = useState("");
  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Content</DialogTitle>
        </DialogHeader>
        <form className="space-y-4">
          <select className="w-full border rounded-md px-3 py-2" value={type} onChange={e => setType(e.target.value)}>
            <option value="">Select type...</option>
            {Object.keys(mockLibrary).map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <input className="w-full border rounded-md px-3 py-2" placeholder="Title" />
          <input className="w-full border rounded-md px-3 py-2" placeholder="URL or upload" />
          <Button type="submit" className="bg-luxury-pink">Add</Button>
        </form>
        <Button variant="outline" onClick={onClose}>Cancel</Button>
      </DialogContent>
    </Dialog>
  );
}

const Library = () => {
  const categories = [
    {
      title: "Videos",
      count: 18,
      icon: Play,
      color: "bg-blue-100 text-blue-700",
      description: "Training videos and tutorials"
    },
    {
      title: "Images",
      count: 167,
      icon: Image,
      color: "bg-green-100 text-green-700",
      description: "Motivational and educational images"
    },
    {
      title: "Articles",
      count: 15,
      icon: FileText,
      color: "bg-purple-100 text-purple-700",
      description: "Educational articles and guides"
    },
    {
      title: "Sounds",
      count: 20,
      icon: Volume2,
      color: "bg-orange-100 text-orange-700",
      description: "Meditation and relaxation sounds"
    },
    {
      title: "Templates",
      count: 12,
      icon: Layout,
      color: "bg-pink-100 text-pink-700",
      description: "Structured reply snippets"
    },
    {
      title: "Programs",
      count: 8,
      icon: FolderOpen,
      color: "bg-indigo-100 text-indigo-700",
      description: "4 week program materials"
    },
  ]

  const [browse, setBrowse] = useState(null);
  const [addContent, setAddContent] = useState(false);

  return (
    <div className="min-h-screen bg-luxury-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-luxury-dark">Library</h1>
          <Button className="bg-luxury-pink hover:bg-luxury-pink/90" onClick={() => setAddContent(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Content
          </Button>
        </div>
        <AddContentDialog open={addContent} onClose={() => setAddContent(false)} />

        {/* Search Bar */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search library content..."
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Content Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categories.map((category) => (
            <Card key={category.title} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-lg ${category.color}`}>
                      <category.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <CardTitle className="text-luxury-dark">{category.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-luxury-gold/20 text-luxury-dark">
                    {category.count}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" onClick={() => setBrowse(category.title)}>
                  Browse {category.title}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        {browse && <BrowseContentDialog category={browse} open={!!browse} onClose={() => setBrowse(null)} />}

        {/* Recent Content */}
        <div>
          <h2 className="text-2xl font-bold text-luxury-dark mb-6">Recent Content</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Mindfulness Meditation", type: "Video", duration: "15 min" },
              { title: "Goal Setting Worksheet", type: "Template", pages: "3 pages" },
              { title: "Success Mindset", type: "Article", readTime: "8 min read" },
              { title: "Ocean Waves", type: "Sound", duration: "30 min" },
            ].map((item, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="aspect-video bg-muted rounded-lg mb-3 flex items-center justify-center">
                    <div className="text-muted-foreground">
                      {item.type === "Video" && <Play className="w-8 h-8" />}
                      {item.type === "Template" && <Layout className="w-8 h-8" />}
                      {item.type === "Article" && <FileText className="w-8 h-8" />}
                      {item.type === "Sound" && <Volume2 className="w-8 h-8" />}
                    </div>
                  </div>
                  <h3 className="font-medium text-luxury-dark mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{item.type}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.duration || item.pages || item.readTime}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Library