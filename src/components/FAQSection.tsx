import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "What platforms does BrandPilot AI support?",
    a: "BrandPilot AI currently supports YouTube, X (formerly Twitter), LinkedIn, and Instagram. Each platform has a dedicated AI assistant trained on that platform's best practices, algorithm, and content formats.",
  },
  {
    q: "How does the AI learn my brand voice?",
    a: "When you connect your accounts, our AI analyzes your existing content, writing style, tone, and audience engagement patterns. It creates a unique brand voice profile that ensures every piece of AI-generated content sounds authentically like you.",
  },
  {
    q: "Is my data safe and private?",
    a: "Absolutely. We use enterprise-grade encryption and never share your data with third parties. Your content and analytics data are used solely to improve your personal recommendations and are never used to train models for other users.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes, you can cancel your subscription at any time. You'll keep access to all features through the end of your current billing period. We also offer a 14-day money-back guarantee on all paid plans.",
  },
  {
    q: "How is this different from using ChatGPT or Claude?",
    a: "Unlike generic AI tools, BrandPilot AI is purpose-built for personal branding. It understands platform-specific algorithms, content formats, and engagement patterns. It learns YOUR voice and provides analytics, scheduling, and competitor analysis — things generic AI simply can't do.",
  },
  {
    q: "Will this work if I'm just starting out?",
    a: "Yes! BrandPilot AI is designed for creators at every stage. Whether you have 10 followers or 10 million, our AI adapts to your goals and helps you create content that resonates with your target audience.",
  },
  {
    q: "Do I need technical skills to use BrandPilot AI?",
    a: "Not at all. BrandPilot AI is designed to be intuitive and beginner-friendly. Just connect your accounts, tell us your goals, and the AI does the heavy lifting. Most users create their first piece of content within 5 minutes.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-5xl mb-4">
            Frequently Asked <span className="bg-gradient-to-r from-violet-600 via-purple-500 to-fuchsia-500 dark:from-violet-400 dark:via-purple-400 dark:to-fuchsia-400 bg-clip-text text-transparent">Questions</span>
          </h2>
          <p className="text-muted-foreground">
            Everything you need to know about BrandPilot AI.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="glass rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left"
              >
                <span className="font-heading font-semibold text-sm pr-4">{faq.q}</span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === i && (
                <div className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
