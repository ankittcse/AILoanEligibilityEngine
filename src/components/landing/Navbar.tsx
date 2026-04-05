import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Home, Shield } from "lucide-react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
            <Home className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-heading font-bold text-xl text-foreground">
            HomeLoan<span className="text-accent">AI</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
          <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
          <a href="#trust" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Why Us</a>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" asChild>
            <Link to="/login">Log In</Link>
          </Button>
          <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link to="/signup">Get Started</Link>
          </Button>
        </div>

        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background p-4 space-y-3 animate-fade-in">
          <a href="#features" className="block text-sm text-muted-foreground py-2" onClick={() => setMobileOpen(false)}>Features</a>
          <a href="#how-it-works" className="block text-sm text-muted-foreground py-2" onClick={() => setMobileOpen(false)}>How It Works</a>
          <a href="#trust" className="block text-sm text-muted-foreground py-2" onClick={() => setMobileOpen(false)}>Why Us</a>
          <div className="flex gap-3 pt-2">
            <Button variant="outline" asChild className="flex-1">
              <Link to="/login">Log In</Link>
            </Button>
            <Button asChild className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
