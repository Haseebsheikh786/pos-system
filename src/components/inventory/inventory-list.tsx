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
import { Product } from "@/types/product";

interface InventoryListProps {
  inventory: Product[];
  loading?: boolean;
}

export default function InventoryList({
  inventory,
  loading = false,
}: InventoryListProps) {
  const getStockStatus = (item: Product) => {
    if (item.stock === 0) return "out-of-stock";
    if (item.stock < 10) return "critical";
    if (item.stock <= item.min_stock_level) return "low";
    if (item.stock / item.min_stock_level < 1.5) return "normal";
    return "good";
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "out-of-stock":
        return (
          <Badge className="bg-red-500/20 text-red-400 border-red-500">
            Out of Stock
          </Badge>
        );
      case "critical":
        return (
          <Badge className="bg-red-500/10 text-red-400 border-red-500">
            Critical
          </Badge>
        );
      case "low":
        return (
          <Badge className="bg-orange-500/10 text-orange-400 border-orange-500">
            Low Stock
          </Badge>
        );
      case "normal":
        return (
          <Badge className="bg-blue-500/10 text-blue-400 border-blue-500">
            Normal
          </Badge>
        );
      case "good":
        return (
          <Badge className="bg-green-500/10 text-green-400 border-green-500">
            Good Stock
          </Badge>
        );
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
    } else if (diffDays < 30) {
      return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
    } else {
      return date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    }
  };

  if (loading && inventory.length === 0) {
    return (
      <Card className="bg-[#0a0a0a] border-[#D4AF37]">
        <CardContent className="pt-6 text-center text-gray-400">
          Loading inventory...
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-[#0a0a0a] border-[#D4AF37]">
      <CardHeader>
        <CardTitle className="text-white">All Inventory Items</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-[#D4AF37]/30">
                <TableHead className="text-[#D4AF37]">Product Name</TableHead>
                <TableHead className="text-[#D4AF37]">Current Stock</TableHead>
                <TableHead className="text-[#D4AF37]">Min Stock</TableHead>
                <TableHead className="text-[#D4AF37]">Status</TableHead>
                <TableHead className="text-[#D4AF37]">Last Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventory.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center text-gray-400 py-8"
                  >
                    No inventory items found. Add products to see them here.
                  </TableCell>
                </TableRow>
              ) : (
                inventory.map((item) => {
                  const status = getStockStatus(item);
                  const stockPercentage =
                    item.min_stock_level > 0
                      ? (item.stock / item.min_stock_level) * 100
                      : 100;

                  return (
                    <TableRow
                      key={item.id}
                      className="border-[#D4AF37]/30 hover:bg-[#1a1a1a]"
                    >
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-white font-medium">
                            {item.name}
                          </span>
                          {item.description && (
                            <span className="text-xs text-gray-400 truncate max-w-[200px]">
                              {item.description}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-white font-medium">
                            {item.stock} units
                          </span>
                          <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1">
                            <div
                              className={`h-1.5 rounded-full ${
                                status === "out-of-stock" ||
                                status === "critical"
                                  ? "bg-red-500"
                                  : status === "low"
                                  ? "bg-orange-500"
                                  : "bg-green-500"
                              }`}
                              style={{
                                width: `${Math.min(stockPercentage, 100)}%`,
                              }}
                            />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-400">
                        {item.min_stock_level} units
                      </TableCell>
                      <TableCell>{getStatusBadge(status)}</TableCell>
                      <TableCell className="text-gray-400 text-sm">
                        {formatDate(item.updated_at)}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
