import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Linkedin, Sparkles, ArrowRight, PenTool, BarChart3,
  Lightbulb, Users, FileText, Target, TrendingUp,
  Search, Clock, MessageSquare, Brain, CheckCircle2, Briefcase,
  Mic, Calendar, Layout, MessageCircle, Repeat, ChevronDown,
  Star, Quote, Zap, Shield, BookOpen, Palette, Eye, Send,
  ThumbsUp, Share2, Copy, Bold, Italic, List, Hash,
  Bookmark, Library, GraduationCap, Fingerprint, Sparkle,
  X as XIcon,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import linkedinDashboardMock from "@/assets/linkedin-dashboard-mock.jpg";
import linkedinPostcastMock from "@/assets/linkedin-postcast-mock.jpg";

/* ═══════════════════ DATA ═══════════════════ */

const stats = [
  { value: "15 min", label: "one conversation = a week of LinkedIn content" },
  { value: "3×", label: "more consistent posting in the first month" },
  { value: "1,200+", label: "professionals growing on LinkedIn with BrandPilot" },
];

const coreFeatures = [
  {
    id: "content-dna",
    badge: "Content DNA",
    title: "Your voice. Not \"AI voice.\"",
    description: "Content DNA builds a profile of how you actually communicate — your tone, opinions, vocabulary, and the topics you care about. Every post sounds like you wrote it yourself.",
    bullets: [
      "Learns your style from your existing LinkedIn posts and writing",
      "Captures your opinions and perspectives, not just your tone",
      "Gets smarter with every post you publish",
    ],
    image: linkedinDashboardMock,
  },
  {
    id: "postcast",
    badge: "Postcast",
    title: "Talk for 15 minutes. Publish all week.",
    description: "Postcast is an AI-guided conversation that pulls out your best thinking — the insights you'd share over coffee but never find time to write down.",
    bullets: [
      "One conversation turns into 5–7 publish-ready posts",
      "AI asks follow-up questions to surface your sharpest ideas",
      "No writing required — just talk",
    ],
    image: linkedinPostcastMock,
  },
  {
    id: "ai-generator",
    badge: "AI Post Generator",
    title: "Give it a topic. Get back a post that sounds like you.",
    description: "Paste an article, drop a YouTube link, or just type a topic. The AI generates a LinkedIn post in your voice — with hooks, formatting, and CTAs built in.",
    bullets: [
      "Generate from topics, URLs, PDFs, or YouTube videos",
      "Choose from multiple hooks and angles",
      "Edit if you want, or publish as-is",
    ],
    image: linkedinDashboardMock,
  },
];

const howItWorks = [
  { step: "01", title: "Give it something to work with", desc: "Type a topic, paste a link, or start a Postcast conversation." },
  { step: "02", title: "AI writes in your voice", desc: "Content DNA matches your tone and perspective. You get a polished draft, not a generic template." },
  { step: "03", title: "Publish or schedule", desc: "Post to LinkedIn instantly, schedule for peak times, or queue with a first comment ready." },
];

