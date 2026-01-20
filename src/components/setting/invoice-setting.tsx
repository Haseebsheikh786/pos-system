"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileText } from "lucide-react";

interface InvoiceSettingsProps {
  invoiceFooterText: string;
  onInvoiceFooterChange: (value: string) => void;
}

export default function InvoiceSettings({
  invoiceFooterText,
  onInvoiceFooterChange,
}: InvoiceSettingsProps) {
  return (
    <Card className="bg-card border-primary">
      <CardHeader className="flex flex-row items-center gap-2">
        <FileText className="h-5 w-5 text-primary" />
        <CardTitle className="">Invoice Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="invoice-footer" className="text-gray-300">
            Invoice Footer Text
          </Label>
          <Textarea
            id="invoice-footer"
            value={invoiceFooterText}
            onChange={(e) => onInvoiceFooterChange(e.target.value)}
            placeholder="Thank you for your business!"
            className="bg-dark-gray border-primary/30  min-h-[100px]"
          />
          <p className="text-xs text-gray-500">
            This message will appear at the bottom of all invoices.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
