import { UserPlus, Upload, BarChart3, ArrowDown } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Fill Your Profile",
    description: "Enter your personal, employment, and financial details through our guided multi-step form. It takes less than 5 minutes.",
  },
  {
    icon: Upload,
    step: "02",
    title: "Upload Documents",
    description: "Upload salary slips, bank statements, and ID proofs. Our AI automatically extracts and verifies key information.",
  },
  {
    icon: BarChart3,
    step: "03",
    title: "Get Your Results",
    description: "Receive your eligibility score, loan amount estimate, EMI breakdown, improvement suggestions, and a downloadable report.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Three simple steps to know your loan readiness
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.step} className="relative">
              <div
                className="flex items-start gap-6 md:gap-8 animate-fade-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shrink-0 shadow-lg">
                    <step.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-0.5 h-16 bg-border my-2" />
                  )}
                </div>
                <div className="pb-12">
                  <span className="text-sm font-bold text-accent mb-1 block">Step {step.step}</span>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
