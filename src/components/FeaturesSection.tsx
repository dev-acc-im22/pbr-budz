import { Brain, Zap, BarChart3, PenTool, Clock, Shield } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Content Generation",
    description: "Generate platform-specific content that resonates with your audience using advanced language models trained on viral content patterns.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Insights",
    description: "Track engagement metrics, audience growth, and content performance across all platforms in a unified dashboard.",
  },
  {
    icon: PenTool,
    title: "Brand Voice Consistency",
    description: "Define your unique brand voice once and let AI maintain it across every post, tweet, and video script you create.",
  },
  {
    icon: Zap,
    title: "Trend Detection",
    description: "Stay ahead of the curve with real-time trend analysis. Get notified about emerging topics in your niche before they go mainstream.",
  },
  {
    icon: Clock,
    title: "Smart Scheduling",
    description: "AI determines the optimal posting times for each platform based on your audience's online behavior and engagement history.",
  },
  {
    icon: Shield,
    title: "Reputation Monitor",
    description: "Monitor brand mentions, sentiment analysis, and audience feedback. Respond to opportunities and threats in real time.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-card opacity-50" />
      <div className="relative container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-5xl mb-4">
            Everything You Need to <span className="bg-gradient-to-r from-indigo-600 to-indigo-950 bg-clip-text text-transparent">Stand Out</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A complete AI toolkit designed for creators, influencers, and professionals who want to build a powerful personal brand.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="group p-6 rounded-2xl glass hover:border-indigo-600/40 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="w-11 h-11 rounded-lg bg-indigo-600/10 flex items-center justify-center mb-4 group-hover:bg-indigo-600/20 transition-colors">
                <f.icon className="h-5 w-5 text-indigo-600" />
              </div>
              <h3 className="font-heading font-bold text-base mb-2 text-foreground">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
