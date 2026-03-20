import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { 
  Youtube, Search, PenTool, BarChart3, Image as ImageIcon, 
  Lightbulb, Repeat, Play, Plus, Trash2, Layout, Copy, 
  Bold, Italic, List, Sparkles, ChevronRight, Video, FileText,
  TrendingUp, Activity, MessageSquare, Loader2, Hash, Clock
} from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
declare global {
  interface Window {
    aistudio?: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

import { 
  generateYouTubeScript, 
  modifyYouTubeScript, 
  analyzeCompetitor, 
  generateThumbnailsAndTitles,
  generateTitlesAndTags,
  generateThumbnailImage,
  generateSimilarIdeas,
  analyzeBooks,
  generateSponsorshipPitch,
  generateCommunityPosts,
  generateVideoChapters,
  generateShortsScript
} from "@/services/geminiService";

const YouTubeAssistTool = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("titles");

  const formatScriptHTML = (text: string) => {
    if (!text) return "";
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\[(.*?)\]/g, '<strong class="text-foreground text-base font-bold tracking-tight">[$1]</strong>')
      .replace(/\((.*?)\)/g, '<span class="text-muted-foreground font-mono text-xs">($1)</span>');
  };

  const [scriptText, setScriptText] = useState(
    formatScriptHTML(`[HOOK]\n(0:00-0:15)\n"Have you ever wondered why some small channels blow up overnight while others stay stuck at 100 views for years? \nIt's not luck. It's not the algorithm. It's a specific pattern I call 'The Outlier Strategy.' \nAnd today, I'm going to show you exactly how to use it on your next video."\n\n[INTRO]\n(0:15-0:45)\n"Look, we've all been there. You spend 10 hours writing, filming, and editing a video. You hit publish, refresh the page... and nothing. Crickets.\nBut what if I told you that you could predict a video's success *before* you even hit record?"`)
  );
  
  // Titles & Tags State
  const [titleTopic, setTitleTopic] = useState("");
  const [generatedTitles, setGeneratedTitles] = useState([
    "I Tried the '2-Hour Workday' for 30 Days",
    "Why 99% of Productivity Apps are Useless",
    "The Only Notion Setup You'll Ever Need",
    "How I Read 100 Books a Year (Without Speed Reading)",
    "Stop Wasting Time on To-Do Lists (Do This Instead)"
  ]);
  const [generatedTags, setGeneratedTags] = useState([
    "productivity", "time management", "notion", "2 hour workday", "work less", "focus", "deep work", "reading habits"
  ]);
  const [isGeneratingTitles, setIsGeneratingTitles] = useState(false);

  // Editor State
  const [isGeneratingScript, setIsGeneratingScript] = useState(false);
  const [isModifyingScript, setIsModifyingScript] = useState(false);

  // Competitors State
  const [competitorUrl, setCompetitorUrl] = useState("");
  const [competitors, setCompetitors] = useState([
    { 
      name: "Ali Abdaal", subs: "5.2M", 
      recentOutlier: "How I built a $5M business in 3 years", 
      outlierViews: "2.4M", avgViews: "250K", multiplier: "9.6x", 
      publishedAt: "2 days ago", duration: "14:20", 
      status: "Tracking", tags: ["Business", "Entrepreneurship", "Growth"] 
    },
    { 
      name: "Mrwhosetheboss", subs: "18M", 
      recentOutlier: "I tested the world's most expensive phone", 
      outlierViews: "12M", avgViews: "3M", multiplier: "4.0x", 
      publishedAt: "1 week ago", duration: "18:45", 
      status: "Tracking", tags: ["Tech", "Review", "Smartphone"] 
    },
    { 
      name: "Marques Brownlee", subs: "18.5M", 
      recentOutlier: "The Truth About the Apple Vision Pro", 
      outlierViews: "8.1M", avgViews: "2.5M", multiplier: "3.2x", 
      publishedAt: "3 weeks ago", duration: "22:10", 
      status: "Tracking", tags: ["Apple", "Vision Pro", "Tech"] 
    }
  ]);
  const [isAddingCompetitor, setIsAddingCompetitor] = useState(false);

  // Similar Ideas & Book Analysis State
  const [similarIdeas, setSimilarIdeas] = useState<Record<number, string[]>>({});
  interface BookRecommendation {
    title: string;
    author: string;
    insight: string;
  }
  const [bookRecommendations, setBookRecommendations] = useState<Record<number, BookRecommendation[]>>({});
  const [isGeneratingIdeas, setIsGeneratingIdeas] = useState<Record<number, boolean>>({});
  const [isAnalyzingBooks, setIsAnalyzingBooks] = useState<Record<number, boolean>>({});

  // Thumbnails State
  const [thumbnailTopic, setThumbnailTopic] = useState("");
  const [thumbnails, setThumbnails] = useState([
    { concept: "Split Screen", desc: "Left side: You looking exhausted at a desk (8 hours). Right side: You relaxing on a beach with a laptop (2 hours)." },
    { concept: "The Proof", desc: "Close up of your face looking shocked, holding a phone showing a large bank deposit. Text: 'ONLY 2 HOURS?'" },
    { concept: "The Calendar", desc: "A calendar with 90% of the day crossed out in red marker. You pointing at the remaining 2 hours with a smirk." }
  ]);
  const [isGeneratingThumbnails, setIsGeneratingThumbnails] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [activeThumbnailIndex, setActiveThumbnailIndex] = useState<number | null>(null);

  // Sponsorship Pitch State
  const [pitchChannelName, setPitchChannelName] = useState("");
  const [pitchNiche, setPitchNiche] = useState("");
  const [pitchSubCount, setPitchSubCount] = useState("");
  const [pitchBrandName, setPitchBrandName] = useState("");
  const [pitchProduct, setPitchProduct] = useState("");
  const [generatedPitch, setGeneratedPitch] = useState<{subject: string, body: string} | null>(null);
  const [isGeneratingPitch, setIsGeneratingPitch] = useState(false);

  // Community Posts State
  const [communityNiche, setCommunityNiche] = useState("");
  const [communityRecentVideo, setCommunityRecentVideo] = useState("");
  const [generatedCommunityPosts, setGeneratedCommunityPosts] = useState<{type: string, content: string, options?: string[]}[]>([]);
  const [isGeneratingCommunity, setIsGeneratingCommunity] = useState(false);

  // Video Chapters State
  const [chaptersScript, setChaptersScript] = useState("");
  const [generatedChapters, setGeneratedChapters] = useState("");
  const [isGeneratingChapters, setIsGeneratingChapters] = useState(false);

  // Shorts Script State
  const [shortsTopic, setShortsTopic] = useState("");
  const [shortsTone, setShortsTone] = useState("educational");
  const [generatedShorts, setGeneratedShorts] = useState<{hook: string, body: string, callToAction: string} | null>(null);
  const [isGeneratingShorts, setIsGeneratingShorts] = useState(false);

  const handleGenerateTitles = async () => {
    if (!titleTopic) return;
    setIsGeneratingTitles(true);
    try {
      const data = await generateTitlesAndTags(titleTopic);
      setGeneratedTitles(data.titles);
      setGeneratedTags(data.tags);
      toast({ title: "Titles & Tags Generated!", description: "SEO-optimized concepts are ready." });
    } catch (error) {
      toast({ title: "Error", description: "Failed to generate titles and tags.", variant: "destructive" });
    } finally {
      setIsGeneratingTitles(false);
    }
  };

  const handleGenerateScript = async (idea: { title: string; hook: string }) => {
    setActiveTab("editor");
    setIsGeneratingScript(true);
    try {
      const script = await generateYouTubeScript(idea.title, idea.hook);
      setScriptText(formatScriptHTML(script));
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
      // Strip HTML before sending to AI
      const plainText = scriptText
        .replace(/<br\s*[/]?>/gi, '\n')
        .replace(/<\/div>/gi, '\n')
        .replace(/<\/p>/gi, '\n')
        .replace(/<[^>]*>?/gm, '')
        .replace(/\n\n+/g, '\n\n')
        .trim();
      const newScript = await modifyYouTubeScript(plainText, instruction);
      setScriptText(formatScriptHTML(newScript));
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

  const handleGenerateSimilarIdeas = async (index: number, title: string) => {
    setIsGeneratingIdeas(prev => ({ ...prev, [index]: true }));
    try {
      const ideas = await generateSimilarIdeas(title);
      setSimilarIdeas(prev => ({ ...prev, [index]: ideas }));
      toast({ title: "Ideas Generated!", description: "Check out these similar video ideas." });
    } catch (error) {
      toast({ title: "Error", description: "Failed to generate similar ideas.", variant: "destructive" });
    } finally {
      setIsGeneratingIdeas(prev => ({ ...prev, [index]: false }));
    }
  };

  const handleAnalyzeBooks = async (index: number, topic: string) => {
    setIsAnalyzingBooks(prev => ({ ...prev, [index]: true }));
    try {
      const books = await analyzeBooks(topic);
      setBookRecommendations(prev => ({ ...prev, [index]: books }));
      toast({ title: "Books Analyzed!", description: "Here are some book recommendations." });
    } catch (error) {
      toast({ title: "Error", description: "Failed to analyze books.", variant: "destructive" });
    } finally {
      setIsAnalyzingBooks(prev => ({ ...prev, [index]: false }));
    }
  };

  const handleGenerateThumbnails = async () => {
    if (!thumbnailTopic) return;
    setIsGeneratingThumbnails(true);
    setPreviewImage(null);
    setActiveThumbnailIndex(null);
    try {
      const data = await generateThumbnailsAndTitles(thumbnailTopic);
      setThumbnails(data.thumbnails);
      toast({ title: "Concepts Generated!", description: "Here are some high-CTR ideas." });
    } catch (error) {
      toast({ title: "Error", description: "Failed to generate concepts.", variant: "destructive" });
    } finally {
      setIsGeneratingThumbnails(false);
    }
  };

  const handleGenerateImage = async (concept: string, desc: string, index: number) => {
    // Check for API key selection
    if (window.aistudio && typeof window.aistudio.hasSelectedApiKey === 'function') {
      const hasKey = await window.aistudio.hasSelectedApiKey();
      if (!hasKey) {
        if (typeof window.aistudio.openSelectKey === 'function') {
          await window.aistudio.openSelectKey();
          // Assume success and proceed, as per guidelines
        }
      }
    }

    setIsGeneratingImage(true);
    setActiveThumbnailIndex(index);
    setPreviewImage(null);
    try {
      const imageUrl = await generateThumbnailImage(concept, desc);
      if (imageUrl) {
        setPreviewImage(imageUrl);
        toast({ title: "Thumbnail Generated!", description: "Image preview is ready." });
      } else {
        toast({ title: "Error", description: "Failed to generate image.", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to generate image.", variant: "destructive" });
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleGeneratePitch = async () => {
    if (!pitchChannelName || !pitchNiche || !pitchBrandName || !pitchProduct) return;
    setIsGeneratingPitch(true);
    try {
      const data = await generateSponsorshipPitch(pitchChannelName, pitchNiche, pitchSubCount, pitchBrandName, pitchProduct);
      setGeneratedPitch(data);
      toast({ title: "Pitch Generated!", description: "Your sponsorship pitch is ready." });
    } catch (error) {
      toast({ title: "Error", description: "Failed to generate pitch.", variant: "destructive" });
    } finally {
      setIsGeneratingPitch(false);
    }
  };

  const handleGenerateCommunity = async () => {
    if (!communityNiche || !communityRecentVideo) return;
    setIsGeneratingCommunity(true);
    try {
      const data = await generateCommunityPosts(communityNiche, communityRecentVideo);
      setGeneratedCommunityPosts(data);
      toast({ title: "Posts Generated!", description: "Community tab ideas are ready." });
    } catch (error) {
      toast({ title: "Error", description: "Failed to generate posts.", variant: "destructive" });
    } finally {
      setIsGeneratingCommunity(false);
    }
  };

  const handleGenerateChapters = async () => {
    if (!chaptersScript) return;
    setIsGeneratingChapters(true);
    try {
      const data = await generateVideoChapters(chaptersScript);
      setGeneratedChapters(data);
      toast({ title: "Chapters Generated!", description: "Video timestamps are ready." });
    } catch (error) {
      toast({ title: "Error", description: "Failed to generate chapters.", variant: "destructive" });
    } finally {
      setIsGeneratingChapters(false);
    }
  };

  const handleGenerateShorts = async () => {
    if (!shortsTopic) return;
    setIsGeneratingShorts(true);
    try {
      const data = await generateShortsScript(shortsTopic, shortsTone);
      setGeneratedShorts(data);
      toast({ title: "Shorts Script Generated!", description: "Your high-retention script is ready." });
    } catch (error) {
      toast({ title: "Error", description: "Failed to generate shorts script.", variant: "destructive" });
    } finally {
      setIsGeneratingShorts(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "titles":
        return (
          <div className="space-y-6">
            <div className="glass p-6 rounded-2xl border border-border/50">
              <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 p-4 rounded-xl mb-4 flex items-center gap-3">
                <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">Step 1</span>
                <h2 className="text-lg font-bold flex items-center gap-2 text-foreground">
                  <Lightbulb className="w-5 h-5 text-red-500" />
                  What is this Youtube Video topic about?
                </h2>
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                Enter your video topic. Our AI will generate highly clickable, SEO-optimized title variations and relevant tags to help your video rank.
              </p>
              <div className="flex gap-3">
                <input 
                  type="text" 
                  placeholder="e.g., Personal Finance, Tech Reviews, Productivity..." 
                  className="flex-1 bg-background/50 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50"
                  value={titleTopic}
                  onChange={(e) => setTitleTopic(e.target.value)}
                />
                <button 
                  onClick={handleGenerateTitles}
                  disabled={isGeneratingTitles || !titleTopic}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-medium text-sm transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  {isGeneratingTitles ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  Generate
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass p-6 rounded-2xl border border-border/50">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-red-500" />
                  Title Variations
                </h3>
                {isGeneratingTitles ? (
                  <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin text-red-500" /></div>
                ) : (
                  <div className="space-y-3">
                    {generatedTitles.map((title, i) => (
                      <div key={i} className="p-3 rounded-lg bg-background/50 border border-border flex items-center justify-between group hover:border-red-500/30 transition-colors">
                        <span className="text-sm font-medium">{title}</span>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                          <button 
                            onClick={() => handleGenerateScript({ title, hook: "Curiosity" })}
                            className="p-1.5 text-muted-foreground hover:text-red-500 transition-colors"
                            title="Write Script"
                          >
                            <PenTool className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            onClick={() => {
                              navigator.clipboard.writeText(title);
                              toast({ title: "Copied!", description: "Title copied to clipboard." });
                            }}
                            className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                            title="Copy Title"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="glass p-6 rounded-2xl border border-border/50">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Hash className="w-4 h-4 text-red-500" />
                  SEO Tags
                </h3>
                {isGeneratingTitles ? (
                  <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin text-red-500" /></div>
                ) : (
                  <div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {generatedTags.map((tag, i) => (
                        <span key={i} className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(generatedTags.join(", "));
                        toast({ title: "Copied!", description: "Tags copied to clipboard." });
                      }}
                      className="w-full py-2 rounded-lg bg-secondary text-secondary-foreground text-xs font-medium hover:bg-secondary/80 transition-colors flex items-center justify-center gap-2"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      Copy All Tags
                    </button>
                  </div>
                )}
              </div>
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
                <button onMouseDown={(e) => e.preventDefault()} onClick={() => document.execCommand('bold', false)} className="p-2 rounded-md hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors">
                  <Bold className="h-4 w-4" />
                </button>
                <button onMouseDown={(e) => e.preventDefault()} onClick={() => document.execCommand('italic', false)} className="p-2 rounded-md hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors">
                  <Italic className="h-4 w-4" />
                </button>
                <button onMouseDown={(e) => e.preventDefault()} onClick={() => document.execCommand('insertUnorderedList', false)} className="p-2 rounded-md hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors">
                  <List className="h-4 w-4" />
                </button>
                <button onMouseDown={(e) => e.preventDefault()} className="p-2 rounded-md hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors">
                  <Layout className="h-4 w-4" />
                </button>
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
                <div
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => setScriptText(e.currentTarget.innerHTML)}
                  data-placeholder="Start writing your script or ask AI to generate one..."
                  className="flex-1 w-full bg-transparent border border-border/50 rounded-xl p-4 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-red-500/40 mb-3 overflow-y-auto whitespace-pre-wrap outline-none"
                  dangerouslySetInnerHTML={{ __html: scriptText }}
                />
              )}

              <div className="flex items-center justify-between pt-2 border-t border-border/50">
                <div className="flex gap-4">
                  <span className="text-xs text-muted-foreground font-medium">Est. time: ~{Math.max(1, Math.round(scriptText.replace(/<br\s*[/]?>/gi, '\n').replace(/<\/div>/gi, '\n').replace(/<\/p>/gi, '\n').replace(/<[^>]*>?/gm, '').split(/\s+/).filter(w => w.length > 0).length / 150))} mins</span>
                  <span className="text-xs text-muted-foreground font-medium">Words: {scriptText.replace(/<br\s*[/]?>/gi, '\n').replace(/<\/div>/gi, '\n').replace(/<\/p>/gi, '\n').replace(/<[^>]*>?/gm, '').split(/\s+/).filter(w => w.length > 0).length}</span>
                </div>
                <button 
                  onClick={() => {
                    const plainText = scriptText
                      .replace(/<br\s*[/]?>/gi, '\n')
                      .replace(/<\/div>/gi, '\n')
                      .replace(/<\/p>/gi, '\n')
                      .replace(/<[^>]*>?/gm, '')
                      .replace(/\n\n+/g, '\n\n')
                      .trim();
                    navigator.clipboard.writeText(plainText);
                    toast({ title: "Copied!", description: "Script copied to clipboard." });
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-muted/50 text-muted-foreground text-xs font-medium transition-colors"
                >
                  <Copy className="h-3.5 w-3.5" />
                  Copy Script
                </button>
              </div>
            </div>
          </div>
        );

      case "analytics":
        return (
          <div className="space-y-6">
            <div className="glass p-6 rounded-2xl border border-border/50">
              <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-red-500" />
                Analytics Dashboard
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
                  className="bg-[#f89b9b] hover:bg-[#f08a8a] text-white px-6 py-3 rounded-xl font-medium text-sm transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  {isAddingCompetitor ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                  Track Channel
                </button>
              </div>
            </div>

            <div className="bg-blue-50/50 border border-blue-100 dark:bg-blue-950/20 dark:border-blue-900/50 rounded-xl p-4 flex items-start gap-3">
              <div className="mt-0.5">
                <Lightbulb className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-blue-700 dark:text-blue-400 mb-1">What is an Outlier Video?</h4>
                <p className="text-xs text-blue-600/80 dark:text-blue-300/80 leading-relaxed">
                  An outlier video is a video that performs significantly better than a channel's average. 
                  For example, if a channel usually gets 100K views but posts a video that gets 1M views, that's an outlier. 
                  Tracking these helps you identify trending topics, highly clickable thumbnail concepts, and proven hooks before your competition does.
                </p>
              </div>
            </div>

            <div className="grid gap-4">
              {competitors.map((comp, i) => (
                <div key={i} className="glass p-5 rounded-2xl border border-border/50 flex flex-col gap-5 transition-all hover:shadow-md">
                  {/* Header: Channel Info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                        <Youtube className="w-5 h-5 text-red-500" />
                      </div>
                      <div>
                        <h3 className="font-bold text-base leading-tight">{comp.name}</h3>
                        <p className="text-xs text-muted-foreground">{comp.subs} Subscribers</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 bg-green-500/10 text-green-600 dark:text-green-400 text-[10px] font-bold uppercase tracking-wider rounded-full flex items-center gap-1">
                        <Activity className="w-3 h-3" /> {comp.status}
                      </span>
                      <button 
                        onClick={() => setCompetitors(competitors.filter((_, index) => index !== i))}
                        className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Body: Outlier Video Info */}
                  <div className="bg-background/50 rounded-xl p-4 border border-border/50">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-red-500 bg-red-500/10 px-2 py-0.5 rounded-sm">Outlier Detected</span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3"/> {comp.publishedAt}</span>
                        </div>
                        <h4 className="font-semibold text-sm line-clamp-2 leading-snug">{comp.recentOutlier}</h4>
                      </div>
                      <div className="w-24 h-16 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center shrink-0 relative overflow-hidden group cursor-pointer">
                        <Play className="w-6 h-6 text-white/70 group-hover:text-white transition-colors z-10" />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                        <div className="absolute bottom-1 right-1 bg-black/80 text-white text-[9px] px-1 rounded font-mono">{comp.duration}</div>
                      </div>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div className="bg-background rounded-lg p-2 border border-border/50">
                        <div className="text-[10px] text-muted-foreground mb-0.5">Outlier Views</div>
                        <div className="font-bold text-sm text-green-500">{comp.outlierViews}</div>
                      </div>
                      <div className="bg-background rounded-lg p-2 border border-border/50">
                        <div className="text-[10px] text-muted-foreground mb-0.5">Channel Avg</div>
                        <div className="font-bold text-sm">{comp.avgViews}</div>
                      </div>
                      <div className="bg-background rounded-lg p-2 border border-border/50 flex flex-col justify-center items-center bg-green-500/5 border-green-500/20">
                        <div className="text-[10px] text-green-600 dark:text-green-400 font-medium mb-0.5">Performance</div>
                        <div className="font-bold text-sm text-green-600 dark:text-green-400 flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" /> {comp.multiplier}
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {comp.tags.map(tag => (
                        <span key={tag} className="text-[10px] px-2 py-1 bg-secondary text-secondary-foreground rounded-md">#{tag}</span>
                      ))}
                    </div>
                  </div>

                  {/* Footer: Actions */}
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleGenerateSimilarIdeas(i, comp.recentOutlier)}
                      disabled={isGeneratingIdeas[i]}
                      className="flex-1 bg-secondary hover:bg-secondary/80 text-secondary-foreground text-xs font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                    >
                      {isGeneratingIdeas[i] ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Lightbulb className="w-3.5 h-3.5" />} Generate Similar Ideas
                    </button>
                    <button 
                      onClick={() => handleAnalyzeBooks(i, comp.tags[0] || comp.name)}
                      disabled={isAnalyzingBooks[i]}
                      className="flex-1 bg-secondary hover:bg-secondary/80 text-secondary-foreground text-xs font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                    >
                      {isAnalyzingBooks[i] ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <PenTool className="w-3.5 h-3.5" />} Analyze Books
                    </button>
                  </div>

                  {/* Results Display */}
                  {(similarIdeas[i] || bookRecommendations[i]) && (
                    <div className="bg-secondary/50 rounded-xl p-4 space-y-4">
                      {similarIdeas[i] && (
                        <div>
                          <h5 className="text-xs font-bold mb-2">Similar Ideas</h5>
                          <ul className="space-y-1">
                            {similarIdeas[i].map((idea, idx) => (
                              <li key={idx} className="text-xs text-muted-foreground list-disc list-inside">{idea}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {bookRecommendations[i] && (
                        <div>
                          <h5 className="text-xs font-bold mb-2">Book Recommendations</h5>
                          <ul className="space-y-2">
                            {bookRecommendations[i].map((book, idx) => (
                              <li key={idx} className="text-xs text-muted-foreground">
                                <span className="font-semibold text-foreground">{book.title}</span> by {book.author}
                                <p className="text-[10px] mt-0.5">{book.insight}</p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
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
                  <ImageIcon className="w-4 h-4 text-red-500" />
                  Thumbnail Concepts
                </h3>
                {isGeneratingThumbnails ? (
                  <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin text-red-500" /></div>
                ) : (
                  <div className="space-y-4">
                    {thumbnails.map((thumb, i) => (
                      <button 
                        key={i} 
                        onClick={() => handleGenerateImage(thumb.concept, thumb.desc, i)}
                        className={`w-full text-left p-4 rounded-lg bg-background/50 border transition-all ${activeThumbnailIndex === i ? 'border-red-500 ring-1 ring-red-500/50' : 'border-border hover:border-red-500/30'}`}
                      >
                        <div className="font-bold text-sm mb-1 text-red-500">{thumb.concept}</div>
                        <p className="text-xs text-muted-foreground leading-relaxed">{thumb.desc}</p>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="glass p-6 rounded-2xl border border-border/50 flex flex-col">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-red-500" />
                  Preview Panel
                </h3>
                <div className="flex-1 bg-background/50 border border-border rounded-xl flex items-center justify-center overflow-hidden relative min-h-[250px]">
                  {isGeneratingImage ? (
                    <div className="flex flex-col items-center gap-3">
                      <Loader2 className="w-8 h-8 animate-spin text-red-500" />
                      <p className="text-sm text-muted-foreground font-medium animate-pulse">Generating image with NanoBanana 2...</p>
                    </div>
                  ) : previewImage ? (
                    <img src={previewImage} alt="Thumbnail Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="text-center text-muted-foreground p-6">
                      <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-20" />
                      <p className="text-sm">Click a concept on the left to generate a thumbnail preview.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case "sponsorship":
        return (
          <div className="space-y-6">
            <div className="glass p-6 rounded-2xl border border-border/50">
              <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-red-500" />
                Sponsorship Pitch Generator
              </h2>
              <p className="text-muted-foreground text-sm mb-6">
                Generate a professional, persuasive email pitch to send to brands for potential sponsorships.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Channel Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g., Tech Talk" 
                    className="w-full bg-background/50 border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50"
                    value={pitchChannelName}
                    onChange={(e) => setPitchChannelName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Niche</label>
                  <input 
                    type="text" 
                    placeholder="e.g., Tech Reviews" 
                    className="w-full bg-background/50 border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50"
                    value={pitchNiche}
                    onChange={(e) => setPitchNiche(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Subscribers</label>
                  <input 
                    type="text" 
                    placeholder="e.g., 50K" 
                    className="w-full bg-background/50 border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50"
                    value={pitchSubCount}
                    onChange={(e) => setPitchSubCount(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Target Brand</label>
                  <input 
                    type="text" 
                    placeholder="e.g., Notion" 
                    className="w-full bg-background/50 border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50"
                    value={pitchBrandName}
                    onChange={(e) => setPitchBrandName(e.target.value)}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Product to Promote</label>
                  <input 
                    type="text" 
                    placeholder="e.g., Notion AI" 
                    className="w-full bg-background/50 border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50"
                    value={pitchProduct}
                    onChange={(e) => setPitchProduct(e.target.value)}
                  />
                </div>
              </div>

              <button 
                onClick={handleGeneratePitch}
                disabled={isGeneratingPitch || !pitchChannelName || !pitchNiche || !pitchBrandName || !pitchProduct}
                className="w-full bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-medium text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isGeneratingPitch ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                Generate Pitch
              </button>
            </div>

            {generatedPitch && (
              <div className="glass p-6 rounded-2xl border border-border/50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold flex items-center gap-2">
                    <FileText className="w-4 h-4 text-red-500" />
                    Generated Pitch
                  </h3>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(`Subject: ${generatedPitch.subject}\n\n${generatedPitch.body}`);
                      toast({ title: "Copied!", description: "Pitch copied to clipboard." });
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-muted/50 text-muted-foreground text-xs font-medium transition-colors"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    Copy All
                  </button>
                </div>
                <div className="bg-background/50 border border-border rounded-xl p-4 space-y-4">
                  <div>
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Subject</span>
                    <p className="text-sm font-medium mt-1">{generatedPitch.subject}</p>
                  </div>
                  <div className="w-full h-px bg-border/50" />
                  <div>
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Body</span>
                    <p className="text-sm mt-1 whitespace-pre-wrap leading-relaxed">{generatedPitch.body}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case "community":
        return (
          <div className="space-y-6">
            <div className="glass p-6 rounded-2xl border border-border/50">
              <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
                <Repeat className="w-5 h-5 text-red-500" />
                Community Posts Generator
              </h2>
              <p className="text-muted-foreground text-sm mb-6">
                Keep your audience engaged between uploads with AI-generated Community Tab posts.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Your Niche</label>
                  <input 
                    type="text" 
                    placeholder="e.g., Fitness, Gaming, Cooking" 
                    className="w-full bg-background/50 border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50"
                    value={communityNiche}
                    onChange={(e) => setCommunityNiche(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Recent Video Topic</label>
                  <input 
                    type="text" 
                    placeholder="e.g., 10 Min Core Workout" 
                    className="w-full bg-background/50 border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50"
                    value={communityRecentVideo}
                    onChange={(e) => setCommunityRecentVideo(e.target.value)}
                  />
                </div>
              </div>

              <button 
                onClick={handleGenerateCommunity}
                disabled={isGeneratingCommunity || !communityNiche || !communityRecentVideo}
                className="w-full bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-medium text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isGeneratingCommunity ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                Generate Community Posts
              </button>
            </div>

            {generatedCommunityPosts.length > 0 && (
              <div className="grid gap-4">
                {generatedCommunityPosts.map((post, i) => (
                  <div key={i} className="glass p-5 rounded-2xl border border-border/50">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2.5 py-1 bg-red-500/10 text-red-500 text-[10px] font-bold uppercase tracking-wider rounded-full">
                        {post.type}
                      </span>
                      <button 
                        onClick={() => {
                          let text = post.content;
                          if (post.options && post.options.length > 0) {
                            text += '\n\nOptions:\n' + post.options.map((o: string) => `- ${o}`).join('\n');
                          }
                          navigator.clipboard.writeText(text);
                          toast({ title: "Copied!", description: "Post copied to clipboard." });
                        }}
                        className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                        title="Copy Post"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-sm mb-4 whitespace-pre-wrap">{post.content}</p>
                    {post.options && post.options.length > 0 && (
                      <div className="space-y-2">
                        {post.options.map((opt: string, idx: number) => (
                          <div key={idx} className="bg-background/50 border border-border rounded-lg px-4 py-2 text-sm text-muted-foreground">
                            {opt}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case "chapters":
        return (
          <div className="space-y-6">
            <div className="glass p-6 rounded-2xl border border-border/50">
              <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
                <Clock className="w-5 h-5 text-red-500" />
                Video Chapters Generator
              </h2>
              <p className="text-muted-foreground text-sm mb-6">
                Paste your video script or outline, and we'll generate SEO-friendly YouTube timestamps.
              </p>
              
              <div className="mb-4">
                <textarea 
                  placeholder="Paste your script or outline here..." 
                  className="w-full h-48 bg-background/50 border border-border rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50 resize-none"
                  value={chaptersScript}
                  onChange={(e) => setChaptersScript(e.target.value)}
                />
              </div>

              <button 
                onClick={handleGenerateChapters}
                disabled={isGeneratingChapters || !chaptersScript}
                className="w-full bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-medium text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isGeneratingChapters ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                Generate Chapters
              </button>
            </div>

            {generatedChapters && (
              <div className="glass p-6 rounded-2xl border border-border/50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold flex items-center gap-2">
                    <List className="w-4 h-4 text-red-500" />
                    Generated Timestamps
                  </h3>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(generatedChapters);
                      toast({ title: "Copied!", description: "Chapters copied to clipboard." });
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-muted/50 text-muted-foreground text-xs font-medium transition-colors"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    Copy All
                  </button>
                </div>
                <div className="bg-background/50 border border-border rounded-xl p-4">
                  <pre className="text-sm whitespace-pre-wrap font-mono text-muted-foreground">
                    {generatedChapters}
                  </pre>
                </div>
              </div>
            )}
          </div>
        );

      case "shorts":
        return (
          <div className="space-y-6">
            <div className="glass p-6 rounded-2xl border border-border/50">
              <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
                <Video className="w-5 h-5 text-red-500" />
                Shorts Script Generator
              </h2>
              <p className="text-muted-foreground text-sm mb-6">
                Create high-retention, 60-second YouTube Shorts scripts with scroll-stopping hooks.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Topic</label>
                  <input 
                    type="text" 
                    placeholder="e.g., 3 Hidden iPhone Features" 
                    className="w-full bg-background/50 border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50"
                    value={shortsTopic}
                    onChange={(e) => setShortsTopic(e.target.value)}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Tone</label>
                  <select 
                    className="w-full bg-background/50 border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50"
                    value={shortsTone}
                    onChange={(e) => setShortsTone(e.target.value)}
                  >
                    <option value="educational">Educational & Informative</option>
                    <option value="funny">Funny & Entertaining</option>
                    <option value="dramatic">Dramatic & Suspenseful</option>
                    <option value="controversial">Controversial & Opinionated</option>
                    <option value="storytelling">Storytelling</option>
                  </select>
                </div>
              </div>

              <button 
                onClick={handleGenerateShorts}
                disabled={isGeneratingShorts || !shortsTopic}
                className="w-full bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-medium text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isGeneratingShorts ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                Generate Shorts Script
              </button>
            </div>

            {generatedShorts && (
              <div className="glass p-6 rounded-2xl border border-border/50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold flex items-center gap-2">
                    <FileText className="w-4 h-4 text-red-500" />
                    Generated Script
                  </h3>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(`HOOK (0-3s):\n${generatedShorts.hook}\n\nBODY:\n${generatedShorts.body}\n\nCTA:\n${generatedShorts.callToAction}`);
                      toast({ title: "Copied!", description: "Script copied to clipboard." });
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-muted/50 text-muted-foreground text-xs font-medium transition-colors"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    Copy All
                  </button>
                </div>
                <div className="bg-background/50 border border-border rounded-xl p-4 space-y-4">
                  <div>
                    <span className="text-xs font-semibold text-red-500 uppercase tracking-wider bg-red-500/10 px-2 py-0.5 rounded-sm">Hook (0-3s)</span>
                    <p className="text-sm font-bold mt-2">{generatedShorts.hook}</p>
                  </div>
                  <div className="w-full h-px bg-border/50" />
                  <div>
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Body</span>
                    <p className="text-sm mt-2 whitespace-pre-wrap leading-relaxed">{generatedShorts.body}</p>
                  </div>
                  <div className="w-full h-px bg-border/50" />
                  <div>
                    <span className="text-xs font-semibold text-blue-500 uppercase tracking-wider bg-blue-500/10 px-2 py-0.5 rounded-sm">Call to Action</span>
                    <p className="text-sm font-medium mt-2">{generatedShorts.callToAction}</p>
                  </div>
                </div>
              </div>
            )}
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
        <aside className="w-72 border-r border-border/50 bg-card/30 hidden md:flex flex-col shrink-0">
          <div className="p-6">
            <div className="flex items-center gap-2 font-heading font-bold text-lg mb-8">
              <Youtube className="w-6 h-6 text-red-500" />
              YouTube Assist
            </div>
            
            <nav className="space-y-2">
              {[
                { id: "titles", icon: Lightbulb, label: "Title & Tag Generator" },
                { id: "editor", icon: PenTool, label: "Script Writer" },
                { id: "shorts", icon: Video, label: "Shorts Script" },
                { id: "thumbnails", icon: ImageIcon, label: "Thumbnail Ideas" },
                { id: "analytics", icon: BarChart3, label: "Analytics Dashboard" },
                { id: "sponsorship", icon: MessageSquare, label: "Sponsorship Pitch" },
                { id: "community", icon: Repeat, label: "Community Posts" },
                { id: "chapters", icon: Clock, label: "Video Chapters" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                    activeTab === item.id 
                      ? "bg-gradient-to-r from-red-500 to-red-600 text-white font-bold shadow-md border border-transparent" 
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
