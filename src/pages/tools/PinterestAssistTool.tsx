import { useState } from "react";
import { Sparkles, Download, Image as ImageIcon, Link as LinkIcon, Loader2, Search, Layout, LayoutTemplate, Calendar, CheckCircle2, Copy, PenTool } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/components/ui/use-toast";
import { generatePinterestPinFromUrl, generatePinSEO, analyzeBoardStrategy, generateIdeaPinStoryboard, generateSmartSchedule } from "@/services/geminiService";

const PinterestLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387-.116-.957-.22-2.42.044-3.461l1.21-5.157s-.308-.617-.308-1.528c0-1.43.83-2.497 1.864-2.497.878 0 1.302.66 1.302 1.452 0 .886-.564 2.212-.855 3.438-.243 1.026.516 1.862 1.53 1.862 1.836 0 3.247-1.935 3.247-4.726 0-2.468-1.775-4.195-4.31-4.195-2.936 0-4.656 2.202-4.656 4.475 0 .885.34 1.836.765 2.35.084.102.096.193.07.295-.078.322-.255 1.026-.29 1.17-.045.18-.15.215-.345.13-1.285-.56-2.09-2.31-2.09-3.725 0-3.025 2.195-5.805 6.325-5.805 3.32 0 5.905 2.365 5.905 5.515 0 3.29-2.075 5.935-4.955 5.935-.97 0-1.885-.505-2.195-1.105l-.6 2.285c-.215.825-.79 1.865-1.175 2.495 1.015.31 2.085.48 3.195.48 6.627 0 12-5.373 12-12S18.627 0 12 0z" />
  </svg>
);

const dimensions = [
  { name: "Standard Pin (1000x1500)", width: 1000, height: 1500, aspectRatio: "3:4" },
  { name: "Square Pin (1000x1000)", width: 1000, height: 1000, aspectRatio: "1:1" },
  { name: "Story Pin (1080x1920)", width: 1080, height: 1920, aspectRatio: "9:16" },
];

