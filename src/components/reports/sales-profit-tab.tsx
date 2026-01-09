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
import { TrendingUp, DollarSign, FileText, BarChart3 } from "lucide-react";

interface SalesProfitTabProps {
  dateRange: string;
}

export default function SalesProfitTab({ dateRange }: SalesProfitTabProps) {
  // Mock data
  const summaryCards = [
    {
      title: "Total Sales",
      value: "Rs. 1,613,000",
      icon: DollarSign,
      description: "Last 4 months",
      color: "border-blue-500",
    },
    {
      title: "Total Profit",
      value: "Rs. 476,000",
      icon: TrendingUp,
      description: "29.5% profit margin",
      color: "border-green-500",
    },
    {
      title: "Total Invoices",
      value: "4,790",
      icon: FileText,
      description: "Processed orders",
      color: "border-purple-500",
    },
  ];

  const salesData = [
    { date: "2024-01-15", sales: 15240, profit: 4320, transactions: 42 },
    { date: "2024-01-14", sales: 13560, profit: 3890, transactions: 38 },
    { date: "2024-01-13", sales: 16780, profit: 4920, transactions: 45 },
    { date: "2024-01-12", sales: 14320, profit: 4100, transactions: 41 },
    { date: "2024-01-11", sales: 12890, profit: 3650, transactions: 36 },
  ];

  const productSales = [
    { product: "Rice (5kg)", unitsSold: 145, revenue: 123250 },
    { product: "Cooking Oil (1L)", unitsSold: 298, revenue: 125160 },
    { product: "Sugar (1kg)", unitsSold: 467, revenue: 56040 },
    { product: "Tea Bags (100pcs)", unitsSold: 189, revenue: 64260 },
    { product: "Flour (5kg)", unitsSold: 234, revenue: 159120 },
  ];

  const totalRevenue = productSales.reduce((sum, p) => sum + p.revenue, 0);

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
            <Table>
              <TableHeader>
                <TableRow className="border-[#D4AF37]/30">
                  <TableHead className="text-[#D4AF37]">Date</TableHead>
                  <TableHead className="text-[#D4AF37]">Total Sales</TableHead>
                  <TableHead className="text-[#D4AF37]">Total Profit</TableHead>
                  <TableHead className="text-[#D4AF37]">Transactions</TableHead>
                  <TableHead className="text-[#D4AF37]">
                    Avg Transaction Value
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {salesData.map((data, index) => (
                  <TableRow key={index} className="border-[#D4AF37]/30">
                    <TableCell className="text-white font-medium">
                      {data.date}
                    </TableCell>
                    <TableCell className="text-gray-300">
                      Rs. {data.sales.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-green-400">
                      Rs. {data.profit.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-gray-300">
                      {data.transactions}
                    </TableCell>
                    <TableCell className="text-gray-300">
                      Rs.{" "}
                      {Math.round(
                        data.sales / data.transactions
                      ).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
            <Table>
              <TableHeader>
                <TableRow className="border-[#D4AF37]/30">
                  <TableHead className="text-[#D4AF37]">Product Name</TableHead>
                  <TableHead className="text-[#D4AF37]">Units Sold</TableHead>
                  <TableHead className="text-[#D4AF37]">Revenue</TableHead>
                  <TableHead className="text-[#D4AF37]">
                    % of Total Sales
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {productSales.map((item, index) => {
                  const percentage = (
                    (item.revenue / totalRevenue) *
                    100
                  ).toFixed(1);
                  return (
                    <TableRow key={index} className="border-[#D4AF37]/30">
                      <TableCell className="text-white font-medium">
                        {item.product}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {item.unitsSold} units
                      </TableCell>
                      <TableCell className="text-gray-300">
                        Rs. {item.revenue.toLocaleString()}
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
