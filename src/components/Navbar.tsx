import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Sparkles, Sun, Moon, Ghost } from "lucide-react";
const logoIcon = "https://api.dicebear.com/7.x/shapes/svg?seed=BrandPilot&backgroundColor=0a0a0a";
import { useTheme } from "@/components/ThemeProvider";
import { useAuth } from "@/contexts/AuthContext";

const platforms = [
  { name: "YouTube Assist", path: "/youtube-assist" },
  { name: "xAssist", path: "/x-assist" },
  { name: "LinkedIn Assist", path: "/linkedin-assist" },
  { name: "Instagram Assist", path: "/instagram-assist" },
  { name: "Pricing", path: "/pricing" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { isMockMode, toggleMockMode } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto flex items-center justify-between py-3 px-4 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <img src={logoIcon} alt="BrandPilot AI" className="h-9 w-9" referrerPolicy="no-referrer" />
          <span className="font-heading font-bold text-lg text-gradient">BrandPilot AI</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {platforms.map((p) => (
            <Link
              key={p.path}
              to={p.path}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary/50"
            >
              {p.name}
            </Link>
          ))}
        </div>

        {/* CTA & Theme Toggle */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={toggleMockMode}
            className={`p-2 rounded-full transition-colors ${isMockMode ? 'text-purple-500 bg-purple-500/10' : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'}`}
            title="Toggle Mock Mode"
          >
            <Ghost className="h-5 w-5" />
          </button>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-violet-600 via-purple-500 to-fuchsia-500 text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-transform hover:scale-105"
          >
            <Sparkles className="h-4 w-4" />
            Get Started Free
          </Link>
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
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
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
          {platforms.map((p) => (
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
            to="/login"
            onClick={() => setMobileOpen(false)}
            className="block mt-3 text-center px-5 py-2.5 rounded-lg bg-gradient-to-r from-violet-600 via-purple-500 to-fuchsia-500 text-white font-semibold text-sm shadow-lg"
          >
            Get Started Free
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
