import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { 
  Linkedin, PenTool, BarChart3, Lightbulb, 
  Repeat, Play, Plus, Trash2, Copy, 
  Sparkles, TrendingUp, Activity, MessageSquare, Loader2,
  Calendar, Clock, Target, Zap, Briefcase, BookOpen, Smile, Grid3X3, List, Check,
  Youtube, Link as LinkIcon, FileText, LayoutTemplate, ArrowLeft, RefreshCw, User, Info
} from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { generateLinkedInPosts, rewriteLinkedInPost, simulateLinkedInAlgorithm, generatePostFromExperience, generatePostFromStory, generateCarouselContent, generatePollContent, repurposeContent, generateSlideImage, generatePersonaFromLinkedIn } from "@/services/geminiService";
import { LinkedInFullLogo } from "@/components/LinkedInFullLogo";
import { savePost, updatePostStatus, Post, auth } from "@/services/firebaseService";
import jsPDF from "jspdf";

const LinkedInAssistTool = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");
  
  // Profile State
  const [linkedInHandle, setLinkedInHandle] = useState("");
  const [linkedInPersona, setLinkedInPersona] = useState("");
  const [isGeneratingPersona, setIsGeneratingPersona] = useState(false);

  useEffect(() => {
    const savedHandle = localStorage.getItem("linkedInHandle");
    const savedPersona = localStorage.getItem("linkedInPersona");
    if (savedHandle) setLinkedInHandle(savedHandle);
    if (savedPersona) setLinkedInPersona(savedPersona);
  }, []);

  const handleGeneratePersona = async () => {
    if (!linkedInHandle) return;
    setIsGeneratingPersona(true);
    try {
      const persona = await generatePersonaFromLinkedIn(linkedInHandle);
      setLinkedInPersona(persona);
      localStorage.setItem("linkedInHandle", linkedInHandle);
      localStorage.setItem("linkedInPersona", persona);
      toast({ title: "Persona Built!", description: "Your profile has been analyzed." });
    } catch (error) {
      toast({ title: "Error", description: "Failed to build persona.", variant: "destructive" });
    } finally {
      setIsGeneratingPersona(false);
    }
  };
  
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
  const [carouselResult, setCarouselResult] = useState<{globalTheme?: string, slides: {title: string, content: string, visualSuggestion: string}[]} | null>(null);
  const [isGeneratingCarousel, setIsGeneratingCarousel] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [carouselPhase, setCarouselPhase] = useState<'text' | 'images'>('text');
  const [slideImages, setSlideImages] = useState<Record<number, string>>({});
  const [isGeneratingImages, setIsGeneratingImages] = useState(false);
  const [regeneratingSlide, setRegeneratingSlide] = useState<number | null>(null);
  const [slideAnnotations, setSlideAnnotations] = useState<Record<number, string>>({});

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
      setActiveTab("remixer"); // Switch to remixer tab to edit the generated post
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
      setActiveTab("remixer");
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
      setActiveTab("remixer");
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
      const res = await generateCarouselContent(carouselTopic, linkedInPersona);
      setCarouselResult(res);
      setActiveSlide(0);
      setCarouselPhase('text');
      setSlideImages({});
      setSlideAnnotations({});
      toast({ title: "Carousel Generated!", description: "AI has created your slides." });
    } catch (error) {
      toast({ title: "Error", description: "Failed to generate carousel.", variant: "destructive" });
    } finally {
      setIsGeneratingCarousel(false);
    }
  };

  const handleGenerateAllImages = async () => {
    if (!carouselResult) return;
    setIsGeneratingImages(true);
    setCarouselPhase('images');
    
    try {
      const newImages: Record<number, string> = {};
      const totalSlides = carouselResult.slides.length;
      
      // Generate in parallel
      await Promise.all(
        carouselResult.slides.map(async (slide, index) => {
          try {
            const imageUrl = await generateSlideImage(slide.content, slide.visualSuggestion, carouselResult.globalTheme || "Modern, minimalist, corporate blue and white.", index + 1, totalSlides, undefined, linkedInHandle, linkedInPersona);
            newImages[index] = imageUrl;
          } catch (e) {
            console.error(`Failed to generate image for slide ${index}:`, e);
          }
        })
      );
      
      setSlideImages(prev => ({ ...prev, ...newImages }));
      toast({ title: "Images Generated!", description: "Your carousel slides are ready." });
    } catch (error) {
      toast({ title: "Error", description: "Failed to generate some images.", variant: "destructive" });
    } finally {
      setIsGeneratingImages(false);
    }
  };

  const handleRegenerateImage = async (index: number) => {
    if (!carouselResult) return;
    setRegeneratingSlide(index);
    try {
      const slide = carouselResult.slides[index];
      const annotation = slideAnnotations[index];
      const totalSlides = carouselResult.slides.length;
      const imageUrl = await generateSlideImage(slide.content, slide.visualSuggestion, carouselResult.globalTheme || "Modern, minimalist, corporate blue and white.", index + 1, totalSlides, annotation, linkedInHandle, linkedInPersona);
      setSlideImages(prev => ({ ...prev, [index]: imageUrl }));
      toast({ title: "Image Regenerated!", description: `Slide ${index + 1} updated.` });
    } catch (error) {
      toast({ title: "Error", description: "Failed to regenerate image.", variant: "destructive" });
    } finally {
      setRegeneratingSlide(null);
    }
  };

  const handleDownloadImage = (index: number) => {
    const imageUrl = slideImages[index];
    if (!imageUrl) return;
    
    const a = document.createElement("a");
    a.href = imageUrl;
    a.download = `slide-${index + 1}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDownloadAllImages = () => {
    if (!carouselResult) return;
    
    carouselResult.slides.forEach((_, index) => {
      // Small delay to ensure browser handles multiple downloads
      setTimeout(() => {
        handleDownloadImage(index);
      }, index * 300);
    });
    toast({ title: "Downloading...", description: "Saving slides to your device." });
  };

  const handleDownloadAllPDF = async () => {
    if (!carouselResult) return;
    
    toast({ title: "Generating PDF...", description: "Please wait while we create your PDF." });
    
    try {
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [800, 800] // 1:1 aspect ratio
      });

      let addedFirstPage = false;

      for (let i = 0; i < carouselResult.slides.length; i++) {
        const imageUrl = slideImages[i];
        if (imageUrl) {
          if (addedFirstPage) {
            pdf.addPage([800, 800], 'portrait');
          }
          
          // Add image to PDF (x, y, width, height)
          pdf.addImage(imageUrl, 'PNG', 0, 0, 800, 800);
          addedFirstPage = true;
        }
      }

      if (addedFirstPage) {
        pdf.save('linkedin-carousel.pdf');
        toast({ title: "Success!", description: "PDF downloaded successfully." });
      } else {
        toast({ title: "Error", description: "No images available to generate PDF.", variant: "destructive" });
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({ title: "Error", description: "Failed to generate PDF.", variant: "destructive" });
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
      const posts = await generateLinkedInPosts(postTopic, linkedInPersona);
      const savedPosts = await Promise.all(posts.map(async (p) => {
        try {
          if (!auth.currentUser) {
            return { ...p, content: p.text, id: Math.random().toString(36).substring(7), title: postTopic, platform: 'linkedin', status: 'draft', authorUID: '', createdAt: new Date() } as Post;
          }
          const docRef = await savePost({
            title: postTopic,
            content: p.text,
            platform: 'linkedin',
            status: 'draft',
            scheduledDate: null,
          });
          return { ...p, content: p.text, id: docRef.id, title: postTopic, platform: 'linkedin', status: 'draft', authorUID: auth.currentUser.uid, createdAt: new Date() } as Post;
        } catch (e) {
          console.error("Failed to save post to Firebase:", e);
          return { ...p, content: p.text, id: Math.random().toString(36).substring(7), title: postTopic, platform: 'linkedin', status: 'draft', authorUID: '', createdAt: new Date() } as Post;
        }
      }));
      setGeneratedPosts(savedPosts);
      toast({ title: "Posts Generated!", description: "Here are some ideas to get you started." });
    } catch (error) {
      console.error(error);
      toast({ title: "Error", description: "Failed to generate posts.", variant: "destructive" });
    } finally {
      setIsGeneratingPosts(false);
    }
  };

  const handleRewrite = async (style: string) => {
    if (!editorText) return;
    setIsRewriting(true);
    try {
      const rewritten = await rewriteLinkedInPost(editorText, style, linkedInPersona);
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

  const renderGeneratedPosts = () => {
    if (generatedPosts.length === 0) return null;
    return (
      <div className="grid md:grid-cols-2 gap-6">
        {generatedPosts.map((post, i) => (
          <div key={i} className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-[#0a66c2]/30 hover:shadow-md transition-all group flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold text-[#0a66c2] bg-[#0a66c2]/10 px-3 py-1.5 rounded-lg uppercase tracking-wider">{post.platform}</span>
              <div className="flex gap-1">
                <button 
                  onClick={async () => {
                    if (post.id) {
                      try {
                        await updatePostStatus(post.id, 'approved');
                        toast({ title: "Approved!", description: "Post approved and sent to calendar." });
                      } catch (e) {
                        console.error("Failed to approve post:", e);
                        toast({ title: "Notice", description: "Post approved locally. Log in to save to calendar." });
                      }
                    }
                  }}
                  className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all rounded-lg"
                  title="Approve"
                >
                  <Check className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(post.content);
                    toast({ title: "Copied!", description: "Post copied to clipboard." });
                  }}
                  className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all rounded-lg"
                  title="Copy"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => {
                    setEditorText(post.content);
                    setActiveTab("remixer");
                    toast({ title: "Moved to Editor", description: "You can now edit or rewrite this post." });
                  }}
                  className="p-2 text-slate-400 hover:text-[#0a66c2] hover:bg-[#0a66c2]/10 transition-all rounded-lg"
                  title="Edit & Remix"
                >
                  <PenTool className="w-4 h-4" />
                </button>
              </div>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap flex-1">{post.content}</p>
          </div>
        ))}
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="space-y-6">
            <div className="rounded-[2rem] bg-gradient-to-br from-[#0a66c2] to-[#004182] p-2 md:p-3 shadow-xl">
              <div className="rounded-[1.5rem] bg-white p-6 md:p-10">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-bold flex items-center gap-3 text-slate-900">
                    <User className="w-6 h-6 text-[#0a66c2]" />
                    Your LinkedIn Profile
                  </h2>
                </div>
                <p className="text-slate-500 text-sm mb-8">
                  Enter your LinkedIn handle or URL. We'll build a persona to customize your generated content.
                </p>
                
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 mb-8">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <div className="absolute left-4 top-3.5 text-slate-400">
                        <LinkIcon className="w-5 h-5" />
                      </div>
                      <input 
                        type="text" 
                        placeholder="e.g., https://linkedin.com/in/johndoe or @johndoe" 
                        className="w-full bg-white border border-slate-200 rounded-xl pl-12 pr-4 py-3.5 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a66c2]/50 shadow-sm transition-all"
                        value={linkedInHandle}
                        onChange={(e) => setLinkedInHandle(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && linkedInHandle && !isGeneratingPersona) {
                            handleGeneratePersona();
                          }
                        }}
                      />
                    </div>
                    <button 
                      onClick={handleGeneratePersona}
                      disabled={isGeneratingPersona || !linkedInHandle}
                      className="bg-[#0a66c2] hover:bg-[#004182] text-white px-8 py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-sm whitespace-nowrap"
                    >
                      {isGeneratingPersona ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                      Analyze Profile
                    </button>
                  </div>
                </div>

                {linkedInPersona && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
                    <h3 className="text-emerald-800 font-bold text-lg mb-3 flex items-center gap-2">
                      <Check className="w-5 h-5" />
                      Persona Active
                    </h3>
                    <textarea
                      className="w-full bg-white border border-emerald-200 rounded-xl p-4 text-emerald-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 shadow-sm transition-all min-h-[120px]"
                      value={linkedInPersona}
                      onChange={(e) => setLinkedInPersona(e.target.value)}
                    />
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 gap-4">
                      <p className="text-emerald-600 text-xs font-medium">
                        This persona will now be used to customize your generated posts and carousels. Feel free to edit it!
                      </p>
                      <button 
                        onClick={() => {
                          localStorage.setItem("linkedInPersona", linkedInPersona);
                          toast({ title: "Persona Saved!", description: "Your updated persona has been permanently saved." });
                        }}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg font-bold text-sm transition-all whitespace-nowrap shadow-sm"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case "writer":
        return (
          <div className="space-y-6">
            <div className="rounded-[2rem] bg-gradient-to-br from-[#0a66c2] to-[#004182] p-2 md:p-3 shadow-xl">
              <div className="rounded-[1.5rem] bg-white p-6 md:p-10">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-bold flex items-center gap-3 text-slate-900">
                    <PenTool className="w-6 h-6 text-[#0a66c2]" />
                    AI Post Writer
                  </h2>
                </div>
                <p className="text-slate-500 text-sm mb-8">
                  Generate professional, engaging LinkedIn posts from scratch. Enter a topic to get started.
                </p>
                
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 mb-8">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <div className="absolute left-4 top-3.5 text-slate-400">
                        <MessageSquare className="w-5 h-5" />
                      </div>
                      <input 
                        type="text" 
                        placeholder="What professional topic do you want to post about?" 
                        className="w-full bg-white border border-slate-200 rounded-xl pl-12 pr-4 py-3.5 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a66c2]/50 shadow-sm transition-all"
                        value={postTopic}
                        onChange={(e) => setPostTopic(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && postTopic && !isGeneratingPosts) {
                            handleGeneratePosts();
                          }
                        }}
                      />
                    </div>
                    <button 
                      onClick={handleGeneratePosts}
                      disabled={isGeneratingPosts || !postTopic}
                      className="bg-[#0a66c2] hover:bg-[#004182] text-white px-8 py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-sm whitespace-nowrap"
                    >
                      {isGeneratingPosts ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                      Generate Ideas
                    </button>
                  </div>
                </div>
                
                {generatedPosts.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Generated Posts</h3>
                    {renderGeneratedPosts()}
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case "turn-into-post":
        return (
          <div className="space-y-6">
            <div className="rounded-[2rem] bg-gradient-to-br from-[#0a66c2] to-[#004182] p-2 md:p-3 shadow-xl">
              <div className="rounded-[1.5rem] bg-white p-6 md:p-10">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-bold flex items-center gap-3 text-slate-900">
                    <Sparkles className="w-6 h-6 text-[#0a66c2]" />
                    Turn into Post
                  </h2>
                </div>
                <p className="text-slate-500 text-sm mb-8">
                  Transform your raw experiences and personal stories into engaging, professional LinkedIn posts.
                </p>
                
                <div className="grid lg:grid-cols-2 gap-6 mb-6">
                  {/* Experience to Post Card */}
                  <div className="bg-slate-50 rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col transition-all hover:shadow-md hover:border-[#0a66c2]/30 group">
                    <div className="p-6 border-b border-slate-200 bg-white">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="p-3 bg-[#0a66c2]/10 rounded-xl group-hover:bg-[#0a66c2] group-hover:text-white transition-colors text-[#0a66c2]">
                          <Briefcase className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg text-slate-900">Experience to Post</h4>
                          <p className="text-xs text-slate-500 font-medium">Professional Milestones</p>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600">Turn a recent project, challenge, or achievement into a compelling post that highlights your expertise.</p>
                    </div>
                    <div className="p-6 flex-1 flex flex-col bg-slate-50/50">
                      <textarea 
                        value={experienceText} 
                        onChange={(e) => setExperienceText(e.target.value)} 
                        placeholder="E.g., I just led a team to migrate our legacy database to the cloud with zero downtime. It was tough because..." 
                        className="w-full flex-1 min-h-[140px] bg-white border border-slate-200 rounded-xl p-4 text-sm mb-6 focus:outline-none focus:ring-2 focus:ring-[#0a66c2]/40 resize-none transition-all text-slate-900 placeholder:text-slate-400 shadow-inner"
                      />
                      <button 
                        onClick={handleGenerateFromExperience} 
                        disabled={isGeneratingPosts || !experienceText} 
                        className="w-full bg-[#0a66c2] hover:bg-[#004182] text-white py-3.5 rounded-xl font-bold text-sm transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm"
                      >
                        {isGeneratingPosts ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                        Generate Professional Post
                      </button>
                    </div>
                  </div>

                  {/* Story to Post Card */}
                  <div className="bg-slate-50 rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col transition-all hover:shadow-md hover:border-[#0a66c2]/30 group">
                    <div className="p-6 border-b border-slate-200 bg-white">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="p-3 bg-[#0a66c2]/10 rounded-xl group-hover:bg-[#0a66c2] group-hover:text-white transition-colors text-[#0a66c2]">
                          <Smile className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg text-slate-900">Story to Post</h4>
                          <p className="text-xs text-slate-500 font-medium">Personal Anecdotes</p>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600">Share a personal story or observation and let AI extract the relatable professional lesson for your network.</p>
                    </div>
                    <div className="p-6 flex-1 flex flex-col bg-slate-50/50">
                      <textarea 
                        value={storyText} 
                        onChange={(e) => setStoryText(e.target.value)} 
                        placeholder="E.g., I was watching my kid try to build a block tower and it kept falling over until they changed the base..." 
                        className="w-full flex-1 min-h-[140px] bg-white border border-slate-200 rounded-xl p-4 text-sm mb-6 focus:outline-none focus:ring-2 focus:ring-[#0a66c2]/40 resize-none transition-all text-slate-900 placeholder:text-slate-400 shadow-inner"
                      />
                      <button 
                        onClick={handleGenerateFromStory} 
                        disabled={isGeneratingPosts || !storyText} 
                        className="w-full bg-[#0a66c2] hover:bg-[#004182] text-white py-3.5 rounded-xl font-bold text-sm transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm"
                      >
                        {isGeneratingPosts ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                        Extract Lesson & Generate
                      </button>
                    </div>
                  </div>
                </div>
                
                {generatedPosts.length > 0 && (
                  <div className="mt-8 pt-8 border-t border-slate-100">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Generated Posts</h3>
                    {renderGeneratedPosts()}
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case "remixer":
        return (
          <div className="space-y-6">
            <div className="rounded-[2rem] bg-gradient-to-br from-[#0a66c2] to-[#004182] p-2 md:p-3 shadow-xl">
              <div className="rounded-[1.5rem] bg-white p-6 md:p-10">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-bold flex items-center gap-3 text-slate-900">
                    <RefreshCw className="w-6 h-6 text-[#0a66c2]" />
                    AI Post Remixer
                  </h2>
                </div>
                <p className="text-slate-500 text-sm mb-8">
                  Paste a draft here to rewrite, or edit a generated post with different styles and tones.
                </p>
                
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <button onClick={() => handleRewrite("storytelling")} disabled={isRewriting || !editorText} className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 text-sm font-medium hover:border-[#0a66c2] hover:text-[#0a66c2] transition-colors disabled:opacity-50 shadow-sm">Storytelling</button>
                    <button onClick={() => handleRewrite("actionable")} disabled={isRewriting || !editorText} className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 text-sm font-medium hover:border-[#0a66c2] hover:text-[#0a66c2] transition-colors disabled:opacity-50 shadow-sm">Actionable</button>
                    <button onClick={() => handleRewrite("thought-leadership")} disabled={isRewriting || !editorText} className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 text-sm font-medium hover:border-[#0a66c2] hover:text-[#0a66c2] transition-colors disabled:opacity-50 shadow-sm">Thought Leadership</button>
                    <button onClick={() => handleRewrite("professional")} disabled={isRewriting || !editorText} className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 text-sm font-medium hover:border-[#0a66c2] hover:text-[#0a66c2] transition-colors disabled:opacity-50 shadow-sm">More Professional</button>
                    <button onClick={() => handleRewrite("concise")} disabled={isRewriting || !editorText} className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 text-sm font-medium hover:border-[#0a66c2] hover:text-[#0a66c2] transition-colors disabled:opacity-50 shadow-sm">Make Concise</button>
                    <button onClick={() => handleRewrite("emojis")} disabled={isRewriting || !editorText} className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 text-sm font-medium hover:border-[#0a66c2] hover:text-[#0a66c2] transition-colors disabled:opacity-50 shadow-sm">Add Emojis</button>
                    <button onClick={() => handleRewrite("humor")} disabled={isRewriting || !editorText} className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 text-sm font-medium hover:border-[#0a66c2] hover:text-[#0a66c2] transition-colors disabled:opacity-50 shadow-sm">Add a bit of Humor</button>
                    <button onClick={() => handleRewrite("ultra crisp bullet-in points")} disabled={isRewriting || !editorText} className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 text-sm font-medium hover:border-[#0a66c2] hover:text-[#0a66c2] transition-colors disabled:opacity-50 shadow-sm">Ultra Crisp Butllet-in Points </button>
                  </div>
                  
                  <div className="relative">
                    {isRewriting && (
                      <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center rounded-xl z-10">
                        <div className="bg-white p-4 rounded-full shadow-lg border border-slate-100">
                          <Loader2 className="w-6 h-6 animate-spin text-[#0a66c2]" />
                        </div>
                      </div>
                    )}
                    <textarea
                      value={editorText}
                      onChange={(e) => setEditorText(e.target.value)}
                      className="w-full h-64 bg-white border border-slate-200 rounded-xl p-5 text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-[#0a66c2]/50 text-slate-900 shadow-inner"
                      placeholder="Paste your draft here, or select a generated post to edit..."
                    />
                  </div>
                  
                  <div className="flex justify-end mt-4">
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(editorText);
                        toast({ title: "Copied!", description: "Post copied to clipboard." });
                      }}
                      disabled={!editorText}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0a66c2] text-white text-sm font-bold hover:bg-[#004182] transition-colors disabled:opacity-50 shadow-sm"
                    >
                      <Copy className="h-4 w-4" />
                      Copy Post
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "simulator":
        return (
          <div className="space-y-6">
            <div className="rounded-[2rem] bg-gradient-to-br from-[#0a66c2] to-[#004182] p-2 md:p-3 shadow-xl">
              <div className="rounded-[1.5rem] bg-white p-6 md:p-10">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-bold flex items-center gap-3 text-slate-900">
                    <Target className="w-6 h-6 text-[#0a66c2]" />
                    Algorithm Simulator
                  </h2>
                </div>
                <p className="text-slate-500 text-sm mb-8">
                  Test your post against the LinkedIn algorithm. See predicted reach and get suggestions for improvement.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <textarea
                      value={simulatorText}
                      onChange={(e) => setSimulatorText(e.target.value)}
                      className="w-full h-40 bg-white border border-slate-200 rounded-xl p-4 text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-[#0a66c2]/50 mb-4 text-slate-900 shadow-inner"
                      placeholder="Paste your post here to test it against the algorithm..."
                    />
                    <button 
                      onClick={handleSimulate}
                      disabled={isSimulating || !simulatorText}
                      className="w-full bg-[#0a66c2] hover:bg-[#004182] text-white px-6 py-3.5 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50 shadow-sm"
                    >
                      {isSimulating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
                      Run Simulation
                    </button>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col justify-center">
                    {simulationResult ? (
                      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                        <div className="text-center">
                          <div className="text-5xl font-black text-[#0a66c2] mb-1">{simulationResult.score}<span className="text-2xl text-slate-400">/100</span></div>
                          <div className="text-xs text-slate-500 uppercase tracking-wider font-bold">Algorithmic Score</div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-white p-4 rounded-xl text-center border border-slate-200 shadow-sm">
                            <div className="text-xl font-bold text-slate-900">{simulationResult.reach}</div>
                            <div className="text-xs text-slate-500 mt-1">Est. Impressions</div>
                          </div>
                          <div className="bg-white p-4 rounded-xl text-center border border-slate-200 shadow-sm">
                            <div className="text-xl font-bold text-slate-900">{simulationResult.engagement}</div>
                            <div className="text-xs text-slate-500 mt-1">Est. Engagement</div>
                          </div>
                        </div>
                        <div className="bg-amber-50 border border-amber-100 text-amber-800 p-4 rounded-xl text-sm flex items-start gap-3">
                          <Lightbulb className="w-5 h-5 shrink-0 mt-0.5 text-amber-500" />
                          <p className="leading-relaxed">{simulationResult.feedback}</p>
                        </div>
                        <button 
                          onClick={() => {
                            navigator.clipboard.writeText(`Score: ${simulationResult.score}/100, Reach: ${simulationResult.reach}, Engagement: ${simulationResult.engagement}, Feedback: ${simulationResult.feedback}`);
                            toast({ title: "Copied!", description: "Simulation result copied to clipboard." });
                          }}
                          className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 text-sm font-bold hover:bg-slate-50 transition-colors shadow-sm"
                        >
                          <Copy className="h-4 w-4" /> Copy Result
                        </button>
                      </div>
                    ) : (
                      <div className="text-center text-slate-400 flex flex-col items-center py-8">
                        <Target className="w-16 h-16 mb-4 opacity-20" />
                        <p className="text-sm font-medium">Run a simulation to see predicted performance metrics.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "repurpose":
        return (
          <div className="space-y-6">
            <div className="rounded-[2rem] bg-gradient-to-br from-[#0a66c2] to-[#004182] p-2 md:p-3 shadow-xl">
              <div className="rounded-[1.5rem] bg-white p-6 md:p-10">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-bold flex items-center gap-3 text-slate-900">
                    <Sparkles className="w-6 h-6 text-[#0a66c2]" />
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
                        className="w-full flex items-center gap-4 p-5 rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-sm bg-white transition-all text-left group"
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
                        className="w-full h-40 p-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0a66c2]/50 resize-none mb-4 bg-white text-slate-900"
                      />
                      
                      <button 
                        onClick={handleRepurpose}
                        disabled={isRepurposing || !repurposeInput}
                        className="w-full flex items-center justify-center gap-2 bg-[#0a66c2] hover:bg-[#004182] text-white px-6 py-3 rounded-xl font-bold transition-colors disabled:opacity-50"
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
          <div className="space-y-4">
            <div className="rounded-[2rem] bg-gradient-to-br from-[#0a66c2] to-[#004182] p-2 md:p-3 shadow-xl">
              <div className="rounded-[1.5rem] bg-white p-5 md:p-6">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-bold flex items-center gap-3 text-slate-900">
                    <Grid3X3 className="w-6 h-6 text-[#0a66c2]" />
                    Carousel Generator
                  </h2>
                </div>
                <p className="text-slate-500 text-sm mb-4">
                  Generate engaging multi-slide carousels for LinkedIn.
                </p>
                
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 mb-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <div className="absolute left-4 top-3.5 text-slate-400">
                        <MessageSquare className="w-5 h-5" />
                      </div>
                      <input 
                        type="text" 
                        placeholder="What topic should the carousel be about?" 
                        className="w-full bg-white border border-slate-200 rounded-xl pl-12 pr-4 py-3.5 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a66c2]/50 shadow-sm transition-all"
                        value={carouselTopic}
                        onChange={(e) => setCarouselTopic(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && carouselTopic && !isGeneratingCarousel) {
                            handleGenerateCarousel();
                          }
                        }}
                      />
                    </div>
                    <button 
                      onClick={handleGenerateCarousel}
                      disabled={isGeneratingCarousel || !carouselTopic}
                      className="bg-[#0a66c2] hover:bg-[#004182] text-white px-8 py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-sm whitespace-nowrap"
                    >
                      {isGeneratingCarousel ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                      Generate Carousel
                    </button>
                  </div>
                </div>
                
                {carouselResult && carouselPhase === 'text' && (
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h3 className="font-bold text-lg text-slate-900">Slide Editor</h3>
                      <div className="bg-blue-50 border border-blue-100 text-blue-800 p-3 rounded-xl text-sm flex items-start gap-3">
                        <Info className="w-5 h-5 shrink-0 mt-0.5 text-blue-500" />
                        <p className="leading-relaxed">Please check if you are happy with the overall wording of these slides. If not, you can click on the slide number and edit the wording.</p>
                      </div>
                      <div className="flex items-center gap-2 overflow-x-auto pb-2">
                        {carouselResult.slides.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setActiveSlide(i)}
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all shrink-0 ${activeSlide === i ? 'bg-[#0a66c2] text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'}`}
                          >
                            {i + 1}
                          </button>
                        ))}
                      </div>
                      <div className="space-y-3 mt-4">
                         <label className="block text-sm font-bold text-slate-700">Slide Title</label>
                         <input value={carouselResult.slides[activeSlide].title} onChange={(e) => updateSlide(activeSlide, 'title', e.target.value)} className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0a66c2]/50 text-slate-900" placeholder="Title" />
                         <label className="block text-sm font-bold text-slate-700 mt-2">Slide Content</label>
                         <textarea value={carouselResult.slides[activeSlide].content} onChange={(e) => updateSlide(activeSlide, 'content', e.target.value)} className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0a66c2]/50 min-h-[120px] resize-none text-slate-900" placeholder="Content" />
                      </div>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col h-full">
                      <h3 className="font-bold text-lg mb-4 text-slate-900">Preview</h3>
                      <div className="flex-1 flex flex-col items-center justify-center">
                        <div className="aspect-square w-full max-w-[360px] bg-white rounded-2xl shadow-md border border-slate-100 p-8 flex flex-col justify-center items-center text-center text-slate-900 relative overflow-y-auto">
                          <div className="absolute top-5 left-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Slide {activeSlide + 1}</div>
                          <div className="my-auto w-full flex flex-col items-center justify-center space-y-5">
                            <h2 className="text-2xl font-black leading-tight text-slate-800">{carouselResult.slides[activeSlide].title}</h2>
                            <p className="text-base leading-relaxed text-slate-600">{carouselResult.slides[activeSlide].content}</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-8 grid grid-cols-2 gap-3">
                        <button 
                          onClick={() => {
                            const carouselText = carouselResult.slides.map((s, i) => `Slide ${i+1}: ${s.title}\n${s.content}`).join('\n\n');
                            navigator.clipboard.writeText(carouselText);
                            toast({ title: "Copied!", description: "Carousel content copied to clipboard." });
                          }}
                          className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 text-sm font-bold hover:bg-slate-50 transition-colors shadow-sm"
                        >
                          <Copy className="h-4 w-4" /> Copy Text
                        </button>
                        <button 
                          onClick={handleGenerateAllImages}
                          disabled={isGeneratingImages}
                          className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#0a66c2] text-white text-sm font-bold hover:bg-[#004182] transition-colors shadow-sm disabled:opacity-50"
                        >
                          {isGeneratingImages ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />} 
                          Generate Images
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {carouselResult && carouselPhase === 'images' && (
                  <div className="space-y-8">
                    <div className="flex items-center justify-between">
                      <button 
                        onClick={() => setCarouselPhase('text')}
                        className="text-sm font-medium text-slate-500 hover:text-slate-900 flex items-center gap-2 transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4" /> Back to Editor
                      </button>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={handleDownloadAllImages}
                          className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm"
                        >
                          Download as Images
                        </button>
                        <button 
                          onClick={handleDownloadAllPDF}
                          className="bg-[#0a66c2] hover:bg-[#004182] text-white px-4 py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm"
                        >
                          Download as PDF
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {carouselResult.slides.map((slide, i) => (
                        <div key={i} className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden flex flex-col">
                          <div className="aspect-square bg-slate-200 relative">
                            {slideImages[i] ? (
                              <img src={slideImages[i]} alt={`Slide ${i + 1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            ) : (
                              <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                                <Loader2 className="w-8 h-8 animate-spin mb-2" />
                                <span className="text-sm font-medium">Generating...</span>
                              </div>
                            )}
                            <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-lg">
                              Slide {i + 1}
                            </div>
                          </div>
                          <div className="p-4 flex flex-col gap-3 flex-1">
                            <input 
                              type="text" 
                              placeholder="Add annotation (e.g., 'make it blue')" 
                              value={slideAnnotations[i] || ''}
                              onChange={(e) => setSlideAnnotations(prev => ({ ...prev, [i]: e.target.value }))}
                              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a66c2]/50"
                            />
                            <div className="grid grid-cols-2 gap-2 mt-auto">
                              <button 
                                onClick={() => handleRegenerateImage(i)}
                                disabled={regeneratingSlide === i}
                                className="flex items-center justify-center gap-1.5 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors disabled:opacity-50"
                              >
                                {regeneratingSlide === i ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
                                Regenerate
                              </button>
                              <button 
                                onClick={() => handleDownloadImage(i)}
                                disabled={!slideImages[i]}
                                className="flex items-center justify-center gap-1.5 py-2 rounded-lg bg-[#0a66c2] text-white text-xs font-bold hover:bg-[#004182] transition-colors disabled:opacity-50"
                              >
                                Download
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case "poll":
        return (
          <div className="space-y-6">
            <div className="rounded-[2rem] bg-gradient-to-br from-[#0a66c2] to-[#004182] p-2 md:p-3 shadow-xl">
              <div className="rounded-[1.5rem] bg-white p-6 md:p-10">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-bold flex items-center gap-3 text-slate-900">
                    <List className="w-6 h-6 text-[#0a66c2]" />
                    LinkedIn Poll Generator
                  </h2>
                </div>
                <p className="text-slate-500 text-sm mb-8">
                  Generate engaging polls to spark conversation with your network.
                </p>
                
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 mb-8">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <div className="absolute left-4 top-3.5 text-slate-400">
                        <MessageSquare className="w-5 h-5" />
                      </div>
                      <input 
                        type="text" 
                        placeholder="What topic should the poll be about?" 
                        className="w-full bg-white border border-slate-200 rounded-xl pl-12 pr-4 py-3.5 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a66c2]/50 shadow-sm transition-all"
                        value={pollTopic}
                        onChange={(e) => setPollTopic(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && pollTopic && !isGeneratingPoll) {
                            setIsGeneratingPoll(true);
                            generatePollContent(pollTopic, linkedInPersona).then(res => {
                              setPollResult(res);
                              setIsGeneratingPoll(false);
                            });
                          }
                        }}
                      />
                    </div>
                    <button 
                      onClick={async () => {
                        setIsGeneratingPoll(true);
                        const res = await generatePollContent(pollTopic, linkedInPersona);
                        setPollResult(res);
                        setIsGeneratingPoll(false);
                      }}
                      disabled={isGeneratingPoll || !pollTopic}
                      className="bg-[#0a66c2] hover:bg-[#004182] text-white px-8 py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-sm whitespace-nowrap"
                    >
                      {isGeneratingPoll ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                      Generate Poll
                    </button>
                  </div>
                </div>
                
                {pollResult && (
                  <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm max-w-2xl mx-auto">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
                        <List className="w-5 h-5 text-slate-500" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">You</h4>
                        <p className="text-xs text-slate-500">Author</p>
                      </div>
                    </div>
                    <h3 className="text-lg text-slate-900 mb-6 whitespace-pre-wrap">{pollResult.question}</h3>
                    <div className="space-y-3">
                      {pollResult.options.map((opt, i) => (
                        <div key={i} className="px-4 py-3 rounded-full border border-[#0a66c2] text-[#0a66c2] font-medium text-sm hover:bg-[#0a66c2]/5 transition-colors cursor-pointer text-center">
                          {opt}
                        </div>
                      ))}
                    </div>
                    <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
                      <button 
                        onClick={() => {
                          const pollText = `${pollResult.question}\n\n${pollResult.options.map(o => `- ${o}`).join('\n')}`;
                          navigator.clipboard.writeText(pollText);
                          toast({ title: "Copied!", description: "Poll content copied to clipboard." });
                        }}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0a66c2] text-white text-sm font-bold hover:bg-[#004182] transition-colors shadow-sm"
                      >
                        <Copy className="h-4 w-4" /> Copy Poll Text
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case "scheduler":
        return (
          <div className="space-y-6">
            <div className="rounded-[2rem] bg-gradient-to-br from-[#0a66c2] to-[#004182] p-2 md:p-3 shadow-xl">
              <div className="rounded-[1.5rem] bg-white p-6 md:p-10">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-bold flex items-center gap-3 text-slate-900 mb-2">
                      <Calendar className="w-6 h-6 text-[#0a66c2]" />
                      Smart Scheduler
                    </h2>
                    <p className="text-slate-500 text-sm">
                      Post at the perfect time. AI determines when your network is most active.
                    </p>
                  </div>
                  <button className="bg-[#0a66c2] hover:bg-[#004182] text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-colors flex items-center gap-2 shadow-sm">
                    <Plus className="w-4 h-4" />
                    New Post
                  </button>
                </div>

                <div className="space-y-4">
                  {scheduledPosts.map((post, i) => (
                    <div key={i} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between group hover:border-[#0a66c2]/30 hover:shadow-sm transition-all">
                      <div className="flex-1 pr-4">
                        <p className="text-sm font-medium text-slate-900 mb-2 truncate">{post.text}</p>
                        <div className="flex items-center gap-4 text-xs font-medium">
                          <span className="flex items-center gap-1.5 text-slate-500"><Clock className="w-3.5 h-3.5" /> {post.time}</span>
                          <span className="text-[#0a66c2] bg-[#0a66c2]/10 px-2.5 py-1 rounded-md uppercase tracking-wider text-[10px]">{post.status}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2.5 text-slate-400 hover:text-[#0a66c2] transition-colors rounded-xl hover:bg-[#0a66c2]/10">
                          <PenTool className="w-4 h-4" />
                        </button>
                        <button className="p-2.5 text-slate-400 hover:text-red-600 transition-colors rounded-xl hover:bg-red-50">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  {scheduledPosts.length === 0 && (
                    <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-2xl">
                      <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                      <h3 className="text-slate-900 font-medium mb-1">No scheduled posts</h3>
                      <p className="text-slate-500 text-sm">Create a new post to schedule it for later.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />
      
      <div className="flex-1 flex pt-16">
        {/* Sidebar */}
        <aside className="w-72 border-r border-slate-200 bg-slate-50 hidden md:flex flex-col shrink-0">
          <div className="p-5">
            <div className="flex items-center gap-2 font-heading font-bold text-lg mb-5 text-slate-900">
              <LinkedInFullLogo className="text-2xl" />
              Assist
            </div>
            
            <nav className="space-y-1.5">
              {[
                { id: "profile", icon: User, label: "Your LinkedIn Profile" },
                { id: "writer", icon: PenTool, label: "AI Writer" },
                { id: "remixer", icon: RefreshCw, label: "AI Remixer" },
                { id: "turn-into-post", icon: Sparkles, label: "Turn into Post" },
                { id: "repurpose", icon: Repeat, label: "Content Repurposing" },
                { id: "carousel", icon: Grid3X3, label: "Carousel Generator" },
                { id: "poll", icon: List, label: "LinkedIn Poll Generator" },
                { id: "simulator", icon: Target, label: "Algorithm Simulator" },
                { id: "scheduler", icon: Calendar, label: "Smart Scheduler" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                    activeTab === item.id 
                      ? "bg-gradient-to-r from-[#0a66c2] to-[#0077b5] text-white font-bold shadow-md border border-transparent" 
                      : "bg-transparent text-slate-600 hover:bg-[#e0f0ff] hover:text-slate-900 border border-transparent"
                  }`}
                >
                  <item.icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
          
          <div className="mt-auto p-6 space-y-4">
            {linkedInHandle && (
              <div className="p-4 rounded-xl border border-slate-200 bg-white flex items-center gap-3 cursor-pointer hover:border-[#0a66c2]/30 transition-colors" onClick={() => setActiveTab("profile")}>
                <div className="w-10 h-10 rounded-full bg-[#0a66c2]/10 flex items-center justify-center text-[#0a66c2] font-bold">
                  {linkedInHandle.replace(/https?:\/\/(www\.)?linkedin\.com\/in\//, '').replace('@', '').charAt(0).toUpperCase() || <User className="w-5 h-5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-500 font-medium">Your Profile</p>
                  <p className="text-sm font-bold text-slate-900 truncate">
                    {linkedInHandle.replace(/https?:\/\/(www\.)?linkedin\.com\/in\//, '').startsWith('@') ? linkedInHandle.replace(/https?:\/\/(www\.)?linkedin\.com\/in\//, '') : '@' + linkedInHandle.replace(/https?:\/\/(www\.)?linkedin\.com\/in\//, '')}
                  </p>
                </div>
              </div>
            )}
            
            <div className="p-4 rounded-xl border border-[#0a66c2]/20 bg-[#0a66c2]/5">
              <h4 className="font-bold text-sm mb-1 text-slate-900">Pro Plan Active</h4>
              <p className="text-xs text-slate-500 mb-3">Unlimited AI Generations</p>
              <div className="w-full bg-white rounded-full h-1.5 mb-1 overflow-hidden">
                <div className="bg-[#0a66c2] h-1.5 rounded-full w-full"></div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto bg-slate-50/50">
          <div className={`mx-auto transition-all duration-300 ${activeTab === 'carousel' ? 'max-w-6xl' : 'max-w-4xl'}`}>
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default LinkedInAssistTool;
