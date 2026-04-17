import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const steps = [
  { id: 1, title: "Personal Info" },
  { id: 2, title: "Employment" },
  { id: 3, title: "Financial" },
  { id: 4, title: "Loan Details" },
  { id: 5, title: "Co-Applicant" },
];

const LoanApplication = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    fullName: "", age: "", gender: "", maritalStatus: "", dependents: "", phone: "", address: "",
    employmentType: "", employer: "", yearsEmployed: "", designation: "",
    monthlyIncome: "", expenses: "", existingEmis: "", savings: "", creditScoreRange: "",
    loanAmount: "", tenure: "", propertyType: "", propertyValue: "", propertyLocation: "",
    coApplicantName: "", coApplicantIncome: "", coApplicantEmployment: "",
  });

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setCurrentStep((s) => Math.min(s + 1, 5));
  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 1));

  const handleSubmit = () => {
    toast({ title: "Application Submitted!", description: "Your loan application is being processed." });
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Progress */}
        <div>
          <div className="flex items-center justify-between mb-3">
            {steps.map((step) => (
              <div key={step.id} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    currentStep > step.id
                      ? "bg-accent text-accent-foreground"
                      : currentStep === step.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {currentStep > step.id ? <CheckCircle2 className="w-4 h-4" /> : step.id}
                </div>
                <span className="hidden sm:block text-xs text-muted-foreground">{step.title}</span>
              </div>
            ))}
          </div>
          <Progress value={(currentStep / 5) * 100} className="h-2" />
        </div>

        <Card className="animate-fade-in">
          {currentStep === 1 && (
            <>
              <CardHeader>
                <CardTitle className="font-heading">Personal Information</CardTitle>
                <CardDescription>Basic details about yourself</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input placeholder="John Doe" value={formData.fullName} onChange={(e) => updateField("fullName", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Age</Label>
                    <Input type="number" placeholder="30" value={formData.age} onChange={(e) => updateField("age", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Gender</Label>
                    <Select value={formData.gender} onValueChange={(v) => updateField("gender", v)}>
                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Marital Status</Label>
                    <Select value={formData.maritalStatus} onValueChange={(v) => updateField("maritalStatus", v)}>
                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single">Single</SelectItem>
                        <SelectItem value="married">Married</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Dependents</Label>
                    <Input type="number" placeholder="2" value={formData.dependents} onChange={(e) => updateField("dependents", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input placeholder="+91 9876543210" value={formData.phone} onChange={(e) => updateField("phone", e.target.value)} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Address</Label>
                  <Input placeholder="Full address" value={formData.address} onChange={(e) => updateField("address", e.target.value)} />
                </div>
              </CardContent>
            </>
          )}

          {currentStep === 2 && (
            <>
              <CardHeader>
                <CardTitle className="font-heading">Employment Details</CardTitle>
                <CardDescription>Your current employment information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Employment Type</Label>
                    <Select value={formData.employmentType} onValueChange={(v) => updateField("employmentType", v)}>
                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="salaried">Salaried</SelectItem>
                        <SelectItem value="self-employed">Self-Employed</SelectItem>
                        <SelectItem value="business">Business Owner</SelectItem>
                        <SelectItem value="freelancer">Freelancer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Employer / Company Name</Label>
                    <Input placeholder="Acme Corp" value={formData.employer} onChange={(e) => updateField("employer", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Years of Employment</Label>
                    <Input type="number" placeholder="5" value={formData.yearsEmployed} onChange={(e) => updateField("yearsEmployed", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Designation</Label>
                    <Input placeholder="Software Engineer" value={formData.designation} onChange={(e) => updateField("designation", e.target.value)} />
                  </div>
                </div>
              </CardContent>
            </>
          )}

          {currentStep === 3 && (
            <>
              <CardHeader>
                <CardTitle className="font-heading">Financial Details</CardTitle>
                <CardDescription>Your income, expenses, and financial health</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Monthly Income (₹)</Label>
                    <Input type="number" placeholder="75000" value={formData.monthlyIncome} onChange={(e) => updateField("monthlyIncome", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Monthly Expenses (₹)</Label>
                    <Input type="number" placeholder="30000" value={formData.expenses} onChange={(e) => updateField("expenses", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Existing EMIs (₹)</Label>
                    <Input type="number" placeholder="10000" value={formData.existingEmis} onChange={(e) => updateField("existingEmis", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Savings (₹)</Label>
                    <Input type="number" placeholder="500000" value={formData.savings} onChange={(e) => updateField("savings", e.target.value)} />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label>Credit Score Range</Label>
                    <Select value={formData.creditScoreRange} onValueChange={(v) => updateField("creditScoreRange", v)}>
                      <SelectTrigger><SelectValue placeholder="Select range" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="300-500">300 - 500 (Poor)</SelectItem>
                        <SelectItem value="500-650">500 - 650 (Fair)</SelectItem>
                        <SelectItem value="650-750">650 - 750 (Good)</SelectItem>
                        <SelectItem value="750-900">750 - 900 (Excellent)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </>
          )}

          {currentStep === 4 && (
            <>
              <CardHeader>
                <CardTitle className="font-heading">Loan Requirements</CardTitle>
                <CardDescription>Details about the loan you need</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Loan Amount (₹)</Label>
                    <Input type="number" placeholder="5000000" value={formData.loanAmount} onChange={(e) => updateField("loanAmount", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Tenure (Years)</Label>
                    <Select value={formData.tenure} onValueChange={(v) => updateField("tenure", v)}>
                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        {[5, 10, 15, 20, 25, 30].map((y) => (
                          <SelectItem key={y} value={String(y)}>{y} Years</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Property Type</Label>
                    <Select value={formData.propertyType} onValueChange={(v) => updateField("propertyType", v)}>
                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="villa">Villa / House</SelectItem>
                        <SelectItem value="plot">Plot + Construction</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Property Value (₹)</Label>
                    <Input type="number" placeholder="7000000" value={formData.propertyValue} onChange={(e) => updateField("propertyValue", e.target.value)} />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label>Property Location</Label>
                    <Input placeholder="Mumbai, Maharashtra" value={formData.propertyLocation} onChange={(e) => updateField("propertyLocation", e.target.value)} />
                  </div>
                </div>
              </CardContent>
            </>
          )}

          {currentStep === 5 && (
            <>
              <CardHeader>
                <CardTitle className="font-heading">Co-Applicant (Optional)</CardTitle>
                <CardDescription>Adding a co-applicant can improve your eligibility</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Co-Applicant Name</Label>
                    <Input placeholder="Jane Doe" value={formData.coApplicantName} onChange={(e) => updateField("coApplicantName", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Monthly Income (₹)</Label>
                    <Input type="number" placeholder="50000" value={formData.coApplicantIncome} onChange={(e) => updateField("coApplicantIncome", e.target.value)} />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label>Employment Type</Label>
                    <Select value={formData.coApplicantEmployment} onValueChange={(v) => updateField("coApplicantEmployment", v)}>
                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="salaried">Salaried</SelectItem>
                        <SelectItem value="self-employed">Self-Employed</SelectItem>
                        <SelectItem value="business">Business Owner</SelectItem>
                        <SelectItem value="none">Not Applicable</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </>
          )}

          <div className="flex justify-between p-6 pt-0">
            <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Previous
            </Button>
            {currentStep < 5 ? (
              <Button onClick={nextStep} className="bg-accent text-accent-foreground hover:bg-accent/90">
                Next <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="bg-accent text-accent-foreground hover:bg-accent/90">
                Submit Application
              </Button>
            )}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default LoanApplication;
