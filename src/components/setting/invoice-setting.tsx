import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileText } from "lucide-react";

interface InvoiceSettingsProps {
  invoiceFooter: string;
  setInvoiceFooter: (value: string) => void;
}

export default function InvoiceSettings({
  invoiceFooter,
  setInvoiceFooter,
}: InvoiceSettingsProps) {
  return (
    <Card className="bg-[#0a0a0a] border-[#D4AF37]">
      <CardHeader className="flex flex-row items-center gap-2">
        <FileText className="h-5 w-5 text-[#D4AF37]" />
        <CardTitle className="text-white">Invoice Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="invoice-footer" className="text-gray-300">
            Invoice Footer Text
          </Label>
          <Textarea
            id="invoice-footer"
            value={invoiceFooter}
            onChange={(e) => setInvoiceFooter(e.target.value)}
            placeholder="Message to display at the bottom of invoices"
            className="bg-[#1a1a1a] border-[#D4AF37]/30 text-white"
          />
        </div>
      </CardContent>
    </Card>
  );
}
