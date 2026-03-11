import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { 
  Youtube, Search, PenTool, BarChart3, Image as ImageIcon, 
  Lightbulb, Repeat, Play, Plus, Trash2, Layout, Copy, 
  Bold, Italic, List, Sparkles, ChevronRight, Video, FileText,
  TrendingUp, Activity, MessageSquare, Loader2
} from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { 
  generateYouTubeIdeas, 
  generateYouTubeScript, 
  modifyYouTubeScript, 
  analyzeCompetitor, 
  generateThumbnailsAndTitles 
} from "@/services/geminiService";

const YouTubeAssistTool = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("ideas");
  const [scriptText, setScriptText] = useState(
    `[HOOK]\n(0:00-0:15)\n"Have you ever wondered why some small channels blow up overnight while others stay stuck at 100 views for years? \nIt's not luck. It's not the algorithm. It's a specific pattern I call 'The Outlier Strategy.' \nAnd today, I'm going to show you exactly how to use it on your next video."\n\n[INTRO]\n(0:15-0:45)\n"Look, we've all been there. You spend 10 hours writing, filming, and editing a video. You hit publish, refresh the page... and nothing. Crickets.\nBut what if I told you that you could predict a video's success *before* you even hit record?"`
  );
  
  // Ideas State
  const [ideaTopic, setIdeaTopic] = useState("");
  const [ideas, setIdeas] = useState([
    { title: "I Tried the '2-Hour Workday' for 30 Days", views: "1.2M", avg: "150K", hook: "Curiosity + Challenge" },
    { title: "Why 99% of Productivity Apps are Useless", views: "850K", avg: "90K", hook: "Contrarian + Negative" },
    { title: "The Only Notion Setup You'll Ever Need", views: "2.1M", avg: "300K", hook: "Ultimate Guide + Promise" },
    { title: "How I Read 100 Books a Year (Without Speed Reading)", views: "500K", avg: "50K", hook: "Achievement + Objection" }
  ]);
  const [isGeneratingIdeas, setIsGeneratingIdeas] = useState(false);

  // Editor State
  const [isGeneratingScript, setIsGeneratingScript] = useState(false);
  const [isModifyingScript, setIsModifyingScript] = useState(false);

  // Competitors State
  const [competitorUrl, setCompetitorUrl] = useState("");
  const [competitors, setCompetitors] = useState([
    { name: "Ali Abdaal", subs: "5.2M", recentOutlier: "How I built a $5M business in 3 years", outlierViews: "2.4M", status: "Tracking" },
    { name: "Mrwhosetheboss", subs: "18M", recentOutlier: "I tested the world's most expensive phone", outlierViews: "12M", status: "Tracking" },
    { name: "Marques Brownlee", subs: "18.5M", recentOutlier: "The Truth About the Apple Vision Pro", outlierViews: "8.1M", status: "Tracking" }
  ]);
  const [isAddingCompetitor, setIsAddingCompetitor] = useState(false);

  // Thumbnails State
  const [thumbnailTopic, setThumbnailTopic] = useState("");
  const [titles, setTitles] = useState([
    "I Tried the '2-Hour Workday' for 30 Days",
    "The 2-Hour Workday: Genius or Scam?",
    "How to Work 2 Hours a Day (And Still Get Paid)",
    "Stop Working 8 Hours a Day. Do This Instead.",
    "I Quit the 9-to-5 for the 2-Hour Workday"
  ]);
  const [thumbnails, setThumbnails] = useState([
    { concept: "Split Screen", desc: "Left side: You looking exhausted at a desk (8 hours). Right side: You relaxing on a beach with a laptop (2 hours)." },
    { concept: "The Proof", desc: "Close up of your face looking shocked, holding a phone showing a large bank deposit. Text: 'ONLY 2 HOURS?'" },
    { concept: "The Calendar", desc: "A calendar with 90% of the day crossed out in red marker. You pointing at the remaining 2 hours with a smirk." }
  ]);
  const [isGeneratingThumbnails, setIsGeneratingThumbnails] = useState(false);

  const handleGenerateIdeas = async () => {
    if (!ideaTopic) return;
    setIsGeneratingIdeas(true);
    try {
      const newIdeas = await generateYouTubeIdeas(ideaTopic);
      setIdeas(newIdeas);
      toast({ title: "Ideas Generated!", description: "Found some great outlier concepts for you." });
    } catch (error) {
      toast({ title: "Error", description: "Failed to generate ideas.", variant: "destructive" });
    } finally {
      setIsGeneratingIdeas(false);
    }
  };

  const handleGenerateScript = async (idea: any) => {
    setActiveTab("editor");
    setIsGeneratingScript(true);
    try {
      const script = await generateYouTubeScript(idea.title, idea.hook);
      setScriptText(script);
      toast({ title: "Script Generated!", description: "Your AI draft is ready to edit." });
    } catch (error) {
      toast({ title: "Error", description: "Failed to generate script.", variant: "destructive" });
    } finally {
      setIsGeneratingScript(false);
    }
  };

  const handleModifyScript = async (instruction: string) => {
    if (!scriptText) return;
    setIsModifyingScript(true);
    try {
      const newScript = await modifyYouTubeScript(scriptText, instruction);
      setScriptText(newScript);
      toast({ title: "Script Updated!", description: `Applied: ${instruction}` });
    } catch (error) {
      toast({ title: "Error", description: "Failed to modify script.", variant: "destructive" });
    } finally {
      setIsModifyingScript(false);
    }
  };

  const handleAddCompetitor = async () => {
    if (!competitorUrl) return;
    setIsAddingCompetitor(true);
    try {
      const comp = await analyzeCompetitor(competitorUrl);
      if (comp) {
        setCompetitors([comp, ...competitors]);
        setCompetitorUrl("");
        toast({ title: "Competitor Added", description: `Now tracking ${comp.name}` });
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to analyze competitor.", variant: "destructive" });
    } finally {
      setIsAddingCompetitor(false);
    }
  };

  const handleGenerateThumbnails = async () => {
    if (!thumbnailTopic) return;
    setIsGeneratingThumbnails(true);
    try {
      const data = await generateThumbnailsAndTitles(thumbnailTopic);
      setTitles(data.titles);
      setThumbnails(data.thumbnails);
      toast({ title: "Concepts Generated!", description: "Here are some high-CTR ideas." });
    } catch (error) {
      toast({ title: "Error", description: "Failed to generate concepts.", variant: "destructive" });
    } finally {
      setIsGeneratingThumbnails(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "ideas":
        return (
          <div className="space-y-6">
            <div className="glass p-6 rounded-2xl border border-border/50">
              <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-red-500" />
                Outlier Idea Generator
              </h2>
              <p className="text-muted-foreground text-sm mb-4">
                Enter your niche or a broad topic. Our AI will scan thousands of channels to find outlier videos (videos performing 3x-10x better than the channel average) and generate adapted ideas for you.
              </p>
              <div className="flex gap-3">
                <input 
                  type="text" 
                  placeholder="e.g., Personal Finance, Tech Reviews, Productivity..." 
                  className="flex-1 bg-background/50 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50"
                  value={ideaTopic}
                  onChange={(e) => setIdeaTopic(e.target.value)}
                />
                <button 
                  onClick={handleGenerateIdeas}
                  disabled={isGeneratingIdeas || !ideaTopic}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-medium text-sm transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  {isGeneratingIdeas ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  Find Outliers
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {isGeneratingIdeas ? (
                <div className="col-span-2 flex flex-col items-center justify-center py-12 text-muted-foreground">
                  <Loader2 className="w-8 h-8 animate-spin mb-4 text-red-500" />
                  <p>Analyzing thousands of channels for outliers...</p>
                </div>
              ) : (
                ideas.map((idea, i) => (
                  <div key={i} className="glass p-5 rounded-xl border border-border/50 hover:border-red-500/30 transition-colors cursor-pointer group">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-base group-hover:text-red-500 transition-colors">{idea.title}</h3>
                      <span className="bg-green-500/10 text-green-500 text-xs font-bold px-2 py-1 rounded-md">
                        {Math.round(parseInt(idea.views.replace('M', '000').replace('K', '')) / parseInt(idea.avg.replace('M', '000').replace('K', '')))}x Outlier
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                      <span className="flex items-center gap-1"><TrendingUp className="w-3 h-3" /> {idea.views} Views</span>
                      <span className="flex items-center gap-1"><Activity className="w-3 h-3" /> Avg: {idea.avg}</span>
                      <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" /> {idea.hook}</span>
                    </div>
                    <button 
                      onClick={() => handleGenerateScript(idea)} 
                      className="w-full py-2 rounded-lg bg-secondary text-secondary-foreground text-xs font-medium hover:bg-secondary/80 transition-colors"
                    >
                      Generate Script for this Idea
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        );
      
      case "editor":
        return (
          <div className="h-[calc(100vh-12rem)] flex flex-col">
            <div className="glass rounded-2xl p-6 flex-1 flex flex-col border border-border/50">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <PenTool className="w-5 h-5 text-red-500" />
                    AI Script Editor
                  </h2>
                  <span className="bg-red-500/10 text-red-500 text-xs font-medium px-2 py-1 rounded-md">Drafting</span>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors">
                    Save Draft
                  </button>
                  <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors">
                    <Sparkles className="h-4 w-4" />
                    AI Assist
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-1 mb-3 p-2 rounded-lg bg-muted/30 overflow-x-auto">
                {[Bold, Italic, List, Layout].map((Icon, i) => (
                  <button key={i} className="p-2 rounded-md hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors">
                    <Icon className="h-4 w-4" />
                  </button>
                ))}
                <div className="w-px h-5 bg-border mx-1" />
                <button 
                  onClick={() => handleModifyScript("Rewrite the hook to be more engaging")}
                  disabled={isModifyingScript}
                  className="px-3 py-1.5 rounded-md text-xs font-medium text-muted-foreground hover:bg-muted/50 transition-colors disabled:opacity-50"
                >
                  Rewrite Hook
                </button>
                <button 
                  onClick={() => handleModifyScript("Add B-Roll notes in brackets throughout the script")}
                  disabled={isModifyingScript}
                  className="px-3 py-1.5 rounded-md text-xs font-medium text-muted-foreground hover:bg-muted/50 transition-colors disabled:opacity-50"
                >
                  Add B-Roll Notes
                </button>
                <button 
                  onClick={() => handleModifyScript("Improve the pacing to be faster and punchier")}
                  disabled={isModifyingScript}
                  className="px-3 py-1.5 rounded-md text-xs font-medium text-muted-foreground hover:bg-muted/50 transition-colors disabled:opacity-50"
                >
                  Improve Pacing
                </button>
                <button 
                  onClick={() => handleModifyScript("Make the tone funnier and more relatable")}
                  disabled={isModifyingScript}
                  className="px-3 py-1.5 rounded-md text-xs font-medium text-muted-foreground hover:bg-muted/50 transition-colors disabled:opacity-50"
                >
                  Make it Funnier
                </button>
              </div>

              {isGeneratingScript || isModifyingScript ? (
                <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
                  <Loader2 className="w-8 h-8 animate-spin mb-4 text-red-500" />
                  <p>{isGeneratingScript ? "Drafting your script..." : "Applying AI edits..."}</p>
                </div>
              ) : (
                <textarea
                  value={scriptText}
                  onChange={(e) => setScriptText(e.target.value)}
                  className="flex-1 w-full bg-transparent border border-border/50 rounded-xl p-4 text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-red-500/40 mb-3"
                  placeholder="Start writing your script or ask AI to generate one..."
                />
              )}

              <div className="flex items-center justify-between pt-2 border-t border-border/50">
                <div className="flex gap-4">
                  <span className="text-xs text-muted-foreground font-medium">Est. time: ~4 mins</span>
                  <span className="text-xs text-muted-foreground font-medium">Words: {scriptText.split(' ').length}</span>
                </div>
                <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-muted/50 text-muted-foreground text-xs font-medium transition-colors">
                  <Copy className="h-3.5 w-3.5" />
                  Copy Script
                </button>
              </div>
            </div>
          </div>
        );

      case "competitors":
        return (
          <div className="space-y-6">
            <div className="glass p-6 rounded-2xl border border-border/50">
              <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-red-500" />
                Competitor Analysis
              </h2>
              <p className="text-muted-foreground text-sm mb-4">
                Track competitor channels to see what's working for them right now. We'll alert you when they post an outlier video.
              </p>
              <div className="flex gap-3">
                <input 
                  type="text" 
                  placeholder="Paste YouTube Channel URL..." 
                  className="flex-1 bg-background/50 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50"
                  value={competitorUrl}
                  onChange={(e) => setCompetitorUrl(e.target.value)}
                />
                <button 
                  onClick={handleAddCompetitor}
                  disabled={isAddingCompetitor || !competitorUrl}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-medium text-sm transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  {isAddingCompetitor ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                  Track Channel
                </button>
              </div>
            </div>

            <div className="grid gap-4">
              {competitors.map((comp, i) => (
                <div key={i} className="glass p-5 rounded-xl border border-border/50 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
                      <Youtube className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base">{comp.name}</h3>
                      <p className="text-xs text-muted-foreground">{comp.subs} Subscribers</p>
                    </div>
                  </div>
                  <div className="flex-1 px-8 hidden md:block">
                    <div className="text-xs text-muted-foreground mb-1">Recent Outlier Video</div>
                    <div className="text-sm font-medium truncate">{comp.recentOutlier}</div>
                    <div className="text-xs text-green-500 font-medium">{comp.outlierViews} Views</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-green-500/10 text-green-500 text-xs font-medium rounded-full">{comp.status}</span>
                    <button 
                      onClick={() => setCompetitors(competitors.filter((_, index) => index !== i))}
                      className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "thumbnails":
        return (
          <div className="space-y-6">
            <div className="glass p-6 rounded-2xl border border-border/50">
              <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-red-500" />
                Thumbnail & Title Lab
              </h2>
              <p className="text-muted-foreground text-sm mb-4">
                Generate high-CTR title variations and thumbnail concepts based on your video idea.
              </p>
              <div className="flex gap-3">
                <input 
                  type="text" 
                  placeholder="What is your video about?" 
                  className="flex-1 bg-background/50 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50"
                  value={thumbnailTopic}
                  onChange={(e) => setThumbnailTopic(e.target.value)}
                />
                <button 
                  onClick={handleGenerateThumbnails}
                  disabled={isGeneratingThumbnails || !thumbnailTopic}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-medium text-sm transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  {isGeneratingThumbnails ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  Generate Ideas
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass p-6 rounded-2xl border border-border/50">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-red-500" />
                  Title Variations
                </h3>
                {isGeneratingThumbnails ? (
                  <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin text-red-500" /></div>
                ) : (
                  <div className="space-y-3">
                    {titles.map((title, i) => (
                      <div key={i} className="p-3 rounded-lg bg-background/50 border border-border flex items-center justify-between group hover:border-red-500/30 transition-colors">
                        <span className="text-sm font-medium">{title}</span>
                        <button 
                          onClick={() => {
                            navigator.clipboard.writeText(title);
                            toast({ title: "Copied!", description: "Title copied to clipboard." });
                          }}
                          className="opacity-0 group-hover:opacity-100 p-1.5 text-muted-foreground hover:text-foreground transition-all"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="glass p-6 rounded-2xl border border-border/50">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-red-500" />
                  Thumbnail Concepts
                </h3>
                {isGeneratingThumbnails ? (
                  <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin text-red-500" /></div>
                ) : (
                  <div className="space-y-4">
                    {thumbnails.map((thumb, i) => (
                      <div key={i} className="p-4 rounded-lg bg-background/50 border border-border">
                        <div className="font-bold text-sm mb-1 text-red-500">{thumb.concept}</div>
                        <p className="text-xs text-muted-foreground leading-relaxed">{thumb.desc}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex pt-16">
        {/* Sidebar */}
        <aside className="w-64 border-r border-border/50 bg-card/30 hidden md:flex flex-col">
          <div className="p-6">
            <div className="flex items-center gap-2 font-heading font-bold text-lg mb-8">
              <Youtube className="w-6 h-6 text-red-500" />
              YouTube Assist
            </div>
            
            <nav className="space-y-2">
              {[
                { id: "ideas", icon: Lightbulb, label: "Idea Generator" },
                { id: "editor", icon: PenTool, label: "Script Editor" },
                { id: "competitors", icon: BarChart3, label: "Competitor Analysis" },
                { id: "thumbnails", icon: ImageIcon, label: "Thumbnail Lab" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    activeTab === item.id 
                      ? "bg-red-500/10 text-red-500" 
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
          
          <div className="mt-auto p-6">
            <div className="glass p-4 rounded-xl border border-red-500/20 bg-red-500/5">
              <h4 className="font-bold text-sm mb-1">Pro Plan Active</h4>
              <p className="text-xs text-muted-foreground mb-3">Unlimited AI Generations</p>
              <div className="w-full bg-background rounded-full h-1.5 mb-1">
                <div className="bg-red-500 h-1.5 rounded-full w-full"></div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <div className="max-w-5xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default YouTubeAssistTool;
