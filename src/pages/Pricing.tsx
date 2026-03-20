import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle2, Sparkles, Zap, Target, Youtube, Twitter, Linkedin, Instagram, Calendar, FileText, Mic, Image as ImageIcon, Repeat, MessageSquare, Layers } from "lucide-react";
import { Link } from "react-router-dom";

const Pricing = () => {
  const features = [
    { name: "YouTube Assist", icon: Youtube },
    { name: "X (Twitter) Assist", icon: Twitter },
    { name: "LinkedIn Assist", icon: Linkedin },
    { name: "Instagram Assist", icon: Instagram },
    { name: "Scheduling Calendar", icon: Calendar },
    { name: "Content Management", icon: FileText },
    { name: "Voice-to-Post", icon: Mic },
  ];

  const appHighlights = [
    {
      name: "LinkedIn Assist",
      description: "Generate professional posts, articles, and engage with your network effectively.",
      icon: Linkedin,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      name: "Instagram Assist",
      description: "Create engaging captions, find trending hashtags, and plan your visual grid.",
      icon: Instagram,
      color: "text-pink-600 dark:text-pink-400",
      bgColor: "bg-pink-100 dark:bg-pink-900/30",
    },
    {
      name: "X (Twitter) Assist",
      description: "Craft viral threads, schedule tweets, and analyze your audience engagement.",
      icon: Twitter,
      color: "text-sky-500 dark:text-sky-400",
      bgColor: "bg-sky-100 dark:bg-sky-900/30",
    },
    {
      name: "YouTube Assist",
      description: "Generate SEO titles, scripts, chapters, and community posts for your channel.",
      icon: Youtube,
      color: "text-red-600 dark:text-red-400",
      bgColor: "bg-red-100 dark:bg-red-900/30",
    },
    {
      name: "Pinterest Assist",
      description: "Design pin descriptions, find keywords, and convert blogs to pins easily.",
      icon: ImageIcon,
      color: "text-red-500 dark:text-red-400",
      bgColor: "bg-red-100 dark:bg-red-900/30",
    },
    {
      name: "Content Repurposing",
      description: "Turn one piece of content into multiple formats across all your social platforms.",
      icon: Repeat,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-100 dark:bg-purple-900/30",
    },
    {
      name: "Schedule First Comment",
      description: "Automatically post the first comment on your posts to boost engagement and add links.",
      icon: MessageSquare,
      color: "text-emerald-600 dark:text-emerald-400",
      bgColor: "bg-emerald-100 dark:bg-emerald-900/30",
    },
    {
      name: "Voice to Post",
      description: "Speak your thoughts and let AI format them into perfect social media posts.",
      icon: Mic,
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-100 dark:bg-amber-900/30",
    },
    {
      name: "Carousel Maker",
      description: "Design beautiful, swipeable carousels for Instagram and LinkedIn in minutes.",
      icon: Layers,
      color: "text-teal-600 dark:text-teal-400",
      bgColor: "bg-teal-100 dark:bg-teal-900/30",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />

      <section className="pt-32 pb-20 container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
            Simple, transparent <span className="bg-gradient-to-r from-indigo-600 to-indigo-950 bg-clip-text text-transparent">pricing</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            Everything you need to scale your content across all platforms.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-24">
          {/* Starter Tier */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 flex flex-col shadow-sm">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Starter</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">Perfect for creators just getting started.</p>
            <div className="mb-8">
              <span className="text-5xl font-extrabold text-slate-900 dark:text-white">$0</span>
              <span className="text-slate-500 dark:text-slate-400">/month</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="h-5 w-5 text-indigo-500 shrink-0" />
                10 AI Generations per month
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="h-5 w-5 text-indigo-500 shrink-0" />
                Basic Content Tools
              </li>
            </ul>
            <Link to="/login" className="w-full py-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-center">
              Get Started Free
            </Link>
          </div>

          {/* Pro Tier */}
          <div className="bg-gradient-to-br from-indigo-600 to-indigo-950 rounded-3xl p-8 flex flex-col shadow-xl shadow-indigo-200 dark:shadow-none relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Most Popular</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Pro Creator</h3>
            <p className="text-indigo-100 text-sm mb-6">Scale your content like a pro.</p>
            <div className="mb-8">
              <span className="text-5xl font-extrabold text-white">$29</span>
              <span className="text-indigo-200">/month</span>
            </div>
            <div className="mb-8 flex-1">
              <p className="text-white font-semibold mb-4 flex items-center gap-2"><Zap className="h-4 w-4" /> Everything in Starter, plus:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {features.map((feature) => (
                  <div key={feature.name} className="flex items-center gap-2 text-indigo-50 text-sm bg-white/10 p-2 rounded-lg">
                    <feature.icon className="h-4 w-4 text-indigo-200" />
                    {feature.name}
                  </div>
                ))}
              </div>
            </div>
            <button className="w-full py-4 rounded-xl bg-white text-indigo-600 font-bold hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2">
              <Sparkles className="h-4 w-4" />
              Upgrade to Pro
            </button>
          </div>
        </div>

        {/* Feature Highlights Section */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Everything you get with Pro</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Unlock our entire suite of AI-powered tools designed to 10x your content creation workflow across every major platform.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {appHighlights.map((app) => (
              <div key={app.name} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${app.bgColor}`}>
                  <app.icon className={`h-6 w-6 ${app.color}`} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{app.name}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {app.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;
