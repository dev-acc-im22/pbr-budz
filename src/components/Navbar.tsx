import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, Sparkles, Sun, Moon, Ghost } from "lucide-react";
import { Logo } from "@/components/Logo";
import { useTheme } from "@/components/ThemeProvider";
import { useAuth } from "@/contexts/AuthContext";

const assistTools = [
  { name: "LinkedIn Assist", path: "/linkedin-assist" },
  { name: "Instagram Assist", path: "/instagram-assist" },
  { name: "xAssist", path: "/x-assist" },
  { name: "YouTube Assist", path: "/youtube-assist" },
  { name: "Pinterest Assist", path: "/pinterest-assist" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { isMockMode, toggleMockMode, isAuthenticated } = useAuth();
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto flex items-center justify-between py-3 px-4 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <Logo className="h-9 w-9" />
          <span className="font-heading font-bold text-lg text-gradient-brand">BrandPilot AI</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {/* Toggle Strip */}
          <div className="flex items-center bg-secondary/80 border border-border/50 rounded-lg p-1 shadow-inner">
            {assistTools.map((p) => {
              const isActive = location.pathname === p.path;
              return (
                <Link
                  key={p.path}
                  to={p.path}
                  className="relative px-3 py-1.5 text-sm font-medium transition-colors rounded-md"
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-background shadow-md rounded-md border border-border/50"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className={`relative z-10 ${isActive ? 'text-foreground' : 'text-slate-600 hover:text-foreground dark:text-slate-300 dark:hover:text-white'}`}>
                    {p.name}
                  </span>
                </Link>
              );
            })}
          </div>
          
          <Link
            to="/tools/scheduling-calendar"
            className="px-4 py-2 ml-2 text-sm font-bold text-orange-600 bg-orange-500/10 rounded-lg hover:bg-orange-500/20 transition-colors"
          >
            Content Calendar
          </Link>
          {/* Pricing removed for non-logged-in users */}
        </div>

        {/* CTA & Theme Toggle */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={toggleMockMode}
            className={`p-2 rounded-full transition-colors ${isMockMode ? 'text-purple-500 bg-purple-500/10' : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50 dark:hover:text-purple-300'}`}
            title="Toggle Mock Mode"
          >
            <Ghost className="h-5 w-5" />
          </button>
          {isAuthenticated && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 dark:hover:text-yellow-400 transition-colors text-sm font-medium"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              <span>{theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}</span>
            </button>
          )}
          {!isAuthenticated && (
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-violet-600 via-purple-500 to-fuchsia-500 text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-transform hover:scale-105"
            >
              <Sparkles className="h-4 w-4" />
              Get Started Free
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={toggleMockMode}
            className={`p-2 rounded-full transition-colors ${isMockMode ? 'text-purple-500 bg-purple-500/10' : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'}`}
            title="Toggle Mock Mode"
          >
            <Ghost className="h-5 w-5" />
          </button>
          {isAuthenticated && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          )}
          <button
            className="p-2 text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden glass border-t border-border/50 px-4 pb-6 pt-2 space-y-1">
          {assistTools.map((p) => (
            <Link
              key={p.path}
              to={p.path}
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground rounded-md hover:bg-secondary/50 transition-colors"
            >
              {p.name}
            </Link>
          ))}
          <Link
            to="/tools/scheduling-calendar"
            onClick={() => setMobileOpen(false)}
            className="block px-4 py-3 text-sm font-bold text-orange-600 rounded-md hover:bg-orange-500/10 transition-colors"
          >
            Content Calendar
          </Link>
          {/* Pricing removed for non-logged-in users */}
          {!isAuthenticated && (
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="block mt-3 text-center px-5 py-2.5 rounded-lg bg-gradient-to-r from-violet-600 via-purple-500 to-fuchsia-500 text-white font-semibold text-sm shadow-lg"
            >
              Get Started Free
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
