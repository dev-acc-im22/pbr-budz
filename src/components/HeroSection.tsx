import { Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-accent font-medium mb-8 animate-fade-in-up">
          <Sparkles className="h-4 w-4" />
          AI-Powered Personal Branding
        </div>

        <h1 className="font-heading font-extrabold text-4xl sm:text-5xl md:text-7xl leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          Build Your Brand<br />
          <span className="text-gradient-brand">Across Every Platform</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          Generate optimized content, analyze your audience, and grow your personal brand on YouTube, X, LinkedIn, and Instagram — all powered by AI.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          <Link
            to="/youtube-assist"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-indigo-600 text-white font-bold text-base hover:scale-105 transition-transform"
          >
            Start with YouTube
            <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            to="/x-assist"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl glass text-foreground font-bold text-base hover:bg-secondary/80 transition-colors"
          >
            Try xAssist
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mt-16 max-w-lg mx-auto animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          {[
            { value: "10K+", label: "Creators" },
            { value: "4", label: "Platforms" },
            { value: "50M+", label: "Posts Optimized" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-heading font-extrabold text-2xl md:text-3xl text-gradient-brand">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
