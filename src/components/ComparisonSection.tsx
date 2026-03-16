import { Check, X as XIcon } from "lucide-react";

const features = [
  "Platform-specific AI",
  "Brand voice learning",
  "Competitor analysis",
  "Smart scheduling",
  "Multi-platform support",
  "Trend detection",
  "Content analytics",
  "Dedicated assistants",
];

const tools = [
  {
    name: "BrandPilot AI",
    highlight: true,
    supported: [true, true, true, true, true, true, true, true],
  },
  {
    name: "ChatGPT",
    highlight: false,
    supported: [false, false, false, false, false, false, false, false],
  },
  {
    name: "Hootsuite",
    highlight: false,
    supported: [false, false, false, true, true, false, true, false],
  },
  {
    name: "Buffer",
    highlight: false,
    supported: [false, false, false, true, true, false, true, false],
  },
];

const ComparisonSection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-5xl mb-4">
            Why <span className="bg-gradient-to-r from-indigo-600 to-indigo-950 bg-clip-text text-transparent">BrandPilot AI</span>?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            See how we stack up against generic AI tools and social media managers.
          </p>
        </div>

        <div className="max-w-4xl mx-auto overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left py-4 px-4 font-heading font-semibold text-muted-foreground">Feature</th>
                {tools.map((t) => (
                  <th
                    key={t.name}
                    className={`py-4 px-4 font-heading font-bold text-center ${
                      t.highlight ? "text-accent" : "text-muted-foreground"
                    }`}
                  >
                    {t.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feat, i) => (
                <tr key={feat} className="border-t border-border/50">
                  <td className="py-4 px-4 text-foreground">{feat}</td>
                  {tools.map((t) => (
                    <td key={t.name} className="py-4 px-4 text-center">
                      {t.supported[i] ? (
                        <Check className={`h-5 w-5 mx-auto ${t.highlight ? "text-accent" : "text-foreground"}`} />
                      ) : (
                        <XIcon className="h-5 w-5 mx-auto text-muted-foreground/30" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
