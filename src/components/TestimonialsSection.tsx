const testimonials = [
  {
    name: "Sarah Chen",
    role: "YouTube Creator • 500K Subs",
    quote: "BrandPilot's YouTube Assist doubled my click-through rate in 3 weeks. The AI-generated titles and descriptions are insanely good.",
  },
  {
    name: "Marcus Williams",
    role: "Tech Influencer on X",
    quote: "xAssist helped me go from 2K to 50K followers in 4 months. The thread builder and trend analyzer are game changers.",
  },
  {
    name: "Priya Sharma",
    role: "LinkedIn Top Voice",
    quote: "My LinkedIn engagement went up 300% using the post generator. It captures my authentic voice while making every word count.",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-card opacity-50" />
      <div className="relative container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-5xl mb-4">
            Loved by <span className="bg-gradient-to-r from-indigo-600 to-indigo-950 bg-clip-text text-transparent">Creators</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            See how creators and professionals are growing their personal brands with AI.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="glass rounded-2xl p-6 animate-fade-in-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <p className="text-sm text-foreground leading-relaxed mb-6 italic">"{t.quote}"</p>
              <div>
                <div className="font-heading font-bold text-sm">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
