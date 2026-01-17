"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getCurrencySymbol } from "@/lib/currency";
import { DateRange, Invoice } from "@/types/invoice";
import { Product } from "@/types/product";
import { TrendingUp, DollarSign, FileText, BarChart3 } from "lucide-react";
import { useMemo } from "react";

interface SalesProfitTabProps {
  dateRange: DateRange;
  invoices: Invoice[];
  products: Product[];
  profile: {
    currency?: string;
  };
}

export default function SalesProfitTab({
  dateRange,
  invoices,
  products,
  profile,
}: SalesProfitTabProps) {
  // Create product map for quick lookups
  const productMap = useMemo(() => {
    const map = new Map<string, Product>();
    products.forEach((product) => {
      map.set(product.id, product);
    });
    return map;
  }, [products]);

  // Calculate total sales from invoices
  const totalSales = useMemo(() => {
    return invoices.reduce((sum, invoice) => sum + (invoice.total || 0), 0);
  }, [invoices]);

  // Calculate total profit from invoices
  const totalProfit = useMemo(() => {
    return invoices.reduce((sum, invoice) => {
      if (!invoice.items || invoice.items.length === 0) return sum;

      const invoiceProfit = invoice.items.reduce((invoiceSum, item) => {
        const product = productMap.get(item.product_id);
        if (!product) return invoiceSum;

        const cost = product.cost_price || 0;
        const revenue = item.price || item.product_price || 0;
        const quantity = item.quantity || 1;

        return invoiceSum + (revenue - cost) * quantity;
      }, 0);

      return sum + invoiceProfit;
    }, 0);
  }, [invoices, productMap]);

  // Calculate profit margin
  const profitMargin = totalSales > 0 ? (totalProfit / totalSales) * 100 : 0;

  // Group sales by date for the table
  const salesByDate = useMemo(() => {
    const groups = new Map<
      string,
      {
        sales: number;
        profit: number;
        transactions: number;
      }
    >();

    invoices.forEach((invoice) => {
      const date = new Date(invoice.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

      if (!groups.has(date)) {
        groups.set(date, { sales: 0, profit: 0, transactions: 0 });
      }

      const group = groups.get(date)!;
      group.sales += invoice.total || 0;
      group.transactions += 1;

      // Calculate profit for this invoice
      let invoiceProfit = 0;
      if (invoice.items && invoice.items.length > 0) {
        invoice.items.forEach((item) => {
          const product = productMap.get(item.product_id);
          if (product) {
            const cost = product.cost_price || 0;
            const revenue = item.price || item.product_price || 0;
            const quantity = item.quantity || 1;
            invoiceProfit += (revenue - cost) * quantity;
          }
        });
      }
      group.profit += invoiceProfit;
    });

    // Convert map to array and sort by date (newest first)
    return Array.from(groups.entries())
      .map(([date, data]) => ({ date, ...data }))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [invoices, productMap]);

  // Calculate product sales (top selling products)
  const productSales = useMemo(() => {
    const productMapSales = new Map<
      string,
      {
        productName: string;
        unitsSold: number;
        revenue: number;
      }
    >();

    invoices.forEach((invoice) => {
      if (!invoice.items || invoice.items.length === 0) return;

      invoice.items.forEach((item) => {
        const productId = item.product_id;
        const product = productMap.get(productId);
        const productName =
          item.product_name || product?.name || "Unknown Product";

        if (!productMapSales.has(productId)) {
          productMapSales.set(productId, {
            productName,
            unitsSold: 0,
            revenue: 0,
          });
        }

        const productData = productMapSales.get(productId)!;
        productData.unitsSold += item.quantity || 1;
        productData.revenue +=
          (item.price || item.product_price || 0) * (item.quantity || 1);
      });
    });

    // Convert to array, sort by revenue (highest first), and take top 10
    return Array.from(productMapSales.values())
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 10)
      .map((item) => ({
        product: item.productName,
        unitsSold: item.unitsSold,
        revenue: item.revenue,
      }));
  }, [invoices, productMap]);

  // Calculate total revenue for percentage calculation
  const totalProductRevenue = productSales.reduce(
    (sum, p) => sum + p.revenue,
    0,
  );

  const currencySymbol = profile?.currency
    ? getCurrencySymbol(profile.currency)
    : "Rs.";

  // Summary cards data
  const summaryCards = [
    {
      title: "Total Sales",
      value: `${currencySymbol}${totalSales.toLocaleString()}`,
      icon: DollarSign,
      description: getDateRangeDescription(dateRange),
      color: "border-blue-500",
    },
    {
      title: "Total Profit",
      value: `${currencySymbol}${Math.round(totalProfit).toLocaleString()}`,
      icon: TrendingUp,
      description: `${profitMargin.toFixed(1)}% profit margin`,
      color: totalProfit >= 0 ? "border-green-500" : "border-red-500",
    },
    {
      title: "Total Invoices",
      value: invoices.length.toString(),
      icon: FileText,
      description: `Avg: ${currencySymbol}${
        invoices.length > 0
          ? Math.round(totalSales / invoices.length).toLocaleString()
          : 0
      } per invoice`,
      color: "border-purple-500",
    },
  ];

  // Helper function to get date range description
  function getDateRangeDescription(range: DateRange): string {
    const today = new Date();

    switch (range) {
      case "today":
        return "Today";
      case "yesterday":
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        return "Yesterday";
      case "last-7-days":
        return "Last 7 days";
      case "this-month":
        return "This month";
      case "custom-range":
        return "Custom range";
      default:
        return "All time";
    }
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return `${currencySymbol}${amount.toLocaleString()}`;
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {summaryCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Card key={index} className={`bg-[#0a0a0a] border-[#D4AF37]`}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">
                  {card.title}
                </CardTitle>
                <div className="p-2 rounded-full bg-[#1a1a1a]">
                  <Icon className="h-4 w-4 text-[#D4AF37]" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white mb-1">
                  {card.value}
                </div>
                <p className="text-sm text-gray-400">{card.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Sales Report Table */}
      <Card className="bg-[#0a0a0a] border-[#D4AF37]">
        <CardHeader>
          <CardTitle className="text-white">Sales Report</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            {salesByDate.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                No sales data available for the selected period
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-[#D4AF37]/30">
                    <TableHead className="text-[#D4AF37]">Date</TableHead>
                    <TableHead className="text-[#D4AF37]">
                      Total Sales
                    </TableHead>
                    <TableHead className="text-[#D4AF37]">
                      Total Profit
                    </TableHead>
                    <TableHead className="text-[#D4AF37]">Invoices</TableHead>
                    <TableHead className="text-[#D4AF37]">
                      Avg Invoice Value
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {salesByDate.map((data, index) => (
                    <TableRow key={index} className="border-[#D4AF37]/30">
                      <TableCell className="text-white font-medium">
                        {data.date}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {formatCurrency(data.sales)}
                      </TableCell>
                      <TableCell
                        className={
                          data.profit >= 0 ? "text-green-400" : "text-red-400"
                        }
                      >
                        {formatCurrency(Math.round(data.profit))}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {data.transactions}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {data.transactions > 0
                          ? formatCurrency(
                              Math.round(data.sales / data.transactions),
                            )
                          : `${currencySymbol}0`}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Product-wise Sales */}
      <Card className="bg-[#0a0a0a] border-[#D4AF37]">
        <CardHeader>
          <CardTitle className="text-white">Top Selling Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            {productSales.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                No product sales data available
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-[#D4AF37]/30">
                    <TableHead className="text-[#D4AF37]">
                      Product Name
                    </TableHead>
                    <TableHead className="text-[#D4AF37]">Units Sold</TableHead>
                    <TableHead className="text-[#D4AF37]">Revenue</TableHead>
                    <TableHead className="text-[#D4AF37]">
                      % of Total Sales
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {productSales.map((item, index) => {
                    const percentage =
                      totalProductRevenue > 0
                        ? ((item.revenue / totalProductRevenue) * 100).toFixed(
                            1,
                          )
                        : "0.0";

                    return (
                      <TableRow key={index} className="border-[#D4AF37]/30">
                        <TableCell className="text-white font-medium">
                          {item.product}
                        </TableCell>
                        <TableCell className="text-gray-300">
                          {item.unitsSold} units
                        </TableCell>
                        <TableCell className="text-gray-300">
                          {formatCurrency(item.revenue)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="flex-1 bg-[#1a1a1a] rounded-full h-2">
                              <div
                                className="bg-[#D4AF37] h-2 rounded-full"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <span className="text-gray-300 text-sm w-12">
                              {percentage}%
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
