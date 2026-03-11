import { Link } from "react-router-dom";
const logoIcon = "https://api.dicebear.com/7.x/shapes/svg?seed=BrandPilot&backgroundColor=0a0a0a";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-3">
              <img src={logoIcon} alt="BrandPilot AI" className="h-8 w-8" referrerPolicy="no-referrer" />
              <span className="font-heading font-bold text-gradient">BrandPilot AI</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              AI-powered personal branding across every social platform.
            </p>
          </div>
          <div>
            <h4 className="font-heading font-bold text-sm mb-3">Platforms</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/youtube-assist" className="hover:text-foreground transition-colors">YouTube Assist</Link></li>
              <li><Link to="/x-assist" className="hover:text-foreground transition-colors">xAssist</Link></li>
              <li><Link to="/linkedin-assist" className="hover:text-foreground transition-colors">LinkedIn Assist</Link></li>
              <li><Link to="/instagram-assist" className="hover:text-foreground transition-colors">Instagram Assist</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-bold text-sm mb-3">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><span className="hover:text-foreground cursor-pointer transition-colors">Features</span></li>
              <li><span className="hover:text-foreground cursor-pointer transition-colors">Pricing</span></li>
              <li><span className="hover:text-foreground cursor-pointer transition-colors">API</span></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-bold text-sm mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><span className="hover:text-foreground cursor-pointer transition-colors">About</span></li>
              <li><span className="hover:text-foreground cursor-pointer transition-colors">Blog</span></li>
              <li><span className="hover:text-foreground cursor-pointer transition-colors">Contact</span></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} BrandPilot AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
