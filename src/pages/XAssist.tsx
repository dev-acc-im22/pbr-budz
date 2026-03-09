import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import {
  Twitter, Sparkles, ArrowRight, PenTool, BarChart3,
  Lightbulb, Repeat, MessageSquare, Target, TrendingUp,
  Search, Clock, Shield, Zap, Brain, Users, CheckCircle2,
  XCircle, Star,
} from "lucide-react";
import xDashboard from "@/assets/x-dashboard-mock.jpg";
import contentStudio from "@/assets/content-studio-mock.jpg";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const aiTools = [
  { icon: Brain, title: "AI Content Coach", desc: "Your personal content coach that knows your entire X post history and tells you exactly what to post." },
  { icon: Target, title: "AI Algorithm Analyzer", desc: "The only AI trained on the X algorithm. Avoid posts that hurt your algo standings and maximize reach." },
  { icon: PenTool, title: "AI Content Composer", desc: "Quickly repurpose your posts into hundreds of pieces of content. Tweets, threads, articles — all in your voice." },
  { icon: MessageSquare, title: "Reply Guy Engine", desc: "Reply faster than competitors to curated lists of influencer accounts. Strategic engagement on autopilot." },
  { icon: Search, title: "AI Account Researcher", desc: "Analyze any X account in seconds. Find out who people engage with and why their content goes viral." },
  { icon: BarChart3, title: "AI Post History Analyzer", desc: "Complete view into your post history. See which topics and hooks put your content on feeds." },
  { icon: Lightbulb, title: "AI Inspiration Engine", desc: "Save other people's posts directly from X and instantly repurpose them using your own voice." },
  { icon: Repeat, title: "AI Brain Dumping", desc: "Write down ANYTHING on your mind and turn it into posts, articles, and video scripts in seconds." },
];

const features = [
  {
    title: "AI Chat Mode — Your Voice. Infinite Firepower.",
    description: "Chat your way to banger tweets. xAssist learns your tone and helps you write like you, not a robot. With built-in web search and content integrations, it's like having your own research assistant and ghostwriter in one.",
    bullets: ["Personalized output matching your unique style", "Built-in web search for live data & trends", "Content-aware writing with article & video context"],
    image: xDashboard,
    reverse: false,
  },
  {
    title: "Advanced Inspiration Engine",
    description: "Never run out of content ideas again. xAssist scans top-performing posts in your niche, so you're always one step ahead of the competition.",
    bullets: ["Discover trends buzzing in your space today", "Break down how top tweets are structured for virality", "Bookmark high-performing posts to remix later"],
    image: contentStudio,
    reverse: true,
  },
  {
    title: "Algorithm Simulator — Win Before You Post",
    description: "Run your tweets through a virtual X battlefield before they go live. xAssist simulates how thousands of users would react, so you can fine-tune for maximum reach.",
    bullets: ["A/B test different tweet versions", "Understand how X's ranking system treats your post", "Forecast likes, comments & repost potential"],
    image: xDashboard,
    reverse: false,
  },
];

const moreFeatures = [
  { icon: Clock, title: "Smart Scheduler", desc: "AI determines optimal posting times based on when your followers are most active." },
  { icon: Repeat, title: "Auto Retweet", desc: "Resurface your top-performing content on autopilot at the right time." },
  { icon: Zap, title: "Auto Plug", desc: "Auto-insert your newsletter, product, or CTA when a tweet crosses engagement thresholds." },
  { icon: Shield, title: "Auto Delete", desc: "Keep your timeline clean by automatically removing low-engagement posts." },
  { icon: TrendingUp, title: "Performance Reports", desc: "Your best tweets ranked and explained with actionable insights." },
  { icon: Users, title: "Follower Growth", desc: "Spot trends in what's driving your follower numbers up." },
];

const personas = [
  { title: "Indie Hackers", desc: "Ship faster, test ideas in public, and grow your product alongside your audience." },
  { title: "Web Creators", desc: "Stay consistent, ride trends, and stand out in a crowded feed with unique content." },
  { title: "Founders", desc: "Build in public, share milestones, and turn followers into early adopters." },
  { title: "Influencers", desc: "Stay relevant without burning out. Repurpose ideas, test formats, and keep your audience engaged." },
];

