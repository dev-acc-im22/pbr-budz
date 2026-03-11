import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Sparkles, Lock, Ghost } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const LoginScreen = () => {
  const { login, setMockMode } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      login();
      navigate(from);
    }
  };

  const handleGoogleLogin = () => {
    login();
    navigate(from);
  };

  const handleGhostMode = () => {
    setMockMode(true);
    navigate(from);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl mix-blend-multiply opacity-50 animate-blob" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-3xl mix-blend-multiply opacity-50 animate-blob animation-delay-2000" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl mix-blend-multiply opacity-50 animate-blob animation-delay-4000" />

      <div className="w-full max-w-md bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl p-8 relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-violet-600 via-purple-500 to-fuchsia-500 mb-4 shadow-lg">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-heading font-bold text-3xl mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to your BrandPilot account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 via-purple-500 to-fuchsia-500 text-white font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            Sign In
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-card/80 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full inline-flex justify-center items-center py-3 px-4 border border-border rounded-xl shadow-sm bg-background/50 text-sm font-medium text-foreground hover:bg-muted transition-colors"
            >
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Sign in with Google
            </button>
            
            <button
              type="button"
              onClick={handleGhostMode}
              className="w-full inline-flex justify-center items-center py-3 px-4 border border-purple-500/30 rounded-xl shadow-sm bg-purple-500/10 text-sm font-medium text-purple-600 dark:text-purple-400 hover:bg-purple-500/20 transition-colors"
            >
              <Ghost className="h-5 w-5 mr-2" />
              Bypass with Ghost Mode
            </button>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>
            Don't have an account? <a href="#" className="text-purple-500 font-semibold hover:underline">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
