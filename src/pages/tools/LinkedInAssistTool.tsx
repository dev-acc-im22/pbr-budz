import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { 
  Linkedin, PenTool, BarChart3, Lightbulb, 
  Repeat, Play, Plus, Trash2, Copy, 
  Sparkles, TrendingUp, Activity, MessageSquare, Loader2,
  Calendar, Clock, Target, Zap, Briefcase, BookOpen, Smile, Grid3X3, List, Check,
  Youtube, Link as LinkIcon, FileText, LayoutTemplate, ArrowLeft
} from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { generateLinkedInPosts, rewriteLinkedInPost, simulateLinkedInAlgorithm, generatePostFromExperience, generatePostFromStory, generateCarouselContent, generatePollContent, repurposeContent } from "@/services/geminiService";
import { LinkedInFullLogo } from "@/components/LinkedInFullLogo";
import { savePost, updatePostStatus, Post } from "@/services/firebaseService";

const LinkedInAssistTool = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("writer");
  
  // Writer State
  const [postTopic, setPostTopic] = useState("");
  const [experienceText, setExperienceText] = useState("");
  const [storyText, setStoryText] = useState("");
  const [generatedPosts, setGeneratedPosts] = useState<Post[]>([]);
  const [isGeneratingPosts, setIsGeneratingPosts] = useState(false);
  const [editorText, setEditorText] = useState("");
  const [isRewriting, setIsRewriting] = useState(false);

  // Simulator State
  const [simulatorText, setSimulatorText] = useState("");
  const [simulationResult, setSimulationResult] = useState<{score: number, reach: string, engagement: string, feedback: string} | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  // Scheduler State (Mock)
  const [scheduledPosts, setScheduledPosts] = useState([
    { text: "I'm thrilled to announce that I've joined...", time: "Today, 8:00 AM", status: "Scheduled" },
    { text: "The biggest mistake junior developers make is...", time: "Tomorrow, 11:30 AM", status: "Scheduled" }
  ]);

  // Carousel State
  const [carouselTopic, setCarouselTopic] = useState("");
  const [carouselResult, setCarouselResult] = useState<{slides: {title: string, content: string, visualSuggestion: string}[]} | null>(null);
  const [isGeneratingCarousel, setIsGeneratingCarousel] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  // Poll State
  const [pollTopic, setPollTopic] = useState("");
  const [pollResult, setPollResult] = useState<{question: string, options: string[]} | null>(null);
  const [isGeneratingPoll, setIsGeneratingPoll] = useState(false);

  // Repurpose State
  const [repurposeOption, setRepurposeOption] = useState<'youtube' | 'article' | 'pdf' | 'format' | null>(null);
  const [repurposeInput, setRepurposeInput] = useState("");
  const [isRepurposing, setIsRepurposing] = useState(false);

  const handleRepurpose = async () => {
    if (!repurposeOption || !repurposeInput) return;
    setIsRepurposing(true);
    try {
      const post = await repurposeContent(repurposeOption, repurposeInput);
      setEditorText(post);
      setActiveTab("writer"); // Switch to writer tab to edit the generated post
      toast({ title: "Content Repurposed!", description: "Your post is ready for editing." });
    } catch (error) {
      toast({ title: "Error", description: "Failed to repurpose content.", variant: "destructive" });
    } finally {
      setIsRepurposing(false);
      setRepurposeOption(null);
      setRepurposeInput("");
    }
  };

  const handleGenerateFromExperience = async () => {
    if (!experienceText) return;
    setIsGeneratingPosts(true);
    try {
      const post = await generatePostFromExperience(experienceText);
      setEditorText(post);
      toast({ title: "Post Generated!", description: "Experience transformed into a post." });
    } catch (error) {
      toast({ title: "Error", description: "Failed to generate post.", variant: "destructive" });
    } finally {
      setIsGeneratingPosts(false);
    }
  };

  const handleGenerateFromStory = async () => {
    if (!storyText) return;
    setIsGeneratingPosts(true);
    try {
      const post = await generatePostFromStory(storyText);
      setEditorText(post);
      toast({ title: "Post Generated!", description: "Story transformed into a post." });
    } catch (error) {
      toast({ title: "Error", description: "Failed to generate post.", variant: "destructive" });
    } finally {
      setIsGeneratingPosts(false);
    }
  };

  const handleGenerateCarousel = async () => {
    setIsGeneratingCarousel(true);
    try {
      const res = await generateCarouselContent(carouselTopic);
      setCarouselResult(res);
      setActiveSlide(0);
      toast({ title: "Carousel Generated!", description: "AI has created your slides." });
    } catch (error) {
      toast({ title: "Error", description: "Failed to generate carousel.", variant: "destructive" });
    } finally {
      setIsGeneratingCarousel(false);
    }
  };

  const updateSlide = (index: number, field: 'title' | 'content' | 'visualSuggestion', value: string) => {
    if (!carouselResult) return;
    const newSlides = [...carouselResult.slides];
    newSlides[index][field] = value;
    setCarouselResult({ ...carouselResult, slides: newSlides });
  };

  const handleGeneratePosts = async () => {
    if (!postTopic) return;
    setIsGeneratingPosts(true);
    try {
      const posts = await generateLinkedInPosts(postTopic);
      const savedPosts = await Promise.all(posts.map(async (p) => {
        const docRef = await savePost({
          title: postTopic,
          content: p.text,
          platform: 'linkedin',
          status: 'draft',
          scheduledDate: null,
        });
        return { ...p, id: docRef.id, title: postTopic, platform: 'linkedin', status: 'draft', authorUID: '', createdAt: new Date() } as Post;
      }));
      setGeneratedPosts(savedPosts);
      toast({ title: "Posts Generated!", description: "Here are some ideas to get you started." });
    } catch (error) {
      toast({ title: "Error", description: "Failed to generate posts.", variant: "destructive" });
    } finally {
      setIsGeneratingPosts(false);
    }
  };

  const handleRewrite = async (style: string) => {
    if (!editorText) return;
    setIsRewriting(true);
    try {
      const rewritten = await rewriteLinkedInPost(editorText, style);
      setEditorText(rewritten);
      toast({ title: "Post Rewritten!", description: `Applied style: ${style}` });
    } catch (error) {
      toast({ title: "Error", description: "Failed to rewrite post.", variant: "destructive" });
    } finally {
      setIsRewriting(false);
    }
  };

  const handleSimulate = async () => {
    if (!simulatorText) return;
    setIsSimulating(true);
    try {
      const result = await simulateLinkedInAlgorithm(simulatorText);
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
            <div className="glass p-6 rounded-2xl border border-white/10 shadow-lg bg-card/50">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 bg-gradient-to-r from-[#0a66c2] to-[#004182] text-white p-6 rounded-xl shadow-sm">
                <span className="bg-white/20 px-3 py-1.5 rounded-md text-sm font-semibold tracking-wide">STEP 1</span>
                <PenTool className="w-6 h-6 text-white" />
                AI Post Writer for LinkedIn
              </h2>
              <p className="text-muted-foreground text-base mb-6">
                Generate professional, engaging LinkedIn posts. Enter a topic to get started, or paste a draft to refine it.
              </p>
              <div className="flex gap-3 mb-6">
                <input 
                  type="text" 
                  placeholder="What professional topic do you want to post about?" 
                  className="flex-1 bg-background/50 border border-border rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-primary/50"
                  value={postTopic}
                  onChange={(e) => setPostTopic(e.target.value)}
                />
                <button 
                  onClick={handleGeneratePosts}
                  disabled={isGeneratingPosts || !postTopic}
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-xl font-bold text-base transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  {isGeneratingPosts ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                  Generate
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="glass rounded-2xl border border-white/10 shadow-lg bg-card/50 overflow-hidden">
                  <div className="bg-[#0a66c2] p-4">
                    <h4 className="font-bold text-xl text-white flex items-center gap-3"><BookOpen className="w-6 h-6 text-white"/> Turn your experience into a post</h4>
                  </div>
                  <div className="p-8">
                    <textarea value={experienceText} onChange={(e) => setExperienceText(e.target.value)} placeholder="Describe a professional experience..." className="w-full h-40 bg-background/50 border border-border rounded-lg p-4 text-base mb-6 focus:outline-none focus:ring-2 focus:ring-[#0a66c2]/40"/>
                    <button onClick={handleGenerateFromExperience} disabled={isGeneratingPosts || !experienceText} className="w-full bg-[#0a66c2] hover:bg-[#004182] text-white py-4 rounded-lg font-bold text-base transition-colors disabled:opacity-50">Generate Post</button>
                  </div>
                </div>
                <div className="glass rounded-2xl border border-white/10 shadow-lg bg-card/50 overflow-hidden">
                  <div className="bg-[#0a66c2] p-4">
                    <h4 className="font-bold text-xl text-white flex items-center gap-3"><Smile className="w-6 h-6 text-white"/> Turn your personal story into a professional LinkedIn post</h4>
                  </div>
                  <div className="p-8">
                    <textarea value={storyText} onChange={(e) => setStoryText(e.target.value)} placeholder="Share a personal story..." className="w-full h-40 bg-background/50 border border-border rounded-lg p-4 text-base mb-6 focus:outline-none focus:ring-2 focus:ring-[#0a66c2]/40"/>
                    <button onClick={handleGenerateFromStory} disabled={isGeneratingPosts || !storyText} className="w-full bg-[#0a66c2] hover:bg-[#004182] text-white py-4 rounded-lg font-bold text-base transition-colors disabled:opacity-50">Generate Post</button>
                  </div>
                </div>
              </div>

              {generatedPosts.length > 0 && (
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  {generatedPosts.map((post, i) => (
                    <div key={i} className="p-6 rounded-xl bg-background/50 border border-border hover:border-primary/30 transition-colors group">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-md">{post.platform}</span>
                        <div className="flex gap-2">
                          <button 
                            onClick={async () => {
                              if (post.id) {
                                await updatePostStatus(post.id, 'approved');
                                toast({ title: "Approved!", description: "Post approved and sent to calendar." });
                              }
                            }}
                            className="text-xs text-green-600 hover:text-green-700 transition-all flex items-center gap-1"
                          >
                            <Check className="w-4 h-4" /> Approve
                          </button>
                          <button 
                            onClick={() => {
                              navigator.clipboard.writeText(post.content);
                              toast({ title: "Copied!", description: "Post copied to clipboard." });
                            }}
                            className="text-xs text-muted-foreground hover:text-foreground transition-all flex items-center gap-1"
                          >
                            <Copy className="w-4 h-4" /> Copy
                          </button>
                          <button 
                            onClick={() => {
                              setEditorText(post.content);
                              toast({ title: "Moved to Editor", description: "You can now edit or rewrite this post." });
                            }}
                            className="text-xs text-muted-foreground hover:text-foreground transition-all flex items-center gap-1"
                          >
                            <PenTool className="w-4 h-4" /> Edit
                          </button>
                        </div>
                      </div>
                      <p className="text-base line-clamp-4">{post.content}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="border-t border-border/50 pt-8">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-3 bg-gradient-to-r from-[#0a66c2] to-[#004182] text-white p-6 rounded-xl shadow-sm">
                  <span className="bg-white/20 px-3 py-1.5 rounded-md text-sm font-semibold tracking-wide">STEP 2</span>
                  <Repeat className="w-6 h-6 text-white" />
                  Editor & Remixer
                </h3>
                <div className="flex gap-2 mb-3 flex-wrap">
                  <button onClick={() => handleRewrite("storytelling")} disabled={isRewriting || !editorText} className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors disabled:opacity-50">Storytelling</button>
                  <button onClick={() => handleRewrite("actionable")} disabled={isRewriting || !editorText} className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors disabled:opacity-50">Actionable</button>
                  <button onClick={() => handleRewrite("thought-leadership")} disabled={isRewriting || !editorText} className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors disabled:opacity-50">Thought Leadership</button>
                  <button onClick={() => handleRewrite("professional")} disabled={isRewriting || !editorText} className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors disabled:opacity-50">More Professional</button>
                  <button onClick={() => handleRewrite("concise")} disabled={isRewriting || !editorText} className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors disabled:opacity-50">Make Concise</button>
                  <button onClick={() => handleRewrite("emojis")} disabled={isRewriting || !editorText} className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors disabled:opacity-50">Add Emojis</button>
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
                    className="w-full h-48 bg-transparent border border-border/50 rounded-xl p-4 text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-primary/40"
                    placeholder="Paste a draft here to rewrite, or edit a generated post..."
                  />
                </div>
                <div className="flex justify-end mt-3">
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(editorText);
                      toast({ title: "Copied!", description: "Post copied to clipboard." });
                    }}
                    disabled={!editorText}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                  >
                    <Copy className="h-4 w-4" />
                    Copy Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case "simulator":
        return (
          <div className="space-y-6">
            <div className="glass p-6 rounded-2xl border border-white/10 shadow-lg bg-card/50">
              <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Algorithm Simulator
              </h2>
              <p className="text-muted-foreground text-sm mb-6">
                Test your post against the LinkedIn algorithm. See predicted reach and get suggestions for improvement.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <textarea
                    value={simulatorText}
                    onChange={(e) => setSimulatorText(e.target.value)}
                    className="w-full h-40 bg-background/50 border border-border rounded-xl p-4 text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-primary/40 mb-4"
                    placeholder="Paste your post here to test it against the algorithm..."
                  />
                  <button 
                    onClick={handleSimulate}
                    disabled={isSimulating || !simulatorText}
                    className="w-full bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-medium text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
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
                          <div className="text-xs text-muted-foreground">Est. Impressions</div>
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
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(`Score: ${simulationResult.score}/100, Reach: ${simulationResult.reach}, Engagement: ${simulationResult.engagement}, Feedback: ${simulationResult.feedback}`);
                          toast({ title: "Copied!", description: "Simulation result copied to clipboard." });
                        }}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors"
                      >
                        <Copy className="h-4 w-4" /> Copy Result
                      </button>
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

      case "repurpose":
        return (
          <div className="space-y-6">
            <div className="rounded-[2rem] bg-[#0ea5e9] p-2 md:p-3 shadow-xl">
              <div className="rounded-[1.5rem] bg-white p-6 md:p-10">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-bold flex items-center gap-3 text-slate-900">
                    <Sparkles className="w-6 h-6 text-[#8b5cf6]" />
                    Repurpose Content
                  </h2>
                  <button 
                    onClick={() => setActiveTab("writer")}
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    <PenTool className="w-4 h-4" />
                    Write From Scratch
                  </button>
                </div>
                
                {!repurposeOption ? (
                  <>
                    <p className="text-slate-500 text-sm mb-8">Select a template to generate high-quality posts with AI.</p>

                    <div className="space-y-4">
                      {/* YouTube Option */}
                      <button 
                        onClick={() => setRepurposeOption('youtube')}
                        className="w-full flex items-center gap-4 p-5 rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-sm bg-white transition-all text-left group"
                      >
                        <div className="text-[#ef4444] group-hover:scale-110 transition-transform">
                          <Youtube className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 text-sm mb-0.5">Generate a post from a Youtube video</h3>
                          <p className="text-xs text-slate-500">Share a Youtube video link and generate a post from it</p>
                        </div>
                      </button>

                      {/* Article Option */}
                      <button 
                        onClick={() => setRepurposeOption('article')}
                        className="w-full flex items-center gap-4 p-5 rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-sm bg-white transition-all text-left group"
                      >
                        <div className="text-[#10b981] group-hover:scale-110 transition-transform">
                          <LinkIcon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 text-sm mb-0.5">Generate a post from an article</h3>
                          <p className="text-xs text-slate-500">Share a link to a blog post and generate a post from it</p>
                        </div>
                      </button>

                      {/* PDF Option */}
                      <button 
                        onClick={() => setRepurposeOption('pdf')}
                        className="w-full flex items-center gap-4 p-5 rounded-2xl border-2 border-[#8b5cf6] bg-white transition-all text-left group shadow-sm"
                      >
                        <div className="text-[#8b5cf6] group-hover:scale-110 transition-transform">
                          <FileText className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 text-sm mb-0.5">Generate a post from a PDF</h3>
                          <p className="text-xs text-slate-500">Upload a PDF and generate a post from it</p>
                        </div>
                      </button>

                      {/* Format Option */}
                      <button 
                        onClick={() => setRepurposeOption('format')}
                        className="w-full flex items-center gap-4 p-5 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-200 transition-all text-left group"
                      >
                        <div className="text-[#0ea5e9] group-hover:scale-110 transition-transform">
                          <LayoutTemplate className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 text-sm mb-0.5">Format your content</h3>
                          <p className="text-xs text-slate-500">Use the power of AI to format your clunky content into readable posts</p>
                        </div>
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 mt-8">
                    <button 
                      onClick={() => {
                        setRepurposeOption(null);
                        setRepurposeInput("");
                      }}
                      className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors mb-4"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back to options
                    </button>
                    
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                      <h3 className="font-bold text-lg text-slate-900 mb-2">
                        {repurposeOption === 'youtube' && "Generate from YouTube"}
                        {repurposeOption === 'article' && "Generate from Article"}
                        {repurposeOption === 'pdf' && "Generate from PDF"}
                        {repurposeOption === 'format' && "Format Content"}
                      </h3>
                      <p className="text-sm text-slate-500 mb-4">
                        {repurposeOption === 'youtube' && "Paste the YouTube video URL or description below."}
                        {repurposeOption === 'article' && "Paste the article URL or text content below."}
                        {repurposeOption === 'pdf' && "Paste the extracted text from your PDF below."}
                        {repurposeOption === 'format' && "Paste your raw, unformatted text below."}
                      </p>
                      
                      <textarea 
                        value={repurposeInput}
                        onChange={(e) => setRepurposeInput(e.target.value)}
                        placeholder="Paste your content here..."
                        className="w-full h-40 p-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]/50 resize-none mb-4 bg-white text-slate-900"
                      />
                      
                      <button 
                        onClick={handleRepurpose}
                        disabled={isRepurposing || !repurposeInput}
                        className="w-full flex items-center justify-center gap-2 bg-[#0ea5e9] hover:bg-[#0284c7] text-white px-6 py-3 rounded-xl font-bold transition-colors disabled:opacity-50"
                      >
                        {isRepurposing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                        Generate Post
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="px-4 pt-4">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Content Repurposing</h3>
              <p className="text-slate-500 text-base leading-relaxed max-w-3xl">
                Turn YouTube videos, blog posts, and PDFs into LinkedIn-ready posts. One source, multiple formats — no rewriting required.
              </p>
            </div>
          </div>
        );

      case "carousel":
        return (
          <div className="space-y-6">
            <div className="glass p-6 rounded-2xl border border-white/10 shadow-lg bg-card/50">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-3">
                <Grid3X3 className="w-5 h-5 text-primary" />
                Carousel Generator
              </h2>
              <div className="flex gap-3 mb-6">
                <input 
                  type="text" 
                  placeholder="What topic should the carousel be about?" 
                  className="flex-1 bg-background/50 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  value={carouselTopic}
                  onChange={(e) => setCarouselTopic(e.target.value)}
                />
                <button 
                  onClick={handleGenerateCarousel}
                  disabled={isGeneratingCarousel || !carouselTopic}
                  className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-medium text-sm transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  {isGeneratingCarousel ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  Generate
                </button>
              </div>
              
              {carouselResult && (
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-bold text-lg">Slide Editor</h3>
                    {carouselResult.slides.map((slide, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveSlide(i)}
                        className={`w-full p-4 rounded-xl border text-left transition-all ${activeSlide === i ? 'bg-primary/10 border-primary' : 'bg-background/50 border-border'}`}
                      >
                        <h4 className="font-bold text-sm mb-1">Slide {i + 1}: {slide.title}</h4>
                        <p className="text-xs text-muted-foreground truncate">{slide.content}</p>
                      </button>
                    ))}
                  </div>
                  <div className="bg-background/50 p-6 rounded-2xl border border-border">
                    <h3 className="font-bold text-lg mb-4">Preview</h3>
                    <div className="aspect-square bg-white rounded-xl shadow-lg p-6 flex flex-col justify-center items-center text-center text-black">
                      <h2 className="text-2xl font-bold mb-4">{carouselResult.slides[activeSlide].title}</h2>
                      <p className="text-lg mb-6">{carouselResult.slides[activeSlide].content}</p>
                      <p className="text-xs font-medium italic text-gray-500">Visual: {carouselResult.slides[activeSlide].visualSuggestion}</p>
                    </div>
                    <div className="mt-4 space-y-2">
                       <input value={carouselResult.slides[activeSlide].title} onChange={(e) => updateSlide(activeSlide, 'title', e.target.value)} className="w-full p-2 border rounded" placeholder="Title" />
                       <textarea value={carouselResult.slides[activeSlide].content} onChange={(e) => updateSlide(activeSlide, 'content', e.target.value)} className="w-full p-2 border rounded" placeholder="Content" />
                    </div>
                    <button 
                      onClick={() => {
                        const carouselText = carouselResult.slides.map((s, i) => `Slide ${i+1}: ${s.title}\n${s.content}`).join('\n\n');
                        navigator.clipboard.writeText(carouselText);
                        toast({ title: "Copied!", description: "Carousel content copied to clipboard." });
                      }}
                      className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors"
                    >
                      <Copy className="h-4 w-4" /> Copy All Slides
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case "poll":
        return (
          <div className="space-y-6">
            <div className="glass p-6 rounded-2xl border border-white/10 shadow-lg bg-card/50">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-3">
                <List className="w-5 h-5 text-primary" />
                LinkedIn Poll Generator
              </h2>
              <div className="flex gap-3 mb-6">
                <input 
                  type="text" 
                  placeholder="What topic should the poll be about?" 
                  className="flex-1 bg-background/50 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  value={pollTopic}
                  onChange={(e) => setPollTopic(e.target.value)}
                />
                <button 
                  onClick={async () => {
                    setIsGeneratingPoll(true);
                    const res = await generatePollContent(pollTopic);
                    setPollResult(res);
                    setIsGeneratingPoll(false);
                  }}
                  disabled={isGeneratingPoll || !pollTopic}
                  className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-medium text-sm transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  {isGeneratingPoll ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  Generate
                </button>
              </div>
              {pollResult && (
                <div className="p-6 rounded-xl bg-background/50 border border-border">
                  <h3 className="text-lg font-bold mb-4">{pollResult.question}</h3>
                  <div className="space-y-2">
                    {pollResult.options.map((opt, i) => (
                      <div key={i} className="px-4 py-2 rounded-lg bg-secondary/50 border border-border text-sm">{opt}</div>
                    ))}
                  </div>
                  <button 
                    onClick={() => {
                      const pollText = `${pollResult.question}\n\n${pollResult.options.join('\n')}`;
                      navigator.clipboard.writeText(pollText);
                      toast({ title: "Copied!", description: "Poll content copied to clipboard." });
                    }}
                    className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors"
                  >
                    <Copy className="h-4 w-4" /> Copy Poll
                  </button>
                </div>
              )}
            </div>
          </div>
        );

      case "scheduler":
        return (
          <div className="space-y-6">
            <div className="glass p-6 rounded-2xl border border-white/10 shadow-lg bg-card/50">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold mb-1 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Smart Scheduler
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    Post at the perfect time. AI determines when your network is most active.
                  </p>
                </div>
                <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center gap-2">
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
    <div className="theme-linkedin min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex pt-16">
        {/* Sidebar */}
        <aside className="w-64 border-r border-border/50 bg-card/30 hidden md:flex flex-col">
          <div className="p-6">
            <div className="flex items-center gap-2 font-heading font-bold text-lg mb-8">
              <LinkedInFullLogo className="text-2xl" />
              Assist
            </div>
            
            <nav className="space-y-2">
              {[
                { id: "writer", icon: PenTool, label: "AI Writer & Remixer" },
                { id: "repurpose", icon: Repeat, label: "Content Repurposing" },
                { id: "carousel", icon: Grid3X3, label: "Carousel Generator" },
                { id: "poll", icon: List, label: "LinkedIn Poll Generator" },
                { id: "simulator", icon: Target, label: "Algorithm Simulator" },
                { id: "scheduler", icon: Calendar, label: "Smart Scheduler" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    activeTab === item.id 
                      ? "bg-primary/10 text-primary" 
                      : "bg-secondary/30 text-muted-foreground hover:bg-secondary hover:text-foreground"
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

export default LinkedInAssistTool;
