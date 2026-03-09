import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileText, PenTool, ArrowRight, Search, Filter, Plus, Calendar as CalendarIcon, MessageSquare, ThumbsUp, Eye, MoreHorizontal, GripVertical } from "lucide-react";
import { useState } from "react";

const ContentManagement = () => {
  const [view, setView] = useState("board"); // board, list

  const columns = [
    { id: "drafts", title: "Drafts", color: "bg-slate-400", count: 8 },
    { id: "review", title: "In-Review", color: "bg-blue-400", count: 2 },
    { id: "approved", title: "Approved", color: "bg-green-400", count: 3 },
    { id: "scheduled", title: "Scheduled", color: "bg-purple-400", count: 5 },
  ];

  const cards = [
    { id: 1, col: "drafts", time: "10:15 AM", text: "Most companies get employee advocacy backwards...", tags: ["Culture", "B2B"], author: "AM" },
    { id: 2, col: "drafts", time: "Yesterday", text: "LinkedIn is a platform for professionals, not just...", tags: ["Tips"], author: "AM" },
    { id: 3, col: "review", time: "Today", text: "I keep seeing B2B teams apply B2C-derived marketing...", tags: ["Marketing", "B2B"], author: "JS" },
    { id: 4, col: "approved", time: "Tomorrow", text: "AI is changing Customer Success but not in the way...", tags: ["AI", "CS"], author: "AM" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-24 max-w-7xl flex flex-col gap-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-heading font-bold text-3xl md:text-4xl mb-2 flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500/10 text-emerald-500 rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              Content Management
            </h1>
            <p className="text-muted-foreground">Drag-and-drop Kanban board for every post.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search posts..." 
                className="pl-9 pr-4 py-2 bg-card border border-border/50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 w-64"
              />
            </div>
            <button className="p-2 border border-border/50 rounded-lg text-muted-foreground hover:bg-muted transition-colors">
              <Filter className="w-4 h-4" />
            </button>
            <div className="flex bg-muted/30 p-1 rounded-lg border border-border/50">
              <button 
                onClick={() => setView("board")}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${view === 'board' ? 'bg-background shadow-sm text-emerald-500' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Board
              </button>
              <button 
                onClick={() => setView("list")}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${view === 'list' ? 'bg-background shadow-sm text-emerald-500' : 'text-muted-foreground hover:text-foreground'}`}
              >
                List
              </button>
            </div>
            <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-emerald-700 transition-colors shadow-md shadow-emerald-500/20">
              <Plus className="w-4 h-4" />
              New Post
            </button>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="bg-card border border-border/50 rounded-xl p-6 flex-1 flex gap-6 overflow-x-auto min-h-[600px]">
          {columns.map(col => (
            <div key={col.id} className="flex-1 min-w-[320px] max-w-[350px] bg-muted/20 rounded-xl p-4 flex flex-col border border-border/30">
              
              {/* Column Header */}
              <div className="flex items-center justify-between mb-4 px-1">
                <h3 className="font-bold text-sm flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${col.color}`}></span>
                  {col.title}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="bg-background border border-border/50 px-2 py-0.5 rounded-full text-xs font-bold text-muted-foreground">
                    {col.count}
                  </span>
                  <button className="text-muted-foreground hover:text-foreground p-1 rounded hover:bg-muted transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {/* Cards Container */}
              <div className="space-y-3 overflow-y-auto flex-1 pr-2 custom-scrollbar">
                {cards.filter(c => c.col === col.id).map((post) => (
                  <div 
                    key={post.id} 
                    className="bg-background border border-border/50 rounded-xl p-4 shadow-sm cursor-grab hover:border-emerald-500/50 hover:shadow-md transition-all group relative"
                  >
                    <div className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab">
                      <GripVertical className="w-4 h-4 text-muted-foreground/50" />
                    </div>
                    
                    <div className="pl-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex gap-1.5">
                          {post.tags.map(tag => (
                            <span key={tag} className="text-[10px] uppercase tracking-wider font-bold bg-muted text-muted-foreground px-2 py-0.5 rounded-sm">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
                          {post.author}
                        </div>
                      </div>
                      
                      <p className="text-sm font-medium leading-snug mb-4 text-foreground/90 line-clamp-3">
                        {post.text}
                      </p>
                      
                      <div className="flex items-center justify-between pt-3 border-t border-border/50">
                        <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                          <CalendarIcon className="w-3.5 h-3.5" />
                          {post.time}
                        </div>
                        
                        {col.id === 'approved' || col.id === 'scheduled' ? (
                          <div className="flex gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> 1.2k</span>
                            <span className="flex items-center gap-1"><ThumbsUp className="w-3.5 h-3.5" /> 45</span>
                            <span className="flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5" /> 12</span>
                          </div>
                        ) : (
                          <div className="flex -space-x-2">
                            <div className="w-6 h-6 rounded-full border-2 border-background bg-slate-200"></div>
                            <div className="w-6 h-6 rounded-full border-2 border-background bg-slate-300"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Add Card Button */}
                <button className="w-full py-3 border-2 border-dashed border-border/50 rounded-xl text-sm font-medium text-muted-foreground hover:border-emerald-500/50 hover:text-emerald-500 hover:bg-emerald-500/5 transition-colors flex items-center justify-center gap-2">
                  <Plus className="w-4 h-4" /> Add Post
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContentManagement;
