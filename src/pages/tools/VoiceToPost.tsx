import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mic, Brain, Sparkles, X as XIcon, Play, Pause, Square, Settings, History, FileAudio, RefreshCw, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";

const VoiceToPost = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [post, setPost] = useState("");
  const [recordingTime, setRecordingTime] = useState(0);
  const [activeTab, setActiveTab] = useState("record"); // record, library

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else {
      setRecordingTime(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleRecord = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => {
        setTranscript("I was thinking about how many people struggle with consistency on LinkedIn. It's not about having perfect ideas, it's about showing up every day with something valuable. That's the real secret. You don't need a viral hit every time. Just document your journey and share what you learn.");
        setIsRecording(false);
      }, 5000);
    }
  };

  const handleGenerate = () => {
    if (!transcript) return;
    setPost("Consistency > Perfection.\n\nMost people think they need a groundbreaking idea to post on LinkedIn.\n\nThey don't.\n\nThey just need to show up every day with something valuable.\n\nThat's the real secret to building an audience.\n\nStop trying to go viral.\nStart documenting your journey.\n\nWhat's your biggest struggle with consistency?");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-24 max-w-7xl flex gap-8">
        
        {/* Sidebar */}
        <aside className="w-64 hidden lg:flex flex-col gap-6">
          <div className="bg-card border border-border/50 rounded-xl p-4">
            <h3 className="font-bold text-sm mb-4 text-muted-foreground uppercase tracking-wider">Voice Notes</h3>
            <nav className="space-y-2">
              <button 
                onClick={() => setActiveTab("record")}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-sm transition-colors ${activeTab === 'record' ? 'bg-blue-500/10 text-blue-500' : 'text-muted-foreground hover:bg-muted'}`}
              >
                <Mic className="w-4 h-4" /> New Recording
              </button>
              <button 
                onClick={() => setActiveTab("library")}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-sm transition-colors ${activeTab === 'library' ? 'bg-blue-500/10 text-blue-500' : 'text-muted-foreground hover:bg-muted'}`}
              >
                <FileAudio className="w-4 h-4" /> Library
              </button>
            </nav>
          </div>

          <div className="bg-card border border-border/50 rounded-xl p-4 flex-1">
            <h3 className="font-bold text-sm mb-4 text-muted-foreground uppercase tracking-wider">Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Voice Persona</label>
                <select className="w-full bg-background border border-border/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50">
                  <option>My Default Style</option>
                  <option>Thought Leader</option>
                  <option>Storyteller</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Formatting</label>
                <select className="w-full bg-background border border-border/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50">
                  <option>Short Sentences</option>
                  <option>Bullet Points</option>
                  <option>Paragraphs</option>
                </select>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h1 className="font-heading font-bold text-3xl md:text-4xl mb-2 flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/10 text-blue-500 rounded-xl flex items-center justify-center">
                  <Mic className="w-5 h-5" />
                </div>
                Voice to Post
              </h1>
              <p className="text-muted-foreground">Speak your ideas. AI captures your thinking and turns it into a publish-ready LinkedIn post.</p>
            </div>
          </div>

          {activeTab === 'record' ? (
            <div className="grid md:grid-cols-2 gap-6 h-full">
              {/* Recording & Transcript Area */}
              <div className="bg-card border border-border/50 rounded-xl p-6 flex flex-col shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-lg">1. Capture Idea</h3>
                  {isRecording && (
                    <div className="flex items-center gap-2 bg-red-500/10 text-red-500 px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      {formatTime(recordingTime)}
                    </div>
                  )}
                </div>
                
                {/* Visualizer */}
                <div className="border border-border/50 rounded-xl p-8 bg-background/50 flex flex-col items-center justify-center min-h-[200px] mb-6 relative overflow-hidden">
                  {isRecording ? (
                    <div className="flex items-center justify-center h-full gap-1.5 w-full max-w-xs">
                      {[...Array(24)].map((_, i) => (
                        <div 
                          key={i} 
                          className="w-2 bg-blue-500 rounded-full animate-bounce transition-all duration-75" 
                          style={{ 
                            height: `${Math.max(10, Math.random() * 100)}%`, 
                            animationDelay: `${i * 0.05}s`,
                            animationDuration: `${0.5 + Math.random() * 0.5}s`
                          }}
                        ></div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-muted-foreground">
                      <Mic className="w-12 h-12 mb-4 opacity-20" />
                      <p className="text-sm font-medium">Click record to start speaking</p>
                      <p className="text-xs opacity-60 mt-1">Or upload an audio file</p>
                    </div>
                  )}
                </div>

                {/* Controls */}
                <div className="flex justify-center gap-4 mb-8">
                  <button 
                    onClick={handleRecord}
                    className={`w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-lg ${isRecording ? 'bg-red-500 hover:bg-red-600 text-white scale-110' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                  >
                    {isRecording ? <Square className="w-6 h-6 fill-current" /> : <Mic className="w-6 h-6" />}
                  </button>
                </div>

                {/* Transcript */}
                <div className="flex-1 flex flex-col">
                  <h4 className="text-sm font-bold mb-2 flex items-center gap-2">
                    Transcript
                    {transcript && <span className="text-xs font-normal text-muted-foreground bg-muted px-2 py-0.5 rounded-full">Ready</span>}
                  </h4>
                  <div className="flex-1 border border-border/50 rounded-lg p-4 bg-background/50 min-h-[150px]">
                    {transcript ? (
                      <textarea 
                        className="w-full h-full bg-transparent resize-none focus:outline-none text-sm leading-relaxed"
                        defaultValue={transcript}
                        onChange={(e) => setTranscript(e.target.value)}
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground italic opacity-50">Transcript will appear here...</p>
                    )}
                  </div>
                </div>

                <button 
                  onClick={handleGenerate}
                  disabled={!transcript}
                  className="w-full mt-6 bg-primary text-primary-foreground py-3 rounded-lg font-bold hover:bg-primary/90 disabled:opacity-50 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                >
                  <Brain className="w-5 h-5" />
                  Apply Content DNA & Generate Post
                </button>
              </div>

              {/* Generated Post Area */}
              <div className="bg-card border border-border/50 rounded-xl p-6 flex flex-col shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-indigo-500" />
                    2. Review Post
                  </h3>
                  {post && (
                    <div className="flex gap-2">
                      <button className="text-xs font-medium text-muted-foreground hover:text-foreground flex items-center gap-1 bg-muted/50 px-2 py-1 rounded-md">
                        <RefreshCw className="w-3 h-3" /> Retry
                      </button>
                    </div>
                  )}
                </div>
                
                <div className="border border-border/50 rounded-xl p-6 bg-background/50 flex-1 flex flex-col relative">
                  {post ? (
                    <textarea 
                      className="w-full h-full bg-transparent resize-none focus:outline-none text-sm leading-relaxed"
                      defaultValue={post}
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                      <Sparkles className="w-12 h-12 mb-4 opacity-20" />
                      <p className="text-sm font-medium">Your generated post will appear here</p>
                      <p className="text-xs opacity-60 mt-1">We'll format it for maximum engagement.</p>
                    </div>
                  )}
                </div>

                {post && (
                  <div className="mt-6 flex justify-end gap-3">
                    <button className="px-6 py-2.5 border border-border rounded-lg text-sm font-bold hover:bg-muted transition-colors">
                      Copy Text
                    </button>
                    <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-md shadow-blue-500/20">
                      <CheckCircle2 className="w-4 h-4" /> Schedule Post
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-card border border-border/50 rounded-xl p-6 flex-1 flex flex-col shadow-sm">
              <h3 className="font-bold text-lg mb-6">Voice Note Library</h3>
              <div className="grid gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="border border-border/50 rounded-lg p-4 flex items-center justify-between hover:border-blue-500/50 transition-colors cursor-pointer bg-background/50">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                        <Play className="w-4 h-4 ml-1" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">Idea about consistency on LinkedIn</h4>
                        <p className="text-xs text-muted-foreground">Recorded 2 days ago • 01:24</p>
                      </div>
                    </div>
                    <button className="text-sm font-medium text-blue-500 hover:underline">Generate Post</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VoiceToPost;
