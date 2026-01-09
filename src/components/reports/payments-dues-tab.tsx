"use client";

import { useState } from "react";
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

interface PaymentsDuesTabProps {
  dateRange: string;
}

export default function PaymentsDuesTab({ dateRange }: PaymentsDuesTabProps) {
  // Mock data
  const summaryCards = [
    {
      title: "Total Collected",
      value: "Rs. 1,450,000",
      icon: DollarSign,
      description: "Cash & other payments",
      color: "border-green-500",
    },
    {
      title: "Total Due (Udhaar)",
      value: "Rs. 163,000",
      icon: CreditCard,
      description: "Outstanding payments",
      color: "border-orange-500",
    },
    {
      title: "Paid Invoices",
      value: "3,842",
      icon: CheckCircle,
      description: "Fully paid orders",
      color: "border-blue-500",
    },
    {
      title: "Pending Invoices",
      value: "948",
      icon: AlertCircle,
      description: "Partial + Due payments",
      color: "border-red-500",
    },
  ];

  const allPayments = [
    {
      invoiceNumber: "INV-001234",
      customerName: "John Doe",
      invoiceTotal: 15000,
      paidAmount: 5000,
      dueAmount: 10000,
      invoiceDate: "2024-01-15",
      status: "partial",
      paymentMethod: "Cash",
    },
    {
      invoiceNumber: "INV-001233",
      customerName: "Jane Smith",
      invoiceTotal: 8500,
      paidAmount: 0,
      dueAmount: 8500,
      invoiceDate: "2024-01-14",
      status: "due",
      paymentMethod: "Credit",
    },
    {
      invoiceNumber: "INV-001232",
      customerName: "Raj Kumar",
      invoiceTotal: 12000,
      paidAmount: 12000,
      dueAmount: 0,
      invoiceDate: "2024-01-13",
      status: "paid",
      paymentMethod: "Card",
    },
    {
      invoiceNumber: "INV-001231",
      customerName: "Priya Sharma",
      invoiceTotal: 5600,
      paidAmount: 5600,
      dueAmount: 0,
      invoiceDate: "2024-01-12",
      status: "paid",
      paymentMethod: "Cash",
    },
    {
      invoiceNumber: "INV-001230",
      customerName: "Amit Patel",
      invoiceTotal: 9800,
      paidAmount: 3000,
      dueAmount: 6800,
      invoiceDate: "2024-01-11",
      status: "partial",
      paymentMethod: "UPI",
    },
    {
      invoiceNumber: "INV-001229",
      customerName: "Rohan Mehta",
      invoiceTotal: 7500,
      paidAmount: 7500,
      dueAmount: 0,
      invoiceDate: "2024-01-10",
      status: "paid",
      paymentMethod: "Cash",
    },
    {
      invoiceNumber: "INV-001228",
      customerName: "Sneha Reddy",
      invoiceTotal: 12500,
      paidAmount: 0,
      dueAmount: 12500,
      invoiceDate: "2024-01-09",
      status: "due",
      paymentMethod: "Credit",
    },
    {
      invoiceNumber: "INV-001227",
      customerName: "Vikram Singh",
      invoiceTotal: 6800,
      paidAmount: 6800,
      dueAmount: 0,
      invoiceDate: "2024-01-08",
      status: "paid",
      paymentMethod: "Card",
    },
  ];

  const [customerFilter, setCustomerFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentTypeFilter, setPaymentTypeFilter] = useState("all");

  // Filter payments based on selections
  const filteredPayments = allPayments.filter((payment) => {
    if (customerFilter !== "all" && payment.customerName !== customerFilter)
      return false;

    if (statusFilter !== "all" && payment.status !== statusFilter) return false;

    if (
      paymentTypeFilter !== "all" &&
      payment.paymentMethod !== paymentTypeFilter
    )
      return false;

    return true;
  });

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
      case "due":
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

  // Calculate totals
  const totalCollected = filteredPayments.reduce(
    (sum, p) => sum + p.paidAmount,
    0
  );
  const totalDue = filteredPayments.reduce((sum, p) => sum + p.dueAmount, 0);
  const paidInvoices = filteredPayments.filter(
    (p) => p.status === "paid"
  ).length;
  const pendingInvoices = filteredPayments.filter(
    (p) => p.status !== "paid"
  ).length;

  return (
    <div className="space-y-6">
      {/* Summary Cards - Now dynamic */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-[#0a0a0a] border-[#D4AF37]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Total Collected
            </CardTitle>
            <div className="p-2 rounded-full bg-[#1a1a1a]">
              <DollarSign className="h-4 w-4 text-[#D4AF37]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white mb-1">
              Rs. {totalCollected.toLocaleString()}
            </div>
            <p className="text-sm text-gray-400">Cash & other payments</p>
          </CardContent>
        </Card>

        <Card className="bg-[#0a0a0a] border-[#D4AF37]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Total Due (Udhaar)
            </CardTitle>
            <div className="p-2 rounded-full bg-[#1a1a1a]">
              <CreditCard className="h-4 w-4 text-[#D4AF37]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white mb-1">
              Rs. {totalDue.toLocaleString()}
            </div>
            <p className="text-sm text-gray-400">Outstanding payments</p>
          </CardContent>
        </Card>

        <Card className="bg-[#0a0a0a] border-[#D4AF37]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Paid Invoices
            </CardTitle>
            <div className="p-2 rounded-full bg-[#1a1a1a]">
              <CheckCircle className="h-4 w-4 text-[#D4AF37]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white mb-1">
              {paidInvoices}
            </div>
            <p className="text-sm text-gray-400">Fully paid orders</p>
          </CardContent>
        </Card>

        <Card className="bg-[#0a0a0a] border-[#D4AF37]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Pending Invoices
            </CardTitle>
            <div className="p-2 rounded-full bg-[#1a1a1a]">
              <AlertCircle className="h-4 w-4 text-[#D4AF37]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white mb-1">
              {pendingInvoices}
            </div>
            <p className="text-sm text-gray-400">Partial + Due payments</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-[#0a0a0a] border-[#D4AF37]">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex items-center gap-2">
              <Label className="text-gray-300">Customer:</Label>
              <Select value={customerFilter} onValueChange={setCustomerFilter}>
                <SelectTrigger className="w-48 bg-[#1a1a1a] border-[#D4AF37]/30 text-white">
                  <SelectValue placeholder="All Customers" />
                </SelectTrigger>
                <SelectContent className="bg-[#0a0a0a] border-[#D4AF37] text-white">
                  <SelectItem value="all">All Customers</SelectItem>
                  <SelectItem value="John Doe">John Doe</SelectItem>
                  <SelectItem value="Jane Smith">Jane Smith</SelectItem>
                  <SelectItem value="Raj Kumar">Raj Kumar</SelectItem>
                  <SelectItem value="Priya Sharma">Priya Sharma</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Label className="text-gray-300">Status:</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48 bg-[#1a1a1a] border-[#D4AF37]/30 text-white">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent className="bg-[#0a0a0a] border-[#D4AF37] text-white">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="partial">Partial</SelectItem>
                  <SelectItem value="due">Due</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Label className="text-gray-300">Payment Type:</Label>
              <Select
                value={paymentTypeFilter}
                onValueChange={setPaymentTypeFilter}
              >
                <SelectTrigger className="w-48 bg-[#1a1a1a] border-[#D4AF37]/30 text-white">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent className="bg-[#0a0a0a] border-[#D4AF37] text-white">
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="Card">Card</SelectItem>
                  <SelectItem value="UPI">UPI</SelectItem>
                  <SelectItem value="Credit">Credit</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payments Table (All Payments) */}
      <Card className="bg-[#0a0a0a] border-[#D4AF37]">
        <CardHeader>
          <CardTitle className="text-white">
            All Payments{" "}
            {filteredPayments.length > 0 && `(${filteredPayments.length})`}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-[#D4AF37]/30">
                  <TableHead className="text-[#D4AF37]">Invoice #</TableHead>
                  <TableHead className="text-[#D4AF37]">
                    Customer Name
                  </TableHead>
                  <TableHead className="text-[#D4AF37]">
                    Invoice Total
                  </TableHead>
                  <TableHead className="text-[#D4AF37]">Paid Amount</TableHead>
                  <TableHead className="text-[#D4AF37]">Due Amount</TableHead>
                  <TableHead className="text-[#D4AF37]">Invoice Date</TableHead>
                  <TableHead className="text-[#D4AF37]">
                    Payment Method
                  </TableHead>
                  <TableHead className="text-[#D4AF37]">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="text-center text-gray-400 py-8"
                    >
                      No payments found with the selected filters
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPayments.map((payment, index) => (
                    <TableRow key={index} className="border-[#D4AF37]/30">
                      <TableCell className="text-white font-medium">
                        {payment.invoiceNumber}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {payment.customerName}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        Rs. {payment.invoiceTotal.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-green-400">
                        Rs. {payment.paidAmount.toLocaleString()}
                      </TableCell>
                      <TableCell
                        className={
                          payment.dueAmount > 0
                            ? "text-orange-400 font-medium"
                            : "text-gray-400"
                        }
                      >
                        Rs. {payment.dueAmount.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {payment.invoiceDate}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {payment.paymentMethod}
                      </TableCell>
                      <TableCell>{getStatusBadge(payment.status)}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
