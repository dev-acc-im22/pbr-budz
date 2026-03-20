import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import LogoMarquee from "@/components/LogoMarquee";
import PlatformCards from "@/components/PlatformCards";
import FeaturesSection from "@/components/FeaturesSection";
import OldVsNewSection from "@/components/OldVsNewSection";
import HowItWorks from "@/components/HowItWorks";
import ComparisonSection from "@/components/ComparisonSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col text-foreground">
      <Navbar />
      
      <div className="bg-[#F0F8FF] dark:bg-background">
        <HeroSection />
      </div>
      
      <div className="bg-white dark:bg-background">
        <LogoMarquee />
      </div>
      
      <div className="bg-[#F8FAFC] dark:bg-background">
        <PlatformCards />
      </div>
      
      <div className="bg-[#F0F8FF] dark:bg-background">
        <FeaturesSection />
      </div>
      
      <div className="bg-white dark:bg-background">
        <OldVsNewSection />
      </div>
      
      <div className="bg-[#F8FAFC] dark:bg-background">
        <HowItWorks />
      </div>
      
      <div className="bg-[#F0F8FF] dark:bg-background">
        <ComparisonSection />
      </div>
      
      <div className="bg-white dark:bg-background">
        <TestimonialsSection />
      </div>
      
      <div className="bg-[#F8FAFC] dark:bg-background">
        <PricingSection />
      </div>
      
      <div className="bg-[#F0F8FF] dark:bg-background">
        <FAQSection />
      </div>
      
      <div className="bg-white dark:bg-background">
        <CTASection />
      </div>
      
      <div className="bg-[#F8FAFC] dark:bg-background">
        <Footer />
      </div>
    </div>
  );
};

export default Index;
