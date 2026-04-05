import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-hero overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-20 -left-20 w-60 h-60 rounded-full bg-info/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 pt-20 pb-16 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">AI-Powered Loan Intelligence</span>
          </div>

          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-tight mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Know Your Home Loan{" "}
            <span className="text-accent">Eligibility</span>{" "}
            in Minutes
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/70 mb-10 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Get AI-driven eligibility scoring, personalized improvement tips, document verification, and a complete loan readiness report — all in one platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Button size="lg" asChild className="bg-accent text-accent-foreground hover:bg-accent/90 text-base px-8 h-12 shadow-lg animate-pulse-glow">
              <Link to="/signup">
                Check My Eligibility <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 text-base px-8 h-12">
              <a href="#how-it-works">See How It Works</a>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            {["No credit score impact", "Results in 2 minutes", "100% secure"].map((item) => (
              <div key={item} className="flex items-center gap-2 text-primary-foreground/80 text-sm">
                <CheckCircle2 className="w-4 h-4 text-accent" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
