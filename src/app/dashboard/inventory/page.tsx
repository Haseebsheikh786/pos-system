"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Package, TrendingDown } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type InventoryItem = {
  id: number
  name: string
  stock: number
  minStock: number
  lastSold: string
  category: string
}

export default function InventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>([
    { id: 1, name: "Rice (5kg)", stock: 45, minStock: 20, lastSold: "2 hours ago", category: "Groceries" },
    { id: 2, name: "Cooking Oil (1L)", stock: 32, minStock: 15, lastSold: "30 mins ago", category: "Groceries" },
    { id: 3, name: "Sugar (1kg)", stock: 8, minStock: 25, lastSold: "1 hour ago", category: "Groceries" },
    { id: 4, name: "Tea Bags (100pcs)", stock: 5, minStock: 20, lastSold: "3 hours ago", category: "Beverages" },
    { id: 5, name: "Flour (5kg)", stock: 51, minStock: 30, lastSold: "4 hours ago", category: "Groceries" },
    { id: 6, name: "Coffee (200g)", stock: 3, minStock: 10, lastSold: "1 hour ago", category: "Beverages" },
    { id: 7, name: "Milk Powder (400g)", stock: 18, minStock: 15, lastSold: "5 hours ago", category: "Dairy" },
  ])

  const lowStockItems = inventory.filter((item) => item.stock < item.minStock)
  const criticalStockItems = inventory.filter((item) => item.stock < 10)
  const totalValue = inventory.reduce((sum, item) => sum + item.stock * 500, 0) // Assuming avg price of 500

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Inventory Management</h1>
        <p className="text-gray-400">Monitor stock levels and get low-stock alerts.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <Card className="bg-[#0a0a0a] border-[#D4AF37]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Items</CardTitle>
            <Package className="h-5 w-5 text-[#D4AF37]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{inventory.length}</div>
            <p className="text-xs text-gray-500 mt-1">In inventory</p>
          </CardContent>
        </Card>

        <Card className="bg-[#0a0a0a] border-[#D4AF37]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Low Stock Items</CardTitle>
            <TrendingDown className="h-5 w-5 text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-400">{lowStockItems.length}</div>
            <p className="text-xs text-gray-500 mt-1">Need restock</p>
          </CardContent>
        </Card>

        <Card className="bg-[#0a0a0a] border-[#D4AF37]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Critical Stock</CardTitle>
            <AlertCircle className="h-5 w-5 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-400">{criticalStockItems.length}</div>
            <p className="text-xs text-gray-500 mt-1">Urgent attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Low Stock Alert */}
      {lowStockItems.length > 0 && (
        <Card className="bg-orange-500/10 border-orange-500 mb-6">
          <CardHeader>
            <CardTitle className="text-orange-400 flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Low Stock Alert
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-orange-300 text-sm">
              You have {lowStockItems.length} item(s) below minimum stock level. Consider restocking soon.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Inventory Table */}
      <Card className="bg-[#0a0a0a] border-[#D4AF37]">
        <CardHeader>
          <CardTitle className="text-white">All Inventory Items</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-[#D4AF37]/30">
                <TableHead className="text-[#D4AF37]">ID</TableHead>
                <TableHead className="text-[#D4AF37]">Product Name</TableHead>
                <TableHead className="text-[#D4AF37]">Category</TableHead>
                <TableHead className="text-[#D4AF37]">Current Stock</TableHead>
                <TableHead className="text-[#D4AF37]">Min Stock</TableHead>
                <TableHead className="text-[#D4AF37]">Status</TableHead>
                <TableHead className="text-[#D4AF37]">Last Sold</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventory.map((item) => {
                const stockPercentage = (item.stock / item.minStock) * 100
                const status =
                  item.stock < 10
                    ? "critical"
                    : item.stock < item.minStock
                      ? "low"
                      : stockPercentage < 150
                        ? "normal"
                        : "good"

                return (
                  <TableRow key={item.id} className="border-[#D4AF37]/30">
                    <TableCell className="text-gray-300">{item.id}</TableCell>
                    <TableCell className="text-white font-medium">{item.name}</TableCell>
                    <TableCell className="text-gray-300">{item.category}</TableCell>
                    <TableCell className="text-white">{item.stock} units</TableCell>
                    <TableCell className="text-gray-400">{item.minStock} units</TableCell>
                    <TableCell>
                      {status === "critical" && (
                        <Badge className="bg-red-500/10 text-red-400 border-red-500">Critical</Badge>
                      )}
                      {status === "low" && (
                        <Badge className="bg-orange-500/10 text-orange-400 border-orange-500">Low Stock</Badge>
                      )}
                      {status === "normal" && (
                        <Badge className="bg-blue-500/10 text-blue-400 border-blue-500">Normal</Badge>
                      )}
                      {status === "good" && (
                        <Badge className="bg-green-500/10 text-green-400 border-green-500">Good Stock</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-gray-400 text-sm">{item.lastSold}</TableCell>
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
