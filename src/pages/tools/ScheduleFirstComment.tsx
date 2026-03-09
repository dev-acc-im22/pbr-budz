import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MessageCircle, ThumbsUp, MessageSquare, Share2, Send, CheckCircle2, X as XIcon, Clock, Zap, Settings, History, Plus, FileText } from "lucide-react";
import { useState } from "react";

const ScheduleFirstComment = () => {
  const [autoPlug, setAutoPlug] = useState(true);
  const [comment, setComment] = useState("");
  const [delay, setDelay] = useState("Immediately");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-24 max-w-7xl flex gap-8">
        
        {/* Sidebar */}
        <aside className="w-64 hidden lg:flex flex-col gap-6">
          <div className="bg-card border border-border/50 rounded-xl p-4">
            <h3 className="font-bold text-sm mb-4 text-muted-foreground uppercase tracking-wider">Automations</h3>
            <nav className="space-y-2">
              <button className="w-full flex items-center gap-3 px-3 py-2 bg-green-500/10 text-green-500 rounded-lg font-medium text-sm transition-colors">
                <Zap className="w-4 h-4" /> Active (3)
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 text-muted-foreground hover:bg-muted rounded-lg font-medium text-sm transition-colors">
                <History className="w-4 h-4" /> Past Logs
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 text-muted-foreground hover:bg-muted rounded-lg font-medium text-sm transition-colors">
                <Settings className="w-4 h-4" /> Settings
              </button>
            </nav>
          </div>

          <div className="bg-card border border-border/50 rounded-xl p-4 flex-1">
            <h3 className="font-bold text-sm mb-4 text-muted-foreground uppercase tracking-wider flex justify-between items-center">
              Comment Library
              <button className="p-1 hover:bg-muted rounded text-green-500"><Plus className="w-4 h-4" /></button>
            </h3>
            <div className="space-y-3">
              {[
                { title: "Newsletter Plug", desc: "Join 10k+ founders..." },
                { title: "Course Link", desc: "Want to learn more?..." },
                { title: "Free Resource", desc: "Grab my free guide..." }
              ].map((item, i) => (
                <div key={i} className="group cursor-pointer p-3 border border-border/50 rounded-lg hover:border-green-500/50 transition-colors bg-muted/30">
                  <p className="text-sm font-bold truncate group-hover:text-green-500 transition-colors mb-1">{item.title}</p>
                  <p className="text-xs text-muted-foreground line-clamp-2">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h1 className="font-heading font-bold text-3xl md:text-4xl mb-2 flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/10 text-green-500 rounded-xl flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                Schedule First Comment
              </h1>
              <p className="text-muted-foreground">Auto-publish a follow-up comment the moment your post goes live.</p>
            </div>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg font-bold text-sm hover:bg-green-700 transition-colors flex items-center gap-2 shadow-lg shadow-green-500/20">
              <CheckCircle2 className="w-4 h-4" /> Save Automation
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8 h-full">
            {/* Post Selection & Preview */}
            <div className="bg-card border border-border/50 rounded-xl p-6 flex flex-col shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <FileText className="w-5 h-5 text-muted-foreground" />
                  1. Select Post
                </h3>
                <button className="text-sm font-bold text-green-500 hover:text-green-600 transition-colors">Change Post</button>
              </div>
              
              <div className="border border-border/50 rounded-xl p-6 mb-4 bg-muted/10 shadow-sm flex-1 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-green-500"></div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold text-lg shadow-md">AM</div>
                    <div>
                      <p className="font-bold text-base">Alex Morgan</p>
                      <p className="text-xs text-muted-foreground">Founder at BrandPilot AI • 1h</p>
                    </div>
                  </div>
                  <MoreHorizontal className="w-5 h-5 text-muted-foreground cursor-pointer" />
                </div>
                
                <p className="text-sm mb-6 leading-relaxed">
                  The biggest mistake I see founders make on LinkedIn? They treat it like a resume.<br/><br/>
                  Stop broadcasting.<br/>
                  Start connecting.<br/><br/>
                  Share your failures, your lessons, your process. That's what people actually want to read.
                </p>
                
                <div className="flex items-center justify-between border-b border-border/50 pb-3 mb-3">
                  <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                    <div className="bg-blue-500/10 p-1.5 rounded-full"><ThumbsUp className="w-3.5 h-3.5 text-blue-500" /></div> You and 124 others
                  </div>
                  <div className="text-xs text-muted-foreground hover:underline cursor-pointer">0 Comments</div>
                </div>
                
                <div className="flex justify-between px-2">
                  <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground cursor-pointer transition-colors"><ThumbsUp className="w-5 h-5" /> Like</div>
                  <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground cursor-pointer transition-colors"><MessageSquare className="w-5 h-5" /> Comment</div>
                  <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground cursor-pointer transition-colors"><Share2 className="w-5 h-5" /> Share</div>
                  <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground cursor-pointer transition-colors"><Send className="w-5 h-5" /> Send</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground bg-muted/50 p-3 rounded-lg border border-border/50">
                <Clock className="w-4 h-4 text-orange-500" />
                Post scheduled for: <strong className="text-foreground">Tomorrow at 09:00 AM</strong>
              </div>
            </div>

            {/* Comment Configuration */}
            <div className="bg-card border border-border/50 rounded-xl p-6 flex flex-col shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-green-500" />
                  2. Configure Comment
                </h3>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-muted-foreground">Status:</span>
                  <button 
                    onClick={() => setAutoPlug(!autoPlug)}
                    className={`w-12 h-6 rounded-full relative transition-colors shadow-inner ${autoPlug ? 'bg-green-500' : 'bg-muted border border-border/50'}`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all shadow-sm ${autoPlug ? 'right-1' : 'left-1'}`}></div>
                  </button>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-6">Add CTAs, links, or context that drives clicks without hurting post reach.</p>
              
              <div className="space-y-6 flex-1 flex flex-col">
                <div>
                  <label className="text-sm font-bold mb-2 block">Delay</label>
                  <select 
                    value={delay}
                    onChange={(e) => setDelay(e.target.value)}
                    className="w-full bg-background border border-border/50 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50 appearance-none cursor-pointer hover:border-green-500/50 transition-colors"
                  >
                    <option>Immediately</option>
                    <option>5 minutes after posting</option>
                    <option>15 minutes after posting</option>
                    <option>1 hour after posting</option>
                  </select>
                </div>
                
                <div className="border border-border/50 rounded-xl p-5 bg-muted/10 flex-1 flex flex-col shadow-inner">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-bold flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-green-500/20 text-green-600 flex items-center justify-center text-xs">1</div>
                      Comment Content
                    </span>
                    <button className="text-xs font-bold text-green-600 hover:text-green-700 transition-colors bg-green-500/10 px-3 py-1.5 rounded-md flex items-center gap-1">
                      <Plus className="w-3 h-3" /> Load Template
                    </button>
                  </div>
                  
                  <textarea 
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="P.S. If you want to learn how to build a personal brand that actually generates revenue, check out my free guide here: [link]"
                    className="w-full bg-background border border-border/50 rounded-lg p-4 text-sm flex-1 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500/50 resize-none shadow-sm"
                  ></textarea>
                  
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-green-600 bg-green-500/10 px-3 py-2 rounded-lg">
                      <CheckCircle2 className="w-4 h-4" /> First comment advantage
                    </div>
                    <span className="text-xs text-muted-foreground">{comment.length}/1250</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ScheduleFirstComment;
