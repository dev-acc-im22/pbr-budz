import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import {
  Youtube, Sparkles, ArrowRight, Search, PenTool, BarChart3,
  Eye, Lightbulb, Repeat, Video, Monitor, Clock, CheckCircle2,
  XCircle, Star, Users, FileText, Zap, Target, TrendingUp, Copy,
  Bold, Italic, List, Hash, Play, Plus, Trash2, Layout
} from "lucide-react";
const ytDashboard = "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=1920&q=80";
const scriptEditor = "https://images.unsplash.com/photo-1455390582262-044cdead2708?auto=format&fit=crop&w=1920&q=80";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import YouTubeAssistTool from "./tools/YouTubeAssistTool";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const features = [
  {
    icon: Lightbulb,
    title: "Outlier Idea Generator",
    description: "AI scans thousands of channels to find videos getting 2x-10x more views than normal. It extracts the title structure, psychological hook, and thumbnail concept — then adapts them for your niche.",
    image: ytDashboard,
    reverse: false,
  },
  {
    icon: PenTool,
    title: "AI Script Writing Partner",
    description: "Our AI learns how you speak and write, then helps you create scripts that sound authentically like you. Real-time canvas editing lets you collaborate with AI in a natural flow — just like having a co-writer.",
    image: scriptEditor,
    reverse: true,
  },
  {
    icon: BarChart3,
    title: "YouTube Competitor Analysis",
    description: "Track any channel in your niche. Monitor competitors, spot outlier videos getting 5x-10x more views than normal, and get weekly trend digests delivered to you so you never miss a breakout opportunity.",
    image: ytDashboard,
    reverse: false,
  },
];

const aiTools = [
  { icon: Search, title: "YouTube Intelligence", desc: "Track competitor channels and spot outlier videos getting 5x-10x views in your niche." },
  { icon: Repeat, title: "Viral Video Remixer", desc: "Paste any viral video URL, break down its hook and structure, then remix it for your channel." },
  { icon: PenTool, title: "AI Script Editor", desc: "AI-powered editing that critiques pacing, hooks, and structure to boost viewer retention." },
  { icon: FileText, title: "Research Assistant", desc: "Feed YouTube videos, PDFs, articles, and images. AI pulls insights directly into your script." },
  { icon: Eye, title: "AI Thumbnail Generator", desc: "Generate thumbnail mockups and title variations trained on high-performing videos in your niche." },
  { icon: Video, title: "Script Templates", desc: "Start from proven frameworks: Problem-Agitation-Solution, Educational, Storytelling, and more." },
];

const steps = [
  { num: "01", title: "Connect Your Channel", desc: "BrandPilot learns your writing voice and studies your audience so every script sounds authentically you." },
  { num: "02", title: "Get Video Ideas", desc: "AI generates 10 video ideas backed by outlier data from your niche. Pick the one you want to make." },
  { num: "03", title: "Write Your Script", desc: "Our AI script writer turns your idea into a ready-to-film script in under 12 minutes." },
];

const comparisonFeatures = [
  "Outlier video idea generator",
  "Competitor channel tracking",
  "Live YouTube data access",
  "Voice matching & channel memory",
  "AI thumbnail generator",
  "Time to first script",
];

const comparisonData = [
  { name: "BrandPilot", values: [true, true, true, true, true, "12 min"] },
  { name: "ChatGPT", values: [false, false, false, false, false, "2+ hours"] },
  { name: "Claude", values: [false, false, false, false, false, "2+ hours"] },
];

const stats = [
  { value: "10K+", label: "Creators using BrandPilot" },
  { value: "100K+", label: "YouTube channels monitored" },
  { value: "12 min", label: "Average time to finished script" },
  { value: "35+", label: "Languages supported" },
];

