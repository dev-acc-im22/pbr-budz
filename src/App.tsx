import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import LoginScreen from "@/components/LoginScreen";
import Navbar from "@/components/Navbar";
import Index from "./pages/Index";
import YouTubeAssist from "./pages/YouTubeAssist";
import XAssist from "./pages/XAssist";
import LinkedInAssist from "./pages/LinkedInAssist";
import InstagramAssist from "./pages/InstagramAssist";
import ContentRepurposing from "./pages/tools/ContentRepurposing";
import VoiceToPost from "./pages/tools/VoiceToPost";
import CarouselMaker from "./pages/tools/CarouselMaker";
import ContentManagement from "./pages/tools/ContentManagement";
import SchedulingCalendar from "./pages/tools/SchedulingCalendar";
import ScheduleFirstComment from "./pages/tools/ScheduleFirstComment";
import Pricing from "./pages/Pricing";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isMockMode } = useAuth();
  const location = useLocation();

  if (!isAuthenticated && !isMockMode && location.pathname !== '/login') {
    return (
      <>
        <Navbar />
        <LoginScreen />
      </>
    );
  }

  return <>{children}</>;
};

const App = () => (
  <ThemeProvider defaultTheme="light" storageKey="brandpilot-theme">
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AuthWrapper>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<><Navbar /><LoginScreen /></>} />
                <Route path="/youtube-assist" element={<YouTubeAssist />} />
                <Route path="/x-assist" element={<XAssist />} />
                <Route path="/linkedin-assist" element={<LinkedInAssist />} />
                <Route path="/instagram-assist" element={<InstagramAssist />} />
                <Route path="/tools/content-repurposing" element={<ContentRepurposing />} />
                <Route path="/tools/voice-to-post" element={<VoiceToPost />} />
                <Route path="/tools/carousel-maker" element={<CarouselMaker />} />
                <Route path="/tools/content-management" element={<ContentManagement />} />
                <Route path="/tools/scheduling-calendar" element={<SchedulingCalendar />} />
                <Route path="/tools/schedule-first-comment" element={<ScheduleFirstComment />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AuthWrapper>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </AuthProvider>
  </ThemeProvider>
);

export default App;
