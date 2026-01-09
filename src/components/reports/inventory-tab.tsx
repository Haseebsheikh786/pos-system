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
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Package, AlertTriangle, TrendingDown, DollarSign } from "lucide-react";

interface InventoryTabProps {
  dateRange: string;
}

export default function InventoryTab({ dateRange }: InventoryTabProps) {
  // Mock data
  const summaryCards = [
    {
      title: "Total Products",
      value: "156",
      icon: Package,
      description: "In inventory",
      color: "border-blue-500",
    },
    {
      title: "Low Stock Items",
      value: "23",
      icon: TrendingDown,
      description: "Below minimum stock",
      color: "border-orange-500",
    },
    {
      title: "Out of Stock Items",
      value: "8",
      icon: AlertTriangle,
      description: "Need restocking",
      color: "border-red-500",
    },
    {
      title: "Total Inventory Value",
      value: "Rs. 2,450,000",
      icon: DollarSign,
      description: "Current stock value",
      color: "border-green-500",
    },
  ];

  const stockAlerts = [
    {
      productName: "Rice (5kg)",
      currentStock: 2,
      minimumStock: 10,
      stockStatus: "out",
      price: 850,
    },
    {
      productName: "Cooking Oil (1L)",
      currentStock: 3,
      minimumStock: 15,
      stockStatus: "out",
      price: 420,
    },
    {
      productName: "Sugar (1kg)",
      currentStock: 5,
      minimumStock: 20,
      stockStatus: "low",
      price: 120,
    },
    {
      productName: "Tea Bags (100pcs)",
      currentStock: 8,
      minimumStock: 25,
      stockStatus: "low",
      price: 340,
    },
    {
      productName: "Flour (5kg)",
      currentStock: 12,
      minimumStock: 30,
      stockStatus: "good",
      price: 680,
    },
    {
      productName: "Salt (1kg)",
      currentStock: 0,
      minimumStock: 10,
      stockStatus: "out",
      price: 45,
    },
    {
      productName: "Spices Mix",
      currentStock: 4,
      minimumStock: 15,
      stockStatus: "low",
      price: 280,
    },
  ];

  const [stockFilter, setStockFilter] = useState("all");

  const getStockStatusBadge = (status: string) => {
    switch (status) {
      case "out":
        return (
          <Badge className="bg-red-500/20 text-red-400 border-red-500">
            Out of Stock
          </Badge>
        );
      case "low":
        return (
          <Badge className="bg-orange-500/20 text-orange-400 border-orange-500">
            Low Stock
          </Badge>
        );
      case "good":
        return (
          <Badge className="bg-green-500/20 text-green-400 border-green-500">
            Good Stock
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-500/20 text-gray-400 border-gray-500">
            Unknown
          </Badge>
        );
    }
  };

  const filteredStockAlerts = stockAlerts.filter((item) => {
    if (stockFilter === "all") return true;
    if (stockFilter === "low") return item.stockStatus === "low";
    if (stockFilter === "out") return item.stockStatus === "out";
    if (stockFilter === "good") return item.stockStatus === "good";
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {/* Filters */}
      <Card className="bg-[#0a0a0a] border-[#D4AF37]">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <Label className="text-gray-300">Stock Status:</Label>
            <Select value={stockFilter} onValueChange={setStockFilter}>
              <SelectTrigger className="w-48 bg-[#1a1a1a] border-[#D4AF37]/30 text-white">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent className="bg-[#0a0a0a] border-[#D4AF37] text-white">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="out">Out of Stock</SelectItem>
                <SelectItem value="low">Low Stock</SelectItem>
                <SelectItem value="good">Good Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Stock Alert Table */}
      <Card className="bg-[#0a0a0a] border-[#D4AF37]">
        <CardHeader>
          <CardTitle className="text-white">
            Low & Out of Stock Products
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-[#D4AF37]/30">
                  <TableHead className="text-[#D4AF37]">Product Name</TableHead>
                  <TableHead className="text-[#D4AF37]">
                    Current Stock
                  </TableHead>
                  <TableHead className="text-[#D4AF37]">
                    Minimum Stock
                  </TableHead>
                  <TableHead className="text-[#D4AF37]">Stock Status</TableHead>
                  <TableHead className="text-[#D4AF37]">Price</TableHead>
                  <TableHead className="text-[#D4AF37]">Stock Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStockAlerts.map((product, index) => (
                  <TableRow key={index} className="border-[#D4AF37]/30">
                    <TableCell className="text-white font-medium">
                      {product.productName}
                    </TableCell>
                    <TableCell
                      className={
                        product.currentStock === 0
                          ? "text-red-400 font-bold"
                          : product.currentStock < product.minimumStock
                          ? "text-orange-400"
                          : "text-gray-300"
                      }
                    >
                      {product.currentStock} units
                    </TableCell>
                    <TableCell className="text-gray-300">
                      {product.minimumStock} units
                    </TableCell>
                    <TableCell>
                      {getStockStatusBadge(product.stockStatus)}
                    </TableCell>
                    <TableCell className="text-gray-300">
                      Rs. {product.price.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-gray-300">
                      Rs.{" "}
                      {(product.currentStock * product.price).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import { useState } from "react";