const faqs = [
  { q: "How does xAssist learn my writing style?", a: "When you connect your X account, our AI analyzes your post history, engagement patterns, and writing voice. It creates a unique profile so every generated tweet sounds authentically like you." },
  { q: "Will using AI get my account flagged?", a: "No. xAssist generates unique, original content in your voice. It doesn't copy others' tweets or use any patterns that trigger X's spam detection." },
  { q: "How is this different from other X tools?", a: "Unlike basic schedulers, xAssist includes an AI trained on the X algorithm, content coaching, account research, trend detection, and reply automation — all in one tool." },
  { q: "Can I try it before paying?", a: "Yes! Start with our free plan that includes 10 AI generations per month. Upgrade when you're ready to go all-in." },
];

const XAssist = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-surface opacity-80" />
        <div className="relative z-10 container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-accent font-medium mb-8">
                <Twitter className="h-4 w-4" />
                For Serious 𝕏 Creators
              </div>
              <h1 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl leading-tight mb-6">
                Grow Faster on 𝕏 with{" "}
                <span className="text-gradient">Hidden Insights</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                Understand your audience, refine your content, and accelerate your 𝕏 growth — all in one place. Powered by AI that learns your voice.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-primary text-primary-foreground font-bold glow-primary hover:scale-105 transition-transform">
                  <Sparkles className="h-5 w-5" />
                  Get Started Free
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
              <div className="flex items-center gap-3 mt-6">
                <div className="flex -space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-secondary border-2 border-background flex items-center justify-center">
                      <Star className="h-3 w-3 text-accent" />
                    </div>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">Loved by 1,400+ creators</span>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden glass border border-border/50 glow-primary">
              <img src={xDashboard} alt="xAssist Dashboard" className="w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* 8 AI Tools Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-5xl mb-4">
              8 Powerful AI Tools to <span className="text-gradient">Supercharge Your Growth</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Everything you need to create engaging content and grow your audience on 𝕏.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {aiTools.map((t) => (
              <div key={t.title} className="glass rounded-2xl p-6 group hover:border-primary/40 transition-all">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <t.icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-heading font-bold text-sm mb-2">{t.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Deep Dives */}
      {features.map((f, i) => (
        <section key={f.title} className="py-20">
          <div className="container mx-auto px-4">
            <div className={`grid md:grid-cols-2 gap-12 items-center`}>
              <div className={f.reverse ? "md:order-2" : ""}>
                <h2 className="font-heading font-bold text-2xl md:text-4xl mb-4">{f.title}</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">{f.description}</p>
                <ul className="space-y-3">
                  {f.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      <span className="text-foreground">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={f.reverse ? "md:order-1" : ""}>
                <div className="rounded-2xl overflow-hidden glass border border-border/50">
                  <img src={f.image} alt={f.title} className="w-full" />
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Algorithm section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-card opacity-30" />
        <div className="relative container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
              Create Content The <span className="text-gradient">𝕏 Algorithm Loves</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              "Know if your content will perform well BEFORE you post",
              "Get rated on 9 different algorithm metrics",
              "Instant feedback on how to improve your posts",
              "Understand why past posts didn't perform well",
              "Get alternate versions that will perform better",
              "An AI that knows your entire post history",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 glass rounded-xl p-4">
                <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* More Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
              Automation + Analytics = <span className="text-gradient">Unstoppable Growth</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {moreFeatures.map((f) => (
              <div key={f.title} className="glass rounded-2xl p-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <f.icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-heading font-bold text-sm mb-2">{f.title}</h3>
                <p className="text-xs text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Serious Creators */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-card opacity-30" />
        <div className="relative container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
              Built for <span className="text-gradient">Serious Creators</span>
            </h2>
            <p className="text-muted-foreground">Whether you're just starting or scaling into a business, xAssist adapts to how you grow.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {personas.map((p) => (
              <div key={p.title} className="glass rounded-2xl p-6 text-center">
                <h3 className="font-heading font-bold text-sm mb-2">{p.title}</h3>
                <p className="text-xs text-muted-foreground">{p.desc}</p>
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
              Frequently Asked <span className="text-gradient">Questions</span>
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
            <div className="absolute inset-0 bg-gradient-primary opacity-10" />
            <div className="relative z-10">
              <h2 className="font-heading font-black text-3xl md:text-5xl mb-4">
                Ready to <span className="text-gradient">Dominate 𝕏</span>?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                Join 1,400+ creators using AI to grow faster, post smarter, and build their brand on 𝕏.
              </p>
              <button className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-primary text-primary-foreground font-bold glow-primary hover:scale-105 transition-transform">
                <Sparkles className="h-5 w-5" />
                Get Started Free
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default XAssist;
