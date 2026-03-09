import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, Grid3X3, ChevronDown, CheckCircle2, X as XIcon, Clock, Settings, Plus, List, Filter, MoreHorizontal } from "lucide-react";
import { useState } from "react";

const SchedulingCalendar = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [view, setView] = useState("week"); // week, month

  const timeSlots = [
    { time: "09:00 AM", active: true },
    { time: "12:00 PM", active: false },
    { time: "05:00 PM", active: true },
  ];

  const days = ['SUN 12', 'MON 13', 'TUE 14', 'WED 15', 'THU 16', 'FRI 17', 'SAT 18'];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-24 max-w-7xl flex gap-8">
        
        {/* Sidebar */}
        <aside className="w-64 hidden lg:flex flex-col gap-6">
          <div className="bg-card border border-border/50 rounded-xl p-4">
            <h3 className="font-bold text-sm mb-4 text-muted-foreground uppercase tracking-wider">Accounts</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50 border border-border/50 cursor-pointer hover:border-orange-500/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs">in</div>
                  <span className="text-sm font-medium">Alex Morgan</span>
                </div>
                <CheckCircle2 className="w-4 h-4 text-orange-500" />
              </div>
              <button className="w-full py-2 border border-dashed border-border/50 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:border-foreground transition-colors flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" /> Add Account
              </button>
            </div>
          </div>

          <div className="bg-card border border-border/50 rounded-xl p-4 flex-1 flex flex-col">
            <h3 className="font-bold text-sm mb-4 text-muted-foreground uppercase tracking-wider flex justify-between items-center">
              Unscheduled Drafts
              <span className="bg-muted px-2 py-0.5 rounded-full text-xs">3</span>
            </h3>
            <div className="space-y-3 overflow-y-auto flex-1 pr-2 custom-scrollbar">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-background border border-border/50 rounded-lg p-3 shadow-sm cursor-grab hover:border-orange-500/50 transition-colors group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-orange-500 bg-orange-500/10 px-2 py-0.5 rounded-sm">Draft</span>
                    <MoreHorizontal className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-xs font-medium leading-snug line-clamp-2">5 reasons why your LinkedIn strategy is failing in 2024...</p>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h1 className="font-heading font-bold text-3xl md:text-4xl mb-2 flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500/10 text-orange-500 rounded-xl flex items-center justify-center">
                  <Calendar className="w-5 h-5" />
                </div>
                Scheduling & Calendar
              </h1>
              <p className="text-muted-foreground">Plan your week in one view. Schedule posts at peak times.</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowSettings(!showSettings)}
                className="px-4 py-2 border border-border rounded-lg font-bold text-sm hover:bg-muted transition-colors flex items-center gap-2"
              >
                <Settings className="w-4 h-4" /> Settings
              </button>
              <button className="px-4 py-2 bg-orange-600 text-white rounded-lg font-bold text-sm hover:bg-orange-700 transition-colors flex items-center gap-2 shadow-lg shadow-orange-500/20">
                <Plus className="w-4 h-4" /> New Post
              </button>
            </div>
          </div>

          <div className="bg-card border border-border/50 rounded-xl p-6 relative flex-1 flex flex-col min-h-[600px] shadow-sm">
            
            {/* Calendar Controls */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-bold">May 2024</h2>
                <div className="flex items-center gap-1 bg-muted/30 p-1 rounded-lg border border-border/50">
                  <button className="w-8 h-8 rounded flex items-center justify-center text-muted-foreground hover:bg-background hover:shadow-sm transition-all">&lt;</button>
                  <div className="px-3 py-1 text-sm font-medium">Today</div>
                  <button className="w-8 h-8 rounded flex items-center justify-center text-muted-foreground hover:bg-background hover:shadow-sm transition-all">&gt;</button>
                </div>
              </div>
              
              <div className="flex gap-2">
                <div className="flex bg-muted/30 p-1 rounded-lg border border-border/50">
                  <button 
                    onClick={() => setView("week")}
                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${view === 'week' ? 'bg-background shadow-sm text-orange-500' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    <List className="w-4 h-4" /> Week
                  </button>
                  <button 
                    onClick={() => setView("month")}
                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${view === 'month' ? 'bg-background shadow-sm text-orange-500' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    <Grid3X3 className="w-4 h-4" /> Month
                  </button>
                </div>
                <button className="p-2 border border-border/50 rounded-lg text-muted-foreground hover:bg-muted transition-colors">
                  <Filter className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-4 flex-1">
              {days.map((d, i) => (
                <div key={d} className="flex flex-col">
                  <div className={`text-xs font-bold mb-4 text-center py-2 rounded-lg ${i === 5 ? 'text-orange-500 bg-orange-500/10' : 'text-muted-foreground bg-muted/30'}`}>
                    {d}
                  </div>
                  
                  <div className="space-y-4 flex-1">
                    {timeSlots.map((slot, j) => (
                      <div key={j} className="flex flex-col gap-2">
                        <div className="text-xs font-medium text-muted-foreground/70 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {slot.time}
                        </div>
                        
                        {i === 2 && j === 0 ? (
                          // Scheduled Post Example
                          <div className="w-full border border-orange-500/50 rounded-xl bg-orange-500/5 p-3 cursor-pointer hover:border-orange-500 transition-colors shadow-sm group relative">
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-[8px]">in</div>
                              <span className="text-[10px] font-bold text-orange-600 bg-orange-500/20 px-1.5 py-0.5 rounded">Scheduled</span>
                            </div>
                            <p className="text-xs font-medium leading-snug line-clamp-2">I keep seeing B2B teams apply B2C-derived marketing...</p>
                          </div>
                        ) : (
                          // Empty Slot
                          <div className="w-full h-24 border-2 border-dashed border-border/50 rounded-xl bg-muted/5 hover:bg-orange-500/5 hover:border-orange-500/30 transition-colors cursor-pointer flex flex-col items-center justify-center group">
                            <Plus className="w-6 h-6 text-muted-foreground/30 group-hover:text-orange-500/50 transition-colors mb-1" />
                            <span className="text-[10px] font-medium text-muted-foreground/50 group-hover:text-orange-500/70 opacity-0 group-hover:opacity-100 transition-opacity">Schedule Post</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Schedule Settings Modal */}
            {showSettings && (
              <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="w-full max-w-lg bg-card rounded-2xl shadow-2xl border border-border p-6 relative">
                  <div className="flex justify-between items-center mb-6 border-b border-border/50 pb-4">
                    <div>
                      <h3 className="text-xl font-bold">Schedule Settings</h3>
                      <p className="text-sm text-muted-foreground mt-1">Configure your default posting times.</p>
                    </div>
                    <button onClick={() => setShowSettings(false)} className="text-muted-foreground hover:text-foreground p-2 rounded-full hover:bg-muted transition-colors">
                      <XIcon className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-bold mb-2 block">Timezone</label>
                      <div className="border border-border/50 rounded-lg p-3 text-sm flex justify-between items-center bg-background cursor-pointer hover:border-orange-500/50 transition-colors">
                        <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-muted-foreground" /> (GMT+5:30) India Standard Time</span>
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <label className="text-sm font-bold">Posting Schedule</label>
                        <button className="text-xs font-bold text-orange-500 hover:text-orange-600 transition-colors">+ Add Time</button>
                      </div>
                      
                      <div className="space-y-4">
                        {[
                          { time: "09:00 AM", days: [1,1,1,1,1,0,0] },
                          { time: "12:00 PM", days: [0,1,0,1,0,0,0] },
                          { time: "05:00 PM", days: [1,1,1,1,1,1,1] }
                        ].map((slot, idx) => (
                          <div key={idx} className="border border-border/50 rounded-xl p-4 bg-muted/10">
                            <div className="flex items-center justify-between mb-4">
                              <div className="border border-border/50 rounded-lg px-3 py-1.5 text-sm font-bold bg-background flex items-center gap-2 shadow-sm">
                                {slot.time}
                              </div>
                              <button className="text-muted-foreground hover:text-red-500 transition-colors">
                                <XIcon className="w-4 h-4" />
                              </button>
                            </div>
                            
                            <div className="flex justify-between items-center px-1">
                              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                                <div key={i} className="flex flex-col items-center gap-2">
                                  <span className="text-[10px] font-bold text-muted-foreground">{day}</span>
                                  <button className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-sm ${slot.days[i] ? 'bg-orange-500 text-white' : 'border border-border/50 bg-background hover:bg-muted text-muted-foreground'}`}>
                                    {slot.days[i] ? <CheckCircle2 className="w-4 h-4" /> : null}
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex justify-end gap-3 pt-4 border-t border-border/50">
                    <button onClick={() => setShowSettings(false)} className="px-4 py-2 border border-border rounded-lg text-sm font-bold hover:bg-muted transition-colors">
                      Cancel
                    </button>
                    <button onClick={() => setShowSettings(false)} className="px-6 py-2 bg-orange-600 text-white rounded-lg text-sm font-bold hover:bg-orange-700 transition-colors shadow-md shadow-orange-500/20">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SchedulingCalendar;
