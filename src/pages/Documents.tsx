import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, CheckCircle2, Clock, AlertTriangle, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const requiredDocs = [
  { id: "salary", label: "Salary Slip (Last 3 months)", status: "missing" as string },
  { id: "bank", label: "Bank Statement (Last 6 months)", status: "missing" as string },
  { id: "id", label: "ID Proof (Aadhaar / PAN)", status: "missing" as string },
  { id: "employment", label: "Employment Letter", status: "missing" as string },
];

const Documents = () => {
  const [docs, setDocs] = useState(requiredDocs);
  const { toast } = useToast();

  const handleUpload = (docId: string) => {
    setDocs((prev) =>
      prev.map((d) => (d.id === docId ? { ...d, status: "uploaded" } : d))
    );
    toast({ title: "Document Uploaded", description: "Your document will be verified by AI shortly." });
  };

  const statusIcon = (status: string) => {
    switch (status) {
      case "verified": return <CheckCircle2 className="w-4 h-4 text-success" />;
      case "uploaded": return <Clock className="w-4 h-4 text-warning" />;
      case "issues": return <AlertTriangle className="w-4 h-4 text-destructive" />;
      default: return <X className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const statusBadge = (status: string) => {
    switch (status) {
      case "verified": return <Badge className="bg-success/10 text-success border-0">Verified</Badge>;
      case "uploaded": return <Badge className="bg-warning/10 text-warning border-0">Processing</Badge>;
      case "issues": return <Badge className="bg-destructive/10 text-destructive border-0">Issues</Badge>;
      default: return <Badge variant="secondary">Not Uploaded</Badge>;
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-heading">Upload Documents</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {docs.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-4 rounded-xl border border-border bg-secondary/30">
                <div className="flex items-center gap-3">
                  {statusIcon(doc.status)}
                  <div>
                    <p className="text-sm font-medium text-foreground">{doc.label}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {statusBadge(doc.status)}
                  {doc.status === "missing" && (
                    <Button size="sm" variant="outline" onClick={() => handleUpload(doc.id)}>
                      <Upload className="w-3 h-3 mr-1" /> Upload
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Documents;
