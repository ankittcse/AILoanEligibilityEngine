import { Brain, FileCheck, Calculator, ShieldAlert, Lightbulb, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Brain,
    title: "AI Eligibility Scoring",
    description: "Advanced ML-powered scoring engine that analyzes 15+ factors to predict your loan approval probability with explainable results.",
  },
  {
    icon: FileCheck,
    title: "Document Verification",
    description: "Upload salary slips, bank statements, and ID proofs. Our AI extracts and cross-verifies data to ensure consistency.",
  },
  {
    icon: Calculator,
    title: "EMI Affordability Engine",
    description: "Interactive EMI calculator with smart affordability analysis based on your income, expenses, and existing obligations.",
  },
  {
    icon: ShieldAlert,
    title: "Risk Analysis",
    description: "Comprehensive risk profiling that identifies potential red flags and provides a clear risk level assessment for your application.",
  },
  {
    icon: Lightbulb,
    title: "Smart Recommendations",
    description: "Get personalized, actionable tips to improve your eligibility score — from reducing debts to optimizing your application.",
  },
  {
    icon: FileText,
    title: "Downloadable Reports",
    description: "Generate professional loan readiness reports with detailed breakdowns that you can share with banks and financial advisors.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything You Need for Loan Readiness
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A complete AI-powered platform that goes beyond simple predictions to give you full control over your home loan journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className="group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-accent/30 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
