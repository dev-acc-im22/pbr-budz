import { Link } from "react-router-dom";
import { Youtube, Twitter, Linkedin, Instagram, ArrowRight } from "lucide-react";

const platforms = [
  {
    name: "YouTube Assist",
    path: "/youtube-assist",
    icon: Youtube,
    description: "Generate SEO-optimized titles, descriptions, tags, thumbnails ideas, and content scripts. Analyze channel performance and get growth strategies.",
    features: ["Title & Tag Generator", "Script Writer", "Thumbnail Ideas", "Analytics Dashboard"],
  },
  {
    name: "xAssist",
    path: "/x-assist",
    icon: Twitter,
    description: "Craft viral tweets, build threads, schedule posts, and analyze engagement. Grow your X presence with AI-driven content strategies.",
    features: ["Tweet Composer", "Thread Builder", "Trend Analyzer", "Engagement Optimizer"],
  },
  {
    name: "LinkedIn Assist",
    path: "/linkedin-assist",
    icon: Linkedin,
    description: "Write compelling posts, optimize your profile, generate thought-leadership content, and expand your professional network.",
    features: ["Post Generator", "Profile Optimizer", "Article Writer", "Network Insights"],
  },
  {
    name: "Instagram Assist",
    path: "/instagram-assist",
    icon: Instagram,
    description: "Create captions, plan your grid, find trending hashtags, and generate Reels scripts. Build a cohesive visual brand with AI.",
    features: ["Caption Writer", "Hashtag Finder", "Reels Scripts", "Grid Planner"],
  },
];

const PlatformCards = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-5xl mb-4">
            One Tool. <span className="bg-gradient-to-r from-violet-600 via-purple-500 to-fuchsia-500 dark:from-violet-400 dark:via-purple-400 dark:to-fuchsia-400 bg-clip-text text-transparent">Every Platform.</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Dedicated AI assistants tailored for each social media platform's unique algorithm and audience.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {platforms.map((p, i) => (
            <Link
              key={p.path}
              to={p.path}
              className="group glass rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 hover:glow-primary flex flex-col animate-fade-in-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <p.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-heading font-bold text-lg mb-2 text-foreground">{p.name}</h3>
              <p className="text-sm text-muted-foreground mb-4 flex-1">{p.description}</p>
              <ul className="space-y-1.5 mb-5">
                {p.features.map((f) => (
                  <li key={f} className="text-xs text-secondary-foreground flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-1 text-sm font-semibold text-accent group-hover:gap-2 transition-all">
                Explore <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformCards;