/* Kleo-inspired Create/Discover/Think workflow */
const workflowSections = [
  {
    label: "Create",
    heading: "Go from idea to published post in minutes",
    subheading: "BrandPilot brings drafting, editing, visuals, and scheduling into one smooth flow. No jumping between apps.",
    tabs: [
      { title: "Write posts", desc: "Turn ideas into drafts through a natural conversation with AI.", icon: PenTool },
      { title: "Create graphics", desc: "Generate simple, on-brand visuals that match your post in seconds.", icon: Palette },
      { title: "Preview & edit", desc: "Refine posts until they look and sound exactly how you want.", icon: Eye },
      { title: "Schedule posts", desc: "Plan and publish your posts at the perfect time, all in one place.", icon: Calendar },
    ],
  },
  {
    label: "Discover",
    heading: "Never run out of content ideas again",
    subheading: "Save inspiration from anywhere on the web and turn it into new content whenever you need it.",
    tabs: [
      { title: "Browse swipe file", desc: "Explore a curated library of winning content for instant inspiration.", icon: Library },
      { title: "Save inspiration", desc: "Save posts and ideas from anywhere on the web into your own library.", icon: Bookmark },
      { title: "Use templates", desc: "Start faster with 150+ proven post formats that already work.", icon: FileText },
      { title: "Generate ideas", desc: "Chat with AI to turn sparks of inspiration into polished ideas.", icon: Lightbulb },
    ],
  },
  {
    label: "Think",
    heading: "Your second brain for better content",
    subheading: "Store your specific knowledge, refine your voice, and keep your content aligned with your brand every time you write.",
    tabs: [
      { title: "Store knowledge", desc: "Build your second brain so AI writes with your real expertise.", icon: GraduationCap },
      { title: "Train writing style", desc: "Train AI on your writing style to match your authentic voice.", icon: PenTool },
      { title: "Define identity", desc: "Define your positioning and values to keep every post on brand.", icon: Fingerprint },
      { title: "Automatic memories", desc: "AI learns from every post so your writing gets even better over time.", icon: Brain },
    ],
  },
];

const toolkitItems = [
  { icon: Clock, title: "Smart Scheduling", desc: "Schedule posts at peak engagement windows. Auto-publish so you never think about timing again." },
  { icon: Mic, title: "Voice to Post", desc: "Record a quick voice note with your idea. AI turns it into a formatted LinkedIn post in your voice." },
  { icon: Layout, title: "Carousel Generator", desc: "Turn your ideas into swipeable LinkedIn carousels that drive saves and shares." },
  { icon: FileText, title: "Content Management", desc: "Drag-and-drop Kanban board for every post. Draft, review, approved, scheduled." },
  { icon: MessageCircle, title: "First Comment, Automated", desc: "Write your CTA comment once. BrandPilot posts it automatically the moment your post goes live." },
  { icon: Repeat, title: "Content Repurposing", desc: "Turn YouTube videos, blog posts, and PDFs into LinkedIn-ready posts. One source, multiple formats." },
  { icon: Hash, title: "130+ Viral Templates", desc: "Access proven post templates designed specifically to go viral on LinkedIn." },
  { icon: Search, title: "AI Writing Assistant", desc: "Select text for AI to adjust length, rephrase, add emojis, hashtags, and more." },
  { icon: BarChart3, title: "Analytics Dashboard", desc: "Track impressions, engagement rate, follower growth, and content performance." },
];

const beforeAfter = {
  before: {
    title: "Before...",
    subtitle: "Scattered notes, blank page anxiety, and inconsistent posts.",
    items: [
      "Staring at a blank screen for 30+ minutes",
      "Inconsistent posting — once a month at best",
      "Generic, forgettable content that gets no engagement",
      "Hours spent writing, editing, and second-guessing",
      "No strategy, no content calendar, no analytics",
    ],
  },
  after: {
    title: "After BrandPilot",
    subtitle: "A living content system that gets smarter with every post.",
    items: [
      "First draft ready in under 2 minutes",
      "3-5 posts per week on autopilot",
      "Authentic, voice-matched content that drives engagement",
      "15-minute conversation = a week of content",
      "Full strategy: calendar, analytics, and growth tracking",
    ],
  },
};

const personas = [
  { icon: Briefcase, title: "Founders & CEOs", desc: "Build in public, attract talent, and position your company as an industry leader." },
  { icon: Users, title: "Sales Professionals", desc: "Warm up cold leads, build trust at scale, and fill your pipeline with inbound opportunities." },
  { icon: TrendingUp, title: "Career Changers", desc: "Showcase your expertise, attract recruiters, and land your dream role through personal branding." },
  { icon: Lightbulb, title: "Consultants & Coaches", desc: "Establish authority, attract high-ticket clients, and create a steady stream of inbound leads." },
];

