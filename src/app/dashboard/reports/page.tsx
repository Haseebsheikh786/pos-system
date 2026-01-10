"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Download, Calendar } from "lucide-react";
import SalesProfitTab from "@/components/reports/sales-profit-tab";
import PaymentsDuesTab from "@/components/reports/payments-dues-tab";
import InventoryTab from "@/components/reports/inventory-tab";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { fetchProducts } from "@/store/productSlice";
import { fetchInvoices } from "@/store/invoiceSlice";
import { DateRange } from "@/types/invoice";

export default function ReportsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { items: products } = useSelector((state: RootState) => state.products);
  const { invoices } = useSelector((state: RootState) => state.invoices);
  const { user } = useSelector((state: RootState) => state.auth);

  const [dateRange, setDateRange] = useState<DateRange>("today");
  const [activeTab, setActiveTab] = useState("sales-profit");

  const handleExport = (format: "pdf" | "excel") => {
    alert(`Exporting ${activeTab} report as ${format.toUpperCase()}`);
  };
  console.log(products, "products");
  console.log(invoices, "inv");

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchProducts(user.id));
      dispatch(
        fetchInvoices({
          shopId: user.id,
          dateRange,
        })
      );
    }
  }, [dispatch, user?.id, dateRange]);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Reports & Analytics
        </h1>
        <p className="text-gray-400">
          View sales, profit, payments, and inventory insights.
        </p>
      </div>

      {/* Global Controls */}
      <Card className="bg-[#0a0a0a] border-[#D4AF37] mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Left Side: Date Range */}
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-[#D4AF37]" />
                <Label className="text-gray-300">Date Range:</Label>
              </div>
              <Select
                value={dateRange}
                onValueChange={(value) => setDateRange(value as DateRange)}
              >
                <SelectTrigger className="w-64 bg-[#1a1a1a] border-[#D4AF37]/30 text-white">
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent className="bg-[#0a0a0a] border-[#D4AF37] text-white">
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="yesterday">Yesterday</SelectItem>
                  <SelectItem value="last-7-days">Last 7 Days</SelectItem>
                  <SelectItem value="this-month">This Month</SelectItem>
                  <SelectItem value="custom-range">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Right Side: Export Buttons */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => handleExport("pdf")}
                className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10"
              >
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tab Structure */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="bg-[#0a0a0a] border  border-[#D4AF37]/30 p-1">
          <TabsTrigger
            value="sales-profit"
            className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black text-gray-300"
          >
            Sales & Profit
          </TabsTrigger>
          <TabsTrigger
            value="payments-dues"
            className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black text-gray-300"
          >
            Payments & Dues
          </TabsTrigger>
          <TabsTrigger
            value="inventory"
            className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black text-gray-300"
          >
            Inventory Report
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Sales & Profit */}
        <TabsContent value="sales-profit">
          <SalesProfitTab
            dateRange={dateRange}
            invoices={invoices}
            products={products}
          />
        </TabsContent>

        {/* Tab 2: Payments & Dues */}
        <TabsContent value="payments-dues">
          <PaymentsDuesTab dateRange={dateRange} invoices={invoices} />
        </TabsContent>

        {/* Tab 3: Inventory */}
        <TabsContent value="inventory">
          <InventoryTab dateRange={dateRange} products={products} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
