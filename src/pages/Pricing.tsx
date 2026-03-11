import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Pricing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-surface opacity-80" />
        <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
          <h1 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl leading-tight mb-6">
            <span className="bg-gradient-to-r from-violet-600 via-purple-500 to-fuchsia-500 dark:from-violet-400 dark:via-purple-400 dark:to-fuchsia-400 bg-clip-text text-transparent">simple pricing</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-16">
            Everything you need to grow on YouTube, X, LinkedIn, and Instagram. One simple subscription.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
            {/* Free Tier */}
            <div className="glass rounded-3xl p-8 border border-border/50 flex flex-col">
              <h3 className="font-heading font-bold text-2xl mb-2">Starter</h3>
              <p className="text-muted-foreground text-sm mb-6">Perfect for creators just getting started.</p>
              <div className="mb-6">
                <span className="text-5xl font-black">$0</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-start gap-3 text-sm text-foreground">
                  <CheckCircle2 className="h-5 w-5 text-muted-foreground shrink-0" />
                  <span>10 AI Generations per month</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-foreground">
                  <CheckCircle2 className="h-5 w-5 text-muted-foreground shrink-0" />
                  <span>Basic YouTube Script Writing</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-foreground">
                  <CheckCircle2 className="h-5 w-5 text-muted-foreground shrink-0" />
                  <span>Basic X & LinkedIn Post Generator</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-foreground">
                  <CheckCircle2 className="h-5 w-5 text-muted-foreground shrink-0" />
                  <span>Standard Support</span>
                </li>
              </ul>
              <Link to="/login" className="w-full py-3 rounded-xl bg-secondary text-secondary-foreground font-bold hover:bg-secondary/80 transition-colors mt-auto text-center block">
                Get Started Free
              </Link>
            </div>

            {/* Pro Tier */}
            <div className="glass rounded-3xl p-8 border border-primary/30 glow-primary relative flex flex-col">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-primary text-primary-foreground text-xs font-bold rounded-full uppercase tracking-wider">
                Most Popular
              </div>
              <h3 className="font-heading font-bold text-2xl mb-2">Pro Creator</h3>
              <p className="text-muted-foreground text-sm mb-6">Everything you need to dominate all platforms.</p>
              <div className="mb-6">
                <span className="text-5xl font-black text-gradient">$29</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-start gap-3 text-sm text-foreground">
                  <CheckCircle2 className="h-5 w-5 text-accent shrink-0" />
                  <span className="font-medium">Unlimited AI Generations</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-foreground">
                  <CheckCircle2 className="h-5 w-5 text-accent shrink-0" />
                  <span><strong>YouTube Assist:</strong> Outlier Idea Generator, AI Scripting, Competitor Analysis, Thumbnails</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-foreground">
                  <CheckCircle2 className="h-5 w-5 text-accent shrink-0" />
                  <span><strong>X Assist:</strong> Thread Writer, Viral Hook Generator, Analytics</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-foreground">
                  <CheckCircle2 className="h-5 w-5 text-accent shrink-0" />
                  <span><strong>LinkedIn Assist:</strong> Post Generator, Carousel Maker, Scheduling</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-foreground">
                  <CheckCircle2 className="h-5 w-5 text-accent shrink-0" />
                  <span><strong>Instagram Assist:</strong> Reels Scripting, Caption Generator, Hashtag Strategy</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-foreground">
                  <CheckCircle2 className="h-5 w-5 text-accent shrink-0" />
                  <span>Priority 24/7 Support</span>
                </li>
              </ul>
              <button className="w-full py-3 rounded-xl bg-gradient-primary text-primary-foreground font-bold glow-primary hover:scale-105 transition-transform flex items-center justify-center gap-2 mt-auto">
                <Sparkles className="h-4 w-4" />
                Upgrade to Pro
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;
