import { Link } from "react-router-dom";
import { Home } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                <Home className="w-4 h-4 text-accent-foreground" />
              </div>
              <span className="font-heading font-bold text-lg">
                HomeLoan<span className="text-accent">AI</span>
              </span>
            </div>
            <p className="text-primary-foreground/60 text-sm max-w-sm leading-relaxed">
              AI-powered home loan eligibility platform helping applicants, banks, and advisors make smarter lending decisions.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4">Product</h4>
            <div className="space-y-2">
              <a href="#features" className="block text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">Features</a>
              <a href="#how-it-works" className="block text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">How It Works</a>
              <Link to="/login" className="block text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">Login</Link>
              <Link to="/signup" className="block text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">Sign Up</Link>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4">Legal</h4>
            <div className="space-y-2">
              <a href="#" className="block text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="block text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">Terms of Service</a>
              <a href="#" className="block text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">Contact Us</a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-6 text-center">
          <p className="text-sm text-primary-foreground/40">
            © {new Date().getFullYear()} HomeLoanAI. All rights reserved. Built as an AI + FinTech capstone project.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
