import { Users, FileCheck, Shield, Clock } from "lucide-react";

const stats = [
  { icon: Users, value: "10,000+", label: "Applications Analyzed" },
  { icon: FileCheck, value: "95%", label: "Prediction Accuracy" },
  { icon: Shield, value: "100%", label: "Data Encryption" },
  { icon: Clock, value: "< 2 min", label: "Average Result Time" },
];

const TrustSection = () => {
  return (
    <section id="trust" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Built with bank-grade security and AI precision
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-2xl bg-secondary/50 border border-border/50 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
