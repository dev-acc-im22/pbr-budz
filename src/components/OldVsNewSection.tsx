import { XCircle, CheckCircle2 } from "lucide-react";

const oldWay = [
  "Hours of manual research per post",
  "Guessing what content will perform",
  "Generic AI that doesn't know your voice",
  "Separate tools for each platform",
  "No competitor insights",
  "Burnout from content creation",
];

const newWay = [
  "AI generates platform-ready content in seconds",
  "Data-driven content strategies that work",
  "AI trained on YOUR brand voice",
  "One unified tool for all platforms",
  "Real-time competitor analysis",
  "Consistent output without the grind",
];

const OldVsNewSection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-5xl mb-4 text-foreground">
            The <span className="bg-gradient-to-r from-indigo-600 to-indigo-950 bg-clip-text text-transparent">Better Way</span> to Build Your Brand
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Old Way */}
          <div className="glass rounded-2xl p-8 border-destructive/20">
            <div className="flex items-center gap-2 mb-6">
              <XCircle className="h-6 w-6 text-destructive" />
              <h3 className="font-heading font-bold text-lg text-foreground">The Old Way</h3>
            </div>
            <ul className="space-y-4">
              {oldWay.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <XCircle className="h-4 w-4 text-destructive/60 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-4 border-t border-border/50 text-center">
              <span className="font-heading font-bold text-destructive text-sm">4-5 hours per piece of content</span>
            </div>
          </div>

          {/* New Way */}
          <div className="glass rounded-2xl p-8 border-indigo-600/30 shadow-lg shadow-indigo-500/20">
            <div className="flex items-center gap-2 mb-6">
              <CheckCircle2 className="h-6 w-6 text-indigo-600" />
              <h3 className="font-heading font-bold text-lg text-foreground">With BrandPilot AI</h3>
            </div>
            <ul className="space-y-4">
              {newWay.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-foreground">
                  <CheckCircle2 className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-4 border-t border-border/50 text-center">
              <span className="font-heading font-bold text-indigo-600 text-sm">Under 5 minutes per piece of content</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OldVsNewSection;
