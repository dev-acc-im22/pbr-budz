import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import YouTubeAssist from "./pages/YouTubeAssist";
import XAssist from "./pages/XAssist";
import LinkedInAssist from "./pages/LinkedInAssist";
import InstagramAssist from "./pages/InstagramAssist";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/youtube-assist" element={<YouTubeAssist />} />
          <Route path="/x-assist" element={<XAssist />} />
          <Route path="/linkedin-assist" element={<LinkedInAssist />} />
          <Route path="/instagram-assist" element={<InstagramAssist />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
