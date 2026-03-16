import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { 
  Instagram, PenTool, BarChart3, Lightbulb, 
  Repeat, Play, Plus, Trash2, Copy, 
  Sparkles, TrendingUp, Activity, MessageSquare, Loader2,
  Calendar, Clock, Target, Zap, Image as ImageIcon, Video,
  MessageCircle
} from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { generateInstaCaptions, rewriteInstaCaption, simulateInstaAlgorithm, generateThreads, optimizeThreadHook, simulateThreadsAlgorithm } from "@/services/geminiService";

const InstaAssistTool = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("writer");
  
  // Writer State
  const [postTopic, setPostTopic] = useState("");
  const [generatedCaptions, setGeneratedCaptions] = useState<{text: string, type: string}[]>([]);
  const [isGeneratingCaptions, setIsGeneratingCaptions] = useState(false);
  const [editorText, setEditorText] = useState("");
  const [isRewriting, setIsRewriting] = useState(false);

  // Simulator State
  const [simulatorText, setSimulatorText] = useState("");
  const [simulationResult, setSimulationResult] = useState<{score: number, reach: string, engagement: string, feedback: string} | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  // Threads State
  const [threadTopic, setThreadTopic] = useState("");
  const [generatedThreads, setGeneratedThreads] = useState<{text: string, type: string}[]>([]);
  const [isGeneratingThreads, setIsGeneratingThreads] = useState(false);
  const [threadHook, setThreadHook] = useState("");
  const [optimizedHook, setOptimizedHook] = useState("");
  const [isOptimizingHook, setIsOptimizingHook] = useState(false);
  const [threadSimResult, setThreadSimResult] = useState<{score: number, reach: string, engagement: string, feedback: string} | null>(null);
  const [isSimulatingThread, setIsSimulatingThread] = useState(false);

  // Scheduler State (Mock)
  const [scheduledPosts, setScheduledPosts] = useState([
    { text: "Behind the scenes of our latest project...", time: "Today, 5:00 PM", status: "Scheduled", type: "Reel" },
    { text: "5 tips for a better morning routine ☀️", time: "Tomorrow, 9:00 AM", status: "Scheduled", type: "Carousel" }
  ]);

  const handleGenerateCaptions = async () => {
    if (!postTopic) return;
    setIsGeneratingCaptions(true);
    try {
      const captions = await generateInstaCaptions(postTopic);
      setGeneratedCaptions(captions);
      toast({ title: "Captions Generated!", description: "Here are some ideas to get you started." });
    } catch (error) {
      toast({ title: "Error", description: "Failed to generate captions.", variant: "destructive" });
    } finally {
      setIsGeneratingCaptions(false);
    }
  };

  const handleRewrite = async (style: string) => {
    if (!editorText) return;
    setIsRewriting(true);
    try {
      const rewritten = await rewriteInstaCaption(editorText, style);
      setEditorText(rewritten);
      toast({ title: "Caption Rewritten!", description: `Applied style: ${style}` });
    } catch (error) {
      toast({ title: "Error", description: "Failed to rewrite caption.", variant: "destructive" });
    } finally {
      setIsRewriting(false);
    }
  };

  const handleSimulate = async () => {
    if (!simulatorText) return;
    setIsSimulating(true);
    try {
      const result = await simulateInstaAlgorithm(simulatorText);
      setSimulationResult(result);
      toast({ title: "Simulation Complete", description: "Algorithm analysis ready." });
    } catch (error) {
      toast({ title: "Error", description: "Failed to run simulation.", variant: "destructive" });
    } finally {
      setIsSimulating(false);
    }
  };

  const handleGenerateThreads = async () => {
    if (!threadTopic) return;
    setIsGeneratingThreads(true);
    try {
      const threads = await generateThreads(threadTopic);
      setGeneratedThreads(threads);
      toast({ title: "Threads Generated!", description: "Here are some thread ideas." });
    } catch (error) {
      toast({ title: "Error", description: "Failed to generate threads.", variant: "destructive" });
    } finally {
      setIsGeneratingThreads(false);
    }
  };

  const handleOptimizeHook = async () => {
    if (!threadHook) return;
    setIsOptimizingHook(true);
    try {
      const optimized = await optimizeThreadHook(threadHook);
      setOptimizedHook(optimized);
      toast({ title: "Hook Optimized!", description: "Your thread hook is now more engaging." });
    } catch (error) {
      toast({ title: "Error", description: "Failed to optimize hook.", variant: "destructive" });
    } finally {
      setIsOptimizingHook(false);
    }
  };

  const handleSimulateThread = async () => {
    if (!threadHook) return;
    setIsSimulatingThread(true);
    try {
      const result = await simulateThreadsAlgorithm(threadHook);
      setThreadSimResult(result);
      toast({ title: "Simulation Complete", description: "Algorithm analysis ready." });
    } catch (error) {
      toast({ title: "Error", description: "Failed to run simulation.", variant: "destructive" });
    } finally {
      setIsSimulatingThread(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "writer":
        return (
          <div className="space-y-6">
            <div className="glass p-6 rounded-2xl border border-border/50">
              <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-pink-500/20 p-4 rounded-xl mb-4 flex items-center gap-3">
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">Step 1</span>
                <h2 className="text-lg font-bold flex items-center gap-2 text-foreground">
                  <PenTool className="w-5 h-5 text-pink-500" />
                  AI Caption Writer & Remixer
                </h2>
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                Generate engaging Instagram captions with the right hashtags. Enter a topic to get started.
              </p>
              <div className="flex gap-3 mb-6">
                <input 
                  type="text" 
                  placeholder="What is your post or reel about?" 
                  className="flex-1 bg-background/50 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                  value={postTopic}
                  onChange={(e) => setPostTopic(e.target.value)}
                />
                <button 
                  onClick={handleGenerateCaptions}
                  disabled={isGeneratingCaptions || !postTopic}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white px-6 py-3 rounded-xl font-medium text-sm transition-opacity flex items-center gap-2 disabled:opacity-50"
                >
                  {isGeneratingCaptions ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  Generate
                </button>
              </div>

              {generatedCaptions.length > 0 && (
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  {generatedCaptions.map((caption, i) => (
                    <div key={i} className="p-4 rounded-xl bg-background/50 border border-border hover:border-pink-500/30 transition-colors group">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-pink-500 bg-pink-500/10 px-2 py-1 rounded-md">{caption.type}</span>
                        <button 
                          onClick={() => {
                            setEditorText(caption.text);
                            toast({ title: "Moved to Editor", description: "You can now edit or rewrite this caption." });
                          }}
                          className="opacity-0 group-hover:opacity-100 text-xs text-muted-foreground hover:text-foreground transition-all flex items-center gap-1"
                        >
                          <PenTool className="w-3 h-3" /> Edit
                        </button>
                      </div>
                      <p className="text-sm line-clamp-4 whitespace-pre-wrap">{caption.text}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="border-t border-border/50 pt-6">
                <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-pink-500/20 p-4 rounded-xl mb-4 flex items-center gap-3">
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">Step 2</span>
                  <h3 className="text-lg font-bold flex items-center gap-2 text-foreground">
                    <Repeat className="w-5 h-5 text-pink-500" />
                    Editor & Remixer
                  </h3>
                </div>
                <div className="flex gap-2 mb-3">
                  <button onClick={() => handleRewrite("short")} disabled={isRewriting || !editorText} className="px-3 py-1.5 rounded-md bg-secondary text-xs font-medium hover:bg-secondary/80 transition-colors disabled:opacity-50">Short & Punchy</button>
                  <button onClick={() => handleRewrite("story")} disabled={isRewriting || !editorText} className="px-3 py-1.5 rounded-md bg-secondary text-xs font-medium hover:bg-secondary/80 transition-colors disabled:opacity-50">Story Mode</button>
                  <button onClick={() => handleRewrite("funny")} disabled={isRewriting || !editorText} className="px-3 py-1.5 rounded-md bg-secondary text-xs font-medium hover:bg-secondary/80 transition-colors disabled:opacity-50">Funny / Relatable</button>
                </div>
                <div className="relative">
                  {isRewriting && (
                    <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center rounded-xl z-10">
                      <Loader2 className="w-6 h-6 animate-spin text-pink-500" />
                    </div>
                  )}
                  <textarea
                    value={editorText}
                    onChange={(e) => setEditorText(e.target.value)}
                    className="w-full h-48 bg-transparent border border-border/50 rounded-xl p-4 text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-pink-500/40"
                    placeholder="Paste a draft here to rewrite, or edit a generated caption..."
                  />
                </div>
                <div className="flex justify-end mt-3">
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(editorText);
                      toast({ title: "Copied!", description: "Caption copied to clipboard." });
                    }}
                    disabled={!editorText}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    <Copy className="h-4 w-4" />
                    Copy Caption
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case "simulator":
        return (
          <div className="space-y-6">
            <div className="glass p-6 rounded-2xl border border-border/50">
              <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
                <Target className="w-5 h-5 text-pink-500" />
                Algorithm Simulator
              </h2>
              <p className="text-muted-foreground text-sm mb-6">
                Test your caption against the Instagram algorithm. See predicted reach and get suggestions for improvement.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <textarea
                    value={simulatorText}
                    onChange={(e) => setSimulatorText(e.target.value)}
                    className="w-full h-40 bg-background/50 border border-border rounded-xl p-4 text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-pink-500/40 mb-4"
                    placeholder="Paste your caption here to test it against the algorithm..."
                  />
                  <button 
                    onClick={handleSimulate}
                    disabled={isSimulating || !simulatorText}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white px-6 py-3 rounded-xl font-medium text-sm transition-opacity flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSimulating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                    Run Simulation
                  </button>
                </div>

                <div className="bg-secondary/30 rounded-xl p-6 border border-border/50 flex flex-col justify-center">
                  {simulationResult ? (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                      <div className="text-center">
                        <div className="text-4xl font-black text-pink-500 mb-1">{simulationResult.score}/100</div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Algorithmic Score</div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-background/50 p-3 rounded-lg text-center border border-border/50">
                          <div className="text-lg font-bold">{simulationResult.reach}</div>
                          <div className="text-xs text-muted-foreground">Est. Reach</div>
                        </div>
                        <div className="bg-background/50 p-3 rounded-lg text-center border border-border/50">
                          <div className="text-lg font-bold">{simulationResult.engagement}</div>
                          <div className="text-xs text-muted-foreground">Est. Engagement</div>
                        </div>
                      </div>
                      <div className="bg-pink-500/10 text-pink-500 p-3 rounded-lg text-sm flex items-start gap-2">
                        <Lightbulb className="w-4 h-4 shrink-0 mt-0.5" />
                        <p>{simulationResult.feedback}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-muted-foreground flex flex-col items-center">
                      <Target className="w-12 h-12 mb-3 opacity-20" />
                      <p className="text-sm">Run a simulation to see predicted performance metrics.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case "threads":
        return (
          <div className="space-y-6">
            <div className="glass p-6 rounded-2xl border border-border/50">
              <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-pink-500" />
                Threads Assist
              </h2>
              <p className="text-muted-foreground text-sm mb-6">
                Generate viral-style threads, optimize your hooks, and simulate engagement.
              </p>
              
              <div className="space-y-6">
                {/* Thread Generator */}
                <div className="bg-background/50 p-4 rounded-xl border border-border">
                  <h3 className="text-sm font-bold mb-3">Generate Threads</h3>
                  <div className="flex gap-3">
                    <input 
                      type="text" 
                      placeholder="What is your thread about?" 
                      className="flex-1 bg-background border border-border rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                      value={threadTopic}
                      onChange={(e) => setThreadTopic(e.target.value)}
                    />
                    <button 
                      onClick={handleGenerateThreads}
                      disabled={isGeneratingThreads || !threadTopic}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white px-4 py-2 rounded-xl font-medium text-sm transition-opacity flex items-center gap-2 disabled:opacity-50"
                    >
                      {isGeneratingThreads ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                      Generate
                    </button>
                  </div>
                  {generatedThreads.length > 0 && (
                    <div className="mt-4 space-y-3">
                      {generatedThreads.map((thread, i) => (
                        <div key={i} className="p-3 rounded-lg bg-background border border-border text-sm whitespace-pre-wrap">
                          <span className="text-xs font-bold text-pink-500 block mb-1">{thread.type}</span>
                          {thread.text}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Hook Optimizer & Simulator */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-background/50 p-4 rounded-xl border border-border">
                    <h3 className="text-sm font-bold mb-3">Optimize Hook</h3>
                    <textarea
                      value={threadHook}
                      onChange={(e) => setThreadHook(e.target.value)}
                      className="w-full h-24 bg-background border border-border rounded-xl p-3 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-pink-500/40"
                      placeholder="Paste your thread hook here..."
                    />
                    <button 
                      onClick={handleOptimizeHook}
                      disabled={isOptimizingHook || !threadHook}
                      className="w-full bg-secondary hover:bg-secondary/80 text-secondary-foreground px-4 py-2 rounded-xl font-medium text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50 mb-2"
                    >
                      {isOptimizingHook ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                      Optimize Hook
                    </button>
                    {optimizedHook && (
                      <div className="p-3 rounded-lg bg-pink-500/10 text-pink-500 text-sm mt-2">
                        {optimizedHook}
                      </div>
                    )}
                  </div>

                  <div className="bg-background/50 p-4 rounded-xl border border-border">
                    <h3 className="text-sm font-bold mb-3">Simulate Algorithm</h3>
                    <button 
                      onClick={handleSimulateThread}
                      disabled={isSimulatingThread || !threadHook}
                      className="w-full bg-secondary hover:bg-secondary/80 text-secondary-foreground px-4 py-2 rounded-xl font-medium text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50 mb-4"
                    >
                      {isSimulatingThread ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                      Run Simulation
                    </button>
                    {threadSimResult && (
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between"><span>Score:</span> <span className="font-bold text-pink-500">{threadSimResult.score}/100</span></div>
                        <div className="flex justify-between"><span>Reach:</span> <span>{threadSimResult.reach}</span></div>
                        <div className="flex justify-between"><span>Engagement:</span> <span>{threadSimResult.engagement}</span></div>
                        <p className="text-xs text-muted-foreground mt-2">{threadSimResult.feedback}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "scheduler":
        return (
          <div className="space-y-6">
            <div className="glass p-6 rounded-2xl border border-border/50">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold mb-1 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-pink-500" />
                    Smart Scheduler
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    Post at the perfect time. AI determines when your followers are most active.
                  </p>
                </div>
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white px-4 py-2 rounded-lg font-medium text-sm transition-opacity flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  New Post
                </button>
              </div>

              <div className="space-y-3">
                {scheduledPosts.map((post, i) => (
                  <div key={i} className="p-4 rounded-xl bg-background/50 border border-border flex items-center justify-between group">
                    <div className="flex-1 pr-4">
                      <div className="flex items-center gap-2 mb-1">
                        {post.type === "Reel" ? <Video className="w-4 h-4 text-pink-500" /> : <ImageIcon className="w-4 h-4 text-purple-500" />}
                        <p className="text-sm font-medium truncate">{post.text}</p>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.time}</span>
                        <span className="text-pink-500 bg-pink-500/10 px-2 py-0.5 rounded-full">{post.status}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary">
                        <PenTool className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-muted-foreground hover:text-destructive transition-colors rounded-md hover:bg-secondary">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
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
              <Instagram className="w-6 h-6 text-pink-500" />
              Insta Assist
            </div>
            
            <nav className="space-y-2">
              {[
                { id: "writer", icon: PenTool, label: "AI Caption Writer" },
                { id: "threads", icon: MessageCircle, label: "Threads Assist" },
                { id: "simulator", icon: Target, label: "Algorithm Simulator" },
                { id: "scheduler", icon: Calendar, label: "Smart Scheduler" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    activeTab === item.id 
                      ? "bg-pink-500/10 text-pink-500" 
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
            <div className="glass p-4 rounded-xl border border-pink-500/20 bg-pink-500/5">
              <h4 className="font-bold text-sm mb-1">Pro Plan Active</h4>
              <p className="text-xs text-muted-foreground mb-3">Unlimited AI Generations</p>
              <div className="w-full bg-background rounded-full h-1.5 mb-1">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-1.5 rounded-full w-full"></div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default InstaAssistTool;
