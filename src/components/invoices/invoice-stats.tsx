"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, DollarSign, CheckCircle, Clock } from "lucide-react";
import type { Invoice } from "@/types/invoice";

interface InvoiceStatsProps {
  invoices: Invoice[];
  loading?: boolean;
}

export default function InvoiceStats({
  invoices,
  loading = false,
}: InvoiceStatsProps) {
  const calculateStats = () => {
    const totalInvoices = invoices.length;
    const totalAmount = invoices.reduce(
      (sum, inv) => sum + inv.total,
      0
    );
    const totalCollected = invoices.reduce(
      (sum, inv) => sum + inv.amount_paid,
      0
    );
    const totalDue = invoices.reduce((sum, inv) => sum + inv.due_amount, 0);
    const pendingInvoices = invoices.filter(
      (inv) => inv.payment_status === "pending"
    ).length;
    const partialInvoices = invoices.filter(
      (inv) => inv.payment_status === "partial"
    ).length;
    const paidInvoices = invoices.filter(
      (inv) => inv.payment_status === "paid"
    ).length;

    return {
      totalInvoices,
      totalAmount,
      totalCollected,
      totalDue,
      pendingInvoices,
      partialInvoices,
      paidInvoices,
    };
  };

  const stats = calculateStats();

  const statCards = [
    {
      title: "Total Invoices",
      value: loading ? "-" : stats.totalInvoices,
      icon: FileText,
      iconColor: "text-[#D4AF37]",
      valueColor: "text-white",
      description: "All time",
      change: "",
    },
    {
      title: "Total Amount",
      value: loading ? "-" : `₹${stats.totalAmount.toLocaleString()}`,
      icon: DollarSign,
      iconColor: "text-green-400",
      valueColor: "text-green-400",
      description: "Gross sales",
      change: "",
    },
    {
      title: "Amount Collected",
      value: loading ? "-" : `₹${stats.totalCollected.toLocaleString()}`,
      icon: CheckCircle,
      iconColor: "text-blue-400",
      valueColor: "text-blue-400",
      description: "Cash received",
      change: "",
    },
    {
      title: "Pending Amount",
      value: loading ? "-" : `₹${stats.totalDue.toLocaleString()}`,
      icon: Clock,
      iconColor: "text-orange-400",
      valueColor: "text-orange-400",
      description: "To be collected",
      change: "",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="bg-[#0a0a0a] border-[#D4AF37]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                {stat.title}
              </CardTitle>
              <Icon className={`h-5 w-5 ${stat.iconColor}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${stat.valueColor}`}>
                {stat.value}
              </div>
              <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
