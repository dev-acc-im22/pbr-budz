import { Check, X } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    description: "Get started with basic AI-powered branding tools.",
    features: [
      { text: "1 platform connected", included: true },
      { text: "10 AI generations/month", included: true },
      { text: "Basic analytics", included: true },
      { text: "Community support", included: true },
      { text: "Brand voice training", included: false },
      { text: "Competitor analysis", included: false },
      { text: "Priority support", included: false },
    ],
    cta: "Get Started Free",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "For serious creators who want to grow fast.",
    features: [
      { text: "All 4 platforms", included: true },
      { text: "Unlimited AI generations", included: true },
      { text: "Advanced analytics", included: true },
      { text: "Brand voice training", included: true },
      { text: "Competitor analysis", included: true },
      { text: "Smart scheduling", included: true },
      { text: "Priority support", included: false },
    ],
    cta: "Start Pro Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "/month",
    description: "For teams and agencies managing multiple brands.",
    features: [
      { text: "All 4 platforms", included: true },
      { text: "Unlimited AI generations", included: true },
      { text: "White-label reports", included: true },
      { text: "Team collaboration", included: true },
      { text: "API access", included: true },
      { text: "Custom AI training", included: true },
      { text: "Dedicated account manager", included: true },
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

const PricingSection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-5xl mb-4">
            Simple, <span className="bg-gradient-to-r from-indigo-600 to-indigo-950 bg-clip-text text-transparent">Transparent</span> Pricing
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Start free. Upgrade when you're ready to dominate.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 flex flex-col ${
                plan.highlighted
                  ? "glass border-primary/50 glow-primary relative"
                  : "glass"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-primary text-primary-foreground text-xs font-bold">
                  Most Popular
                </div>
              )}
              <h3 className="font-heading font-bold text-xl mb-1">{plan.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
              <div className="mb-6">
                <span className="font-heading font-black text-4xl">{plan.price}</span>
                <span className="text-muted-foreground text-sm">{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f.text} className="flex items-center gap-3 text-sm">
                    {f.included ? (
                      <Check className="h-4 w-4 text-accent shrink-0" />
                    ) : (
                      <X className="h-4 w-4 text-muted-foreground/40 shrink-0" />
                    )}
                    <span className={f.included ? "text-foreground" : "text-muted-foreground/60"}>
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                to="/login"
                className={`w-full py-3 rounded-xl font-bold text-sm transition-all text-center block ${
                  plan.highlighted
                    ? "bg-gradient-primary text-primary-foreground glow-primary hover:scale-105"
                    : "glass text-foreground hover:bg-secondary/80"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
