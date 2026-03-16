import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { 
  Twitter, PenTool, BarChart3, Lightbulb, 
  Repeat, Play, Plus, Trash2, Copy, 
  Sparkles, TrendingUp, Activity, MessageSquare, Loader2,
  Calendar, Clock, Target, Zap
} from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { generateXTweets, rewriteXTweet, simulateAlgorithm } from "@/services/geminiService";

const XAssistTool = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("writer");
  
  // Writer State
  const [tweetTopic, setTweetTopic] = useState("");
  const [generatedTweets, setGeneratedTweets] = useState<{text: string, type: string}[]>([]);
  const [isGeneratingTweets, setIsGeneratingTweets] = useState(false);
  const [editorText, setEditorText] = useState("");
  const [isRewriting, setIsRewriting] = useState(false);

  // Simulator State
  const [simulatorText, setSimulatorText] = useState("");
  const [simulationResult, setSimulationResult] = useState<{score: number, reach: string, engagement: string, feedback: string} | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  // Scheduler State (Mock)
  const [scheduledPosts, setScheduledPosts] = useState([
    { text: "Building in public is a superpower...", time: "Today, 2:00 PM", status: "Scheduled" },
    { text: "5 tools I use every day to save 10 hours a week 🧵", time: "Tomorrow, 9:00 AM", status: "Scheduled" }
  ]);

  const handleGenerateTweets = async () => {
    if (!tweetTopic) return;
    setIsGeneratingTweets(true);
    try {
      const tweets = await generateXTweets(tweetTopic);
      setGeneratedTweets(tweets);
      toast({ title: "Tweets Generated!", description: "Here are some ideas to get you started." });
    } catch (error) {
      toast({ title: "Error", description: "Failed to generate tweets.", variant: "destructive" });
    } finally {
      setIsGeneratingTweets(false);
    }
  };

  const handleRewrite = async (style: string) => {
    if (!editorText) return;
    setIsRewriting(true);
    try {
      const rewritten = await rewriteXTweet(editorText, style);
      setEditorText(rewritten);
      toast({ title: "Tweet Rewritten!", description: `Applied style: ${style}` });
    } catch (error) {
      toast({ title: "Error", description: "Failed to rewrite tweet.", variant: "destructive" });
    } finally {
      setIsRewriting(false);
    }
  };

  const handleSimulate = async () => {
    if (!simulatorText) return;
    setIsSimulating(true);
    try {
      const result = await simulateAlgorithm(simulatorText);
      setSimulationResult(result);
      toast({ title: "Simulation Complete", description: "Algorithm analysis ready." });
    } catch (error) {
      toast({ title: "Error", description: "Failed to run simulation.", variant: "destructive" });
    } finally {
      setIsSimulating(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "writer":
        return (
          <div className="space-y-6">
            <div className="glass p-6 rounded-2xl border border-border/50">
              <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 p-4 rounded-xl mb-4 flex items-center gap-3">
                <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">Step 1</span>
                <h2 className="text-lg font-bold flex items-center gap-2 text-foreground">
                  <PenTool className="w-5 h-5 text-blue-500" />
                  AI Tweet Writer & Remixer
                </h2>
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                Chat your way to banger tweets. Enter a topic to generate ideas, or paste a draft to rewrite it in different styles.
              </p>
              <div className="flex gap-3 mb-6">
                <input 
                  type="text" 
                  placeholder="What do you want to tweet about?" 
                  className="flex-1 bg-background/50 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  value={tweetTopic}
                  onChange={(e) => setTweetTopic(e.target.value)}
                />
                <button 
                  onClick={handleGenerateTweets}
                  disabled={isGeneratingTweets || !tweetTopic}
                  className="bg-primary hover:bg-primary/80 text-white px-6 py-3 rounded-xl font-medium text-sm transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  {isGeneratingTweets ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  Generate
                </button>
              </div>

              {generatedTweets.length > 0 && (
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  {generatedTweets.map((tweet, i) => (
                    <div key={i} className="p-4 rounded-xl bg-background/50 border border-border hover:border-primary/30 transition-colors group">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-md">{tweet.type}</span>
                        <button 
                          onClick={() => {
                            setEditorText(tweet.text);
                            toast({ title: "Moved to Editor", description: "You can now edit or rewrite this tweet." });
                          }}
                          className="opacity-0 group-hover:opacity-100 text-xs text-muted-foreground hover:text-foreground transition-all flex items-center gap-1"
                        >
                          <PenTool className="w-3 h-3" /> Edit
                        </button>
                      </div>
                      <p className="text-sm">{tweet.text}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="border-t border-border/50 pt-6">
                <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 p-4 rounded-xl mb-4 flex items-center gap-3">
                  <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">Step 2</span>
                  <h3 className="text-lg font-bold flex items-center gap-2 text-foreground">
                    <Repeat className="w-5 h-5 text-blue-500" />
                    Editor & Remixer
                  </h3>
                </div>
                <div className="flex gap-2 mb-3">
                  <button onClick={() => handleRewrite("bold")} disabled={isRewriting || !editorText} className="px-3 py-1.5 rounded-md bg-secondary text-xs font-medium hover:bg-secondary/80 transition-colors disabled:opacity-50">Make it Bold</button>
                  <button onClick={() => handleRewrite("funny")} disabled={isRewriting || !editorText} className="px-3 py-1.5 rounded-md bg-secondary text-xs font-medium hover:bg-secondary/80 transition-colors disabled:opacity-50">Make it Funny</button>
                  <button onClick={() => handleRewrite("professional")} disabled={isRewriting || !editorText} className="px-3 py-1.5 rounded-md bg-secondary text-xs font-medium hover:bg-secondary/80 transition-colors disabled:opacity-50">Professional</button>
                </div>
                <div className="relative">
                  {isRewriting && (
                    <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center rounded-xl z-10">
                      <Loader2 className="w-6 h-6 animate-spin text-primary" />
                    </div>
                  )}
                  <textarea
                    value={editorText}
                    onChange={(e) => setEditorText(e.target.value)}
                    className="w-full h-32 bg-transparent border border-border/50 rounded-xl p-4 text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-primary/40"
                    placeholder="Paste a draft here to rewrite, or edit a generated tweet..."
                  />
                </div>
                <div className="flex justify-end mt-3">
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(editorText);
                      toast({ title: "Copied!", description: "Tweet copied to clipboard." });
                    }}
                    disabled={!editorText}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/80 transition-colors disabled:opacity-50"
                  >
                    <Copy className="h-4 w-4" />
                    Copy Tweet
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
                <Target className="w-5 h-5 text-primary" />
                Algorithm Simulator
              </h2>
              <p className="text-muted-foreground text-sm mb-6">
                Run your tweets through a virtual 𝕏 battlefield before they go live. See predicted engagement and algorithmic score.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <textarea
                    value={simulatorText}
                    onChange={(e) => setSimulatorText(e.target.value)}
                    className="w-full h-40 bg-background/50 border border-border rounded-xl p-4 text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-primary/40 mb-4"
                    placeholder="Paste your tweet here to test it against the algorithm..."
                  />
                  <button 
                    onClick={handleSimulate}
                    disabled={isSimulating || !simulatorText}
                    className="w-full bg-primary hover:bg-primary/80 text-white px-6 py-3 rounded-xl font-medium text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSimulating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                    Run Simulation
                  </button>
                </div>

                <div className="bg-secondary/30 rounded-xl p-6 border border-border/50 flex flex-col justify-center">
                  {simulationResult ? (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                      <div className="text-center">
                        <div className="text-4xl font-black text-primary mb-1">{simulationResult.score}/100</div>
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
                      <div className="bg-primary/10 text-primary p-3 rounded-lg text-sm flex items-start gap-2">
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

      case "scheduler":
        return (
          <div className="space-y-6">
            <div className="glass p-6 rounded-2xl border border-border/50">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold mb-1 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Smart Scheduler
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    Post at the perfect time. AI determines when your followers are most active.
                  </p>
                </div>
                <button className="bg-primary hover:bg-primary/80 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  New Post
                </button>
              </div>

              <div className="space-y-3">
                {scheduledPosts.map((post, i) => (
                  <div key={i} className="p-4 rounded-xl bg-background/50 border border-border flex items-center justify-between group">
                    <div className="flex-1 pr-4">
                      <p className="text-sm font-medium mb-1 truncate">{post.text}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.time}</span>
                        <span className="text-primary bg-primary/10 px-2 py-0.5 rounded-full">{post.status}</span>
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
    <div className="theme-twitter min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex pt-16">
        {/* Sidebar */}
        <aside className="w-64 border-r border-border/50 bg-card/30 hidden md:flex flex-col">
          <div className="p-6">
            <div className="flex items-center gap-2 font-heading font-bold text-lg mb-8">
              <Twitter className="w-6 h-6 text-primary" />
              xAssist
            </div>
            
            <nav className="space-y-2">
              {[
                { id: "writer", icon: PenTool, label: "AI Writer & Remixer" },
                { id: "simulator", icon: Target, label: "Algorithm Simulator" },
                { id: "scheduler", icon: Calendar, label: "Smart Scheduler" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    activeTab === item.id 
                      ? "bg-primary/10 text-primary" 
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
            <div className="glass p-4 rounded-xl border border-primary/20 bg-primary/5">
              <h4 className="font-bold text-sm mb-1">Pro Plan Active</h4>
              <p className="text-xs text-muted-foreground mb-3">Unlimited AI Generations</p>
              <div className="w-full bg-background rounded-full h-1.5 mb-1">
                <div className="bg-primary h-1.5 rounded-full w-full"></div>
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

export default XAssistTool;
