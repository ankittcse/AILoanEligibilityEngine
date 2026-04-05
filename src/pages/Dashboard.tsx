import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import {
  TrendingUp, IndianRupee, Calendar, ShieldAlert,
  ArrowRight, FileText, CheckCircle2, AlertTriangle, Clock
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from "recharts";

const factorData = [
  { name: "Income", score: 85, color: "hsl(160 84% 39%)" },
  { name: "Credit Score", score: 72, color: "hsl(160 84% 39%)" },
  { name: "Employment", score: 90, color: "hsl(160 84% 39%)" },
  { name: "Debt Ratio", score: 60, color: "hsl(38 92% 50%)" },
  { name: "Savings", score: 45, color: "hsl(0 84% 60%)" },
  { name: "Age", score: 88, color: "hsl(160 84% 39%)" },
];

const documents = [
  { name: "Salary Slip", status: "verified" },
  { name: "Bank Statement", status: "pending" },
  { name: "ID Proof", status: "verified" },
  { name: "Employment Letter", status: "missing" },
];

const suggestions = [
  "Reduce existing EMIs by ₹5,000 to improve your debt ratio score by 8 points",
  "Maintain a minimum savings balance of ₹2,00,000 for 6 months",
  "Upload your employment letter to complete document verification",
];

const Dashboard = () => {
  const overallScore = 74;
  const riskLevel = "Medium";

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="animate-fade-in">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">Eligibility Score</span>
                <TrendingUp className="w-4 h-4 text-accent" />
              </div>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-heading font-bold text-foreground">{overallScore}</span>
                <span className="text-sm text-muted-foreground mb-1">/100</span>
              </div>
              <Progress value={overallScore} className="mt-3 h-2" />
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">Max Loan Amount</span>
                <IndianRupee className="w-4 h-4 text-accent" />
              </div>
              <div className="text-3xl font-heading font-bold text-foreground">₹42.5L</div>
              <p className="text-xs text-muted-foreground mt-1">Based on your profile</p>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">Estimated EMI</span>
                <Calendar className="w-4 h-4 text-accent" />
              </div>
              <div className="text-3xl font-heading font-bold text-foreground">₹34,890</div>
              <p className="text-xs text-muted-foreground mt-1">20 yrs @ 8.5%</p>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">Risk Level</span>
                <ShieldAlert className="w-4 h-4 text-warning" />
              </div>
              <Badge className="bg-warning/10 text-warning border-warning/20 text-base px-3 py-1">
                {riskLevel}
              </Badge>
              <p className="text-xs text-muted-foreground mt-2">Some factors need attention</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Factor Breakdown Chart */}
          <Card className="lg:col-span-2 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <CardHeader>
              <CardTitle className="font-heading text-lg">Eligibility Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={factorData} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
                  <XAxis type="number" domain={[0, 100]} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis type="category" dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} width={80} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      fontSize: "13px",
                    }}
                  />
                  <Bar dataKey="score" radius={[0, 6, 6, 0]} barSize={20}>
                    {factorData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Document Status */}
          <Card className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-heading text-lg">Documents</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/documents">View All <ArrowRight className="w-3 h-3 ml-1" /></Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {documents.map((doc) => (
                <div key={doc.name} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">{doc.name}</span>
                  </div>
                  {doc.status === "verified" && (
                    <Badge variant="secondary" className="bg-success/10 text-success border-0 text-xs">
                      <CheckCircle2 className="w-3 h-3 mr-1" /> Verified
                    </Badge>
                  )}
                  {doc.status === "pending" && (
                    <Badge variant="secondary" className="bg-warning/10 text-warning border-0 text-xs">
                      <Clock className="w-3 h-3 mr-1" /> Pending
                    </Badge>
                  )}
                  {doc.status === "missing" && (
                    <Badge variant="secondary" className="bg-destructive/10 text-destructive border-0 text-xs">
                      <AlertTriangle className="w-3 h-3 mr-1" /> Missing
                    </Badge>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Improvement Suggestions */}
        <Card className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <CardHeader>
            <CardTitle className="font-heading text-lg">AI Improvement Suggestions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {suggestions.map((suggestion, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-accent/5 border border-accent/10">
                  <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-accent">{index + 1}</span>
                  </div>
                  <p className="text-sm text-foreground">{suggestion}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
