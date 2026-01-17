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
import { Separator } from "@/components/ui/separator";
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
  ArrowLeft,
  CreditCard,
  FileText,
  Receipt,
  Hash,
  Download,
} from "lucide-react";
import { format } from "date-fns";
import PaymentModal from "@/components/invoices/payment-modal";
import { fetchInvoiceDetails, clearCurrentInvoice } from "@/store/invoiceSlice";
import { fetchInvoicePayments } from "@/store/paymentSlice";
import { fetchProfile } from "@/store/profileSlice";
import { useInvoiceDownloader } from "@/hooks/useInvoiceDownloader";
import { getCurrencySymbol } from "@/lib/currency";

export default function InvoiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useSelector((state: RootState) => state.auth);
  const { profile } = useSelector((state: RootState) => state.profile);
  const { currentInvoice, error } = useSelector(
    (state: RootState) => state.invoices
  );
  const { payments } = useSelector((state: RootState) => state.payment);
  const { downloadInvoice } = useInvoiceDownloader();

  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const shopId = user?.id;
  const invoiceId = params.id as string;
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  useEffect(() => {
    if (!invoiceId || !shopId) return;

    const fetchData = async () => {
      try {
        setIsInitialLoading(true);

        await Promise.all([
          dispatch(fetchInvoiceDetails({ id: invoiceId, shopId })).unwrap(),
          dispatch(fetchInvoicePayments({ invoiceId, shopId })).unwrap(),
          dispatch(fetchProfile(user.id)).unwrap(),
        ]);
      } finally {
        setIsInitialLoading(false);
      }
    };

    fetchData();

    return () => {
      dispatch(clearCurrentInvoice());
    };
  }, [invoiceId, shopId, dispatch]);

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return (
          <Badge className="bg-green-500/10 text-green-400 border-green-500/30 px-3 py-1.5">
            <CheckCircle className="h-3.5 w-3.5 mr-2" />
            Paid
          </Badge>
        );
      case "partial":
        return (
          <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/30 px-3 py-1.5">
            <AlertCircle className="h-3.5 w-3.5 mr-2" />
            Partial
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-red-500/10 text-red-400 border-red-500/30 px-3 py-1.5">
            <Info className="h-3.5 w-3.5 mr-2" />
            Pending
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-500/10 text-gray-400 border-gray-500/30 px-3 py-1.5">
            Unknown
          </Badge>
        );
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "dd MMM yyyy 'at' hh:mm a");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "dd MMM yyyy");
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "hh:mm a");
  };

  const currencySymbol = profile?.currency
    ? getCurrencySymbol(profile.currency)
    : "Rs.";

  const handlePaymentSuccess = () => {
    if (shopId) {
      dispatch(fetchInvoiceDetails({ id: invoiceId, shopId }));
      dispatch(fetchInvoicePayments({ invoiceId, shopId }));
    }
  };

  const handleDownloadInvoice = () => {
    if (!currentInvoice.invoice || !profile) return;

    downloadInvoice({
      invoice: currentInvoice.invoice,
      items: currentInvoice.items ?? [],
      profile,
    });
  };

  if (isInitialLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] p-8 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-[#D4AF37] mx-auto mb-4" />
          <p className="text-gray-400">Loading invoice details...</p>
        </div>
      </div>
    );
  }

  if (error || !currentInvoice.invoice) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] p-8">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => router.push("/dashboard/invoices")}
            className="mb-6 text-gray-400 hover:text-white hover:bg-[#D4AF37]/30/30"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Invoices
          </Button>
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
                className="bg-[#D4AF37] hover:bg-[#c5a030] text-black font-medium"
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
    <div className="min-h-screen bg-[#0a0a0a] p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <Button
              variant="ghost"
              onClick={() => router.push("/dashboard/invoices")}
              className="mb-4 pl-0 text-gray-400 hover:text-white hover:bg-transparent"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Invoices
            </Button>
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <div>
                <div className="flex items-center gap-3">
                  <Receipt className="h-8 w-8 text-[#D4AF37]" />
                  <h1 className="text-2xl md:text-3xl font-bold text-white">
                    Invoice #
                    {invoice.invoice_number || `INV-${invoice.id.slice(0, 8)}`}
                  </h1>
                  {getPaymentStatusBadge(invoice.payment_status)}
                </div>
                <div className="flex items-center gap-4 mt-2 text-gray-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(invoice.created_at)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{formatTime(invoice.created_at)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 lg:mt-6">
            {balanceDue > 0 && (
              <Button
                onClick={() => setIsPaymentModalOpen(true)}
                className="bg-[#D4AF37] hover:bg-[#c5a030] text-black font-medium px-6"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Payment
              </Button>
            )}
            <Button
              onClick={handleDownloadInvoice}
              disabled={!currentInvoice.invoice}
              variant="outline"
              className="border-[#D4AF37]/30 text-gray-300 hover:text-white hover:bg-[#D4AF37]/30/50 "
            >
              <Download className="h-4 w-4 mr-2" />
              Downlaod PDF
            </Button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Invoice Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Invoice & Customer Info Card */}
            <Card className="bg-[#0f0f0f] border-[#D4AF37]">
              <CardHeader className="pb-4">
                <CardTitle className="text-white text-lg">
                  Invoice Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Shop Information */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-4 pb-2 border-b border-[#D4AF37]/30">
                      SHOP INFORMATION
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-white font-medium">
                          {profile?.business_name}
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-300">
                          {profile?.business_address}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-300">{profile?.phone}</span>
                      </div>
                    </div>
                  </div>

                  {/* Customer Information */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-4 pb-2 border-b border-[#D4AF37]/30">
                      CUSTOMER INFORMATION
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <User className="h-4 w-4 text-gray-500" />
                        <p className="text-white font-medium">
                          {invoice.customer_name || "Walk-in Customer"}
                        </p>
                      </div>
                      {invoice.customer_phone && (
                        <div className="flex items-center gap-3">
                          <Phone className="h-4 w-4 text-gray-500" />
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

            {/* Products Table Card */}
            <Card className="bg-[#0f0f0f] border-[#D4AF37]">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white text-lg">Products</CardTitle>
                  <Badge
                    variant="outline"
                    className="text-gray-400 border-[#D4AF37]/30"
                  >
                    {items.length} {items.length === 1 ? "Item" : "Items"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className=" ">
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
                          Qty
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
                        items.map((item, index) => (
                          <TableRow
                            key={item.id}
                            className="border-[#D4AF37]/30 hover:bg-[#1a1a1a]"
                          >
                            <TableCell>
                              <div>
                                <p className="text-white font-medium">
                                  {item.product_name}
                                </p>
                                {item.product_id && (
                                  <p className="text-xs text-gray-500 mt-1">
                                    SKU: {item.product_id.slice(0, 8)}
                                  </p>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="text-gray-300 text-right">
                              {currencySymbol}{item.price}
                            </TableCell>
                            <TableCell className="text-gray-300 text-right">
                              {item.quantity}
                            </TableCell>
                            <TableCell className="text-white font-medium text-right">
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

            {/* Payment History Card */}
            <Card className="bg-[#0f0f0f] border-[#D4AF37]">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white text-lg">
                    Payment History
                  </CardTitle>
                  <Badge
                    variant="outline"
                    className="text-gray-400 border-[#D4AF37]/30"
                  >
                    {payments.length}{" "}
                    {payments.length === 1 ? "Payment" : "Payments"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {payments.length === 0 ? (
                  <div className="text-center py-8 border-2 border-dashed border-[#D4AF37]/30 rounded-lg">
                    <CreditCard className="h-12 w-12 text-gray-700 mx-auto mb-3" />
                    <p className="text-gray-400">No payments recorded yet</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {payments.map((payment) => (
                      <div
                        key={payment.id}
                        className="flex items-center justify-between p-4 bg-gray-900/30 rounded-lg border border-[#D4AF37]/30 hover:border-[#D4AF37]/30 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-[#D4AF37]/30 rounded-lg">
                            <CreditCard className="h-5 w-5 text-gray-400" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-white font-medium">
                                {payment.method.charAt(0).toUpperCase() +
                                  payment.method.slice(1)}
                              </span>
                              <Badge
                                variant="outline"
                                className="text-green-400 border-green-500/30 bg-green-500/10 text-xs"
                              >
                                Completed
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-400 mt-1">
                              {formatDateTime(payment.created_at)}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-green-400 font-bold text-lg">
                           {currencySymbol}{payment.amount}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Summary & Actions */}
          <div className="space-y-6">
            {/* Amount Summary Card */}
            <Card className="bg-[#0f0f0f] border-[#D4AF37]">
              <CardHeader className="pb-4">
                <CardTitle className="text-white text-lg">
                  Amount Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Subtotal</span>
                    <span className="text-white">{currencySymbol}{grandTotal}</span>
                  </div>

                  <Separator className="bg-[#D4AF37]/30" />

                  <div className="flex justify-between items-center">
                    <span className="text-white font-semibold">
                      Grand Total
                    </span>
                    <span className="text-white font-bold text-xl">
                      {currencySymbol}{grandTotal}
                    </span>
                  </div>

                  <Separator className="bg-[#D4AF37]/30" />

                  <div className="flex justify-between items-center pt-2">
                    <span className="text-gray-400">Amount Paid</span>
                    <span className="text-green-400 font-medium">
                      {currencySymbol}{amountPaid}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Balance Due</span>
                    <span
                      className={`font-bold text-lg ${
                        balanceDue > 0 ? "text-amber-400" : "text-green-400"
                      }`}
                    >
                      {currencySymbol}{balanceDue}
                    </span>
                  </div>

                  {balanceDue > 0 ? (
                    <div className="pt-4">
                      <Button
                        onClick={() => setIsPaymentModalOpen(true)}
                        className="w-full bg-[#D4AF37] hover:bg-[#c5a030] text-black font-medium py-3"
                      >
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add Payment
                      </Button>
                    </div>
                  ) : (
                    <div className="pt-4">
                      <div className="flex items-center justify-center gap-2 text-green-400 bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                        <CheckCircle className="h-4 w-4" />
                        <span className="font-medium">Invoice Fully Paid</span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions Card */}
            <Card className="bg-[#0f0f0f] border-[#D4AF37]">
              <CardHeader className="pb-4">
                <CardTitle className="text-white text-lg">
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start border-[#D4AF37]/30 "
                  onClick={handleDownloadInvoice}
                  disabled={!currentInvoice.invoice}
                >
                  <Download className="h-4 w-4 mr-3" />
                  Downlaod PDF
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start border-[#D4AF37]/30 text-gray-300 hover:text-white hover:bg-[#D4AF37]/30/50 "
                  onClick={() => router.push("/dashboard/invoices")}
                >
                  <FileText className="h-4 w-4 mr-3" />
                  View All Invoices
                </Button>
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
          profile={profile || { currency: "pkr" }}
        />
      )}
    </div>
  );
}
