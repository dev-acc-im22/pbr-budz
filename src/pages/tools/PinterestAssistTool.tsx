import { useState } from "react";
import { Sparkles, Download, Image as ImageIcon, Link as LinkIcon, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/components/ui/use-toast";
import { generatePinterestPinFromUrl } from "@/services/geminiService";

const PinterestLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387-.116-.957-.22-2.42.044-3.461l1.21-5.157s-.308-.617-.308-1.528c0-1.43.83-2.497 1.864-2.497.878 0 1.302.66 1.302 1.452 0 .886-.564 2.212-.855 3.438-.243 1.026.516 1.862 1.53 1.862 1.836 0 3.247-1.935 3.247-4.726 0-2.468-1.775-4.195-4.31-4.195-2.936 0-4.656 2.202-4.656 4.475 0 .885.34 1.836.765 2.35.084.102.096.193.07.295-.078.322-.255 1.026-.29 1.17-.045.18-.15.215-.345.13-1.285-.56-2.09-2.31-2.09-3.725 0-3.025 2.195-5.805 6.325-5.805 3.32 0 5.905 2.365 5.905 5.515 0 3.29-2.075 5.935-4.955 5.935-.97 0-1.885-.505-2.195-1.105l-.6 2.285c-.215.825-.79 1.865-1.175 2.495 1.015.31 2.085.48 3.195.48 6.627 0 12-5.373 12-12S18.627 0 12 0z" />
  </svg>
);

const dimensions = [
  { name: "Standard Pin (1000x1500)", width: 1000, height: 1500, aspectRatio: "3:4" },
  { name: "Square Pin (1000x1000)", width: 1000, height: 1000, aspectRatio: "1:1" },
  { name: "Story Pin (1080x1920)", width: 1080, height: 1920, aspectRatio: "9:16" },
];

const PinterestAssistTool = () => {
  const { toast } = useToast();
  const [url, setUrl] = useState("");
  const [selectedDim, setSelectedDim] = useState(dimensions[0]);
  const [generatedPin, setGeneratedPin] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!url) return;
    setIsGenerating(true);
    try {
      const imageUrl = await generatePinterestPinFromUrl(url, selectedDim.aspectRatio);
      setGeneratedPin(imageUrl);
      toast({ title: "Pin Generated!", description: "Your Pinterest pin is ready." });
    } catch (error) {
      console.error("Error generating pin:", error);
      toast({ title: "Error", description: "Failed to generate pin. Please check the URL and try again.", variant: "destructive" });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        {/* Enclose this entire section in a box with rounded corners */}
        <div className="max-w-5xl mx-auto bg-card border border-border rounded-[2rem] shadow-sm overflow-hidden">
          
          {/* Add the word "Pinterest Assist" as a heading with a background ice blue frosted glass strip */}
          <div className="bg-sky-100/50 backdrop-blur-md py-6 px-8 flex items-center justify-center gap-3 border-b border-sky-200/50">
            <PinterestLogo className="h-10 w-10 text-[#E60023]" />
            <h1 className="text-4xl font-heading font-bold text-foreground">Pinterest Assist</h1>
          </div>
          
          <div className="p-8 md:p-12">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Input Panel - Elevated */}
              <div className="flex flex-col rounded-3xl bg-background border-2 border-sky-200/60 shadow-2xl relative z-10 transform md:-translate-y-4 transition-transform overflow-hidden">
                {/* Make the "Blog to Pin Generator" an ice blue frosted glass strip with the heading in white text */}
                <div className="bg-sky-500/70 backdrop-blur-md p-6 text-center">
                  <h2 className="text-2xl font-heading font-bold text-white">Blog to Pin Generator</h2>
                </div>
                
                <div className="p-8 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">Blog Post URL</label>
                    <div className="relative">
                      <LinkIcon className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <input
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://yourblog.com/post"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-background border border-border focus:ring-2 focus:ring-[#E60023] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">Pin Dimensions</label>
                    <select
                      value={selectedDim.name}
                      onChange={(e) => setSelectedDim(dimensions.find(d => d.name === e.target.value)!)}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:ring-2 focus:ring-[#E60023] outline-none"
                    >
                      {dimensions.map(dim => (
                        <option key={dim.name} value={dim.name}>{dim.name}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={handleGenerate}
                    disabled={!url || isGenerating}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-[#E60023] text-white font-bold hover:bg-[#ad081b] transition-colors disabled:opacity-50"
                  >
                    {isGenerating ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Sparkles className="h-5 w-5" />
                    )}
                    {isGenerating ? "Generating..." : "Generate Pin"}
                  </button>
                </div>
              </div>

              {/* Preview Panel */}
              <div className="flex flex-col rounded-3xl bg-card border border-border overflow-hidden opacity-90">
                <div className="p-6 text-center border-b border-border">
                  <h2 className="text-2xl font-heading font-bold text-foreground">Preview</h2>
                </div>
                <div className="p-8 flex flex-col items-center justify-center flex-1">
                  {generatedPin ? (
                    <div className="space-y-4 w-full flex flex-col items-center">
                      <img src={generatedPin} alt="Generated Pin" className="rounded-2xl shadow-xl max-h-[500px] object-contain" referrerPolicy="no-referrer" />
                      <a
                        href={generatedPin}
                        download="pinterest-pin.jpg"
                        className="flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background font-semibold hover:bg-foreground/90 transition-colors"
                      >
                        <Download className="h-5 w-5" />
                        Download Pin
                      </a>
                    </div>
                  ) : (
                    <div className="text-center text-muted-foreground py-20">
                      <ImageIcon className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <p>Your generated pin will appear here.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PinterestAssistTool;
