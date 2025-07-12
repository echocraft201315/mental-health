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
      <DialogContent className="bg-gradient-card shadow-soft border-0">
        <DialogHeader>
          <DialogTitle>Browse {category}</DialogTitle>
        </DialogHeader>
        <div className="flex justify-between items-center mb-4">
          <Button className="bg-gradient-gentle-primary hover:bg-gradient-gentle-secondary" onClick={() => setEdit({})}>
            Create New
          </Button>
        </div>
        <div className="max-h-80 overflow-y-auto space-y-4">
          {items.map(item => (
            <div key={item.id} className="flex items-center gap-4 p-3 bg-gradient-gentle-neutral/20 rounded-lg hover:bg-gradient-gentle-neutral/30 transition-all duration-300">
              <div className="w-24 h-16 flex items-center justify-center bg-gradient-gentle-neutral/30 rounded-lg overflow-hidden shadow-soft">
                {item.thumbnail ? (
                  <img src={item.thumbnail} alt={item.title} className="object-cover w-full h-full" />
                ) : (
                  <span className="text-muted-foreground">No Preview</span>
                )}
              </div>
              <div className="flex-1">
                <div className="font-medium">{item.title}</div>
                <div className="text-xs text-muted-foreground">{item.type} {item.duration || item.pages || item.readTime || ""}</div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => setPreview(item)} className="bg-gradient-gentle-neutral/50 hover:bg-gradient-gentle-primary/20">
                  Preview
                </Button>
                <Button size="sm" variant="outline" onClick={() => setEdit(item)} className="bg-gradient-gentle-neutral/50 hover:bg-gradient-gentle-primary/20">
                  Edit
                </Button>
                <Button size="sm" variant="destructive" onClick={() => setDel(item)} className="bg-gradient-gentle-warm hover:bg-gradient-gentle-warm/90">
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
        {/* Preview Modal */}
        {preview && (
          <Dialog open={!!preview} onOpenChange={() => setPreview(null)}>
            <DialogContent className="bg-gradient-card shadow-soft border-0">
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
                  <div className="bg-gradient-gentle-neutral/20 p-4 rounded-lg">Article content preview...</div>
                )}
                {preview.type === "Sound" && (
                  <audio src={preview.url} controls className="w-full" />
                )}
                {preview.type === "Template" && (
                  <div className="bg-gradient-gentle-neutral/20 p-4 rounded-lg">Template preview...</div>
                )}
                {preview.type === "Program" && (
                  <div className="bg-gradient-gentle-neutral/20 p-4 rounded-lg">Program preview...</div>
                )}
              </div>
              <Button onClick={() => setPreview(null)} className="bg-gradient-gentle-primary hover:bg-gradient-gentle-secondary">
                Close
              </Button>
            </DialogContent>
          </Dialog>
        )}
        {/* Edit/Create Modal */}
        {edit && (
          <Dialog open={!!edit} onOpenChange={() => setEdit(null)}>
            <DialogContent className="bg-gradient-card shadow-soft border-0">
              <DialogHeader>
                <DialogTitle>{edit.id ? "Edit" : "Create New"} {category}</DialogTitle>
              </DialogHeader>
              <form className="space-y-4">
                <input 
                  className="w-full border-0 bg-gradient-gentle-neutral/30 rounded-lg px-3 py-2 shadow-soft" 
                  placeholder="Title" 
                  defaultValue={edit.title || ""} 
                />
                <input 
                  className="w-full border-0 bg-gradient-gentle-neutral/30 rounded-lg px-3 py-2 shadow-soft" 
                  placeholder="URL or upload" 
                  defaultValue={edit.url || ""} 
                />
                <Button type="submit" className="bg-gradient-gentle-primary hover:bg-gradient-gentle-secondary">
                  {edit.id ? "Save" : "Create"}
                </Button>
              </form>
              <Button variant="outline" onClick={() => setEdit(null)} className="bg-gradient-gentle-neutral/50 hover:bg-gradient-gentle-primary/20">
                Cancel
              </Button>
            </DialogContent>
          </Dialog>
        )}
        {/* Delete Confirmation */}
        {del && (
          <Dialog open={!!del} onOpenChange={() => setDel(null)}>
            <DialogContent className="bg-gradient-card shadow-soft border-0">
              <DialogHeader>
                <DialogTitle>Delete {del.title}?</DialogTitle>
              </DialogHeader>
              <div className="mb-4 p-3 bg-gradient-gentle-warm/20 rounded-lg">
                Are you sure you want to delete this {category.toLowerCase()}? This action cannot be undone.
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDel(null)} className="bg-gradient-gentle-neutral/50 hover:bg-gradient-gentle-primary/20">
                  Cancel
                </Button>
                <Button variant="destructive" onClick={() => { setDel(null); /* TODO: handle delete */ }} className="bg-gradient-gentle-warm hover:bg-gradient-gentle-warm/90">
                  Delete
                </Button>
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
      <DialogContent className="bg-gradient-card shadow-soft border-0">
        <DialogHeader>
          <DialogTitle>Add New Content</DialogTitle>
        </DialogHeader>
        <form className="space-y-4">
          <select 
            className="w-full border-0 bg-gradient-gentle-neutral/30 rounded-lg px-3 py-2 shadow-soft" 
            value={type} 
            onChange={e => setType(e.target.value)}
          >
            <option value="">Select type...</option>
            {Object.keys(mockLibrary).map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <input 
            className="w-full border-0 bg-gradient-gentle-neutral/30 rounded-lg px-3 py-2 shadow-soft" 
            placeholder="Title" 
          />
          <input 
            className="w-full border-0 bg-gradient-gentle-neutral/30 rounded-lg px-3 py-2 shadow-soft" 
            placeholder="URL or upload" 
          />
          <Button type="submit" className="bg-gradient-gentle-primary hover:bg-gradient-gentle-secondary">
            Add
          </Button>
        </form>
        <Button variant="outline" onClick={onClose} className="bg-gradient-gentle-neutral/50 hover:bg-gradient-gentle-primary/20">
          Cancel
        </Button>
      </DialogContent>
    </Dialog>
  );
}