const PinterestAssistTool = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("generator");
  
  // Generator State
  const [url, setUrl] = useState("");
  const [selectedDim, setSelectedDim] = useState(dimensions[0]);
  const [generatedPin, setGeneratedPin] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // SEO State
  const [seoTopic, setSeoTopic] = useState("");
  const [isGeneratingSeo, setIsGeneratingSeo] = useState(false);
  const [seoResults, setSeoResults] = useState<{titles: string[], descriptions: string[]} | null>(null);

  // Board Strategy State
  const [boardNiche, setBoardNiche] = useState("");
  const [isGeneratingBoards, setIsGeneratingBoards] = useState(false);
  const [boardResults, setBoardResults] = useState<{boards: {name: string, description: string}[], contentPillars: string[]} | null>(null);

  // Idea Pin State
  const [ideaTopic, setIdeaTopic] = useState("");
  const [ideaPages, setIdeaPages] = useState("3-5 Pages (Quick Tip)");
  const [isGeneratingIdea, setIsGeneratingIdea] = useState(false);
  const [ideaResults, setIdeaResults] = useState<{title: string, slides: {pageNumber: number, visual: string, textOverlay: string, script: string}[]} | null>(null);

  // Scheduler State
  const [schedulerNiche, setSchedulerNiche] = useState("");
  const [isGeneratingSchedule, setIsGeneratingSchedule] = useState(false);
  const [scheduleResults, setScheduleResults] = useState<{bestTimes: {day: string, time: string}[], queue: {title: string, time: string}[]} | null>(null);

  const handleGenerate = async () => {
    if (!url) return;
    setIsGenerating(true);
    try {
      const imageUrl = await generatePinterestPinFromUrl(url, selectedDim.aspectRatio);
      setGeneratedPin(imageUrl);
      toast({ title: "Pin Generated!", description: "Your Pinterest pin is ready." });
    } catch (error) {
      console.error("Error generating pin:", error);
      toast({ title: "Error", description: "Failed to generate pin. Please check the URL and try again.", variant: "destructive" });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSimulateAction = (action: string) => {
    toast({
      title: "Action Simulated",
      description: `${action} feature is currently in beta.`,
    });
  };

  const handleGenerateSeo = async () => {
    if (!seoTopic) return;
    setIsGeneratingSeo(true);
    try {
      const results = await generatePinSEO(seoTopic);
      setSeoResults(results);
      toast({ title: "SEO Content Generated!" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to generate SEO content.", variant: "destructive" });
    } finally {
      setIsGeneratingSeo(false);
    }
  };

  const handleGenerateBoards = async () => {
    if (!boardNiche) return;
    setIsGeneratingBoards(true);
    try {
      const results = await analyzeBoardStrategy(boardNiche);
      setBoardResults(results);
      toast({ title: "Board Strategy Generated!" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to generate board strategy.", variant: "destructive" });
    } finally {
      setIsGeneratingBoards(false);
    }
  };

  const handleGenerateIdeaPin = async () => {
    if (!ideaTopic) return;
    setIsGeneratingIdea(true);
    try {
      const results = await generateIdeaPinStoryboard(ideaTopic, ideaPages);
      setIdeaResults(results);
      toast({ title: "Storyboard Generated!" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to generate storyboard.", variant: "destructive" });
    } finally {
      setIsGeneratingIdea(false);
    }
  };

  const handleGenerateSchedule = async () => {
    if (!schedulerNiche) return;
    setIsGeneratingSchedule(true);
    try {
      const results = await generateSmartSchedule(schedulerNiche);
      setScheduleResults(results);
      toast({ title: "Schedule Generated!" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to generate schedule.", variant: "destructive" });
    } finally {
      setIsGeneratingSchedule(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-24 max-w-7xl flex gap-8">
        
        {/* Sidebar */}
        <aside className="w-72 border-r border-border/50 bg-card/30 hidden md:flex flex-col shrink-0 rounded-2xl overflow-hidden">
          <div className="p-6">
            <div className="flex items-center gap-2 font-heading font-bold text-lg mb-8">
              <PinterestLogo className="w-6 h-6 text-[#E60023]" />
              Pinterest Assist
            </div>
            
            <nav className="space-y-2">
              {[
                { id: "generator", icon: ImageIcon, label: "Blog to Pin Generator" },
                { id: "seo", icon: Search, label: "Pin SEO Optimizer" },
                { id: "boards", icon: Layout, label: "Board Strategy" },
                { id: "idea-pins", icon: LayoutTemplate, label: "Idea Pin Storyboard" },
                { id: "scheduler", icon: Calendar, label: "Smart Scheduler" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                    activeTab === item.id 
                      ? "bg-gradient-to-r from-[#E60023] to-[#bd081c] text-white font-bold shadow-md border border-transparent" 
                      : "bg-transparent text-muted-foreground hover:bg-secondary hover:text-foreground border border-transparent"
                  }`}
                >
                  <item.icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
          
          <div className="mt-auto p-6">
            <div className="glass p-4 rounded-xl border border-[#E60023]/20 bg-[#E60023]/5">
              <h4 className="font-bold text-sm mb-1">Pro Plan Active</h4>
              <p className="text-xs text-muted-foreground mb-3">Unlimited AI Generations</p>
              <div className="w-full bg-background rounded-full h-1.5 mb-1">
                <div className="bg-[#E60023] h-1.5 rounded-full w-full"></div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 max-w-4xl">
          {activeTab === "generator" && (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-heading font-bold mb-2">Blog to Pin Generator</h2>
                <p className="text-muted-foreground">Turn any blog post URL into a high-converting Pinterest pin instantly.</p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Input Panel */}
                <div className="flex flex-col rounded-3xl bg-card border border-border shadow-sm overflow-hidden">
                  <div className="p-6 space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">Blog Post URL</label>
                      <div className="relative">
                        <LinkIcon className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                        <input
                          type="url"
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                          placeholder="https://yourblog.com/post"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-background border border-border focus:ring-2 focus:ring-[#E60023] outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">Pin Dimensions</label>
                      <select
                        value={selectedDim.name}
                        onChange={(e) => setSelectedDim(dimensions.find(d => d.name === e.target.value)!)}
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:ring-2 focus:ring-[#E60023] outline-none"
                      >
                        {dimensions.map(dim => (
                          <option key={dim.name} value={dim.name}>{dim.name}</option>
                        ))}
                      </select>
                    </div>

                    <button
                      onClick={handleGenerate}
                      disabled={!url || isGenerating}
                      className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#E60023] text-white font-bold hover:bg-[#bd081c] transition-colors disabled:opacity-50"
                    >
                      {isGenerating ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <Sparkles className="h-5 w-5" />
                      )}
                      {isGenerating ? "Generating..." : "Generate Pin"}
                    </button>
                  </div>
                </div>

                {/* Preview Panel */}
                <div className="flex flex-col rounded-3xl bg-card border border-border overflow-hidden">
                  <div className="p-6 border-b border-border">
                    <h3 className="font-bold">Preview</h3>
                  </div>
                  <div className="p-6 flex flex-col items-center justify-center flex-1 min-h-[400px]">
                    {generatedPin ? (
                      <div className="space-y-4 w-full flex flex-col items-center">
                        <img src={generatedPin} alt="Generated Pin" className="rounded-2xl shadow-md max-h-[400px] object-contain" referrerPolicy="no-referrer" />
                        <a
                          href={generatedPin}
                          download="pinterest-pin.jpg"
                          className="flex items-center gap-2 px-6 py-2 rounded-full bg-secondary text-foreground font-semibold hover:bg-secondary/80 transition-colors"
                        >
                          <Download className="h-4 w-4" />
                          Download Pin
                        </a>
                      </div>
                    ) : (
                      <div className="text-center text-muted-foreground">
                        <ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-20" />
                        <p className="text-sm">Your generated pin will appear here.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "seo" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div>
                <h2 className="text-3xl font-heading font-bold mb-2">Pin SEO Optimizer</h2>
                <p className="text-muted-foreground">Pinterest is a visual search engine. Generate keyword-rich titles and descriptions to rank higher.</p>
              </div>
              
              <div className="bg-card border border-border/50 rounded-2xl p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">What is your pin about?</label>
                    <textarea 
                      value={seoTopic}
                      onChange={(e) => setSeoTopic(e.target.value)}
                      className="w-full bg-background border border-border/50 rounded-xl p-4 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-[#E60023]/50 resize-none"
                      placeholder="E.g., 10 easy vegan meal prep ideas for beginners..."
                    />
                  </div>
                  <button 
                    onClick={handleGenerateSeo}
                    disabled={!seoTopic || isGeneratingSeo}
                    className="bg-[#E60023] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-[#bd081c] transition-colors disabled:opacity-50"
                  >
                    {isGeneratingSeo ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                    {isGeneratingSeo ? "Generating..." : "Generate SEO Content"}
                  </button>
                </div>
              </div>

              {seoResults ? (
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-card border border-border/50 rounded-2xl p-6">
                    <h3 className="font-bold mb-4 flex items-center gap-2"><PenTool className="w-4 h-4 text-[#E60023]" /> Optimized Titles</h3>
                    <ul className="space-y-3">
                      {seoResults.titles.map((title, i) => (
                        <li key={i} className="p-3 bg-background rounded-lg border border-border/50 text-sm flex justify-between items-start gap-2">
                          <span>{title}</span>
                          <button onClick={() => { navigator.clipboard.writeText(title); toast({title: "Copied!"}); }} className="text-muted-foreground hover:text-foreground"><Copy className="w-4 h-4" /></button>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-card border border-border/50 rounded-2xl p-6">
                    <h3 className="font-bold mb-4 flex items-center gap-2"><Search className="w-4 h-4 text-[#E60023]" /> SEO Descriptions</h3>
                    <ul className="space-y-3">
                      {seoResults.descriptions.map((desc, i) => (
                        <li key={i} className="p-3 bg-background rounded-lg border border-border/50 text-sm flex justify-between items-start gap-2">
                          <span className="text-muted-foreground">{desc}</span>
                          <button onClick={() => { navigator.clipboard.writeText(desc); toast({title: "Copied!"}); }} className="text-muted-foreground hover:text-foreground shrink-0"><Copy className="w-4 h-4" /></button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-card border border-border/50 rounded-2xl p-6 opacity-50">
                    <h3 className="font-bold mb-4 flex items-center gap-2"><PenTool className="w-4 h-4 text-[#E60023]" /> Optimized Titles</h3>
                    <p className="text-sm text-muted-foreground">Generated titles will appear here...</p>
                  </div>
                  <div className="bg-card border border-border/50 rounded-2xl p-6 opacity-50">
                    <h3 className="font-bold mb-4 flex items-center gap-2"><Search className="w-4 h-4 text-[#E60023]" /> SEO Descriptions</h3>
                    <p className="text-sm text-muted-foreground">Generated descriptions will appear here...</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "boards" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div>
                <h2 className="text-3xl font-heading font-bold mb-2">Board Strategy & Niche</h2>
                <p className="text-muted-foreground">Discover the best board structures and sub-niches for your account.</p>
              </div>
              
              <div className="bg-card border border-border/50 rounded-2xl p-6">
                <div className="flex gap-4">
                  <input 
                    type="text"
                    value={boardNiche}
                    onChange={(e) => setBoardNiche(e.target.value)}
                    placeholder="Enter your main niche (e.g., Home Decor, Fitness)..."
                    className="flex-1 bg-background border border-border/50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#E60023]/50"
                  />
                  <button 
                    onClick={handleGenerateBoards}
                    disabled={!boardNiche || isGeneratingBoards}
                    className="bg-[#E60023] text-white px-6 py-3 rounded-xl font-bold whitespace-nowrap hover:bg-[#bd081c] transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    {isGeneratingBoards ? <Loader2 className="w-5 h-5 animate-spin" /> : <Layout className="w-5 h-5" />}
                    {isGeneratingBoards ? "Analyzing..." : "Analyze Niche"}
                  </button>
                </div>
              </div>

              {boardResults ? (
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-4">
                    <h3 className="font-bold text-lg flex items-center gap-2"><Layout className="w-5 h-5 text-[#E60023]" /> Recommended Boards</h3>
                    <div className="grid gap-4">
                      {boardResults.boards.map((board, i) => (
                        <div key={i} className="bg-card border border-border/50 rounded-xl p-4">
                          <h4 className="font-bold mb-1">{board.name}</h4>
                          <p className="text-sm text-muted-foreground">{board.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-bold text-lg flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-[#E60023]" /> Content Pillars</h3>
                    <div className="bg-card border border-border/50 rounded-xl p-4">
                      <ul className="space-y-3">
                        {boardResults.contentPillars.map((pillar, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#E60023] mt-1.5 shrink-0" />
                            <span>{pillar}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-card border border-border/50 rounded-2xl p-8 text-center opacity-50">
                  <Layout className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2">Awaiting Niche Input</h3>
                  <p className="text-muted-foreground">Enter your niche above to get a complete board organization strategy.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "idea-pins" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div>
                <h2 className="text-3xl font-heading font-bold mb-2">Idea Pin Storyboard</h2>
                <p className="text-muted-foreground">Generate multi-page scripts for high-engagement Idea Pins.</p>
              </div>
              
              <div className="bg-card border border-border/50 rounded-2xl p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Topic or Goal</label>
                    <input 
                      type="text"
                      value={ideaTopic}
                      onChange={(e) => setIdeaTopic(e.target.value)}
                      placeholder="E.g., Step-by-step guide to planting succulents"
                      className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#E60023]/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Number of Pages/Slides</label>
                    <select 
                      value={ideaPages}
                      onChange={(e) => setIdeaPages(e.target.value)}
                      className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#E60023]/50"
                    >
                      <option>3-5 Pages (Quick Tip)</option>
                      <option>5-8 Pages (Tutorial)</option>
                      <option>8-12 Pages (In-depth Guide)</option>
                    </select>
                  </div>
                  <button 
                    onClick={handleGenerateIdeaPin}
                    disabled={!ideaTopic || isGeneratingIdea}
                    className="bg-[#E60023] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-[#bd081c] transition-colors disabled:opacity-50"
                  >
                    {isGeneratingIdea ? <Loader2 className="w-5 h-5 animate-spin" /> : <LayoutTemplate className="w-5 h-5" />}
                    {isGeneratingIdea ? "Generating..." : "Generate Storyboard"}
                  </button>
                </div>
              </div>

              {ideaResults && (
                <div className="bg-card border border-border/50 rounded-2xl p-6 space-y-6">
                  <h3 className="font-bold text-xl border-b border-border/50 pb-4">{ideaResults.title}</h3>
                  <div className="space-y-6">
                    {ideaResults.slides.map((slide, i) => (
                      <div key={i} className="flex gap-4 p-4 bg-background rounded-xl border border-border/50">
                        <div className="w-12 h-12 rounded-full bg-[#E60023]/10 text-[#E60023] flex items-center justify-center font-bold shrink-0">
                          {slide.pageNumber}
                        </div>
                        <div className="space-y-2 flex-1">
                          <div>
                            <span className="text-xs font-bold uppercase text-muted-foreground">Visual</span>
                            <p className="text-sm">{slide.visual}</p>
                          </div>
                          <div>
                            <span className="text-xs font-bold uppercase text-muted-foreground">Text Overlay</span>
                            <p className="text-sm font-medium">{slide.textOverlay}</p>
                          </div>
                          <div>
                            <span className="text-xs font-bold uppercase text-muted-foreground">Script / Caption</span>
                            <p className="text-sm text-muted-foreground">{slide.script}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "scheduler" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div>
                <h2 className="text-3xl font-heading font-bold mb-2">Smart Scheduler</h2>
                <p className="text-muted-foreground">Schedule your pins at the optimal times for maximum reach.</p>
              </div>
              
              <div className="bg-card border border-border/50 rounded-2xl p-6 mb-6">
                <div className="flex gap-4">
                  <input 
                    type="text"
                    value={schedulerNiche}
                    onChange={(e) => setSchedulerNiche(e.target.value)}
                    placeholder="Enter your niche to generate a schedule (e.g., Travel, Recipes)..."
                    className="flex-1 bg-background border border-border/50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#E60023]/50"
                  />
                  <button 
                    onClick={handleGenerateSchedule}
                    disabled={!schedulerNiche || isGeneratingSchedule}
                    className="bg-[#E60023] text-white px-6 py-3 rounded-xl font-bold whitespace-nowrap hover:bg-[#bd081c] transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    {isGeneratingSchedule ? <Loader2 className="w-5 h-5 animate-spin" /> : <Calendar className="w-5 h-5" />}
                    {isGeneratingSchedule ? "Generating..." : "Generate Schedule"}
                  </button>
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 bg-card border border-border/50 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-lg">Upcoming Queue</h3>
                    <button className="text-sm text-[#E60023] font-medium hover:underline">View Calendar</button>
                  </div>
                  <div className="space-y-4">
                    {(scheduleResults?.queue || [
                      { title: "How to Start a Garden in 2026", time: "Today, 2:00 PM" },
                      { title: "10 Best Indoor Plants", time: "Tomorrow, 9:00 AM" },
                      { title: "Spring Planting Guide", time: "Friday, 4:00 PM" }
                    ]).map((item, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-border/50 bg-background/50">
                        <div className="w-12 h-16 bg-muted rounded-md flex items-center justify-center">
                          <ImageIcon className="w-5 h-5 text-muted-foreground/50" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{item.title}</h4>
                          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                            <Calendar className="w-3 h-3" /> {item.time}
                          </p>
                        </div>
                        <button className="px-3 py-1.5 text-xs font-medium bg-secondary text-foreground rounded-lg hover:bg-secondary/80">
                          Edit
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-card border border-border/50 rounded-2xl p-6">
                    <h3 className="font-bold mb-4">Quick Add</h3>
                    <button 
                      onClick={() => handleSimulateAction("Upload Pin")}
                      className="w-full py-8 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-2 text-muted-foreground hover:bg-muted/50 hover:text-foreground hover:border-[#E60023]/50 transition-all"
                    >
                      <ImageIcon className="w-8 h-8" />
                      <span className="text-sm font-medium">Upload New Pin</span>
                    </button>
                  </div>
                  
                  <div className="bg-card border border-border/50 rounded-2xl p-6">
                    <h3 className="font-bold mb-4">Best Times to Pin</h3>
                    <div className="space-y-3">
                      {(scheduleResults?.bestTimes || [
                        { day: "Tuesdays", time: "8:00 PM" },
                        { day: "Thursdays", time: "9:00 PM" },
                        { day: "Saturdays", time: "11:00 AM" }
                      ]).map((time, i) => (
                        <div key={i} className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{time.day}</span>
                          <span className="font-medium text-green-500">{time.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PinterestAssistTool;

