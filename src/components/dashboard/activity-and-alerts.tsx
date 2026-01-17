"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Eye, Package, TrendingDown } from "lucide-react";
import type { Invoice } from "@/types/invoice";
import type { Product } from "@/types/product";

interface ActivityAndAlertsProps {
  invoices: Invoice[];
  products?: Product[]; // Optional for low stock alerts
}

const ActivityAndAlerts = ({
  invoices,
  products = [],
}: ActivityAndAlertsProps) => {
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Calculate low stock products (stock <= min_stock_level)
  const lowStockProducts = products.filter((product) => {
    const minStock = product.min_stock_level || 5; // Default minimum stock
    return product.stock <= minStock;
  });

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Recent Activity Card */}
      <Card className="bg-[#0a0a0a] border-[#D4AF37]/30">
        <CardHeader>
          <CardTitle className="text-white flex justify-between items-center">
            <span>Recent Activity</span>
            <span className="text-sm font-normal text-gray-400">
              {invoices.length > 0
                ? `${invoices.length} sales today`
                : "No sales"}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {invoices.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <div className="mb-2">No sales recorded yet</div>
              <div className="text-sm">Start selling to see activity here</div>
            </div>
          ) : (
            <div className="space-y-4">
              {invoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className="flex items-center justify-between p-3 hover:bg-[#1a1a1a] rounded-lg transition-colors cursor-pointer group"
                  onClick={() => {
                    // Navigate to invoice details
                    window.location.href = `/dashboard/invoices/${invoice.id}`;
                  }}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <div className="text-white font-medium truncate">
                        {invoice.invoice_number ||
                          `INV-${invoice.id.slice(0, 8)}`}
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          invoice.payment_status === "paid"
                            ? "bg-green-500/20 text-green-400"
                            : invoice.payment_status === "partial"
                              ? "bg-orange-500/20 text-orange-400"
                              : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {invoice.payment_status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-400 mt-1 flex items-center gap-2">
                      <span className="truncate">
                        {invoice.customer_name || "Walk-in Customer"}
                      </span>
                      <span className="text-xs">•</span>
                      <span>{formatTime(invoice.created_at)}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-400 font-bold text-lg">
                      {invoice.total || 0}
                    </div>
                    {invoice.due_amount > 0 && (
                      <div className="text-xs text-orange-400">
                        Due: {invoice.due_amount}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {invoices.length > 5 && (
                <div className="pt-4 border-t border-gray-800">
                  <Button
                    variant="outline"
                    className="w-full border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800"
                    onClick={() => {
                      window.location.href = "/dashboard/invoices";
                    }}
                  >
                    View All Sales
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Low Stock Alerts Card */}
      <Card className="bg-[#0a0a0a] border-[#D4AF37]/30">
        <CardHeader>
          <CardTitle className="text-white flex justify-between items-center">
            <span>Stock Alerts</span>
            <span className="text-sm font-normal text-gray-400">
              {lowStockProducts.length} alerts
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {products.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <div className="mb-2">No products found</div>
              <div className="text-sm">Add products to track inventory</div>
            </div>
          ) : lowStockProducts.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <div className="mb-2">No alerts found</div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Low Stock Products (Medium Priority) */}
              {lowStockProducts.map((product) => (
                <div
                  key={product.id}
                  className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg hover:bg-red-500/20 transition-colors cursor-pointer"
                  onClick={() => {
                    window.location.href = `/dashboard/products`;
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-red-500/20 rounded-full">
                      <TrendingDown className="h-5 w-5 text-red-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div className="font-medium text-white truncate">
                          {product.name || "Unnamed Product"}
                        </div>
                        <span className="text-red-400 font-bold text-sm">
                          {product.stock} left
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-400 mt-2">
                        <span>Price: {product.price || 0}</span>
                        <span>•</span>
                        <span>
                          Stock Level: {product.min_stock_level || 5} min
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivityAndAlerts;
