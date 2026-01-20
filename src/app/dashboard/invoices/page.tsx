"use client";

import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { Button } from "@/components/ui/button";
import { FileText, Plus, Loader2 } from "lucide-react";
import InvoiceStats from "@/components/invoices/invoice-stats";
import InvoiceFilters from "@/components/invoices/invoice-filters";
import InvoiceList from "@/components/invoices/invoice-list";
import { fetchInvoices } from "@/store/invoiceSlice";
import { fetchCustomers } from "@/store/customerSlice";
import type { Invoice } from "@/types/invoice";
import PaymentModal from "@/components/invoices/payment-modal";
import useInvoiceDownloader from "@/hooks/useInvoiceDownloader";
import { fetchProfile } from "@/store/profileSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function InvoicePage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { downloadInvoice } = useInvoiceDownloader();
  const { user } = useSelector((state: RootState) => state.auth);

  // Get invoices from Redux store
  const { invoices, loading: invoicesLoading } = useSelector(
    (state: RootState) => state.invoices,
  );
  const { profile } = useSelector((state: RootState) => state.profile);
  // Get customers from Redux store
  const { items: customers, loading: customersLoading } = useSelector(
    (state: RootState) => state.customers,
  );

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("all");
  const [customerId, setCustomerId] = useState("all");
  const [dateRange, setDateRange] = useState("all");
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  // Fetch invoices and customers on component mount
  useEffect(() => {
    if (user?.id) {
      dispatch(
        fetchInvoices({
          shopId: user.id,
        }),
      );
      dispatch(fetchProfile(user.id)).unwrap();
      dispatch(fetchCustomers(user.id));
    }
  }, [dispatch, user?.id]);

  // Filter invoices based on criteria
  const filteredInvoices = useMemo(() => {
    return invoices.filter((invoice: Invoice) => {
      // Search filter
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch =
          invoice.invoice_number?.toLowerCase().includes(searchLower) ||
          invoice.customer_name?.toLowerCase().includes(searchLower) ||
          invoice.customer_phone?.includes(searchQuery);

        if (!matchesSearch) return false;
      }

      // Payment status filter
      if (paymentStatus !== "all" && invoice.payment_status !== paymentStatus) {
        return false;
      }

      // Customer filter
      if (customerId !== "all" && invoice.customer_id !== customerId) {
        return false;
      }

      // Date range filter
      if (dateRange !== "all") {
        const invoiceDate = new Date(invoice.created_at);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        switch (dateRange) {
          case "today":
            if (invoiceDate.toDateString() !== today.toDateString())
              return false;
            break;
          case "yesterday":
            if (invoiceDate.toDateString() !== yesterday.toDateString())
              return false;
            break;
          case "this_week":
            const startOfWeek = new Date(today);
            startOfWeek.setDate(today.getDate() - today.getDay());
            if (invoiceDate < startOfWeek) return false;
            break;
          case "this_month":
            if (
              invoiceDate.getMonth() !== today.getMonth() ||
              invoiceDate.getFullYear() !== today.getFullYear()
            )
              return false;
            break;
          case "last_month":
            const lastMonth = new Date(today);
            lastMonth.setMonth(lastMonth.getMonth() - 1);
            if (
              invoiceDate.getMonth() !== lastMonth.getMonth() ||
              invoiceDate.getFullYear() !== lastMonth.getFullYear()
            )
              return false;
            break;
        }
      }

      return true;
    });
  }, [invoices, searchQuery, paymentStatus, customerId, dateRange]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setPaymentStatus("all");
    setCustomerId("all");
    setDateRange("all");
  };

  const handleViewInvoice = (invoice: Invoice) => {
    router.push(`/dashboard/invoices/${invoice.id}`);
  };

  const handlePrintInvoice = (invoice: Invoice) => {
    if (invoice && invoice.items && profile) {
      downloadInvoice({ invoice, items: invoice.items, profile });
    }
  };

  const handleAddPayment = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = () => {
    if (!user) return;
    dispatch(
      fetchInvoices({
        shopId: user.id,
      }),
    );
    dispatch(fetchCustomers(user.id));
  };

  const loading = invoicesLoading || customersLoading;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold  mb-2">Invoice Management</h1>
          <p className="text-gray-400">
            View and manage all invoices and payments.
          </p>
        </div>
        <Link
          href={`/dashboard/billing`}
          prefetch={true}
          className="font-medium  hover:text-primary transition-colors"
        >
          <Button className="" disabled={loading}>
            <Plus className="mr-2 h-4 w-4" />
            Create New Invoice
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <InvoiceStats
        invoices={filteredInvoices}
        loading={loading}
        profile={profile || { currency: "pkr" }}
      />

      {/* Filters */}
      <InvoiceFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        paymentStatus={paymentStatus}
        onPaymentStatusChange={setPaymentStatus}
        customerId={customerId}
        onCustomerChange={setCustomerId}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        customers={customers}
        loading={loading}
        onClearFilters={handleClearFilters}
      />

      {/* Invoices Count */}
      <div className="mb-4 flex items-center justify-between">
        <div className="text-gray-400">
          Showing{" "}
          <span className=" font-medium">{filteredInvoices.length}</span>{" "}
          invoice(s)
        </div>
        <div className="text-sm text-gray-400">
          {loading ? "Loading..." : ""}
        </div>
      </div>

      {/* Invoices Table */}
      {loading && filteredInvoices.length === 0 ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-3 text-gray-400">Loading invoices...</span>
        </div>
      ) : (
        <InvoiceList
          invoices={filteredInvoices}
          loading={loading}
          onViewInvoice={handleViewInvoice}
          onAddPayment={handleAddPayment}
          onPrintInvoice={handlePrintInvoice}
          profile={profile || { currency: "pkr" }}
        />
      )}
      {user && (
        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          invoice={selectedInvoice}
          shopId={user?.id}
          onPaymentSuccess={handlePaymentSuccess}
          profile={profile || { currency: "pkr" }}
        />
      )}

      {/* Empty State with CTA */}
      {!loading && filteredInvoices.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium  mb-2">No invoices found</h3>
          <p className="text-gray-400 mb-6">
            {searchQuery ||
            paymentStatus !== "all" ||
            customerId !== "all" ||
            dateRange !== "all"
              ? "Try changing your filters or search term"
              : "Create your first invoice to get started"}
          </p>
          <Link
            href={`/dashboard/billing`}
            prefetch={true}
            className="font-medium  hover:text-primary transition-colors"
          >
            <Button className="" disabled={loading}>
              <Plus className="mr-2 h-4 w-4" />
              Create First Invoice
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
