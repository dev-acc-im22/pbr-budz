import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="relative rounded-3xl overflow-hidden glass p-12 md:p-20 text-center max-w-4xl mx-auto">
          <div className="absolute inset-0 bg-gradient-primary opacity-10" />
          <div className="relative z-10">
            <h2 className="font-heading font-black text-3xl md:text-5xl mb-4 text-foreground">
              Ready to Build Your <span className="text-gradient-brand">Brand Empire?</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-8">
              Join thousands of creators using AI to dominate every social platform. Start free — no credit card required.
            </p>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-indigo-600 text-white font-bold text-base hover:scale-105 transition-transform"
            >
              <Sparkles className="h-5 w-5" />
              Get Started Free
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
