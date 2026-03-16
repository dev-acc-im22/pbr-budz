import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewPostModal from "@/components/NewPostModal";
import { Calendar, Grid3X3, ChevronDown, CheckCircle2, X as XIcon, Clock, Settings, Plus, List, Filter, MoreHorizontal, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { subscribeToPosts, Post, auth, updatePostSchedule, getUserSettings, saveUserSettings, UserSettings, updatePostStatus } from "@/services/firebaseService";
import { toast } from "sonner";

const defaultTimeSlots = [
  { time: "09:00 AM", hours: 9, days: [true, true, true, true, true, false, false] },
  { time: "12:00 PM", hours: 12, days: [false, true, false, true, false, false, false] },
  { time: "05:00 PM", hours: 17, days: [true, true, true, true, true, true, true] },
];

const SchedulingCalendar = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [showNewPost, setShowNewPost] = useState(false);
  const [view, setView] = useState("week"); // week, month
  const [scheduledPosts, setScheduledPosts] = useState<Post[]>([]);
  const [draftPosts, setDraftPosts] = useState<Post[]>([]);
  const [userSettings, setUserSettings] = useState<UserSettings>({
    timezone: "(GMT+5:30) India Standard Time",
    timeSlots: defaultTimeSlots
  });
  const [tempSettings, setTempSettings] = useState<UserSettings>(userSettings);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['linkedin', 'youtube', 'x', 'instagram']);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    if (!auth.currentUser) {
      console.warn("User not authenticated, skipping fetch.");
      return;
    }

    const fetchSettings = async () => {
      const settings = await getUserSettings();
      if (settings) {
        setUserSettings(settings);
        setTempSettings(settings);
      } else {
        setTempSettings({
          timezone: "(GMT+5:30) India Standard Time",
          timeSlots: defaultTimeSlots
        });
      }
    };
    fetchSettings();

    const unsubscribeScheduled = subscribeToPosts('scheduled', (posts) => {
      setScheduledPosts(posts);
    });

    const unsubscribeDrafts = subscribeToPosts('draft', (posts) => {
      setDraftPosts(posts);
    });

    return () => {
      unsubscribeScheduled();
      unsubscribeDrafts();
    };
  }, []);

  const handleSaveSettings = async () => {
    try {
      await saveUserSettings(tempSettings);
      setUserSettings(tempSettings);
      setShowSettings(false);
    } catch (error) {
      console.error("Failed to save settings:", error);
    }
  };

  const handleAddTimeSlot = () => {
    setTempSettings(prev => ({
      ...prev,
      timeSlots: [...prev.timeSlots, { time: "10:00 AM", hours: 10, days: [true, true, true, true, true, false, false] }]
    }));
  };

  const handleRemoveTimeSlot = (index: number) => {
    setTempSettings(prev => ({
      ...prev,
      timeSlots: prev.timeSlots.filter((_, i) => i !== index)
    }));
  };

  const handleToggleDay = (slotIndex: number, dayIndex: number) => {
    setTempSettings(prev => {
      const newSlots = [...prev.timeSlots];
      newSlots[slotIndex].days[dayIndex] = !newSlots[slotIndex].days[dayIndex];
      return { ...prev, timeSlots: newSlots };
    });
  };

  const handleTimeChange = (slotIndex: number, newTime: string) => {
    // Simple parsing for AM/PM to hours
    const [time, period] = newTime.split(' ');
    let [hours] = time.split(':').map(Number);
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;

    setTempSettings(prev => {
      const newSlots = [...prev.timeSlots];
      newSlots[slotIndex].time = newTime;
      newSlots[slotIndex].hours = hours;
      return { ...prev, timeSlots: newSlots };
    });
  };

  const getWeekDays = () => {
    const dayOfWeek = currentDate.getDay();
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - dayOfWeek);
    
    return Array.from({ length: 7 }).map((_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      return date;
    });
  };

  const weekDays = getWeekDays();

  const getMonthDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const days = [];
    
    // Add previous month's padding days
    const firstDayOfWeek = firstDay.getDay();
    for (let i = firstDayOfWeek; i > 0; i--) {
      days.push(new Date(year, month, 1 - i));
    }
    
    // Add current month's days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
    
    // Add next month's padding days to complete the grid (usually 6 rows of 7 days = 42)
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push(new Date(year, month + 1, i));
    }
    
    return days;
  };

  const monthDays = getMonthDays();

  const handleDrop = async (e: React.DragEvent, date: Date, hours: number) => {
    e.preventDefault();
    const postId = e.dataTransfer.getData('postId');
    if (!postId) return;

    const targetDate = new Date(date);
    targetDate.setHours(hours, 0, 0, 0);

    try {
      await updatePostSchedule(postId, targetDate);
    } catch (error) {
      console.error("Failed to schedule post:", error);
    }
  };

  const handleUnschedule = async (postId: string) => {
    try {
      await updatePostStatus(postId, 'draft');
    } catch (error) {
      console.error("Failed to unschedule post:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-24 max-w-7xl flex gap-8">
        
        {/* Sidebar */}
        <aside className="w-64 hidden lg:flex flex-col gap-6">
          <div className="bg-card border border-border/50 rounded-xl p-4">
            <h3 className="font-bold text-sm mb-4 text-muted-foreground uppercase tracking-wider">Platforms</h3>
            <div className="space-y-3">
              {[
                { name: "LinkedIn", color: "bg-blue-600", initial: "in", id: "linkedin" },
                { name: "YouTube", color: "bg-red-600", initial: "yt", id: "youtube" },
                { name: "X (Twitter)", color: "bg-black", initial: "x", id: "x" },
                { name: "Instagram", color: "bg-pink-600", initial: "ig", id: "instagram" },
              ].map((platform) => (
                <div 
                  key={platform.name} 
                  onClick={() => {
                    setSelectedPlatforms(prev => 
                      prev.includes(platform.id) 
                        ? prev.filter(p => p !== platform.id)
                        : [...prev, platform.id]
                    );
                  }}
                  className={`flex items-center justify-between p-2 rounded-lg border cursor-pointer transition-colors ${selectedPlatforms.includes(platform.id) ? 'bg-muted/50 border-border/50 hover:border-orange-500/50' : 'bg-transparent border-transparent opacity-50 hover:opacity-100'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full ${platform.color} flex items-center justify-center text-white font-bold text-xs`}>{platform.initial}</div>
                    <span className="text-sm font-medium">{platform.name}</span>
                  </div>
                  {selectedPlatforms.includes(platform.id) && <CheckCircle2 className="w-4 h-4 text-orange-500" />}
                </div>
              ))}
              <button 
                onClick={() => toast.info("Platform integration coming soon!")}
                className="w-full py-2 border border-dashed border-border/50 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:border-foreground transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add Account
              </button>
            </div>
          </div>

          <div className="bg-card border border-border/50 rounded-xl p-4 flex-1 flex flex-col">
            <h3 className="font-bold text-sm mb-4 text-muted-foreground uppercase tracking-wider flex justify-between items-center">
              Unscheduled Drafts
              <span className="bg-muted px-2 py-0.5 rounded-full text-xs">{draftPosts.filter(p => selectedPlatforms.includes(p.platform)).length}</span>
            </h3>
            <div className="space-y-3 overflow-y-auto flex-1 pr-2 custom-scrollbar">
              {draftPosts.filter(p => selectedPlatforms.includes(p.platform)).map((post) => (
                <div key={post.id} className="bg-background border border-border/50 rounded-lg p-3 shadow-sm cursor-grab hover:border-orange-500/50 transition-colors group" draggable onDragStart={(e) => e.dataTransfer.setData('postId', post.id!)}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-[8px]">{post.platform.substring(0, 2)}</div>
                      <span className="text-xs font-bold text-orange-500 bg-orange-500/10 px-2 py-0.5 rounded-sm">Draft</span>
                    </div>
                    <MoreHorizontal className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-xs font-medium leading-snug line-clamp-2">{post.title}</p>
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
              <button 
                onClick={() => setShowNewPost(true)}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg font-bold text-sm hover:bg-orange-700 transition-colors flex items-center gap-2 shadow-lg shadow-orange-500/20"
              >
                <Plus className="w-4 h-4" /> New Post
              </button>
            </div>
          </div>

          <div className="bg-card border border-border/50 rounded-xl p-6 relative flex-1 flex flex-col min-h-[600px] shadow-sm">
            
            {/* Calendar Controls */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-bold">{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => {
                      const newDate = new Date(currentDate);
                      if (view === 'week') {
                        newDate.setDate(newDate.getDate() - 7);
                      } else {
                        newDate.setMonth(newDate.getMonth() - 1);
                      }
                      setCurrentDate(newDate);
                    }}
                    className="p-1.5 rounded-md hover:bg-muted transition-colors border border-border/50"
                  >
                    <ChevronDown className="w-4 h-4 rotate-90" />
                  </button>
                  <button 
                    onClick={() => setCurrentDate(new Date())}
                    className="px-3 py-1.5 text-xs font-bold rounded-md hover:bg-muted transition-colors border border-border/50"
                  >
                    Today
                  </button>
                  <button 
                    onClick={() => {
                      const newDate = new Date(currentDate);
                      if (view === 'week') {
                        newDate.setDate(newDate.getDate() + 7);
                      } else {
                        newDate.setMonth(newDate.getMonth() + 1);
                      }
                      setCurrentDate(newDate);
                    }}
                    className="p-1.5 rounded-md hover:bg-muted transition-colors border border-border/50"
                  >
                    <ChevronDown className="w-4 h-4 -rotate-90" />
                  </button>
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
              </div>
            </div>

            {/* Calendar Grid */}
            {view === 'week' ? (
              <div className="grid grid-cols-7 gap-4 flex-1">
                {weekDays.map((date, i) => (
                  <div key={date.toString()} className="flex flex-col">
                    <div className={`text-xs font-bold mb-4 text-center py-2 rounded-lg ${date.toDateString() === new Date().toDateString() ? 'text-orange-500 bg-orange-500/10' : 'text-muted-foreground bg-muted/30'}`}>
                      {date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' }).toUpperCase()}
                    </div>
                    
                    <div className="space-y-4 flex-1">
                      {userSettings.timeSlots.map((slot, j) => {
                        // Check if this time slot is active for this day of the week
                        // dayOfWeek is 0 for Sunday, 1 for Monday, etc.
                        // Our days array is [Mon, Tue, Wed, Thu, Fri, Sat, Sun]
                        const dayIndex = date.getDay() === 0 ? 6 : date.getDay() - 1;
                        if (!slot.days[dayIndex]) return null;

                        const postsInSlot = scheduledPosts.filter(post => {
                          if (!post.scheduledDate) return false;
                          if (!selectedPlatforms.includes(post.platform)) return false;
                          return post.scheduledDate.toDateString() === date.toDateString() && post.scheduledDate.getHours() === slot.hours;
                        });

                        return (
                          <div key={j} className="flex flex-col gap-2">
                            <div className="text-xs font-medium text-muted-foreground/70 flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {slot.time}
                            </div>
                            
                            {postsInSlot.map(post => (
                              <div key={post.id} className="w-full border border-orange-500/50 rounded-xl bg-orange-500/5 p-3 cursor-pointer hover:border-orange-500 transition-colors shadow-sm group relative">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-[8px]">{post.platform.substring(0, 2)}</div>
                                    <span className="text-[10px] font-bold text-orange-600 bg-orange-500/20 px-1.5 py-0.5 rounded">Scheduled</span>
                                  </div>
                                  <button 
                                    onClick={(e) => { e.stopPropagation(); handleUnschedule(post.id!); }}
                                    className="text-muted-foreground hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                </div>
                                <p className="text-xs font-medium leading-snug line-clamp-2">{post.title}</p>
                              </div>
                            ))}
                            
                            {postsInSlot.length === 0 && (
                              <div 
                                className="w-full h-24 border-2 border-dashed border-border/50 rounded-xl bg-muted/5 hover:bg-orange-500/5 hover:border-orange-500/30 transition-colors cursor-pointer flex flex-col items-center justify-center group"
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={(e) => handleDrop(e, date, slot.hours)}
                              >
                                <Plus className="w-6 h-6 text-muted-foreground/30 group-hover:text-orange-500/50 transition-colors mb-1" />
                                <span className="text-[10px] font-medium text-muted-foreground/50 group-hover:text-orange-500/70 opacity-0 group-hover:opacity-100 transition-opacity">Schedule Post</span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex-1 flex flex-col">
                <div className="grid grid-cols-7 gap-4 mb-4">
                  {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                    <div key={day} className="text-xs font-bold text-center py-2 rounded-lg text-muted-foreground bg-muted/30">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-4 flex-1">
                  {monthDays.map((date, i) => {
                    const isCurrentMonth = date.getMonth() === new Date().getMonth();
                    const isToday = date.toDateString() === new Date().toDateString();
                    const dayPosts = scheduledPosts.filter(post => post.scheduledDate?.toDateString() === date.toDateString() && selectedPlatforms.includes(post.platform));

                    return (
                      <div 
                        key={i} 
                        className={`border border-border/50 rounded-xl p-2 min-h-[120px] flex flex-col ${!isCurrentMonth ? 'opacity-50 bg-muted/10' : 'bg-background'} ${isToday ? 'ring-2 ring-orange-500 ring-inset' : ''}`}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          const dayIndex = date.getDay() === 0 ? 6 : date.getDay() - 1;
                          const availableSlot = userSettings.timeSlots.find(slot => slot.days[dayIndex]);
                          handleDrop(e, date, availableSlot ? availableSlot.hours : 9);
                        }}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className={`text-sm font-bold ${isToday ? 'text-orange-500' : ''}`}>{date.getDate()}</span>
                          {dayPosts.length > 0 && <span className="text-[10px] font-bold bg-orange-500/10 text-orange-500 px-1.5 py-0.5 rounded-full">{dayPosts.length}</span>}
                        </div>
                        <div className="flex-1 space-y-1 overflow-y-auto custom-scrollbar">
                          {dayPosts.map(post => (
                            <div key={post.id} className="text-[10px] font-medium truncate bg-muted/50 p-1 rounded border border-border/50 flex items-center gap-1 group relative">
                              <div className="w-3 h-3 rounded-full bg-blue-600 flex-shrink-0 flex items-center justify-center text-white text-[6px]">{post.platform.substring(0, 1)}</div>
                              <span className="truncate">{post.title}</span>
                              <button 
                                onClick={(e) => { e.stopPropagation(); handleUnschedule(post.id!); }}
                                className="absolute right-1 text-muted-foreground hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity bg-muted/80 rounded"
                              >
                                <XIcon className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            
            <NewPostModal isOpen={showNewPost} onClose={() => setShowNewPost(false)} />
            
            {/* Schedule Settings Modal */}
            {showSettings && (
              <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="w-full max-w-lg bg-card rounded-2xl shadow-2xl border border-border p-6 relative max-h-[90vh] overflow-y-auto custom-scrollbar">
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
                      <div className="relative">
                        <select 
                          className="w-full border border-border/50 rounded-lg p-3 text-sm flex justify-between items-center bg-background cursor-pointer hover:border-orange-500/50 transition-colors appearance-none pl-10"
                          value={tempSettings.timezone}
                          onChange={(e) => setTempSettings({ ...tempSettings, timezone: e.target.value })}
                        >
                          <option value="(GMT-08:00) Pacific Time (US & Canada)">(GMT-08:00) Pacific Time (US & Canada)</option>
                          <option value="(GMT-05:00) Eastern Time (US & Canada)">(GMT-05:00) Eastern Time (US & Canada)</option>
                          <option value="(GMT+00:00) Greenwich Mean Time">(GMT+00:00) Greenwich Mean Time</option>
                          <option value="(GMT+01:00) Central European Time">(GMT+01:00) Central European Time</option>
                          <option value="(GMT+05:30) India Standard Time">(GMT+05:30) India Standard Time</option>
                          <option value="(GMT+08:00) China Standard Time">(GMT+08:00) China Standard Time</option>
                          <option value="(GMT+09:00) Japan Standard Time">(GMT+09:00) Japan Standard Time</option>
                          <option value="(GMT+10:00) Australian Eastern Standard Time">(GMT+10:00) Australian Eastern Standard Time</option>
                        </select>
                        <Clock className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <ChevronDown className="w-4 h-4 text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <label className="text-sm font-bold">Posting Schedule</label>
                        <button onClick={handleAddTimeSlot} className="text-xs font-bold text-orange-500 hover:text-orange-600 transition-colors">+ Add Time</button>
                      </div>
                      
                      <div className="space-y-4">
                        {tempSettings.timeSlots.map((slot, idx) => (
                          <div key={idx} className="border border-border/50 rounded-xl p-4 bg-muted/10">
                            <div className="flex items-center justify-between mb-4">
                              <div className="border border-border/50 rounded-lg px-3 py-1.5 text-sm font-bold bg-background flex items-center gap-2 shadow-sm">
                                <input 
                                  type="text" 
                                  value={slot.time} 
                                  onChange={(e) => handleTimeChange(idx, e.target.value)}
                                  className="bg-transparent border-none outline-none w-20 text-center"
                                />
                              </div>
                              <button onClick={() => handleRemoveTimeSlot(idx)} className="text-muted-foreground hover:text-red-500 transition-colors">
                                <XIcon className="w-4 h-4" />
                              </button>
                            </div>
                            
                            <div className="flex justify-between items-center px-1">
                              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                                <div key={i} className="flex flex-col items-center gap-2">
                                  <span className="text-[10px] font-bold text-muted-foreground">{day}</span>
                                  <button 
                                    onClick={() => handleToggleDay(idx, i)}
                                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-sm ${slot.days[i] ? 'bg-orange-500 text-white' : 'border border-border/50 bg-background hover:bg-muted text-muted-foreground'}`}
                                  >
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
                    <button onClick={handleSaveSettings} className="px-6 py-2 bg-orange-600 text-white rounded-lg text-sm font-bold hover:bg-orange-700 transition-colors shadow-md shadow-orange-500/20">
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
