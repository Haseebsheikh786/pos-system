"use client";

import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DollarSign, CreditCard, CheckCircle, AlertCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Invoice } from "@/types/invoice";
import { useRouter } from "next/navigation";
import { getCurrencySymbol } from "@/lib/currency";

interface PaymentsDuesTabProps {
  dateRange: string;
  invoices: Invoice[];
  profile: {
    currency?: string;
  };
}

export default function PaymentsDuesTab({
  dateRange,
  invoices,
  profile,
}: PaymentsDuesTabProps) {
  const router = useRouter();
  const [customerFilter, setCustomerFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Extract unique customers for filter dropdown
  const uniqueCustomers = useMemo(() => {
    const customers = new Set<string>();
    invoices.forEach((invoice) => {
      if (invoice.customer_name) {
        customers.add(invoice.customer_name);
      }
    });
    return Array.from(customers).sort();
  }, [invoices]);

  const currencySymbol = profile?.currency
    ? getCurrencySymbol(profile.currency)
    : "Rs.";

  // Format currency
  const formatCurrency = (amount: number) => {
    return `${currencySymbol}${amount.toLocaleString()}`;
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return (
          <Badge className="bg-green-500/20 text-green-400 border-green-500">
            Paid
          </Badge>
        );
      case "partial":
        return (
          <Badge className="bg-orange-500/20 text-orange-400 border-orange-500">
            Partial
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-red-500/20 text-red-400 border-red-500">
            Due
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-500/20 text-gray-400 border-gray-500">
            Unknown
          </Badge>
        );
    }
  };

  // Calculate summary statistics from invoices
  const summaryStats = useMemo(() => {
    let totalCollected = 0;
    let totalDue = 0;
    let paidInvoices = 0;
    let pendingInvoices = 0;

    invoices.forEach((invoice) => {
      const paidAmount = invoice.amount_paid || 0;
      const dueAmount = invoice.due_amount || 0;
      const totalAmount = invoice.total || 0;

      totalCollected += paidAmount;
      totalDue += dueAmount;

      if (invoice.payment_status === "paid") {
        paidInvoices++;
      } else {
        pendingInvoices++;
      }
    });

    return {
      totalCollected,
      totalDue,
      paidInvoices,
      pendingInvoices,
    };
  }, [invoices]);

  // Filter invoices based on selections
  const filteredInvoices = useMemo(() => {
    return invoices.filter((invoice) => {
      // Filter by customer
      if (customerFilter !== "all" && customerFilter !== "walk-in") {
        if (invoice.customer_name !== customerFilter) return false;
      }

      if (customerFilter === "walk-in") {
        if (
          invoice.customer_name &&
          invoice.customer_name !== "Walk-in Customer"
        )
          return false;
      }

      // Filter by status
      if (statusFilter !== "all") {
        if (statusFilter === "due" && invoice.payment_status !== "pending")
          return false;
        if (statusFilter === "partial" && invoice.payment_status !== "partial")
          return false;
        if (statusFilter === "paid" && invoice.payment_status !== "paid")
          return false;
      }

      return true;
    });
  }, [invoices, customerFilter, statusFilter]);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Summary cards data (dynamic)
  const summaryCards = [
    {
      title: "Total Collected",
      value: formatCurrency(summaryStats.totalCollected),
      icon: DollarSign,
      description: "Cash & other payments",
      color: "border-green-500",
    },
    {
      title: "Total Due (Udhaar)",
      value: formatCurrency(summaryStats.totalDue),
      icon: CreditCard,
      description: "Outstanding payments",
      color:
        summaryStats.totalDue > 0 ? "border-orange-500" : "border-green-500",
    },
    {
      title: "Paid Invoices",
      value: summaryStats.paidInvoices.toString(),
      icon: CheckCircle,
      description: "Fully paid orders",
      color: "border-blue-500",
    },
    {
      title: "Pending Invoices",
      value: summaryStats.pendingInvoices.toString(),
      icon: AlertCircle,
      description: "Partial + Due payments",
      color:
        summaryStats.pendingInvoices > 0
          ? "border-red-500"
          : "border-green-500",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Summary Cards - Dynamic */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Card key={index} className={`bg-card border-primary`}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">
                  {card.title}
                </CardTitle>
                <div className="p-2 rounded-full bg-dark-gray">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold  mb-1">{card.value}</div>
                <p className="text-sm text-gray-400">{card.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Filters */}
      <Card className="bg-card border-primary">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex items-center gap-2">
              <Label className="text-gray-300">Customer:</Label>
              <Select value={customerFilter} onValueChange={setCustomerFilter}>
                <SelectTrigger className="w-48 bg-dark-gray border-primary/30 ">
                  <SelectValue placeholder="All Customers" />
                </SelectTrigger>
                <SelectContent className="bg-card border-primary ">
                  <SelectItem value="all">
                    All Customers ({invoices.length})
                  </SelectItem>
                  <SelectItem value="walk-in">Walk-in Customers</SelectItem>
                  {uniqueCustomers.map((customer) => (
                    <SelectItem key={customer} value={customer}>
                      {customer}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Label className="text-gray-300">Status:</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48 bg-dark-gray border-primary/30 ">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent className="bg-card border-primary ">
                  <SelectItem value="all">
                    All Status ({invoices.length})
                  </SelectItem>
                  <SelectItem value="paid">
                    Paid ({summaryStats.paidInvoices})
                  </SelectItem>
                  <SelectItem value="partial">
                    Partial (
                    {
                      invoices.filter((i) => i.payment_status === "partial")
                        .length
                    }
                    )
                  </SelectItem>
                  <SelectItem value="due">
                    Due (
                    {
                      invoices.filter((i) => i.payment_status === "pending")
                        .length
                    }
                    )
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payments Table (All Invoices) */}
      <Card className="bg-card border-primary">
        <CardHeader>
          <CardTitle className="">
            {statusFilter === "all"
              ? "All Invoices"
              : statusFilter === "paid"
                ? "Paid Invoices"
                : statusFilter === "partial"
                  ? "Partial Payments"
                  : "Pending Payments"}
            {filteredInvoices.length > 0 && ` (${filteredInvoices.length})`}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            {filteredInvoices.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                {statusFilter === "paid"
                  ? "🎉 No paid invoices in the selected period"
                  : statusFilter === "partial"
                    ? "No partially paid invoices found"
                    : statusFilter === "due"
                      ? "🎉 No pending payments! All invoices are cleared"
                      : "No invoices found with the selected filters"}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-primary/30">
                    <TableHead className="text-primary">Invoice #</TableHead>
                    <TableHead className="text-primary">
                      Customer Name
                    </TableHead>
                    <TableHead className="text-primary">
                      Invoice Total
                    </TableHead>
                    <TableHead className="text-primary">Paid Amount</TableHead>
                    <TableHead className="text-primary">Due Amount</TableHead>
                    <TableHead className="text-primary">Invoice Date</TableHead>
                    <TableHead className="text-primary">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.map((invoice) => (
                    <TableRow
                      key={invoice.id}
                      className="border-primary/30 hover:bg-dark-gray cursor-pointer"
                      onClick={() => {
                        router.push(`/dashboard/invoices/${invoice.id}`);
                      }}
                    >
                      <TableCell className=" font-medium">
                        {invoice.invoice_number ||
                          `INV-${invoice.id.slice(0, 8)}`}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {invoice.customer_name || "Walk-in Customer"}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {formatCurrency(invoice.total || 0)}
                      </TableCell>
                      <TableCell className="text-green-400">
                        {formatCurrency(invoice.amount_paid || 0)}
                      </TableCell>
                      <TableCell
                        className={
                          invoice.due_amount > 0
                            ? "text-orange-400 font-medium"
                            : "text-gray-400"
                        }
                      >
                        {formatCurrency(invoice.due_amount || 0)}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {formatDate(invoice.created_at)}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(invoice.payment_status)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
