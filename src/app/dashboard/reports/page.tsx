"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart3, TrendingUp, Package, Calendar } from "lucide-react"
import { Label } from "@/components/ui/label"

type SaleData = {
  date: string
  sales: number
  profit: number
  transactions: number
}

type ProductSale = {
  product: string
  quantity: number
  revenue: number
}

export default function ReportsPage() {
  const [reportType, setReportType] = useState<string>("daily")

  // Mock data
  const dailySales: SaleData[] = [
    { date: "2024-01-15", sales: 15240, profit: 4320, transactions: 42 },
    { date: "2024-01-14", sales: 13560, profit: 3890, transactions: 38 },
    { date: "2024-01-13", sales: 16780, profit: 4920, transactions: 45 },
    { date: "2024-01-12", sales: 14320, profit: 4100, transactions: 41 },
    { date: "2024-01-11", sales: 12890, profit: 3650, transactions: 36 },
  ]

  const monthlySales: SaleData[] = [
    { date: "January 2024", sales: 420000, profit: 125000, transactions: 1240 },
    { date: "December 2023", sales: 398000, profit: 118000, transactions: 1180 },
    { date: "November 2023", sales: 385000, profit: 112000, transactions: 1150 },
    { date: "October 2023", sales: 410000, profit: 121000, transactions: 1220 },
  ]

  const productSales: ProductSale[] = [
    { product: "Rice (5kg)", quantity: 145, revenue: 123250 },
    { product: "Cooking Oil (1L)", quantity: 298, revenue: 125160 },
    { product: "Sugar (1kg)", quantity: 467, revenue: 56040 },
    { product: "Tea Bags (100pcs)", quantity: 189, revenue: 64260 },
    { product: "Flour (5kg)", quantity: 234, revenue: 159120 },
  ]

  const salesData = reportType === "daily" ? dailySales : monthlySales

  const totalSales = salesData.reduce((sum, day) => sum + day.sales, 0)
  const totalProfit = salesData.reduce((sum, day) => sum + day.profit, 0)
  const totalTransactions = salesData.reduce((sum, day) => sum + day.transactions, 0)

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Reports & Analytics</h1>
        <p className="text-gray-400">View sales reports and business performance.</p>
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

      {/* Summary Stats */}
      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <Card className="bg-[#0a0a0a] border-[#D4AF37]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Sales</CardTitle>
            <TrendingUp className="h-5 w-5 text-[#D4AF37]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">Rs. {totalSales.toLocaleString()}</div>
            <p className="text-xs text-green-500 mt-1">{reportType === "daily" ? "Last 5 days" : "Last 4 months"}</p>
          </CardContent>
        </Card>

        <Card className="bg-[#0a0a0a] border-[#D4AF37]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Profit</CardTitle>
            <BarChart3 className="h-5 w-5 text-[#D4AF37]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">Rs. {totalProfit.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">{((totalProfit / totalSales) * 100).toFixed(1)}% profit margin</p>
          </CardContent>
        </Card>

        <Card className="bg-[#0a0a0a] border-[#D4AF37]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Transactions</CardTitle>
            <Calendar className="h-5 w-5 text-[#D4AF37]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{totalTransactions.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">
              Avg: Rs. {Math.round(totalSales / totalTransactions).toLocaleString()} per transaction
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Sales Report Table */}
      <Card className="bg-[#0a0a0a] border-[#D4AF37] mb-6">
        <CardHeader>
          <CardTitle className="text-white">
            {reportType === "daily" ? "Daily Sales Report" : "Monthly Sales Report"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-[#D4AF37]/30">
                <TableHead className="text-[#D4AF37]">Date</TableHead>
                <TableHead className="text-[#D4AF37]">Sales (Rs.)</TableHead>
                <TableHead className="text-[#D4AF37]">Profit (Rs.)</TableHead>
                <TableHead className="text-[#D4AF37]">Transactions</TableHead>
                <TableHead className="text-[#D4AF37]">Avg Transaction</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {salesData.map((data, index) => (
                <TableRow key={index} className="border-[#D4AF37]/30">
                  <TableCell className="text-white font-medium">{data.date}</TableCell>
                  <TableCell className="text-gray-300">Rs. {data.sales.toLocaleString()}</TableCell>
                  <TableCell className="text-green-400">Rs. {data.profit.toLocaleString()}</TableCell>
                  <TableCell className="text-gray-300">{data.transactions}</TableCell>
                  <TableCell className="text-gray-300">
                    Rs. {Math.round(data.sales / data.transactions).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Product-wise Sales */}
      <Card className="bg-[#0a0a0a] border-[#D4AF37]">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white">Product-wise Sales Report</CardTitle>
          <Package className="h-5 w-5 text-[#D4AF37]" />
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-[#D4AF37]/30">
                <TableHead className="text-[#D4AF37]">Product</TableHead>
                <TableHead className="text-[#D4AF37]">Units Sold</TableHead>
                <TableHead className="text-[#D4AF37]">Revenue (Rs.)</TableHead>
                <TableHead className="text-[#D4AF37]">% of Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productSales.map((item, index) => {
                const totalRevenue = productSales.reduce((sum, p) => sum + p.revenue, 0)
                const percentage = ((item.revenue / totalRevenue) * 100).toFixed(1)

                return (
                  <TableRow key={index} className="border-[#D4AF37]/30">
                    <TableCell className="text-white font-medium">{item.product}</TableCell>
                    <TableCell className="text-gray-300">{item.quantity} units</TableCell>
                    <TableCell className="text-gray-300">Rs. {item.revenue.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-[#1a1a1a] rounded-full h-2">
                          <div className="bg-[#D4AF37] h-2 rounded-full" style={{ width: `${percentage}%` }} />
                        </div>
                        <span className="text-gray-300 text-sm w-12">{percentage}%</span>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
