"use client";

import { useEffect, useMemo } from "react";
import StatsCards from "@/components/dashboard/stats-cards";
import ActivityAndAlerts from "@/components/dashboard/activity-and-alerts";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { fetchProducts } from "@/store/productSlice";
import { fetchInvoices } from "@/store/invoiceSlice";
import { fetchProfile } from "@/store/profileSlice";

export default function DashboardPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { items: products } = useSelector((state: RootState) => state.products);
  const { invoices } = useSelector((state: RootState) => state.invoices);
  const { user } = useSelector((state: RootState) => state.auth);
  const { profile } = useSelector((state: RootState) => state.profile);

  const stats = useMemo(() => {
    // Calculate today's sales
    const todaysSales = invoices.reduce((total, invoice) => {
      return total + (invoice.total || 0);
    }, 0);

    // Calculate today's actual profit using invoice items and product cost
    const todaysProfit = invoices.reduce((totalProfit, invoice) => {
      // Check if invoice has items
      if (!invoice.items || invoice.items.length === 0) return totalProfit;

      // Calculate profit for each item in this invoice
      const invoiceProfit = invoice.items.reduce((invoiceTotal, item) => {
        // Find the product to get its cost price
        const product = products.find((p) => p.id === item.product_id);
        if (!product) return invoiceTotal;

        // Get cost price (default to 0 if not available)
        const costPrice = product.cost_price || 0;

        // Get selling price from invoice item
        const sellingPrice = item.price || item.product_price || 0;

        // Get quantity
        const quantity = item.quantity || 1;

        // Calculate profit for this item: (selling price - cost price) × quantity
        const itemProfit = (sellingPrice - costPrice) * quantity;

        return invoiceTotal + itemProfit;
      }, 0);

      return totalProfit + invoiceProfit;
    }, 0);

    // Calculate credit balance (total outstanding due amounts)
    const creditBalance = invoices.reduce((total, invoice) => {
      return total + (invoice.due_amount || 0);
    }, 0);

    // Total products
    const totalProducts = products.length;

    return {
      todaysSales,
      todaysProfit: Math.round(todaysProfit),
      creditBalance,
      totalProducts,
    };
  }, [invoices, products]);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchProducts(user.id));
      dispatch(fetchProfile(user.id));
      dispatch(
        fetchInvoices({
          shopId: user.id,
          dateRange: "today",
        }),
      );
    }
  }, [dispatch, user?.id]);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">
          Welcome back! Here's your business overview.
        </p>
      </div>

      {/* Stats Grid */}
      <StatsCards stats={stats} profile={profile || { currency: "pkr" }} />
      <ActivityAndAlerts
        invoices={invoices}
        products={products}
        profile={profile || { currency: "pkr" }}
      />
    </div>
  );
}
