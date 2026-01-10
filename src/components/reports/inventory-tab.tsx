"use client";
import { useState, useMemo } from "react";
import { Product } from "@/types/product";
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
  products: Product[];
}
type StockStatus = "out" | "low" | "good";
type StockFilter = StockStatus | "all";

export default function InventoryTab({
  dateRange,
  products,
}: InventoryTabProps) {
  const [stockFilter, setStockFilter] = useState<StockStatus | "all">("all");

  // Calculate inventory metrics
  const { totalProducts, lowStockItems, outOfStockItems, totalInventoryValue } =
    useMemo(() => {
      let lowStockCount = 0;
      let outOfStockCount = 0;
      let totalValue = 0;

      products.forEach((product) => {
        // Calculate stock status
        const minStock = product.min_stock_level || 5; // Default minimum stock

        if (product.stock === 0) {
          outOfStockCount++;
        } else if (product.stock <= minStock) {
          lowStockCount++;
        }

        // Calculate stock value (stock × cost price, fallback to selling price)
        const price =  product.price || 0;
        totalValue += product.stock * price;
      });

      return {
        totalProducts: products.length,
        lowStockItems: lowStockCount,
        outOfStockItems: outOfStockCount,
        totalInventoryValue: totalValue,
      };
    }, [products]);

  // Format currency
  const formatCurrency = (amount: number) => {
    return `Rs. ${amount.toLocaleString()}`;
  };

  // Determine stock status for a product
  const getProductStockStatus = (product: Product): StockStatus => {
    const minStock = product.min_stock_level || 5;

    if (product.stock === 0) return "out";
    if (product.stock <= minStock) return "low";
    return "good";
  };

  // Get products for the table (filtered by status)
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        if (stockFilter === "all") return true;

        const status = getProductStockStatus(product);
        return status === stockFilter;
      })
      .sort((a, b) => {
        // Sort by stock status (out of stock first, then low stock, then good)
        const statusA = getProductStockStatus(a);
        const statusB = getProductStockStatus(b);

        const statusOrder: Record<StockStatus, number> = {
          out: 0,
          low: 1,
          good: 2,
        };

        return statusOrder[statusA] - statusOrder[statusB];
      });
  }, [products, stockFilter]);

  const getStockStatusBadge = (status: StockStatus) => {
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

  // Summary cards data (dynamic)
  const summaryCards = [
    {
      title: "Total Products",
      value: totalProducts.toString(),
      icon: Package,
      description: "Active products in inventory",
      color: "border-blue-500",
    },
    {
      title: "Low Stock Items",
      value: lowStockItems.toString(),
      icon: TrendingDown,
      description: "Below minimum stock level",
      color: lowStockItems > 0 ? "border-orange-500" : "border-green-500",
    },
    {
      title: "Out of Stock Items",
      value: outOfStockItems.toString(),
      icon: AlertTriangle,
      description: "Need immediate restocking",
      color: outOfStockItems > 0 ? "border-red-500" : "border-green-500",
    },
    {
      title: "Total Inventory Value",
      value: formatCurrency(totalInventoryValue),
      icon: DollarSign,
      description: "Current stock value at cost",
      color: "border-purple-500",
    },
  ];

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
            <Select
              value={stockFilter}
              onValueChange={(value) => setStockFilter(value as StockFilter)}
            >
              <SelectTrigger className="w-48 bg-[#1a1a1a] border-[#D4AF37]/30 text-white">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent className="bg-[#0a0a0a] border-[#D4AF37] text-white">
                <SelectItem value="all">
                  All Status ({products.length})
                </SelectItem>
                <SelectItem value="out">
                  Out of Stock ({outOfStockItems})
                </SelectItem>
                <SelectItem value="low">Low Stock ({lowStockItems})</SelectItem>
                <SelectItem value="good">
                  Good Stock (
                  {products.length - lowStockItems - outOfStockItems})
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Stock Alert Table */}
      <Card className="bg-[#0a0a0a] border-[#D4AF37]">
        <CardHeader>
          <CardTitle className="text-white">
            {stockFilter === "all"
              ? "All Products"
              : stockFilter === "out"
              ? "Out of Stock Products"
              : stockFilter === "low"
              ? "Low Stock Products"
              : "Products in Good Stock"}
            {filteredProducts.length > 0 && ` (${filteredProducts.length})`}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                {stockFilter === "out"
                  ? "🎉 No products are out of stock!"
                  : stockFilter === "low"
                  ? "🎉 No products are low on stock!"
                  : "No products found"}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-[#D4AF37]/30">
                    <TableHead className="text-[#D4AF37]">
                      Product Name
                    </TableHead>
                    <TableHead className="text-[#D4AF37]">SKU</TableHead>
                    <TableHead className="text-[#D4AF37]">
                      Current Stock
                    </TableHead>
                    <TableHead className="text-[#D4AF37]">
                      Minimum Stock
                    </TableHead>
                    <TableHead className="text-[#D4AF37]">
                      Stock Status
                    </TableHead>
                    <TableHead className="text-[#D4AF37]">Cost Price</TableHead>
                    <TableHead className="text-[#D4AF37]">
                      Selling Price
                    </TableHead>
                    <TableHead className="text-[#D4AF37]">
                      Stock Value
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => {
                    const stockStatus = getProductStockStatus(product);
                    const price = product.cost_price || product.price || 0;
                    const stockValue = product.stock * price;
                    const minStock = product.min_stock_level || 5;

                    return (
                      <TableRow
                        key={product.id}
                        className="border-[#D4AF37]/30"
                      >
                        <TableCell className="text-white font-medium">
                          <div>
                            {product.name || "Unnamed Product"}
                            {product.category && (
                              <div className="text-xs text-gray-400">
                                {product.category}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-300">
                          {product.sku || "N/A"}
                        </TableCell>
                        <TableCell
                          className={
                            stockStatus === "out"
                              ? "text-red-400 font-bold"
                              : stockStatus === "low"
                              ? "text-orange-400"
                              : "text-gray-300"
                          }
                        >
                          {product.stock} units
                        </TableCell>
                        <TableCell className="text-gray-300">
                          {minStock} units
                        </TableCell>
                        <TableCell>
                          {getStockStatusBadge(stockStatus)}
                        </TableCell>
                        <TableCell className="text-gray-300">
                          {product.cost_price
                            ? formatCurrency(product.cost_price)
                            : "N/A"}
                        </TableCell>
                        <TableCell className="text-gray-300">
                          {product.price
                            ? formatCurrency(product.price)
                            : "N/A"}
                        </TableCell>
                        <TableCell className="text-gray-300">
                          {formatCurrency(stockValue)}
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
