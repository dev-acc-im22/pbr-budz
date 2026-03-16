import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Instagram, Sparkles, PenTool, BarChart3, Lightbulb, Users, Camera, 
  Grid3X3, Film, Hash, Clock, MessageSquare, TrendingUp, CheckCircle2, 
  Heart, Palette, Eye, Copy, ArrowRight, Bold, Italic, List, Star,
  Share2, Send, ThumbsUp, Layout, Mic, Search, BookOpen, Target,
  Zap, Briefcase, GraduationCap, Calendar, Repeat, MessageCircle,
  ChevronDown
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import InstaAssistTool from "./tools/InstaAssistTool";

// Asset imports
const instagramDashboard = "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1920&q=80";
const contentStudio = "https://images.unsplash.com/photo-1516245834210-c4c142787335?auto=format&fit=crop&w=1920&q=80";

/* ═══════════════════ DATA ═══════════════════ */

const stats = [
  { value: "10 min", label: "one Reels idea = a week of Instagram content" },
  { value: "5×", label: "more saves and shares in the first month" },
  { value: "800+", label: "creators growing on Instagram with BrandPilot" },
];

const coreFeatures = [
  {
    id: "caption-ai",
    badge: "Caption AI",
    title: "Captions that stop the scroll",
    description: "Caption AI writes in your voice — not generic AI voice. It learns your style from your best-performing posts and creates captions that drive engagement, saves, and shares.",
    bullets: [
      "Learns your tone from your existing Instagram posts",
      "Hook-first writing that captures attention in 3 seconds",
      "Built-in emoji and hashtag optimization",
    ],
    image: instagramDashboard,
  },
  {
    id: "reels-studio",
    badge: "Reels Studio",
    title: "Viral Reels scripts in seconds",
    description: "Reels Studio generates hook-driven scripts with trending formats, optimal pacing, and engagement-optimized transitions. Turn any idea into a scroll-stopping Reel.",
    bullets: [
      "Hook formulas proven to work on Instagram",
      "Trending audio and format recommendations",
      "Scene-by-scene script breakdowns with timing",
    ],
    image: contentStudio,
  },
  {
    id: "grid-planner",
    badge: "Grid Planner",
    title: "Your grid, but make it cohesive",
    description: "Plan your Instagram grid like a pro. Grid Planner shows you how posts will look together, suggests content mix ratios, and maintains your visual brand identity.",
    bullets: [
      "9-grid preview with real post layouts",
      "Content mix optimization (posts, carousels, reels)",
      "Color palette and aesthetic consistency scoring",
    ],
    image: instagramDashboard,
  },
];

const aiTools = [
  { icon: PenTool, title: "AI Caption Writer", desc: "Generate scroll-stopping captions that drive engagement, saves, and shares. Every caption matches your brand voice." },
  { icon: Hash, title: "Smart Hashtag Finder", desc: "AI discovers the perfect mix of trending, niche, and long-tail hashtags for maximum discoverability." },
  { icon: Film, title: "Reels Script Generator", desc: "Create viral Reels scripts with hooks, transitions, and CTAs optimized for Instagram's algorithm." },
  { icon: Grid3X3, title: "Visual Grid Planner", desc: "Plan your Instagram grid for visual cohesion. Preview how posts look together before publishing." },
  { icon: Camera, title: "Story Templates", desc: "AI-generated story sequences for product launches, behind-the-scenes, Q&A, and engagement-driving formats." },
  { icon: Lightbulb, title: "Content Ideas Engine", desc: "Never run out of ideas. AI analyzes trending content in your niche and suggests posts that will resonate." },
  { icon: Clock, title: "Optimal Posting Times", desc: "AI determines when YOUR specific audience is most active for maximum reach on every post." },
  { icon: BarChart3, title: "Growth Analytics", desc: "Track follower growth, engagement rates, reach, and content performance with actionable insights." },
];

const howItWorks = [
  { step: "01", title: "Connect your Instagram", desc: "Link your account so AI can learn your voice and analyze your audience." },
  { step: "02", title: "Generate content ideas", desc: "AI creates post ideas, captions, and Reels scripts based on trending topics in your niche." },
  { step: "03", title: "Plan and publish", desc: "Use Grid Planner to visualize your feed, schedule posts, and track performance." },
];