const testimonials = [
  { quote: "I went from posting once a month to 3× a week. Two inbound deals last quarter came directly from prospects who'd been reading my LinkedIn posts.", name: "Sarah Chen", role: "VP of Sales, TechCorp" },
  { quote: "The AI interview captured nuances in my thinking I couldn't have written myself. It felt like a conversation, not a content exercise.", name: "Marcus Rivera", role: "Executive Coach" },
  { quote: "I wrote all my posts for the coming week within 1 hour. They're better than my previous posts. It really feels and writes like you.", name: "David Müller", role: "Founder, DigiHeld" },
  { quote: "Finally, a system where our leadership team posts on-brand without me rewriting everything. One approval hub, zero reputation risk.", name: "Jessica Park", role: "Marketing Director, Elevate" },
  { quote: "BrandPilot increased my productivity by at least 50%. The scheduling and AI tools make content creation feel effortless.", name: "Priya Sharma", role: "Consultant & Author" },
  { quote: "From the tools I've used — Claude, EasyGen, SayWhat — BrandPilot is the best. It actually creates results for our clients.", name: "Julia Kotula", role: "Agency Owner" },
];

const faqs = [
  { q: "How does Content DNA learn my voice?", a: "Content DNA analyzes your existing LinkedIn posts, writing samples, and profile to map your tone, vocabulary, opinions, and expertise. It builds a voice profile that the AI uses every time it generates a post — so each one sounds like you, not a template." },
  { q: "What is Postcast?", a: "Postcast is a 15–20 minute AI-guided conversation where you talk through your ideas and experiences. The AI asks smart follow-up questions, then turns the conversation into multiple publish-ready LinkedIn posts. No writing required." },
  { q: "Will people know my posts are AI-generated?", a: "That's the whole point of Content DNA. Unlike generic AI tools, BrandPilot matches your specific tone, vocabulary, and perspective. Most users publish first drafts with minimal edits — and their audience can't tell the difference." },
  { q: "How is this different from ChatGPT?", a: "ChatGPT starts from scratch every time and produces generic content. BrandPilot builds a persistent voice profile that learns who you are and gets better over time. Plus it includes scheduling, analytics, and LinkedIn-specific formatting — purpose-built for the platform." },
  { q: "Can I generate posts from articles or videos?", a: "Yes. Paste a blog URL, YouTube link, or upload a PDF. BrandPilot extracts the key ideas and generates LinkedIn posts matched to your voice — giving you multiple angles from a single source." },
  { q: "How many languages are supported?", a: "BrandPilot supports 100+ languages including English, Spanish, French, German, Portuguese, Dutch, and more. Generate content in any language while maintaining your authentic voice." },
  { q: "How quickly will I see results?", a: "Most users publish their first post within 10 minutes of signing up. By the end of your first week, you'll have a full content pipeline — and a voice profile that keeps getting better." },
  { q: "Is there a free trial?", a: "Yes. You get a full 7-day free trial with access to all features. Cancel anytime." },
];

/* ═══════════════════ HELPERS ═══════════════════ */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

