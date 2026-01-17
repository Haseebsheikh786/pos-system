"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, PlusCircle, Download } from "lucide-react";
import type { Invoice } from "@/types/invoice";
import Link from "next/link";
import { getCurrencySymbol } from "@/lib/currency";

interface InvoiceListProps {
  invoices: Invoice[];
  loading?: boolean;
  onViewInvoice: (invoice: Invoice) => void;
  onAddPayment: (invoice: Invoice) => void;
  onPrintInvoice: (invoice: Invoice) => void;
  profile: {
    currency?: string;
  };
  
}

export default function InvoiceList({
  invoices,
  loading = false,
  onViewInvoice,
  onAddPayment,
  onPrintInvoice,
  profile
}: InvoiceListProps) {
  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return (
          <Badge className="bg-green-500/10 text-green-400 border-green-500">
            Paid
          </Badge>
        );
      case "partial":
        return (
          <Badge className="bg-orange-500/10 text-orange-400 border-orange-500">
            Partial
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-red-500/10 text-red-400 border-red-500">
            Pending
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-500/10 text-gray-400 border-gray-500">
            Unknown
          </Badge>
        );
    }
  };

  const currencySymbol = profile?.currency
    ? getCurrencySymbol(profile.currency)
    : "Rs.";

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (loading && invoices.length === 0) {
    return (
      <Card className="bg-[#0a0a0a] border-[#D4AF37]">
        <CardContent className="pt-6 text-center text-gray-400">
          Loading invoices...
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-[#0a0a0a] border-[#D4AF37]">
      <CardContent className="pt-6">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-[#D4AF37]/30">
                <TableHead className="text-[#D4AF37]">Invoice #</TableHead>
                <TableHead className="text-[#D4AF37]">Date & Time</TableHead>
                <TableHead className="text-[#D4AF37]">Customer</TableHead>
                <TableHead className="text-[#D4AF37] text-right">
                  Total
                </TableHead>
                <TableHead className="text-[#D4AF37] text-right">
                  Paid
                </TableHead>
                <TableHead className="text-[#D4AF37] text-right">Due</TableHead>
                <TableHead className="text-[#D4AF37]">Status</TableHead>
                <TableHead className="text-[#D4AF37] text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center text-gray-400 py-8"
                  >
                    No invoices found. Create your first invoice from the
                    billing page!
                  </TableCell>
                </TableRow>
              ) : (
                invoices.map((invoice) => (
                  <TableRow
                    key={invoice.id}
                    className="border-[#D4AF37]/30 hover:bg-[#1a1a1a] cursor-pointer"
                    onClick={() => onViewInvoice(invoice)}
                  >
                    <TableCell>
                      <div className="font-medium text-white">
                        {invoice.invoice_number ||
                          `INV-${invoice.id.slice(0, 8)}`}
                      </div>
                      {invoice.notes && (
                        <div className="text-xs text-gray-400 truncate max-w-[200px]">
                          {invoice.notes}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-gray-300">
                      <div className="flex flex-col">
                        <span>{formatDate(invoice.created_at)}</span>
                        <span className="text-xs text-gray-400">
                          {new Date(invoice.created_at).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-white">
                          {invoice.customer_name || "Walk-in Customer"}
                        </span>
                        {invoice.customer_phone && (
                          <span className="text-xs text-gray-400">
                            {invoice.customer_phone}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right text-white font-medium">
                      {currencySymbol}{invoice.total?.toLocaleString() || "0"}
                    </TableCell>
                    <TableCell className="text-right text-green-400">
                      {currencySymbol}{invoice.amount_paid?.toLocaleString() || "0"}
                    </TableCell>
                    <TableCell className="text-right">
                      {invoice.due_amount > 0 ? (
                        <span className="text-orange-400 font-medium">
                          {currencySymbol}{invoice.due_amount?.toLocaleString() || "0"}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {getPaymentStatusBadge(invoice.payment_status)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/dashboard/invoices/${invoice.id}`}
                          prefetch={true}
                        >
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              onViewInvoice(invoice);
                            }}
                            className="text-blue-400 hover:bg-blue-500/10"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>

                        {invoice.due_amount > 0 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              onAddPayment(invoice);
                            }}
                            className="text-green-400 hover:bg-green-500/10"
                            title="Add Payment"
                          >
                            <PlusCircle className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            onPrintInvoice(invoice);
                          }}
                          className="text-[#D4AF37] hover:bg-#D4AF37/30"
                          title="View Details"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
