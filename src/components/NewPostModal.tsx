import { useState } from "react";
import { X, Calendar, Clock, Link, Type, Sparkles, Loader2 } from "lucide-react";
import { savePost } from "@/services/firebaseService";
import { generatePostContent } from "@/services/geminiService";
import { auth } from "@/services/firebaseService";
import { useToast } from "@/components/ui/use-toast";

interface NewPostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewPostModal = ({ isOpen, onClose }: NewPostModalProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [platform, setPlatform] = useState<'linkedin' | 'youtube' | 'instagram' | 'x'>('linkedin');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  if (!isOpen) return null;

  const handleGenerate = async () => {
    if (!title) return;
    setIsGenerating(true);
    try {
      const generated = await generatePostContent(title, platform);
      setContent(generated);
    } catch (error) {
      console.error("Failed to generate post:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) {
      toast({ title: "Authentication Required", description: "Please log in to save posts.", variant: "destructive" });
      return;
    }
    try {
      await savePost({
        title,
        content,
        platform,
        status: 'draft',
        scheduledDate: null,
      });
      onClose();
      setTitle("");
      setContent("");
      toast({ title: "Success", description: "Post saved successfully." });
    } catch (error) {
      console.error("Failed to save post:", error);
      toast({ title: "Error", description: "Failed to save post.", variant: "destructive" });
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-card rounded-2xl shadow-2xl border border-border p-6 relative">
        <div className="flex justify-between items-center mb-6 border-b border-border/50 pb-4">
          <h3 className="text-xl font-bold">Create New Post</h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground p-2 rounded-full hover:bg-muted transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-bold mb-2 block">Platform</label>
            <select 
              value={platform} 
              onChange={(e) => setPlatform(e.target.value as 'linkedin' | 'youtube' | 'instagram' | 'x')}
              className="w-full border border-border/50 rounded-lg p-3 text-sm bg-background"
            >
              <option value="linkedin">LinkedIn</option>
              <option value="youtube">YouTube</option>
              <option value="x">X (Twitter)</option>
              <option value="instagram">Instagram</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-bold mb-2 block">Title / Topic</label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-border/50 rounded-lg p-3 text-sm bg-background"
              placeholder="What do you want to post about?"
              required
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-bold block">Content</label>
              <button 
                type="button"
                onClick={handleGenerate}
                disabled={!title || isGenerating}
                className="text-xs font-bold text-orange-600 hover:text-orange-700 transition-colors bg-orange-500/10 px-3 py-1.5 rounded-md flex items-center gap-1 disabled:opacity-50"
              >
                {isGenerating ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                {isGenerating ? "Generating..." : "Auto-Generate"}
              </button>
            </div>
            <textarea 
              value={content} 
              onChange={(e) => setContent(e.target.value)}
              className="w-full border border-border/50 rounded-lg p-3 text-sm bg-background h-32"
              required
            />
          </div>
          
          <div className="flex justify-end gap-3 pt-4 border-t border-border/50">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-border rounded-lg text-sm font-bold hover:bg-muted transition-colors">
              Cancel
            </button>
            <button type="submit" className="px-6 py-2 bg-orange-600 text-white rounded-lg text-sm font-bold hover:bg-orange-700 transition-colors shadow-md shadow-orange-500/20">
              Save Draft
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPostModal;