const faqs = [
  { q: "How does the AI learn my YouTube style?", a: "When you connect your channel, our AI analyzes your existing videos, scripts, titles, and audience engagement patterns to create a unique voice profile. Every script it generates will sound like you wrote it." },
  { q: "Will this work for small channels?", a: "Absolutely. Viral psychology works the same whether you have 10 subscribers or 10 million. The outlier detection and proven frameworks work at any channel size." },
  { q: "What types of YouTube channels does this work for?", a: "Any scripted content: tutorials, reviews, documentaries, business channels, faceless content, story-based videos, and more. If you create videos with scripts, BrandPilot will help." },
  { q: "How is this different from using ChatGPT?", a: "Unlike ChatGPT, BrandPilot has live YouTube data access, tracks competitor channels, finds outlier videos in your niche, and learns your specific voice. ChatGPT gives generic scripts; BrandPilot gives data-driven, personalized ones." },
  { q: "Can I cancel anytime?", a: "Yes. Cancel anytime and keep access through your billing period. We also offer a 14-day money-back guarantee." },
];

/* Interactive Script Editor Component */
const ScriptEditor = () => {
  const [scriptText, setScriptText] = useState(
    `[HOOK]
(0:00-0:15)
"Have you ever wondered why some small channels blow up overnight while others stay stuck at 100 views for years? 
It's not luck. It's not the algorithm. It's a specific pattern I call 'The Outlier Strategy.' 
And today, I'm going to show you exactly how to use it on your next video."

[INTRO]
(0:15-0:45)
"Look, we've all been there. You spend 10 hours writing, filming, and editing a video. You hit publish, refresh the page... and nothing. Crickets.
But what if I told you that you could predict a video's success *before* you even hit record?"`
  );

  return (
    <div className="glass rounded-2xl p-6 md:p-8">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-red-500 uppercase tracking-wider">Free AI Script Generator</span>
        <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-red-600 to-red-500 text-white text-xs font-bold hover:scale-105 transition-transform">
          <Sparkles className="h-3.5 w-3.5" />
          Generate Script
        </button>
      </div>

      <div className="flex items-center gap-1 mb-3 p-2 rounded-lg bg-muted/30 overflow-x-auto">
        {[Bold, Italic, List, Layout].map((Icon, i) => (
          <button key={i} className="p-2 rounded-md hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors">
            <Icon className="h-4 w-4" />
          </button>
        ))}
        <div className="w-px h-5 bg-border mx-1" />
        <button className="px-3 py-1.5 rounded-md text-xs text-muted-foreground hover:bg-muted/50 transition-colors">Rewrite Hook</button>
        <button className="px-3 py-1.5 rounded-md text-xs text-muted-foreground hover:bg-muted/50 transition-colors">Add B-Roll Notes</button>
        <button className="px-3 py-1.5 rounded-md text-xs text-muted-foreground hover:bg-muted/50 transition-colors">Improve Pacing</button>
      </div>

      <textarea
        value={scriptText}
        onChange={(e) => setScriptText(e.target.value)}
        className="w-full bg-transparent border border-border/50 rounded-xl p-4 text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-red-500/40 min-h-[300px] mb-3"
        placeholder="Start writing your script or ask AI to generate one..."
      />

      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          <span className="text-xs text-muted-foreground">Est. time: ~4 mins</span>
          <span className="text-xs text-muted-foreground">Words: 124</span>
        </div>
        <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-500/10 text-red-500 text-xs font-semibold hover:bg-red-500/20 transition-colors">
          <Copy className="h-3.5 w-3.5" />
          Copy Script
        </button>
      </div>
    </div>
  );
};