const Library = () => {
  const [dialogCategory, setDialogCategory] = useState(null);
  const [preview, setPreview] = useState(null);
  const [edit, setEdit] = useState(null);
  const [del, setDel] = useState(null);
  const categories = [
    {
      title: "Videos",
      count: 18,
      icon: Play,
      color: "bg-gradient-gentle-primary-20 text-blue-700",
      description: "Training videos and tutorials"
    },
    {
      title: "Images",
      count: 167,
      icon: Image,
      color: "bg-gradient-gentle-secondary-20 text-green-700",
      description: "Motivational and educational images"
    },
    {
      title: "Articles",
      count: 15,
      icon: FileText,
      color: "bg-gradient-gentle-accent-20 text-yellow-700",
      description: "Educational articles and guides"
    },
    {
      title: "Sounds",
      count: 23,
      icon: Volume2,
      color: "bg-gradient-gentle-cool-20 text-cyan-700",
      description: "Meditation and relaxation audio"
    },
    {
      title: "Templates",
      count: 8,
      icon: Layout,
      color: "bg-gradient-gentle-warm-20 text-purple-700",
      description: "Worksheets and forms"
    },
    {
      title: "Programs",
      count: 5,
      icon: FolderOpen,
      color: "bg-gradient-gentle-neutral-20 text-orange-700",
      description: "Complete coaching programs"
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [addContentOpen, setAddContentOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-gentle-neutral bg-pattern-subtle p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-900 mb-8">Library</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {categories.map(cat => (
            <Card
              key={cat.title}
              className="hover:shadow-medium transition-all duration-300 cursor-pointer bg-gradient-card shadow-soft border-0"
              onClick={() => setDialogCategory(cat.title)}
            >
              <CardHeader>
                <div className="flex items-center justify-center w-14 h-14 rounded-lg mb-4 text-3xl">
                  {cat.title === 'Videos' && <cat.icon size={32} className="text-blue-500" />}
                  {cat.title === 'Images' && <cat.icon size={32} className="text-green-500" />}
                  {cat.title === 'Articles' && <cat.icon size={32} className="text-yellow-500" />}
                  {cat.title === 'Sounds' && <cat.icon size={32} className="text-cyan-500" />}
                  {cat.title === 'Templates' && <cat.icon size={32} className="text-purple-500" />}
                  {cat.title === 'Programs' && <cat.icon size={32} className="text-orange-500" />}
                </div>
                <div className="flex items-center mb-2">
                  <span className="text-xl font-bold text-blue-900 mr-2">{cat.title}</span>
                  <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded-full">{cat.count}</span>
                </div>
                <div className="text-blue-700 text-sm mb-2">{cat.description}</div>
              </CardHeader>
              <CardContent>
                <span className="text-blue-400 text-xs group-hover:underline">Browse {cat.title}</span>
              </CardContent>
            </Card>
          ))}
        </div>
        {/* Dialog for selected category */}
        {dialogCategory && (
          <Dialog open={!!dialogCategory} onOpenChange={() => setDialogCategory(null)}>
            <DialogContent
              style={{ borderColor: '#60a5fa' }}
              className="max-w-2xl bg-white border-2 shadow-2xl rounded-xl p-8"
            >
              <DialogHeader>
                <DialogTitle className="text-blue-900 text-2xl font-bold mb-2">{dialogCategory}</DialogTitle>
              </DialogHeader>
              <div className="flex justify-between items-center mb-4">
                <Button className="bg-gradient-gentle-primary hover:bg-gradient-gentle-secondary" onClick={() => setEdit({})}>
                  Create New
                </Button>
              </div>
              <div className="max-h-80 overflow-y-auto divide-y divide-blue-100">
                {mockLibrary[dialogCategory].map((item, idx, arr) => (
                  <div
                    key={item.id}
                    style={{ borderColor: '#60a5fa' }}
                    className={`flex items-center gap-4 p-3 bg-white border-2 rounded-lg transition-all duration-200 ${
                      idx !== arr.length - 1 ? 'mb-4' : ''
                    } hover:border-blue-500 hover:bg-blue-50`}
                  >
                    <div className="w-24 h-16 flex items-center justify-center bg-blue-50 rounded-lg overflow-hidden shadow-soft">
                      {item.thumbnail ? (
                        <img src={item.thumbnail} alt={item.title} className="object-cover w-full h-full" />
                      ) : (
                        <span className="text-muted-foreground">No Preview</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-blue-900">{item.title}</div>
                      <div className="text-xs text-blue-700">{item.type} {item.duration || item.pages || item.readTime || ""}</div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => setPreview(item)} className="bg-blue-50 border-blue-200 hover:bg-blue-100 hover:border-blue-400 text-blue-700">
                        Preview
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setEdit(item)} className="bg-blue-50 border-blue-200 hover:bg-blue-100 hover:border-blue-400 text-blue-700">
                        Edit
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => setDel(item)} className="bg-red-50 border-red-200 hover:bg-red-100 hover:border-red-400 text-red-700">
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              {/* Preview Modal */}
              {preview && (
                <Dialog open={!!preview} onOpenChange={() => setPreview(null)}>
                  <DialogContent
                    style={{ borderColor: '#60a5fa' }}
                    className="max-w-lg bg-white border-2 shadow-2xl rounded-xl p-8"
                  >
                    <DialogHeader>
                      <DialogTitle className="text-blue-900 font-bold text-2xl mb-2">
                        {preview.title}
                      </DialogTitle>
                      <div className="text-blue-700 mb-4">{preview.type} {preview.duration || preview.pages || preview.readTime || ""}</div>
                    </DialogHeader>
                    <div className="mb-6">
                      {preview.type === "Video" && (
                        <video src={preview.url} controls className="w-full rounded-lg shadow" poster={preview.thumbnail} />
                      )}
                      {preview.type === "Image" && (
                        <img src={preview.thumbnail} alt={preview.title} className="w-full rounded-lg shadow" />
                      )}
                      {preview.type === "Article" && (
                        <div className="bg-blue-50 p-4 rounded-lg shadow-inner text-blue-800">Article content preview...</div>
                      )}
                      {preview.type === "Sound" && (
                        <audio src={preview.url} controls className="w-full" />
                      )}
                      {preview.type === "Template" && (
                        <div className="bg-blue-50 p-4 rounded-lg shadow-inner text-blue-800">Template preview...</div>
                      )}
                      {preview.type === "Program" && (
                        <div className="bg-blue-50 p-4 rounded-lg shadow-inner text-blue-800">Program preview...</div>
                      )}
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button onClick={() => setPreview(null)} className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg px-6 py-2 shadow hover:from-blue-600 hover:to-blue-800">
                        Close
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
              {/* Edit/Create Modal */}
              {edit && (
                <Dialog open={!!edit} onOpenChange={() => setEdit(null)}>
                  <DialogContent
                    style={{ borderColor: '#60a5fa' }}
                    className="max-w-lg bg-white border-2 shadow-2xl rounded-xl p-8"
                  >
                    <DialogHeader>
                      <DialogTitle className="text-blue-900 font-bold text-2xl mb-2">{edit.id ? "Edit" : "Create New"} {dialogCategory}</DialogTitle>
                    </DialogHeader>
                    <form className="space-y-4">
                      <input 
                        className="w-full border border-blue-200 rounded-lg px-3 py-2 bg-white text-blue-900 focus:border-blue-500 focus:outline-none" 
                        placeholder="Title" 
                        defaultValue={edit.title || ""} 
                      />
                      <input 
                        className="w-full border border-blue-200 rounded-lg px-3 py-2 bg-white text-blue-900 focus:border-blue-500 focus:outline-none" 
                        placeholder="URL or upload" 
                        defaultValue={edit.url || ""} 
                      />
                      <div className="flex justify-end space-x-2 pt-2">
                        <Button type="button" onClick={() => setEdit(null)} className="px-4 py-2 rounded-lg border border-blue-200 text-blue-700 bg-white hover:bg-blue-100">Cancel</Button>
                        <Button type="submit" className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold shadow hover:from-blue-600 hover:to-blue-800">{edit.id ? "Save" : "Create"}</Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              )}
              {/* Delete Confirmation */}
              {del && (
                <Dialog open={!!del} onOpenChange={() => setDel(null)}>
                  <DialogContent
                    style={{ borderColor: '#60a5fa' }}
                    className="max-w-md bg-white border-2 shadow-2xl rounded-xl p-8"
                  >
                    <DialogHeader>
                      <DialogTitle className="text-blue-900 font-bold text-2xl mb-2">Delete {del.title}?</DialogTitle>
                    </DialogHeader>
                    <div className="mb-6 p-4 bg-blue-50 rounded-lg text-blue-800">
                      Are you sure you want to delete this {dialogCategory.toLowerCase()}? This action cannot be undone.
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setDel(null)} className="px-4 py-2 rounded-lg border border-blue-200 text-blue-700 bg-white hover:bg-blue-100">Cancel</Button>
                      <Button variant="destructive" onClick={() => { setDel(null); /* TODO: handle delete */ }} className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold shadow hover:from-red-600 hover:to-red-800">Delete</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
              <Button onClick={() => setDialogCategory(null)} className="mt-6 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg px-6 py-2 shadow hover:from-blue-600 hover:to-blue-800">
                Close
              </Button>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <AddContentDialog 
        open={addContentOpen} 
        onClose={() => setAddContentOpen(false)} 
      />
    </div>
  )
}

export default Library