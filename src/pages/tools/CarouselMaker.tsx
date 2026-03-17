import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Layout, ArrowRight, Download, Share2, Plus, Type, Image as ImageIcon, Palette, LayoutTemplate, Settings, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { generateCarouselContent } from "@/services/geminiService";

const CarouselMaker = () => {
  const [activeTab, setActiveTab] = useState("templates");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [topic, setTopic] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [carouselContent, setCarouselContent] = useState<Record<string, unknown>[]>([]);

  const templates = [
    { title: "HOW TO WRITE HOOK THAT DON'T SUCK", color: "bg-[#1e1b4b]", accent: "bg-blue-500", author: "Jan Sinczer", tags: ["Copywriting", "Hooks"] },
    { title: "18 PRINCIPLES FOR THE 'PERFECT' LINKEDIN POST", color: "bg-[#1f2937]", accent: "bg-green-500", author: "Kari Rasmussen", tags: ["Strategy", "Listicle"] },
    { title: "CONTENT PLAN STRATEGY", color: "bg-[#4f46e5]", accent: "bg-purple-500", author: "LOKI BRIGHT", tags: ["Planning", "Guide"] },
    { title: "5 WAYS TO GROW YOUR AUDIENCE", color: "bg-amber-900", accent: "bg-amber-500", author: "Alex Morgan", tags: ["Growth", "Tips"] },
    { title: "THE ANATOMY OF A VIRAL POST", color: "bg-slate-900", accent: "bg-rose-500", author: "Sarah Jenkins", tags: ["Analysis", "Viral"] },
    { title: "MY $10K/MONTH TECH STACK", color: "bg-teal-900", accent: "bg-teal-400", author: "David Chen", tags: ["Tools", "Business"] },
  ];

  const handleGenerate = async () => {
    if (!topic) return;
    setIsGenerating(true);
    try {
      const content = await generateCarouselContent(topic, 5);
      setCarouselContent(content);
      setActiveTab("editor");
      setCurrentSlide(0);
    } catch (error) {
      console.error("Failed to generate carousel:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-24 max-w-7xl flex gap-8">
        
        {/* Sidebar */}
        <aside className="w-64 hidden lg:flex flex-col gap-6">
          <div className="bg-card border border-border/50 rounded-xl p-4">
            <h3 className="font-bold text-sm mb-4 text-muted-foreground uppercase tracking-wider">Design Tools</h3>
            <nav className="space-y-2">
              <button className="w-full flex items-center gap-3 px-3 py-2 bg-purple-500/10 text-purple-500 rounded-lg font-medium text-sm transition-colors">
                <LayoutTemplate className="w-4 h-4" /> Templates
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 text-muted-foreground hover:bg-muted rounded-lg font-medium text-sm transition-colors">
                <Palette className="w-4 h-4" /> Brand Colors
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 text-muted-foreground hover:bg-muted rounded-lg font-medium text-sm transition-colors">
                <Type className="w-4 h-4" /> Typography
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 text-muted-foreground hover:bg-muted rounded-lg font-medium text-sm transition-colors">
                <ImageIcon className="w-4 h-4" /> Assets
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 text-muted-foreground hover:bg-muted rounded-lg font-medium text-sm transition-colors">
                <Settings className="w-4 h-4" /> Settings
              </button>
            </nav>
          </div>

          <div className="bg-card border border-border/50 rounded-xl p-4 flex-1">
            <h3 className="font-bold text-sm mb-4 text-muted-foreground uppercase tracking-wider">Generate</h3>
            <div className="space-y-4">
              <textarea 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Paste text, URL, or topic here to auto-generate a carousel..."
                className="w-full bg-background border border-border/50 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none min-h-[120px]"
              ></textarea>
              <button 
                onClick={handleGenerate}
                disabled={!topic || isGenerating}
                className="w-full bg-purple-600 text-white py-2 rounded-lg font-bold text-sm hover:bg-purple-700 transition-colors shadow-md shadow-purple-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                {isGenerating ? "Generating..." : "Auto-Generate"}
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h1 className="font-heading font-bold text-3xl md:text-4xl mb-2 flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500/10 text-purple-500 rounded-xl flex items-center justify-center">
                  <Layout className="w-5 h-5" />
                </div>
                Carousel Maker
              </h1>
              <p className="text-muted-foreground">Design high-performing LinkedIn carousel posts in seconds.</p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 border border-border rounded-lg font-bold text-sm hover:bg-muted transition-colors flex items-center gap-2">
                <Share2 className="w-4 h-4" /> Share
              </button>
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-bold text-sm hover:bg-primary/90 transition-colors flex items-center gap-2 shadow-lg shadow-primary/20">
                <Download className="w-4 h-4" /> Export PDF
              </button>
            </div>
          </div>

          <div className="bg-card border border-border/50 rounded-xl p-6 flex-1 flex flex-col shadow-sm">
            <div className="flex gap-6 mb-8 border-b border-border pb-2">
              <button 
                onClick={() => setActiveTab("templates")}
                className={`text-sm font-bold pb-2 -mb-[9px] transition-colors ${activeTab === 'templates' ? 'text-purple-500 border-b-2 border-purple-500' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Templates Gallery
              </button>
              <button 
                onClick={() => setActiveTab("editor")}
                className={`text-sm font-bold pb-2 -mb-[9px] transition-colors ${activeTab === 'editor' ? 'text-purple-500 border-b-2 border-purple-500' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Editor
              </button>
              <button className="text-sm font-medium text-muted-foreground hover:text-foreground">Saved Designs</button>
            </div>

            {activeTab === 'templates' ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 overflow-y-auto pr-2 pb-4">
                {templates.map((template, i) => (
                  <div key={i} className="group relative">
                    <div className={`aspect-[3/4] ${template.color} rounded-xl p-5 flex flex-col justify-between relative overflow-hidden cursor-pointer shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1`}>
                      <div className={`absolute top-0 left-0 w-full h-1.5 ${template.accent}`}></div>
                      
                      <div className="flex justify-between items-start">
                        <div className="flex gap-1">
                          {template.tags.map(tag => (
                            <span key={tag} className="text-[9px] uppercase tracking-wider font-bold bg-white/10 text-white/90 px-2 py-0.5 rounded-sm">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="text-xl md:text-2xl font-black text-white leading-[1.1] mt-auto mb-8 uppercase tracking-tight">
                        {template.title}
                      </div>
                      
                      <div className="flex justify-between items-center mt-auto pt-4 border-t border-white/10">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-bold text-white">
                            {template.author.charAt(0)}
                          </div>
                          <span className="text-xs font-medium text-white/90">{template.author}</span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                          <ArrowRight className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Hover Actions */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center gap-3 backdrop-blur-sm">
                      <button 
                        onClick={() => setActiveTab("editor")}
                        className="bg-white text-black px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-100 transition-colors"
                      >
                        Use Template
                      </button>
                    </div>
                  </div>
                ))}
                
                {/* Create Blank */}
                <div 
                  onClick={() => setActiveTab("editor")}
                  className="aspect-[3/4] border-2 border-dashed border-border/50 rounded-xl p-5 flex flex-col items-center justify-center cursor-pointer hover:border-purple-500/50 hover:bg-purple-500/5 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4 group-hover:bg-purple-500/20 group-hover:text-purple-500 transition-colors">
                    <Plus className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg">Blank Canvas</h3>
                  <p className="text-sm text-muted-foreground text-center mt-2">Start from scratch</p>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col">
                {/* Editor Area */}
                <div className="flex-1 bg-muted/30 rounded-xl border border-border/50 flex items-center justify-center p-8 relative overflow-hidden">
                  
                  {/* Slide Navigation */}
                  <button 
                    onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                    disabled={currentSlide === 0}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background border border-border shadow-md flex items-center justify-center hover:bg-muted disabled:opacity-50 transition-colors z-10"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  
                  {/* The Canvas */}
                  <div className="aspect-[4/5] h-full max-h-[600px] bg-[#1e1b4b] rounded-xl shadow-2xl relative overflow-hidden flex flex-col justify-between p-8 group">
                    <div className="absolute top-0 left-0 w-full h-2 bg-blue-500"></div>
                    
                    <div className="flex justify-between items-start">
                      <span className="text-xs uppercase tracking-wider font-bold bg-white/10 text-white/90 px-3 py-1 rounded-sm">
                        Slide {currentSlide + 1}
                      </span>
                    </div>

                    <div className="text-4xl font-black text-white leading-[1.1] mt-auto mb-12 uppercase tracking-tight relative group-hover:ring-2 ring-white/20 rounded p-2 -mx-2 cursor-text">
                      {carouselContent.length > 0 ? carouselContent[currentSlide]?.content : "HOW TO WRITE HOOK THAT DON'T SUCK"}
                    </div>
                    
                    <div className="flex justify-between items-center mt-auto pt-6 border-t border-white/10">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold text-white">
                          JS
                        </div>
                        <span className="text-sm font-bold text-white/90">Jan Sinczer</span>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                        <ArrowRight className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => setCurrentSlide(Math.min((carouselContent.length || 6) - 1, currentSlide + 1))}
                    disabled={currentSlide === (carouselContent.length || 6) - 1}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background border border-border shadow-md flex items-center justify-center hover:bg-muted disabled:opacity-50 transition-colors z-10"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Slide Thumbnails */}
                <div className="mt-6 flex gap-4 overflow-x-auto pb-2">
                  {(carouselContent.length > 0 ? carouselContent : [0, 1, 2, 3, 4, 5]).map((slide, idx) => (
                    <div 
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`w-24 aspect-[4/5] rounded-lg cursor-pointer transition-all border-2 flex-shrink-0 ${currentSlide === idx ? 'border-purple-500 scale-105 shadow-md' : 'border-border/50 hover:border-purple-500/50 bg-muted/50'}`}
                    >
                      <div className="w-full h-full bg-[#1e1b4b] rounded-md opacity-80 flex items-center justify-center text-white/50 font-bold text-xs">
                        {idx + 1}
                      </div>
                    </div>
                  ))}
                  <div className="w-24 aspect-[4/5] rounded-lg border-2 border-dashed border-border/50 flex items-center justify-center cursor-pointer hover:border-purple-500/50 hover:bg-purple-500/5 transition-colors flex-shrink-0">
                    <Plus className="w-6 h-6 text-muted-foreground" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CarouselMaker;
