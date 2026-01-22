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
import { getStatusBadge } from "@/lib/badges";

interface InventoryListProps {
  inventory: Product[];
  loading?: boolean;
}

export default function InventoryList({
  inventory,
  loading = false,
}: InventoryListProps) {
  const getStockStatus = (stock: number, minStock: number) => {
    if (stock === 0) return "out_of_stock";
    if (stock <= minStock) return "low_stock";
    return "good_stock";
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
      <Card className="bg-card border-primary">
        <CardContent className="pt-6 text-center text-gray-400">
          Loading inventory...
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card border-primary">
      <CardHeader>
        <CardTitle className="">All Inventory Items</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-primary/30">
                <TableHead className="text-primary">Product Name</TableHead>
                <TableHead className="text-primary">Current Stock</TableHead>
                <TableHead className="text-primary">Min Stock</TableHead>
                <TableHead className="text-primary">Status</TableHead>
                <TableHead className="text-primary">Last Updated</TableHead>
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
                  const status = getStockStatus(
                    item.stock,
                    item.min_stock_level,
                  );
                  const stockPercentage =
                    item.min_stock_level > 0
                      ? (item.stock / item.min_stock_level) * 100
                      : 100;

                  return (
                    <TableRow
                      key={item.id}
                      className="border-primary/30 hover:bg-dark-gray"
                    >
                      <TableCell>
                        <div className="flex flex-col">
                          <span className=" font-medium">{item.name}</span>
                          {item.description && (
                            <span className="text-xs text-gray-400 truncate max-w-[200px]">
                              {item.description}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className=" font-medium">
                            {item.stock} units
                          </span>
                          <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1">
                            <div
                              className={`h-1.5 rounded-full ${
                                status === "out_of_stock"
                                  ? "bg-red-500"
                                  : status === "low_stock"
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
                      <TableCell>
                        {getStatusBadge(
                          getStockStatus(item.stock, item.min_stock_level),
                        )}
                      </TableCell>
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
