"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, X } from "lucide-react";
import type { Invoice } from "@/types/invoice";
import type { AppDispatch, RootState } from "@/store/store";
import { createPayment, clearErrors } from "@/store/paymentSlice";
import type { PaymentFormData } from "@/types/payment";
import { getCurrencySymbol } from "@/lib/currency";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: Invoice | null;
  shopId: string;
  onPaymentSuccess?: () => void;
  profile: {
    currency?: string;
  };
}

export default function PaymentModal({
  isOpen,
  onClose,
  invoice,
  shopId,
  onPaymentSuccess,
  profile
}: PaymentModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { saving, saveError } = useSelector(
    (state: RootState) => state.payment
  );

  const [paymentAmount, setPaymentAmount] = useState<string>("");
  const [validationError, setValidationError] = useState<string>("");

  // Calculate maximum payable amount
  const maxPayableAmount = invoice ? invoice.due_amount : 0;
  const totalAmount = invoice ? invoice.total : 0;
  const amountPaid = invoice ? invoice.amount_paid : 0;

  const currencySymbol = profile?.currency
    ? getCurrencySymbol(profile.currency)
    : "Rs.";

  // Reset form when modal opens/closes or invoice changes
  useEffect(() => {
    if (isOpen && invoice) {
      setPaymentAmount("");
      setValidationError("");
      dispatch(clearErrors());
    }
  }, [isOpen, invoice, dispatch]);

  const handleAmountChange = (value: string) => {
    // Allow only numbers and one decimal point
    const regex = /^(\d*\.?\d*)$/;
    if (value === "" || regex.test(value)) {
      setPaymentAmount(value);

      // Clear validation error when user starts typing
      if (validationError) {
        setValidationError("");
      }

      // Clear Redux errors
      if (saveError) {
        dispatch(clearErrors());
      }
    }
  };

  const validateAmount = (amount: number): boolean => {
    if (amount <= 0) {
      setValidationError("Payment amount must be greater than 0");
      return false;
    }

    if (amount > maxPayableAmount) {
      setValidationError(
        `Amount cannot exceed due amount of {currencySymbol}${maxPayableAmount.toLocaleString()}`
      );
      return false;
    }

    // Validate decimal places
    if (amount.toString().split(".")[1]?.length > 2) {
      setValidationError("Amount can have maximum 2 decimal places");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!invoice || !shopId) {
      setValidationError("Invoice or shop information is missing");
      return;
    }

    const amount = parseFloat(paymentAmount);
    if (isNaN(amount)) {
      setValidationError("Please enter a valid amount");
      return;
    }

    if (!validateAmount(amount)) {
      return;
    }

    const paymentData: PaymentFormData = {
      invoice_id: invoice.id,
      customer_id: invoice.customer_id,
      amount: amount,
      method: "cash",
    };

    try {
      await dispatch(createPayment({ shopId, paymentData })).unwrap();

      // Success - close modal and call success callback
      onClose();
      if (onPaymentSuccess) {
        onPaymentSuccess();
      }
    } catch (error) {
      // Error is already handled by Redux slice
      console.error("Payment creation failed:", error);
    }
  };

  const handleClose = () => {
    // Clear errors and close
    dispatch(clearErrors());
    setValidationError("");
    onClose();
  };

  if (!invoice) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-[#0a0a0a] border-[#D4AF37] text-white sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-[#D4AF37] text-xl">
              Add Payment
            </DialogTitle>
          </div>
          <DialogDescription className="text-gray-400">
            Invoice #{invoice.invoice_number || `INV-${invoice.id.slice(0, 8)}`}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-6">
          {/* Invoice Summary */}
          <div className="space-y-3 p-4 bg-[#1a1a1a] rounded-lg border border-[#D4AF37]/30">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Total Amount:</span>
              <span className="text-white font-medium">
                {currencySymbol}{totalAmount.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Amount Paid:</span>
              <span className="text-green-400">
                {currencySymbol}{amountPaid.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Due Amount:</span>
              <span className="text-orange-400 font-medium">
                {currencySymbol}{maxPayableAmount.toLocaleString()}
              </span>
            </div>
            <div className="pt-2 border-t border-gray-700">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Customer:</span>
                <span className="text-white">
                  {invoice.customer_name || "Walk-in Customer"}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="paymentAmount" className="text-gray-300">
                Payment Amount
              </Label>
              <div className="relative">
                <Input
                  id="paymentAmount"
                  type="text"
                  inputMode="decimal"
                  placeholder="Enter amount"
                  value={paymentAmount}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  autoFocus
                  disabled={saving}
                />
              </div>
            </div>

            {/* Error Messages */}
            {(validationError || saveError) && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-md">
                <p className="text-red-400 text-sm">
                  {validationError || saveError}
                </p>
              </div>
            )}

            {/* Success Preview */}
            {!validationError && parseFloat(paymentAmount) > 0 && (
              <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-md">
                <p className="text-green-400 text-sm">After this payment:</p>
                <div className="mt-1 flex justify-between">
                  <span className="text-gray-300">New Balance:</span>
                  <span className="text-white font-medium">
                    {(
                      maxPayableAmount - parseFloat(paymentAmount || "0")
                    ).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </div>
            )}

            <DialogFooter className="pt-4">
              <div className="flex w-full gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  className="flex-1 bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                  disabled={saving}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-[#D4AF37] text-black hover:bg-[#c5a030] font-medium"
                  disabled={
                    saving || !paymentAmount || parseFloat(paymentAmount) <= 0
                  }
                >
                  {saving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Add Payment"
                  )}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
