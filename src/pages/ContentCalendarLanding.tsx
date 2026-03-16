import { Link } from "react-router-dom";
import { Calendar, Zap, RefreshCw, BarChart3, LayoutGrid } from "lucide-react";
import Navbar from "@/components/Navbar";

const features = [
  {
    icon: Zap,
    title: "AI-Powered Scheduling",
    description: "Let our AI suggest the optimal times to post for maximum engagement across all your platforms.",
  },
  {
    icon: RefreshCw,
    title: "Cross-Platform Sync",
    description: "Manage your LinkedIn, Instagram, X, and YouTube content from a single, unified calendar view.",
  },
  {
    icon: LayoutGrid,
    title: "Drag-and-Drop Editor",
    description: "Easily reschedule your content with an intuitive drag-and-drop interface.",
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    description: "Track your post performance directly from the calendar to refine your strategy.",
  },
];

const ContentCalendarLanding = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-5xl text-center">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 text-gradient-brand">
            Master Your Content Strategy
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Plan, schedule, and analyze your social media content effortlessly with BrandPilot AI's intelligent content calendar.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 via-purple-500 to-fuchsia-500 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-transform hover:scale-105"
          >
            Get Started Free
          </Link>
        </div>
      </div>

      <div className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-heading font-bold text-center mb-12">Everything You Need to Succeed</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-6 rounded-2xl bg-background border border-border shadow-sm hover:shadow-md transition-shadow">
                <feature.icon className="h-10 w-10 text-purple-500 mb-4" />
                <h3 className="font-heading font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCalendarLanding;
