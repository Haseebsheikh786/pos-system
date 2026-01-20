"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, Save, CheckCircle, AlertCircle } from "lucide-react";
import { createInvoice } from "@/store/invoiceSlice";
import type { InvoiceFormData } from "@/types/invoice";
import { getCurrencySymbol } from "@/lib/currency";

type BillItem = {
  id: number;
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  total: number;
  currentStock: number;
};

interface InvoicePreviewProps {
  billItems: BillItem[];
  customerId: string | null;
  customerName: string;
  customerPhone: string;
  subtotal: number;
  total: number;
  invoiceNumber: string;
  onPrint: () => void;
  onDownload: () => void;
  onClose: () => void;
  onSaveSuccess?: () => void;
  profile: {
    currency?: string;
  };
}

export default function InvoicePreview({
  billItems,
  customerId,
  customerName,
  customerPhone,
  subtotal,
  total,
  invoiceNumber,
  onDownload,
  onClose,
  onSaveSuccess,
  profile,
}: InvoicePreviewProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { saving, saveError } = useSelector(
    (state: RootState) => state.invoices,
  );
  const [paymentAmount, setPaymentAmount] = useState<string>(total.toString());
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const invoiceDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const currencySymbol = profile?.currency
    ? getCurrencySymbol(profile.currency)
    : "Rs.";

  // Calculate change for cash payments
  useEffect(() => {
    // Auto-fill payment amount with total if less than total
    if (parseFloat(paymentAmount) > total) {
      setPaymentAmount(total.toString());
    }
  }, [total, paymentAmount]);

  // Handle payment amount change
  useEffect(() => {
    const amount = parseFloat(paymentAmount) || 0;
    if (amount > total) {
      setPaymentAmount(total.toString());
    }
  }, [paymentAmount, total]);

  const handleSaveInvoice = async () => {
    if (!user?.id) return;
    if (billItems.length === 0) {
      alert("No items in the invoice");
      return;
    }

    const payment = parseFloat(paymentAmount) || 0;
    if (payment < 0) {
      alert("Payment amount cannot be negative");
      return;
    }

    if (payment > total) {
      alert("Payment amount cannot exceed total amount");
      return;
    }

    setIsSaving(true);

    try {
      const invoiceData: InvoiceFormData = {
        customer_id: customerId,
        customer_name: customerName,
        customer_phone: customerPhone,
        items: billItems.map((item) => ({
          product_id: item.productId,
          product_name: item.productName,
          price: item.price,
          quantity: item.quantity,
          total: item.total,
        })),
        subtotal: subtotal,
        discount_amount: 0,
        tax_amount: 0,
        total: total,
        payment_amount: payment,
        invoice_number: invoiceNumber,
      };

      await dispatch(
        createInvoice({
          shopId: user.id,
          invoiceData,
        }),
      ).unwrap();

      setSaveSuccess(true);
      setTimeout(() => {
        onSaveSuccess?.();
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Failed to save invoice:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const getPaymentStatus = () => {
    const paid = parseFloat(paymentAmount) || 0;
    if (paid >= total)
      return {
        text: "Fully Paid",
        color: "text-green-400",
        bg: "bg-green-500/10",
      };
    if (paid > 0)
      return {
        text: "Partial Payment",
        color: "text-orange-400",
        bg: "bg-orange-500/10",
      };
    return {
      text: "Pending Payment",
      color: "text-red-400",
      bg: "bg-red-500/10",
    };
  };

  const paymentStatus = getPaymentStatus();

  return (
    <DialogContent className="bg-card border-primary max-w-4xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className=" flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-primary" />
          Complete Invoice
        </DialogTitle>
        <DialogDescription className="text-gray-400">
          Review invoice details and process payment
        </DialogDescription>
      </DialogHeader>

      {saveError && (
        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
          <p className="text-red-400 text-sm flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            Error: {saveError}
          </p>
        </div>
      )}

      {saveSuccess && (
        <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
          <p className="text-green-400 text-sm flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Invoice saved successfully! Redirecting...
          </p>
        </div>
      )}

      <div className="py-4 space-y-6" id="invoice-content">
        {/* Invoice Header */}
        <div className="border-b border-primary pb-4">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-primary">INVOICE</h2>
              <div className="mt-2 space-y-1">
                <p className="text-gray-400 text-sm">
                  Invoice #{invoiceNumber}
                </p>
                <p className="text-gray-400 text-sm">Date: {invoiceDate}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Info */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <Label className="text-gray-400 text-sm">Customer</Label>
            <p className=" font-medium mt-1">
              {customerName || "Walk-in Customer"}
            </p>
          </div>
          <div className="text-right">
            <Label className="text-gray-400 text-sm">Total Amount</Label>
            <p className="text-2xl font-bold text-primary mt-1">
              {currencySymbol}
              {total.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Invoice Items */}
        <div className="border border-primary/30 rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-primary/30 bg-dark-gray">
                <TableHead className="text-primary">Item</TableHead>
                <TableHead className="text-primary text-right">Price</TableHead>
                <TableHead className="text-primary text-right">Qty</TableHead>
                <TableHead className="text-primary text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {billItems.map((item) => (
                <TableRow
                  key={item.id}
                  className="border-primary/30 hover:bg-dark-gray"
                >
                  <TableCell className="">{item.productName}</TableCell>
                  <TableCell className="text-gray-300 text-right">
                    {currencySymbol}
                    {item.price}
                  </TableCell>
                  <TableCell className="text-gray-300 text-right">
                    {item.quantity}
                  </TableCell>
                  <TableCell className=" text-right">
                    {currencySymbol}
                    {item.total.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Amount Summary */}
        <div className="space-y-2">
          <div className="flex justify-between text-gray-300">
            <span>Subtotal:</span>
            <span>
              {currencySymbol}
              {subtotal.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between  text-lg font-bold">
            <span>Total Amount:</span>
            <span className="text-primary">
              {currencySymbol}
              {total.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Payment Section */}
        <div className="border-t border-primary/30 pt-4">
          <h3 className="text-lg font-semibold  mb-4">Payment Details</h3>

          {/* Payment Amount */}
          <div className="grid   gap-4 mb-4">
            <div>
              <Label
                htmlFor="payment-amount"
                className="text-gray-300 mb-2 block"
              >
                Payment Amount
              </Label>
              <Input
                id="payment-amount"
                type="number"
                min="0"
                max={total}
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                className="bg-dark-gray border-primary/30 "
                disabled={isSaving || saving}
              />
              <p className="text-xs text-gray-400 mt-1">
                Enter 0 for credit sale
              </p>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="bg-dark-gray border border-primary/30 rounded-lg p-4 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400 text-sm">Total Amount</p>
                <p className=" text-xl font-bold">
                  {currencySymbol}
                  {total.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Payment</p>
                <p className=" text-xl font-bold">
                  {currencySymbol}
                  {(parseFloat(paymentAmount) || 0).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Due Amount</p>
                <p
                  className={`text-lg font-bold ${
                    total - (parseFloat(paymentAmount) || 0) > 0
                      ? "text-orange-400"
                      : "text-green-400"
                  }`}
                >
                  {currencySymbol}
                  {(total - (parseFloat(paymentAmount) || 0)).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Status</p>
                <p className={`text-sm font-medium ${paymentStatus.color}`}>
                  {paymentStatus.text}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-primary/30">
          <Button
            onClick={onDownload}
            variant="outline"
            className="flex-1 border-primary text-primary hover:bg-primary/10"
            disabled={isSaving || saving}
          >
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
          <Button
            onClick={handleSaveInvoice}
            className="flex-1 "
            disabled={isSaving || saving}
          >
            {isSaving || saving ? (
              <>
                <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Invoice
              </>
            )}
          </Button>
          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1 border-gray-600 text-gray-300 hover:"
            disabled={isSaving || saving}
          >
            Cancel
          </Button>
        </div>

        {/* Help Text */}
        <div className="text-center text-gray-500 text-sm">
          <p>Click "Save Invoice" to save this transaction to your records</p>
          <p className="text-xs mt-1">
            Invoice will be automatically saved with payment details
          </p>
        </div>
      </div>
    </DialogContent>
  );
}
