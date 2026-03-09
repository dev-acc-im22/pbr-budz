import { useEffect, useRef } from "react";

const logos = [
  "Forbes", "TechCrunch", "Product Hunt", "Y Combinator", "The Verge",
  "Mashable", "Wired", "Fast Company",
];

const LogoMarquee = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let animId: number;
    let pos = 0;
    const speed = 0.5;

    const animate = () => {
      pos -= speed;
      if (pos <= -el.scrollWidth / 2) pos = 0;
      el.style.transform = `translateX(${pos}px)`;
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <section className="py-12 overflow-hidden border-y border-border/30">
      <p className="text-center text-xs text-muted-foreground uppercase tracking-widest mb-6 font-heading font-semibold">
        As Featured In
      </p>
      <div className="relative">
        <div ref={scrollRef} className="flex gap-16 whitespace-nowrap">
          {[...logos, ...logos].map((name, i) => (
            <span
              key={i}
              className="text-xl font-heading font-bold text-muted-foreground/30 select-none"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoMarquee;