const toolkitItems = [
  { icon: Clock, title: "Smart Scheduling", desc: "Schedule posts during your audience's peak engagement windows for maximum reach." },
  { icon: Mic, title: "Voice to Caption", desc: "Record your ideas and AI turns them into perfectly formatted Instagram captions." },
  { icon: Layout, title: "Carousel Generator", desc: "Transform blog posts and ideas into swipeable Instagram carousels that drive saves." },
  { icon: Search, title: "Hashtag Analytics", desc: "Track hashtag performance and discover new tags that your competitors are using." },
  { icon: MessageCircle, title: "Comment Templates", desc: "Pre-written comment responses to boost engagement and build community faster." },
  { icon: Repeat, title: "Content Repurposing", desc: "Turn TikToks, YouTube videos, and blog posts into Instagram-ready content." },
  { icon: BookOpen, title: "80+ Post Templates", desc: "Access proven Instagram post templates designed to drive engagement and growth." },
  { icon: Target, title: "Competitor Tracking", desc: "Monitor what's working for accounts in your niche and adapt successful strategies." },
  { icon: BarChart3, title: "Growth Dashboard", desc: "Track follower growth, engagement rates, reach, and identify your top-performing content." },
];

const beforeAfter = {
  before: {
    title: "Before...",
    subtitle: "Inconsistent posting, bland captions, and zero strategy.",
    items: [
      "Posting randomly with no content plan",
      "Generic captions that get no engagement",
      "Spending hours trying to think of Reels ideas",
      "No understanding of what content performs",
      "Inconsistent visual brand and feed aesthetics",
    ],
  },
  after: {
    title: "After BrandPilot",
    subtitle: "A cohesive Instagram brand that grows on autopilot.",
    items: [
      "Strategic content calendar with planned grid layouts",
      "Engaging captions that drive saves and shares",
      "Viral Reels scripts generated in under 2 minutes",
      "Data-driven content strategy based on performance",
      "Cohesive visual brand that attracts your ideal audience",
    ],
  },
};

const personas = [
  { icon: Heart, title: "Lifestyle Creators", desc: "Build an engaged community around your lifestyle, wellness, or travel content with authentic storytelling." },
  { icon: Palette, title: "Artists & Designers", desc: "Showcase your portfolio, attract dream clients, and build a visual brand that stands out in a crowded feed." },
  { icon: TrendingUp, title: "DTC Brands", desc: "Drive product discovery, build brand loyalty, and convert followers into customers with strategic content." },
  { icon: Briefcase, title: "Coaches & Educators", desc: "Establish authority, share knowledge, and build a community of engaged learners ready to invest in your expertise." },
];

const testimonials = [
  { quote: "My Instagram engagement went up 400% in 6 weeks. The Caption AI actually writes better than I do — it captures my voice perfectly.", name: "Maya Chen", role: "Lifestyle Creator • 50K followers" },
  { quote: "I went from 2 Reels per month to 15. The script generator gives me ideas I never would have thought of, and they actually go viral.", name: "Jake Thompson", role: "Fitness Coach • 25K followers" },
  { quote: "Grid Planner changed everything. My feed finally looks cohesive and professional. I get DMs asking who my designer is.", name: "Sofia Martinez", role: "Fashion Blogger • 80K followers" },
];