/* Interactive Post Preview Component */
const PostPreview = () => {
  const [postText, setPostText] = useState(
    "🚀 The biggest mistake I see founders make on LinkedIn?\n\nThey treat it like a resume.\n\nBut LinkedIn isn't about listing achievements.\nIt's about sharing the journey.\n\nThe messy middle. The lessons. The failures.\n\nThat's what builds trust.\nThat's what attracts opportunities.\n\nStop broadcasting. Start connecting.\n\n♻️ Repost if you agree\n💬 What's your take?"
  );
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");

  return (
    <div className="glass rounded-2xl p-6 md:p-8">
      {/* Editor */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-accent uppercase tracking-wider">Free AI LinkedIn Post Generator</span>
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
        <button className="px-3 py-1.5 rounded-md text-xs text-muted-foreground hover:bg-muted/50 transition-colors">Improve</button>
        <button className="px-3 py-1.5 rounded-md text-xs text-muted-foreground hover:bg-muted/50 transition-colors">Shorten</button>
        <button className="px-3 py-1.5 rounded-md text-xs text-muted-foreground hover:bg-muted/50 transition-colors">Add Emojis</button>
      </div>

      <textarea
        value={postText}
        onChange={(e) => setPostText(e.target.value)}
        className="w-full bg-transparent border border-border/50 rounded-xl p-4 text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-primary/40 min-h-[160px] mb-3"
        placeholder="Write your post or let AI generate one..."
      />

      <div className="flex items-center justify-between mb-6">
        <span className="text-xs text-muted-foreground">Characters: {postText.length}</span>
        <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-accent/10 text-accent text-xs font-semibold hover:bg-accent/20 transition-colors">
          <Copy className="h-3.5 w-3.5" />
          Copy to Clipboard
        </button>
      </div>

      {/* Preview */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold">Post Preview</span>
        <div className="flex gap-1 p-1 rounded-lg bg-muted/30">
          <button
            onClick={() => setPreviewMode("desktop")}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${previewMode === "desktop" ? "bg-primary/20 text-accent" : "text-muted-foreground"}`}
          >
            Desktop
          </button>
          <button
            onClick={() => setPreviewMode("mobile")}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${previewMode === "mobile" ? "bg-primary/20 text-accent" : "text-muted-foreground"}`}
          >
            Mobile
          </button>
        </div>
      </div>

      <div className={`bg-card/80 rounded-xl border border-border/30 p-5 mx-auto transition-all ${previewMode === "mobile" ? "max-w-sm" : "max-w-full"}`}>
        {/* Profile header */}
        <div className="flex items-start gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold text-lg shrink-0">A</div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm">Alex Morgan</p>
            <p className="text-xs text-muted-foreground truncate">Founder at BrandPilot AI · Building the future of personal branding ✨</p>
            <p className="text-xs text-muted-foreground mt-0.5">12h • 🌐</p>
          </div>
        </div>
        {/* Post text */}
        <div className="text-sm whitespace-pre-line leading-relaxed mb-4">{postText || "Write your post..."}</div>
        {/* Engagement */}
        <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border/30 pt-3 mb-3">
          <span>👍 64</span>
          <span>27 comments • 4 reposts</span>
        </div>
        {/* Action buttons */}
        <div className="grid grid-cols-4 gap-1">
          {[
            { icon: ThumbsUp, label: "Like" },
            { icon: MessageSquare, label: "Comment" },
            { icon: Share2, label: "Share" },
            { icon: Send, label: "Send" },
          ].map((a) => (
            <button key={a.label} className="flex items-center justify-center gap-1.5 py-2 rounded-lg hover:bg-muted/30 transition-colors text-muted-foreground text-xs">
              <a.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{a.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════ MAIN COMPONENT ═══════════════════ */

const LinkedInAssist = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeFeature, setActiveFeature] = useState(0);
  const [activeWorkflowSection, setActiveWorkflowSection] = useState(0);
  const [activeWorkflowTab, setActiveWorkflowTab] = useState(0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ────────── Hero ────────── */}
      <section className="pt-28 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-surface opacity-80" />
        <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-accent font-medium mb-8">
            <Linkedin className="h-4 w-4" />
            #1 AI Personal Brand Tool for LinkedIn
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-heading font-extrabold text-4xl sm:text-5xl md:text-7xl leading-tight mb-6"
          >
            Writing like an industry expert{" "}
            <span className="text-gradient">has never been easier</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            BrandPilot helps you <strong className="text-foreground">write faster</strong>, <strong className="text-foreground">stay consistent</strong>, and <strong className="text-foreground">sound like yourself</strong>. Everything you need to ideate, write, design, and publish posts in one place.
          </motion.p>

          {/* Quick action chips */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {[
              { icon: Lightbulb, label: "Give post ideas" },
              { icon: TrendingUp, label: "What's trending" },
              { icon: FileText, label: "Plan post idea" },
              { icon: Palette, label: "Create graphic" },
            ].map((chip) => (
              <button
                key={chip.label}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl glass text-sm hover:border-primary/40 transition-all"
              >
                <chip.icon className="h-4 w-4 text-accent" />
                {chip.label}
              </button>
            ))}
          </div>

          <button className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-primary text-primary-foreground font-bold glow-primary hover:scale-105 transition-transform">
            <Sparkles className="h-5 w-5" />
            Get Started Free
            <ArrowRight className="h-4 w-4" />
          </button>
          <p className="mt-4 text-xs text-muted-foreground">7-day free trial · Cancel anytime · 1,200+ professionals</p>

          {/* Social proof bar */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex -space-x-2">
              {["S", "M", "J", "P", "A"].map((initial, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-background bg-gradient-primary flex items-center justify-center text-primary-foreground text-xs font-bold"
                >
                  {initial}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-accent text-accent" />
              ))}
              <span className="text-sm text-muted-foreground ml-1">Loved by 1,205 creators</span>
            </div>
          </div>
        </div>
      </section>

      {/* ────────── Stats Bar ────────── */}
      <section className="py-10 border-y border-border/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
            {stats.map((s) => (
              <div key={s.value}>
                <p className="font-heading font-black text-3xl md:text-4xl text-gradient mb-1">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────── Interactive Post Generator ────────── */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-5xl mb-4">
              Free LinkedIn <span className="text-gradient">Post Generator</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Streamline your LinkedIn content creation. Write, format, preview, and publish — all in one place.
            </p>
          </motion.div>
          <PostPreview />
        </div>
      </section>

      {/* ────────── Core Features (tabbed) ────────── */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-card opacity-20" />
        <div className="relative container mx-auto px-4 max-w-6xl">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-5xl mb-4">
              AI that writes like you — <span className="text-gradient">because it learns from you.</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Most tools start with a prompt. BrandPilot starts with who you are.</p>
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
              Idea to published post. <span className="text-gradient">Three steps.</span>
            </h2>
            <p className="text-muted-foreground">Start with a topic, a voice note, or a link — BrandPilot handles the rest.</p>
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

      {/* ────────── Create / Discover / Think Workflow ────────── */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-card opacity-20" />
        <div className="relative container mx-auto px-4 max-w-5xl">
          {/* Section tabs */}
          <div className="flex justify-center gap-2 mb-12">
            {workflowSections.map((ws, i) => (
              <button
                key={ws.label}
                onClick={() => { setActiveWorkflowSection(i); setActiveWorkflowTab(0); }}
                className={`px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                  activeWorkflowSection === i
                    ? "bg-gradient-primary text-primary-foreground glow-primary"
                    : "glass text-muted-foreground hover:text-foreground"
                }`}
              >
                {ws.label}
              </button>
            ))}
          </div>

          <motion.div
            key={activeWorkflowSection}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="text-center mb-10">
              <h2 className="font-heading font-bold text-2xl md:text-4xl mb-3">{workflowSections[activeWorkflowSection].heading}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">{workflowSections[activeWorkflowSection].subheading}</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {workflowSections[activeWorkflowSection].tabs.map((tab, i) => (
                <button
                  key={tab.title}
                  onClick={() => setActiveWorkflowTab(i)}
                  className={`text-left p-5 rounded-xl transition-all ${
                    activeWorkflowTab === i
                      ? "glass border-primary/50 bg-primary/5"
                      : "glass hover:border-primary/30"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-colors ${
                    activeWorkflowTab === i ? "bg-primary/20" : "bg-muted/30"
                  }`}>
                    <tab.icon className={`h-5 w-5 ${activeWorkflowTab === i ? "text-accent" : "text-muted-foreground"}`} />
                  </div>
                  <h4 className="font-heading font-bold text-sm mb-1">{tab.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{tab.desc}</p>
                </button>
              ))}
            </div>

            {/* Visual placeholder for active tab */}
            <div className="mt-8 glass rounded-2xl p-2 overflow-hidden">
              <img
                src={activeWorkflowSection === 1 ? linkedinPostcastMock : linkedinDashboardMock}
                alt={workflowSections[activeWorkflowSection].tabs[activeWorkflowTab]?.title}
                className="w-full rounded-xl object-cover max-h-[400px]"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ────────── Before / After ────────── */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
            <h2 className="font-heading font-bold text-3xl md:text-5xl mb-4">
              Your new secret weapon for <span className="text-gradient">building a personal brand</span>
            </h2>
            <p className="text-muted-foreground">Stop publishing posts that don't work. Trade guesswork for a content workflow created by top creators.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Before */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="glass rounded-2xl p-8 border-destructive/20"
            >
              <h3 className="font-heading font-bold text-xl mb-2">{beforeAfter.before.title}</h3>
              <p className="text-sm text-muted-foreground mb-6">{beforeAfter.before.subtitle}</p>
              <ul className="space-y-3">
                {beforeAfter.before.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <XIcon className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* After */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="glass rounded-2xl p-8 border-accent/30 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-primary opacity-5" />
              <div className="relative z-10">
                <h3 className="font-heading font-bold text-xl mb-2">{beforeAfter.after.title}</h3>
                <p className="text-sm text-muted-foreground mb-6">{beforeAfter.after.subtitle}</p>
                <ul className="space-y-3">
                  {beforeAfter.after.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ────────── Toolkit Grid ────────── */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-card opacity-20" />
        <div className="relative container mx-auto px-4 max-w-6xl">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
            <h2 className="font-heading font-bold text-3xl md:text-5xl mb-4">
              Everything you need to <span className="text-gradient">post consistently</span>
            </h2>
            <p className="text-muted-foreground">The tools that take you from "I should post more" to actually doing it.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {toolkitItems.map((t, i) => (
              <motion.div
                key={t.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
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

      {/* ────────── Personas ────────── */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
              Built for <span className="text-gradient">Every Professional</span>
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {personas.map((p) => (
              <div key={p.title} className="glass rounded-2xl p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <p.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-heading font-bold text-sm mb-2">{p.title}</h3>
                <p className="text-xs text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────── Testimonials ────────── */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-card opacity-20" />
        <div className="relative container mx-auto px-4 max-w-6xl">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
            <h2 className="font-heading font-bold text-3xl md:text-5xl mb-4">
              They grow with <span className="text-gradient">BrandPilot</span>
            </h2>
            <p className="text-muted-foreground">Hear from professionals who stopped struggling with LinkedIn content.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass rounded-2xl p-7 relative"
              >
                <Quote className="h-8 w-8 text-accent/15 absolute top-5 right-5" />
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-3.5 w-3.5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-5 relative z-10">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm shrink-0">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-heading font-bold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
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
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
          </motion.div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="glass rounded-xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between px-6 py-5 text-left">
                  <span className="font-heading font-semibold text-sm pr-4">{faq.q}</span>
                  <ChevronDown className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed overflow-hidden"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────── CTA ────────── */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <div className="glass rounded-3xl p-12 md:p-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-primary opacity-10" />
            <div className="relative z-10">
              <h2 className="font-heading font-black text-3xl md:text-5xl mb-4">
                Your next LinkedIn post is <span className="text-gradient">5 minutes away.</span>
              </h2>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                Start creating content that sounds like you — not a chatbot. Free for 7 days.
              </p>
              <button className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-primary text-primary-foreground font-bold glow-primary hover:scale-105 transition-transform">
                <Sparkles className="h-5 w-5" />
                Get Started Free
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LinkedInAssist;
