"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Printer,
  PlusCircle,
  Loader2,
  Calendar,
  User,
  Phone,
  MapPin,
  DollarSign,
  Package,
  Clock,
  CheckCircle,
  AlertCircle,
  Info,
  Mail,
  CreditCard,
  Smartphone,
  FileText,
} from "lucide-react";
import { format } from "date-fns";
import PaymentModal from "@/components/invoices/payment-modal";
import { fetchInvoiceDetails, clearCurrentInvoice } from "@/store/invoiceSlice";
import { fetchInvoicePayments } from "@/store/paymentSlice";
import { fetchProfile } from "@/store/profileSlice";

export default function InvoiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useSelector((state: RootState) => state.auth);
  const { profile } = useSelector((state: RootState) => state.profile);

  const { currentInvoice, loading, error } = useSelector(
    (state: RootState) => state.invoices
  );
  const { payments } = useSelector((state: RootState) => state.payment);

  const shopId = user?.id;
  const invoiceId = params.id as string;

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  useEffect(() => {
    if (invoiceId && shopId) {
      dispatch(fetchInvoiceDetails({ id: invoiceId, shopId }));
      dispatch(fetchInvoicePayments({ invoiceId, shopId }));
      dispatch(fetchProfile(user.id));
    }

    // Cleanup on unmount
    return () => {
      dispatch(clearCurrentInvoice());
    };
  }, [invoiceId, shopId, dispatch]);

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return (
          <Badge className="bg-green-500/20 text-green-400 border-green-500 px-3 py-1">
            <CheckCircle className="h-3 w-3 mr-1" />
            Paid
          </Badge>
        );
      case "partial":
        return (
          <Badge className="bg-orange-500/20 text-orange-400 border-orange-500 px-3 py-1">
            <AlertCircle className="h-3 w-3 mr-1" />
            Partial
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-red-500/20 text-red-400 border-red-500 px-3 py-1">
            <Info className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-500/20 text-gray-400 border-gray-500 px-3 py-1">
            Unknown
          </Badge>
        );
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "dd MMM yyyy 'at' hh:mm a");
  };

  const handlePrintInvoice = () => {
    window.print();
  };

  const handlePaymentSuccess = () => {
    // Refresh data after successful payment
    if (shopId) {
      dispatch(fetchInvoiceDetails({ id: invoiceId, shopId }));
      dispatch(fetchInvoicePayments({ invoiceId, shopId }));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] p-8 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-[#D4AF37] mx-auto mb-4" />
          <p className="text-gray-400">Loading invoice details...</p>
        </div>
      </div>
    );
  }

  if (error || !currentInvoice.invoice ) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] p-8">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-[#0a0a0a] border-red-500/30">
            <CardContent className="pt-6 text-center">
              <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Invoice Not Found
              </h3>
              <p className="text-gray-400 mb-6">
                {error ||
                  "The invoice you're looking for doesn't exist or you don't have permission to view it."}
              </p>
              <Button
                onClick={() => router.push("/dashboard/invoices")}
                className="bg-[#8E7525] hover:bg-[#A38A2E]"
              >
                Back to Invoices
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const { invoice } = currentInvoice;
  const { items } = currentInvoice;

  const grandTotal = invoice.total;
  const amountPaid = invoice.amount_paid || 0;
  const balanceDue = invoice.due_amount || 0;

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with Back Button */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                Invoice #
                {invoice.invoice_number || `INV-${invoice.id.slice(0, 8)}`}
              </h1>
              <p className="text-gray-400 flex items-center gap-2 mt-1">
                <Calendar className="h-4 w-4" />
                {formatDateTime(invoice.created_at)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {balanceDue > 0 && (
              <Button
                onClick={() => setIsPaymentModalOpen(true)}
                className="bg-[#8E7525] hover:bg-[#A38A2E] text-white"
                // className="bg-green-600 hover:bg-green-700 text-white"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Payment
              </Button>
            )}
            <Button
              onClick={handlePrintInvoice}
              variant="outline"
              className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10"
            >
              <Printer className="h-4 w-4 mr-2" />
              Print Invoice
            </Button>
            {getPaymentStatusBadge(invoice.payment_status)}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Invoice & Customer Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Invoice Details Card */}
            <Card className="bg-[#0a0a0a] border-[#D4AF37]/30">
              <CardHeader>
                <CardTitle className="text-[#D4AF37] flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Invoice Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-3">
                      Shop Information
                    </h3>
                    <div className="space-y-2">
                      <p className="text-white">{profile?.business_name}</p>
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-400">
                            {profile?.business_address}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-300">{profile?.phone}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-3">
                      Customer Information
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="text-white">
                          {invoice.customer_name || "Walk-in Customer"}
                        </span>
                      </div>
                      {invoice.customer_phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-300">
                            {invoice.customer_phone}
                          </span>
                        </div>
                      )}
                    
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Products Sold Section */}
            <Card className="bg-[#0a0a0a] border-[#D4AF37]/30">
              <CardHeader>
                <CardTitle className="text-[#D4AF37] flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Products Sold
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-[#D4AF37]/30">
                        <TableHead className="text-[#D4AF37]">
                          Product
                        </TableHead>
                        <TableHead className="text-[#D4AF37] text-right">
                          Price
                        </TableHead>
                        <TableHead className="text-[#D4AF37] text-right">
                          Quantity
                        </TableHead>
                        <TableHead className="text-[#D4AF37] text-right">
                          Total
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {items.length === 0 ? (
                        <TableRow>
                          <TableCell
                            colSpan={4}
                            className="text-center text-gray-400 py-8"
                          >
                            No items found in this invoice
                          </TableCell>
                        </TableRow>
                      ) : (
                        items.map((item) => (
                          <TableRow
                            key={item.id}
                            className="border-[#D4AF37]/30"
                          >
                            <TableCell>
                              <div>
                                <p className="text-white font-medium">
                                  {item.product_name}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell className="text-right text-white">
                              {item.price}
                            </TableCell>
                            <TableCell className="text-right text-white">
                              {item.quantity}
                            </TableCell>
                            <TableCell className="text-right text-white font-medium">
                              {item.price * item.quantity}
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Payment History Section */}
            <Card className="bg-[#0a0a0a] border-[#D4AF37]/30">
              <CardHeader>
                <CardTitle className="text-[#D4AF37] flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Payment History
                </CardTitle>
                <CardDescription className="text-gray-400">
                  All payments made for this invoice
                </CardDescription>
              </CardHeader>
              <CardContent>
                {payments.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    No payments recorded yet
                  </div>
                ) : (
                  <div className="space-y-4">
                    {payments.map((payment) => (
                      <div
                        key={payment.id}
                        className="p-4 bg-[#1a1a1a] rounded-lg border border-gray-800"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-white font-medium">
                                {payment.method.charAt(0).toUpperCase() +
                                  payment.method.slice(1)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-400 mt-1">
                              {formatDateTime(payment.created_at)}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-green-400 font-bold text-lg">
                              {payment.amount}
                            </p>
                          </div>
                        </div>
                        {payment.notes && (
                          <p className="text-sm text-gray-400 mt-2">
                            Notes: {payment.notes}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Amount Summary */}
          <div className="space-y-6">
            {/* Amount Summary Card */}
            <Card className="bg-[#0a0a0a] border-[#D4AF37]/30">
              <CardHeader>
                <CardTitle className="text-[#D4AF37]">Amount Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-bold"> Total</span>
                    <span className="text-white font-bold text-lg">
                      {grandTotal}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                    <span className="text-gray-400">Amount Paid</span>
                    <span className="text-green-400 font-medium">
                      {amountPaid}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Balance Due</span>
                    <span
                      className={
                        balanceDue > 0
                          ? "text-orange-400 font-bold text-lg"
                          : "text-green-400 font-bold text-lg"
                      }
                    >
                      {balanceDue}
                    </span>
                  </div>

                  {balanceDue > 0 && (
                    <div className="pt-4 border-t border-gray-700">
                      <Button
                        onClick={() => setIsPaymentModalOpen(true)}
                        className="w-full bg-[#8E7525] hover:bg-[#A38A2E] text-white py-3"
                      >
                        <PlusCircle className="h-5 w-5 mr-2" />
                        Make Payment
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      {/* Payment Modal */}
      {shopId && (
        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          invoice={invoice}
          shopId={shopId}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
}
