"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import ProductSalesReport from "@/components/reports/product-sales-report";
import SalesReport from "@/components/reports/sales-report";
import ReportsStats from "@/components/reports/reports-stats";

type SaleData = {
  date: string;
  sales: number;
  profit: number;
  transactions: number;
};

type ProductSale = {
  product: string;
  quantity: number;
  revenue: number;
};

export default function ReportsPage() {
  const [reportType, setReportType] = useState<string>("daily");

  // Mock data
  const dailySales: SaleData[] = [
    { date: "2024-01-15", sales: 15240, profit: 4320, transactions: 42 },
    { date: "2024-01-14", sales: 13560, profit: 3890, transactions: 38 },
    { date: "2024-01-13", sales: 16780, profit: 4920, transactions: 45 },
    { date: "2024-01-12", sales: 14320, profit: 4100, transactions: 41 },
    { date: "2024-01-11", sales: 12890, profit: 3650, transactions: 36 },
  ];

  const monthlySales: SaleData[] = [
    { date: "January 2024", sales: 420000, profit: 125000, transactions: 1240 },
    {
      date: "December 2023",
      sales: 398000,
      profit: 118000,
      transactions: 1180,
    },
    {
      date: "November 2023",
      sales: 385000,
      profit: 112000,
      transactions: 1150,
    },
    { date: "October 2023", sales: 410000, profit: 121000, transactions: 1220 },
  ];

  const productSales: ProductSale[] = [
    { product: "Rice (5kg)", quantity: 145, revenue: 123250 },
    { product: "Cooking Oil (1L)", quantity: 298, revenue: 125160 },
    { product: "Sugar (1kg)", quantity: 467, revenue: 56040 },
    { product: "Tea Bags (100pcs)", quantity: 189, revenue: 64260 },
    { product: "Flour (5kg)", quantity: 234, revenue: 159120 },
  ];

  const salesData = reportType === "daily" ? dailySales : monthlySales;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Reports & Analytics
        </h1>
        <p className="text-gray-400">
          View sales reports and business performance.
        </p>
      </div>

      {/* Report Type Selector */}
      <Card className="bg-[#0a0a0a] border-[#D4AF37] mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <Label className="text-gray-300">Report Type:</Label>
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger className="w-64 bg-[#1a1a1a] border-[#D4AF37]/30 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#0a0a0a] border-[#D4AF37]">
                <SelectItem value="daily" className="text-white">
                  Daily Sales Report
                </SelectItem>
                <SelectItem value="monthly" className="text-white">
                  Monthly Sales Report
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <ReportsStats salesData={salesData} reportType={reportType} />
      <SalesReport salesData={salesData} reportType={reportType} />
      <ProductSalesReport productSales={productSales} />
    </div>
  );
}