const pricing = [
  {
    name: "Creator",
    price: "$19",
    period: "/month",
    description: "For individual creators building their Instagram presence.",
    features: [
      { text: "AI Caption Writer", included: true },
      { text: "Reels Script Generator", included: true },
      { text: "Smart Hashtag Finder", included: true },
      { text: "Basic analytics", included: true },
      { text: "Grid Planner (3x3 preview)", included: false },
      { text: "Competitor tracking", included: false },
    ],
    cta: "Start Free Trial",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$39",
    period: "/month", 
    description: "For serious creators who want to dominate Instagram.",
    features: [
      { text: "Everything in Creator", included: true },
      { text: "Advanced Grid Planner", included: true },
      { text: "Competitor tracking", included: true },
      { text: "Content repurposing", included: true },
      { text: "Advanced analytics", included: true },
      { text: "Priority support", included: true },
    ],
    cta: "Start Pro Trial",
    highlighted: true,
  },
  {
    name: "Agency",
    price: "$99",
    period: "/month",
    description: "For agencies managing multiple Instagram accounts.",
    features: [
      { text: "Everything in Pro", included: true },
      { text: "Multiple account management", included: true },
      { text: "White-label reports", included: true },
      { text: "Team collaboration", included: true },
      { text: "API access", included: true },
      { text: "Dedicated account manager", included: true },
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

const faqs = [
  { q: "Does the AI understand Instagram's algorithm?", a: "Yes. Our AI is specifically trained on Instagram's content ranking signals including engagement velocity, saves, shares, and watch time for Reels. It optimizes every piece of content for maximum reach." },
  { q: "Can it help with Reels specifically?", a: "Absolutely. Our Reels Script Generator creates hook-driven scripts with trending formats, optimal length, and engagement-driving CTAs. It's one of our most popular features." },
  { q: "How does hashtag discovery work?", a: "Our AI analyzes hashtag performance data in real-time. It suggests a mix of high-volume trending hashtags, niche-specific ones, and long-tail hashtags for optimal discoverability without triggering shadow bans." },
  { q: "Will the captions sound authentic?", a: "Yes. The AI learns your unique writing style, tone, and emoji usage patterns. Every caption sounds like you wrote it, just faster and optimized for engagement." },
  { q: "Can I preview how my grid will look?", a: "Yes! Grid Planner shows you a 9-post preview of how your content will look together, helping you maintain a cohesive visual brand and plan your content mix." },
];

/* ═══════════════════ HELPERS ═══════════════════ */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

/* Interactive Caption Generator Component */
const CaptionGenerator = () => {
  const [captionText, setCaptionText] = useState(
    `Stop scrolling. This changed my perspective completely. ✨

Here's what I learned when I stepped out of my comfort zone:

→ Growth happens when you're uncomfortable
→ Everyone starts as a beginner 
→ Progress > perfection every single time
→ Your future self will thank you

The best time to start? Yesterday.
The second best time? Right now.

What's one thing you've been putting off? Drop it below 👇

#growth #mindset #motivation`
  );
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("mobile");

  return (
    <div className="glass rounded-2xl p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-accent uppercase tracking-wider">Free Instagram Caption Generator</span>
        <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-primary text-primary-foreground text-xs font-bold hover:scale-105 transition-transform">
          <Sparkles className="h-3.5 w-3.5" />
          Generate with AI
        </button>
      </div>

      {/* Formatting toolbar */}
      <div className="flex items-center gap-1 mb-3 p-2 rounded-lg bg-muted/30 overflow-x-auto">
        {[Bold, Italic, List, Hash].map((Icon, i) => (
          <button key={i} className="p-2 rounded-md hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors">
            <Icon className="h-4 w-4" />
          </button>
        ))}
        <div className="w-px h-5 bg-border mx-1" />
        <button className="px-3 py-1.5 rounded-md text-xs text-muted-foreground hover:bg-muted/50 transition-colors">Add Hook</button>
        <button className="px-3 py-1.5 rounded-md text-xs text-muted-foreground hover:bg-muted/50 transition-colors">Add Hashtags</button>
        <button className="px-3 py-1.5 rounded-md text-xs text-muted-foreground hover:bg-muted/50 transition-colors">Add Emojis</button>
      </div>

      <textarea
        value={captionText}
        onChange={(e) => setCaptionText(e.target.value)}
        className="w-full bg-transparent border border-border/50 rounded-xl p-4 text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-primary/40 min-h-[200px] mb-3"
        placeholder="Describe your post idea and let AI write a viral caption..."
      />

      <div className="flex items-center justify-between mb-6">
        <span className="text-xs text-muted-foreground">Characters: {captionText.length}</span>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent/10 text-accent text-xs font-semibold hover:bg-accent/20 transition-colors">
            <Hash className="h-3.5 w-3.5" />
            Add Hashtags
          </button>
          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent/10 text-accent text-xs font-semibold hover:bg-accent/20 transition-colors">
            <Copy className="h-3.5 w-3.5" />
            Copy
          </button>
        </div>
      </div>

      {/* Preview */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold">Instagram Preview</span>
        <div className="flex gap-1 p-1 rounded-lg bg-muted/30">
          <button
            onClick={() => setPreviewMode("mobile")}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${previewMode === "mobile" ? "bg-primary/20 text-accent" : "text-muted-foreground"}`}
          >
            Mobile
          </button>
          <button
            onClick={() => setPreviewMode("desktop")}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${previewMode === "desktop" ? "bg-primary/20 text-accent" : "text-muted-foreground"}`}
          >
            Desktop
          </button>
        </div>
      </div>

      <div className={`bg-card/80 rounded-xl border border-border/30 p-4 mx-auto transition-all ${previewMode === "mobile" ? "max-w-xs" : "max-w-md"}`}>
        {/* Profile header */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm shrink-0">A</div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm">your_username</p>
            <p className="text-xs text-muted-foreground">2h</p>
          </div>
          <button className="text-muted-foreground">•••</button>
        </div>

        {/* Mock image */}
        <div className="w-full aspect-square bg-gradient-card rounded-lg mb-3 flex items-center justify-center">
          <Camera className="h-12 w-12 text-muted-foreground/50" />
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <ThumbsUp className="h-6 w-6 text-muted-foreground" />
            <MessageSquare className="h-6 w-6 text-muted-foreground" />
            <Send className="h-6 w-6 text-muted-foreground" />
          </div>
          <BookOpen className="h-6 w-6 text-muted-foreground" />
        </div>

        {/* Engagement */}
        <div className="text-xs text-muted-foreground mb-2">127 likes</div>

        {/* Caption */}
        <div className="text-sm">
          <span className="font-bold">your_username</span>
          <span className="ml-2 whitespace-pre-line text-xs leading-relaxed">{captionText || "Your caption will appear here..."}</span>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════ MAIN COMPONENT ═══════════════════ */

const InstagramAssist = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeFeature, setActiveFeature] = useState(0);
  const { isAuthenticated, isMockMode } = useAuth();

  if (isAuthenticated || isMockMode || import.meta.env.VITE_USE_MOCK_DATA === 'true') {
    return <InstaAssistTool />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ────────── Hero ────────── */}
      <section className="pt-28 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-surface opacity-80" />
        <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-accent font-medium mb-8">
            <Instagram className="h-4 w-4" />
            #1 AI Tool for Instagram Creators & Brands
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-heading font-extrabold text-4xl sm:text-5xl md:text-7xl leading-tight mb-6"
          >
            Build a Stunning <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">Instagram Brand</span> with AI
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Generate viral captions, plan your grid, create Reels scripts, and grow your audience — all powered by AI that understands Instagram's algorithm.
          </motion.p>

          <Link to="/login" state={{ from: "/instagram-assist" }} className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-primary text-primary-foreground font-bold glow-primary hover:scale-105 transition-transform">
            <Sparkles className="h-5 w-5" />
            Start Growing on Instagram
            <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="mt-4 text-xs text-muted-foreground">7-day free trial · Cancel anytime · 800+ creators growing</p>
        </div>
      </section>

      {/* ────────── Stats Bar ────────── */}
      <section className="py-10 border-y border-border/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
            {stats.map((s) => (
              <div key={s.value}>
                <p className="font-heading font-black text-3xl md:text-4xl bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent mb-1">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────── Interactive Caption Generator ────────── */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-5xl mb-4">
              Free Instagram <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">Caption Generator</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Create scroll-stopping captions that drive engagement. Write, format, preview, and copy — all in one place.
            </p>
          </motion.div>
          <CaptionGenerator />
        </div>
      </section>

      {/* ────────── Core Features (tabbed) ────────── */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-card opacity-20" />
        <div className="relative container mx-auto px-4 max-w-6xl">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-5xl mb-4">
              AI that understands <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">Instagram's algorithm</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Built specifically for Instagram creators. Every feature is designed to help you grow.</p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {coreFeatures.map((f, i) => (
              <button
                key={f.id}
                onClick={() => setActiveFeature(i)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  activeFeature === i
                    ? "bg-gradient-primary text-primary-foreground glow-primary"
                    : "glass text-muted-foreground hover:text-foreground"
                }`}
              >
                {f.badge}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeFeature}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="grid md:grid-cols-2 gap-10 items-center"
            >
              <div>
                <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">{coreFeatures[activeFeature].title}</h3>
                <p className="text-muted-foreground mb-6">{coreFeatures[activeFeature].description}</p>
                <ul className="space-y-3">
                  {coreFeatures[activeFeature].bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-sm">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glass rounded-2xl p-2 overflow-hidden">
                <img
                  src={coreFeatures[activeFeature].image}
                  alt={coreFeatures[activeFeature].badge}
                  className="w-full rounded-xl object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ────────── How It Works ────────── */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
            <h2 className="font-heading font-bold text-3xl md:text-5xl mb-4">
              From idea to viral post. <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">Three simple steps.</span>
            </h2>
            <p className="text-muted-foreground">Start with an idea, a trend, or just a feeling — BrandPilot handles the rest.</p>
          </motion.div>
          <div className="grid sm:grid-cols-3 gap-8">
            {howItWorks.map((s, i) => (
              <motion.div
                key={s.step}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="glass rounded-2xl p-8 text-center relative"
              >
                <span className="font-heading font-black text-5xl text-accent/20 absolute top-4 left-6">{s.step}</span>
                <div className="relative z-10 pt-8">
                  <h3 className="font-heading font-bold text-lg mb-3">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────── AI Tools Grid ────────── */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-card opacity-30" />
        <div className="relative container mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-5xl mb-4">
              8 AI Tools for <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">Instagram Growth</span>
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {aiTools.map((t, i) => (
              <motion.div 
                key={t.title} 
                variants={fadeUp} 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass rounded-2xl p-6 group hover:border-primary/40 transition-all"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <t.icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-heading font-bold text-sm mb-2">{t.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────── Complete Toolkit ────────── */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
              Everything you need in <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">one platform</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">From content creation to performance tracking — BrandPilot has you covered.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {toolkitItems.map((t, i) => (
              <motion.div 
                key={t.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass rounded-2xl p-6"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <t.icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-heading font-bold text-sm mb-2">{t.title}</h3>
                <p className="text-xs text-muted-foreground">{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────── Before / After ────────── */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-card opacity-20" />
        <div className="relative container mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-5xl mb-4">
              The <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">transformation</span> is real
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="glass rounded-2xl p-8 border-destructive/20">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-6 rounded-full bg-destructive/20 flex items-center justify-center">
                  <span className="text-destructive text-xs">✗</span>
                </div>
                <h3 className="font-heading font-bold text-lg">{beforeAfter.before.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-6">{beforeAfter.before.subtitle}</p>
              <ul className="space-y-4">
                {beforeAfter.before.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-destructive/60 shrink-0 mt-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.1 }} className="glass rounded-2xl p-8 border-primary/30 glow-primary">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                </div>
                <h3 className="font-heading font-bold text-lg">{beforeAfter.after.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-6">{beforeAfter.after.subtitle}</p>
              <ul className="space-y-4">
                {beforeAfter.after.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-foreground">
                    <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ────────── Personas ────────── */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
              Perfect for <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">every creator</span>
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {personas.map((p, i) => (
              <motion.div 
                key={p.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6 text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <p.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-heading font-bold text-sm mb-2">{p.title}</h3>
                <p className="text-xs text-muted-foreground">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────── Testimonials ────────── */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-card opacity-30" />
        <div className="relative container mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
              Real results from <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">real creators</span>
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-sm text-foreground leading-relaxed mb-4 italic">"{t.quote}"</p>
                <div>
                  <div className="font-heading font-bold text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────── Pricing ────────── */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-5xl mb-4">
              Simple <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">Instagram growth</span> pricing
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Start free, upgrade when you're ready to dominate Instagram.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricing.map((plan, i) => (
              <motion.div
                key={plan.name}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-2xl p-8 flex flex-col ${
                  plan.highlighted
                    ? "glass border-primary/50 glow-primary relative"
                    : "glass"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-primary text-primary-foreground text-xs font-bold">
                    Most Popular
                  </div>
                )}
                <h3 className="font-heading font-bold text-xl mb-1">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                <div className="mb-6">
                  <span className="font-heading font-black text-4xl">{plan.price}</span>
                  <span className="text-muted-foreground text-sm">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f.text} className="flex items-center gap-3 text-sm">
                      {f.included ? (
                        <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-muted-foreground/30 shrink-0" />
                      )}
                      <span className={f.included ? "text-foreground" : "text-muted-foreground/60"}>
                        {f.text}
                      </span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${
                    plan.highlighted
                      ? "bg-gradient-primary text-primary-foreground glow-primary hover:scale-105"
                      : "glass text-foreground hover:bg-secondary/80"
                  }`}
                >
                  {plan.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────── FAQ ────────── */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
              Frequently Asked <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">Questions</span>
            </h2>
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="glass rounded-xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between px-6 py-5 text-left">
                  <span className="font-heading font-semibold text-sm pr-4">{faq.q}</span>
                  <ChevronDown className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && <div className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed">{faq.a}</div>}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ────────── CTA ────────── */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="glass rounded-3xl p-12 md:p-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-primary opacity-10" />
            <div className="relative z-10">
              <h2 className="font-heading font-black text-3xl md:text-5xl mb-4">
                Grow Your <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">Instagram</span> Today
              </h2>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto">Join 800+ creators building stunning Instagram brands with AI.</p>
              <Link to="/login" state={{ from: "/instagram-assist" }} className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-primary text-primary-foreground font-bold glow-primary hover:scale-105 transition-transform">
                <Sparkles className="h-5 w-5" />
                Get Started Free
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default InstagramAssist;