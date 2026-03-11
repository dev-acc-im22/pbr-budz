const steps = [
  {
    step: "01",
    title: "Connect Your Platforms",
    description: "Link your YouTube, X, LinkedIn, and Instagram accounts in one click. We securely sync your existing content and metrics.",
  },
  {
    step: "02",
    title: "Define Your Brand Voice",
    description: "Answer a few questions and let AI analyze your best-performing content to create a unique brand voice profile.",
  },
  {
    step: "03",
    title: "Generate & Optimize",
    description: "Use platform-specific AI tools to create content, scripts, captions, and strategies tailored to each audience.",
  },
  {
    step: "04",
    title: "Grow & Analyze",
    description: "Track your growth with real-time analytics. AI continuously learns from your results to improve recommendations.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-5xl mb-4">
            How <span className="bg-gradient-to-r from-violet-600 via-purple-500 to-fuchsia-500 dark:from-violet-400 dark:via-purple-400 dark:to-fuchsia-400 bg-clip-text text-transparent">It Works</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Go from zero to brand authority in four simple steps.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {steps.map((s, i) => (
            <div
              key={s.step}
              className="relative text-center animate-fade-in-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-primary text-primary-foreground font-heading font-black text-xl mb-4 glow-primary">
                {s.step}
              </div>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-border" />
              )}
              <h3 className="font-heading font-bold text-base mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
