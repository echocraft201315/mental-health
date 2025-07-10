import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/app/components/ui/dialog"
import { Button } from "@/app/components/ui/button"
import { Badge } from "@/app/components/ui/badge"
import { Play, BookOpen, Users, Clock, Star } from "lucide-react"

export const CategoryDetailModal = ({ 
  isOpen, 
  onClose, 
  item,
  onPlayAudio,
  onStartProgram,
  onReadGuide,
  onJoinProgram
}) => {
  if (!item) return null

  const getIcon = () => {
    switch (item.type) {
      case "audio": return <Play className="w-5 h-5" />
      case "program": return <Users className="w-5 h-5" />
      case "guide": return <BookOpen className="w-5 h-5" />
      default: return <Play className="w-5 h-5" />
    }
  }

  const getPrimaryAction = () => {
    switch (item.type) {
      case "audio":
        return (
          <Button onClick={() => onPlayAudio?.(item)} className="flex-1">
            <Play className="w-4 h-4 mr-2" />
            Listen Now
          </Button>
        )
      case "program":
        return (
          <Button onClick={() => onStartProgram?.(item)} className="flex-1">
            <Users className="w-4 h-4 mr-2" />
            Start Program
          </Button>
        )
      case "guide":
        return (
          <Button onClick={() => onReadGuide?.(item)} className="flex-1">
            <BookOpen className="w-4 h-4 mr-2" />
            Read Guide
          </Button>
        )
      default:
        return null
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            {getIcon()}
            <span>{item.title}</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Item Info */}
          <div className="flex items-center space-x-2">
            <Badge variant="secondary1">{item.type}</Badge>
            {item.duration && (
              <div className="flex items-center space-x-1 text-sm text-muted-foreground1">
                <Clock className="w-3 h-3" />
                <span>{item.duration}</span>
              </div>
            )}
            {item.rating && (
              <div className="flex items-center space-x-1 text-sm text-muted-foreground1">
                <Star className="w-3 h-3 fill-current text-warning1" />
                <span>{item.rating}</span>
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground1 leading-relaxed">
            {item.description}
          </p>

          {/* Participants for programs */}
          {item.type === "program" && item.participants && (
            <div className="p-3 rounded-lg bg-gradient-primary1/10 border border-primary1/20">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground1">Active Participants</span>
                <Badge variant="secondary1">{item.participants}</Badge>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            {getPrimaryAction()}
          </div>

          {/* Join Program for programs */}
          {item.type === "program" && (
            <Button 
              variant="warm" 
              onClick={() => onJoinProgram?.(item)}
              className="w-full"
            >
              Join Program
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}