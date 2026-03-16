import { useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, Youtube, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import PinterestAssistTool from "./tools/PinterestAssistTool";

const PinterestAssist = () => {
  const { isAuthenticated, isMockMode } = useAuth();

  if (isAuthenticated || isMockMode) {
    return <PinterestAssistTool />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-28 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-surface opacity-80" />
        
        <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-[#E60023] font-medium mb-8">
            <Sparkles className="h-4 w-4" />
            Pinterest Assist
          </div>
          <h1 className="font-heading font-black text-4xl sm:text-5xl md:text-7xl leading-tight mb-6">
            Turn Blog Posts into <br />
            <span className="text-gradient-brand">Viral Pinterest Pins</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Automatically generate stunning, high-converting Pinterest pins from your blog content. Drive traffic and grow your reach with AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link to="/login" state={{ from: "/pinterest-assist" }} className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#E60023] text-white font-bold shadow-[0_0_30px_-5px_rgba(230,0,35,0.4)] hover:scale-105 transition-transform">
              <Sparkles className="h-5 w-5" />
              Start Creating Today
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PinterestAssist;
