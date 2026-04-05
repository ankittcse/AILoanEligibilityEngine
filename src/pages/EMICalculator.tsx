import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { IndianRupee, Calendar, Percent } from "lucide-react";

const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  const monthlyRate = interestRate / 12 / 100;
  const months = tenure * 12;
  const emi = monthlyRate > 0
    ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)
    : loanAmount / months;
  const totalPayment = emi * months;
  const totalInterest = totalPayment - loanAmount;

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-heading">EMI Calculator</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="flex items-center gap-2"><IndianRupee className="w-4 h-4" /> Loan Amount</Label>
                <span className="font-heading font-bold text-foreground">{formatCurrency(loanAmount)}</span>
              </div>
              <Slider value={[loanAmount]} onValueChange={([v]) => setLoanAmount(v)} min={500000} max={50000000} step={100000} />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="flex items-center gap-2"><Percent className="w-4 h-4" /> Interest Rate</Label>
                <span className="font-heading font-bold text-foreground">{interestRate}%</span>
              </div>
              <Slider value={[interestRate]} onValueChange={([v]) => setInterestRate(v)} min={5} max={15} step={0.1} />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="flex items-center gap-2"><Calendar className="w-4 h-4" /> Tenure (Years)</Label>
                <span className="font-heading font-bold text-foreground">{tenure} years</span>
              </div>
              <Slider value={[tenure]} onValueChange={([v]) => setTenure(v)} min={1} max={30} step={1} />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="bg-accent/5 border-accent/20">
            <CardContent className="p-5 text-center">
              <p className="text-sm text-muted-foreground mb-1">Monthly EMI</p>
              <p className="text-2xl font-heading font-bold text-accent">{formatCurrency(emi)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5 text-center">
              <p className="text-sm text-muted-foreground mb-1">Total Interest</p>
              <p className="text-2xl font-heading font-bold text-foreground">{formatCurrency(totalInterest)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5 text-center">
              <p className="text-sm text-muted-foreground mb-1">Total Payment</p>
              <p className="text-2xl font-heading font-bold text-foreground">{formatCurrency(totalPayment)}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EMICalculator;