const YouTubeAssist = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { isAuthenticated, isMockMode } = useAuth();

  if (isAuthenticated || isMockMode) {
    return <YouTubeAssistTool />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-surface opacity-80" />
        
        {/* Floating YouTube Icons */}
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }} 
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-32 left-[5%] md:left-[15%] text-red-500/40 z-0 hidden sm:block"
        >
          <Youtube className="w-16 h-16 md:w-24 md:h-24" />
        </motion.div>
        
        <motion.div 
          animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }} 
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-48 right-[5%] md:right-[15%] text-red-500/30 z-0 hidden sm:block"
        >
          <Youtube className="w-12 h-12 md:w-20 md:h-20" />
        </motion.div>

        <motion.div 
          animate={{ y: [0, -15, 0], rotate: [0, -5, 0] }} 
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-32 left-[10%] md:left-[20%] text-red-500/20 z-0 hidden sm:block"
        >
          <Youtube className="w-10 h-10 md:w-16 md:h-16" />
        </motion.div>

        <motion.div 
          animate={{ y: [0, 25, 0], rotate: [0, 15, 0] }} 
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute top-24 right-[20%] md:right-[30%] text-red-500/20 z-0 hidden sm:block"
        >
          <Youtube className="w-8 h-8 md:w-12 md:h-12" />
        </motion.div>

        <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-red-500 font-medium mb-8">
            <Youtube className="h-4 w-4" />
            For YouTube Creators Who Want to Grow Consistently
          </div>
          <h1 className="font-heading font-black text-4xl sm:text-5xl md:text-7xl leading-tight mb-6">
            Publish YouTube Videos<br />
            <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">Every Week. Without Burnout.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Research, ideas, and scripts generated in minutes — so you can focus on filming. Join 10,000+ creators growing their YouTube channels with BrandPilot AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link to="/login" state={{ from: "/youtube-assist" }} className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-red-600 to-red-500 text-white font-bold shadow-[0_0_30px_-5px_rgba(239,68,68,0.4)] hover:scale-105 transition-transform">
              <Sparkles className="h-5 w-5" />
              Start Creating Today
            </Link>
          </div>

          {/* App preview */}
          <div className="mt-10 rounded-2xl overflow-hidden glass border border-border/50 shadow-[0_0_30px_-5px_rgba(239,68,68,0.4)] max-w-3xl mx-auto">
            <img src={ytDashboard} alt="YouTube Assist Dashboard" className="w-full" referrerPolicy="no-referrer" />
          </div>
        </div>
      </section>

      {/* Interactive Script Editor */}
      <section className="py-20 bg-gradient-to-b from-transparent to-card/20">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-5xl mb-4">
              Write Scripts <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">Faster Than Ever</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Draft, edit, and optimize your YouTube scripts with AI right in the browser.
            </p>
          </motion.div>
          <ScriptEditor />
        </div>
      </section>

      {/* Feature Showcases */}
      {features.map((f, i) => (
        <section key={f.title} className={`py-20 ${i % 2 === 1 ? "" : "relative"}`}>
          {i % 2 === 1 && <div className="absolute inset-0 bg-gradient-card opacity-30" />}
          <div className="relative container mx-auto px-4">
            <div className={`grid md:grid-cols-2 gap-12 items-center ${f.reverse ? "md:flex-row-reverse" : ""}`}>
              <div className={f.reverse ? "md:order-2" : ""}>
                <div className="inline-flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                    <f.icon className="h-5 w-5 text-red-500" />
                  </div>
                </div>
                <h2 className="font-heading font-bold text-2xl md:text-4xl mb-4">{f.title}</h2>
                <p className="text-muted-foreground leading-relaxed">{f.description}</p>
              </div>
              <div className={`${f.reverse ? "md:order-1" : ""}`}>
                <div className="rounded-2xl overflow-hidden glass border border-border/50">
                  <img src={f.image} alt={f.title} className="w-full" referrerPolicy="no-referrer" />
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Old vs New */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="glass rounded-2xl p-8 border-destructive/20">
              <div className="flex items-center gap-2 mb-6">
                <XCircle className="h-6 w-6 text-destructive" />
                <h3 className="font-heading font-bold text-lg">Old Way: Manual Scriptwriting</h3>
              </div>
              <ul className="space-y-3">
                {["Hours of manual research", "Posting blindly hoping to go viral", "Generic ChatGPT scripts", "Giving up after 100 views per video"].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <XCircle className="h-4 w-4 text-destructive/60 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-4 border-t border-border/50 text-center">
                <span className="font-heading font-bold text-destructive text-sm">4-5 hours per script • Hit or miss results</span>
              </div>
            </div>
            <div className="glass rounded-2xl p-8 border-red-500/30 shadow-[0_0_30px_-5px_rgba(239,68,68,0.2)]">
              <div className="flex items-center gap-2 mb-6">
                <CheckCircle2 className="h-6 w-6 text-red-500" />
                <h3 className="font-heading font-bold text-lg">New Way: BrandPilot AI</h3>
              </div>
              <ul className="space-y-3">
                {["AI finds viral topics in your niche", "AI researches proven frameworks", "AI writes scripts that sound like YOU", "AI edits and optimizes for retention"].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-foreground">
                    <CheckCircle2 className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-4 border-t border-border/50 text-center">
                <span className="font-heading font-bold text-red-500 text-sm">12 minutes per script • Consistent winners</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Steps */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-5xl mb-4">
              3 Simple Steps to <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">Grow Your Channel</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((s, i) => (
              <div key={s.num} className="text-center relative">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-red-600 to-red-500 text-white font-heading font-black text-xl mb-4 shadow-[0_0_30px_-5px_rgba(239,68,68,0.4)]">
                  {s.num}
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-border" />
                )}
                <h3 className="font-heading font-bold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Tools Grid */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-card opacity-30" />
        <div className="relative container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-5xl mb-4">
              Everything You Need to <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">Dominate YouTube</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {aiTools.map((t) => (
              <div key={t.title} className="glass rounded-2xl p-6">
                <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center mb-3">
                  <t.icon className="h-5 w-5 text-red-500" />
                </div>
                <h3 className="font-heading font-bold text-sm mb-2">{t.title}</h3>
                <p className="text-xs text-muted-foreground">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
              BrandPilot AI vs <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">Generic AI Tools</span>
            </h2>
          </div>
          <div className="max-w-3xl mx-auto overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left py-3 px-4 font-heading text-muted-foreground">Feature</th>
                  {comparisonData.map((c) => (
                    <th key={c.name} className={`py-3 px-4 font-heading text-center ${c.name === "BrandPilot" ? "text-red-500" : "text-muted-foreground"}`}>
                      {c.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feat, i) => (
                  <tr key={feat} className="border-t border-border/50">
                    <td className="py-3 px-4">{feat}</td>
                    {comparisonData.map((c) => (
                      <td key={c.name} className="py-3 px-4 text-center">
                        {typeof c.values[i] === "boolean" ? (
                          c.values[i] ? <CheckCircle2 className="h-5 w-5 mx-auto text-red-500" /> : <XCircle className="h-5 w-5 mx-auto text-muted-foreground/30" />
                        ) : (
                          <span className={c.name === "BrandPilot" ? "text-red-500 font-bold" : "text-muted-foreground"}>{c.values[i] as string}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((s) => (
              <div key={s.label} className="text-center glass rounded-2xl p-6">
                <div className="font-heading font-black text-3xl bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent mb-1">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
              Frequently Asked <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">Questions</span>
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="glass rounded-xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between px-6 py-5 text-left">
                  <span className="font-heading font-semibold text-sm pr-4">{faq.q}</span>
                  <ChevronDown className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <div className="glass rounded-3xl p-12 md:p-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 opacity-10" />
            <div className="relative z-10">
              <h2 className="font-heading font-black text-3xl md:text-5xl mb-4">
                Start Growing Your <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">YouTube Channel</span> Today
              </h2>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto">Join 10,000+ creators who script faster and grow smarter with AI.</p>
              <Link to="/login" state={{ from: "/youtube-assist" }} className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-red-600 to-red-500 text-white font-bold shadow-[0_0_30px_-5px_rgba(239,68,68,0.4)] hover:scale-105 transition-transform">
                <Sparkles className="h-5 w-5" />
                Start Creating Today
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default YouTubeAssist;
