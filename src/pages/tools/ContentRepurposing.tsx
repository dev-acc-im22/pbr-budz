import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Sparkles, PenTool, Youtube, Link as LinkIcon, FileText, Settings, History, ChevronRight, Copy, Calendar, Check, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

const ContentRepurposing = () => {
  const [sourceUrl, setSourceUrl] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState("");
  const [activeTab, setActiveTab] = useState("youtube");
  const [tone, setTone] = useState("Professional");

  const handleGenerate = () => {
    if (!sourceUrl) return;
    setIsGenerating(true);
    setTimeout(() => {
      setResult("🚀 Here is your repurposed LinkedIn post based on the provided content!\n\nIt's amazing how much value you can extract from a single piece of content when you know how to frame it for a new audience.\n\nKey takeaways:\n1️⃣ Content is king, but distribution is queen.\n2️⃣ Repurposing saves you 10x the time.\n3️⃣ Your audience needs to hear your message 7 times before it clicks.\n\nWhat's your favorite way to repurpose content?\n\n#ContentCreation #LinkedInTips #Repurposing #Marketing");
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-24 max-w-7xl flex gap-8">
        {/* Sidebar */}
        <aside className="w-64 hidden lg:flex flex-col gap-6">
          <div className="bg-card border border-border/50 rounded-xl p-4">
            <h3 className="font-bold text-sm mb-4 text-muted-foreground uppercase tracking-wider">Menu</h3>
            <nav className="space-y-2">
              <button className="w-full flex items-center gap-3 px-3 py-2 bg-primary/10 text-primary rounded-lg font-medium text-sm">
                <Sparkles className="w-4 h-4" /> New Repurpose
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 text-muted-foreground hover:bg-muted rounded-lg font-medium text-sm transition-colors">
                <History className="w-4 h-4" /> History
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 text-muted-foreground hover:bg-muted rounded-lg font-medium text-sm transition-colors">
                <Settings className="w-4 h-4" /> Settings
              </button>
            </nav>
          </div>

          <div className="bg-card border border-border/50 rounded-xl p-4 flex-1">
            <h3 className="font-bold text-sm mb-4 text-muted-foreground uppercase tracking-wider">Recent</h3>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="group cursor-pointer">
                  <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">How to build a SaaS in 2024</p>
                  <p className="text-xs text-muted-foreground">From YouTube • 2 days ago</p>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="mb-2">
            <h1 className="font-heading font-bold text-3xl md:text-4xl mb-2 flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-500/10 text-indigo-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              Content Repurposing
            </h1>
            <p className="text-muted-foreground">Turn existing content into high-performing LinkedIn posts.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-1 space-y-4">
              <h3 className="font-bold text-lg">1. Select Source</h3>
              <div 
                onClick={() => setActiveTab("youtube")}
                className={`bg-card border rounded-xl p-4 cursor-pointer transition-all ${activeTab === 'youtube' ? 'border-primary ring-1 ring-primary/20 shadow-md' : 'border-border/50 hover:border-primary/50'}`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-red-500/10 text-red-500 rounded-lg flex items-center justify-center">
                    <Youtube className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-sm">YouTube Video</h3>
                </div>
                <p className="text-xs text-muted-foreground">Extract key insights from any video.</p>
              </div>
              
              <div 
                onClick={() => setActiveTab("article")}
                className={`bg-card border rounded-xl p-4 cursor-pointer transition-all ${activeTab === 'article' ? 'border-primary ring-1 ring-primary/20 shadow-md' : 'border-border/50 hover:border-primary/50'}`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-emerald-500/10 text-emerald-500 rounded-lg flex items-center justify-center">
                    <LinkIcon className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-sm">Blog Article</h3>
                </div>
                <p className="text-xs text-muted-foreground">Summarize and format blog posts.</p>
              </div>

              <div 
                onClick={() => setActiveTab("pdf")}
                className={`bg-card border rounded-xl p-4 cursor-pointer transition-all ${activeTab === 'pdf' ? 'border-primary ring-1 ring-primary/20 shadow-md' : 'border-border/50 hover:border-primary/50'}`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-indigo-500/10 text-indigo-500 rounded-lg flex items-center justify-center">
                    <FileText className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-sm">PDF Document</h3>
                </div>
                <p className="text-xs text-muted-foreground">Turn reports into actionable posts.</p>
              </div>
            </div>

            <div className="md:col-span-2 flex flex-col gap-6">
              <div className="bg-card border border-border/50 rounded-xl p-6">
                <h3 className="font-bold text-lg mb-4">2. Configure & Generate</h3>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Source URL</label>
                    <input 
                      type="text" 
                      placeholder={activeTab === 'youtube' ? "Paste YouTube URL..." : activeTab === 'article' ? "Paste Article URL..." : "Upload PDF or paste link..."} 
                      className="w-full bg-background border border-border/50 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                      value={sourceUrl}
                      onChange={(e) => setSourceUrl(e.target.value)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Tone of Voice</label>
                      <select 
                        value={tone}
                        onChange={(e) => setTone(e.target.value)}
                        className="w-full bg-background border border-border/50 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none"
                      >
                        <option>Professional</option>
                        <option>Conversational</option>
                        <option>Provocative</option>
                        <option>Educational</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Post Length</label>
                      <select className="w-full bg-background border border-border/50 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none">
                        <option>Standard (1300 chars)</option>
                        <option>Short & Punchy</option>
                        <option>Long-form Story</option>
                      </select>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handleGenerate}
                  disabled={!sourceUrl || isGenerating}
                  className="w-full bg-primary text-primary-foreground px-4 py-3 rounded-lg font-bold hover:bg-primary/90 disabled:opacity-50 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                >
                  {isGenerating ? (
                    <><Sparkles className="w-5 h-5 animate-pulse" /> Analyzing Content...</>
                  ) : (
                    <><Sparkles className="w-5 h-5" /> Generate LinkedIn Post</>
                  )}
                </button>
              </div>

              {/* Result Area */}
              <div className="bg-card border border-border/50 rounded-xl p-6 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg">3. Review & Edit</h3>
                  {result && (
                    <div className="flex gap-2">
                      <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors" title="Copy">
                        <Copy className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors" title="Schedule">
                        <Calendar className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
                
                <div className="flex-1 border border-border/50 rounded-lg bg-background/50 p-4 min-h-[300px] relative">
                  {result ? (
                    <textarea 
                      className="w-full h-full bg-transparent resize-none focus:outline-none text-sm leading-relaxed"
                      defaultValue={result}
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                      <PenTool className="w-12 h-12 mb-4 opacity-20" />
                      <p className="text-sm font-medium">Your generated post will appear here</p>
                      <p className="text-xs opacity-60 mt-1">You can edit it before publishing.</p>
                    </div>
                  )}
                </div>
                
                {result && (
                  <div className="mt-4 flex justify-end gap-3">
                    <button className="px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors">
                      Regenerate
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
                      <Check className="w-4 h-4" /> Save to Drafts
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContentRepurposing;
