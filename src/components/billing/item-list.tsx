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
import { Button } from "@/components/ui/button";
import { Trash2, X } from "lucide-react";
import type { Product } from "@/types/product";
import { getCurrencySymbol } from "@/lib/currency";

type BillItem = {
  id: number;
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  total: number;
  currentStock: number;
};

interface ItemListProps {
  billItems: BillItem[];
  onRemoveItem: (id: number) => void;
  onUpdateQuantity: (id: number, newQty: number) => void;
  onClearBill: () => void;
  products: Product[];
  profile: {
    currency?: string;
  };
}

export default function ItemList({
  billItems,
  onRemoveItem,
  onUpdateQuantity,
  onClearBill,
  products,
  profile,
}: ItemListProps) {
  const getStockStatus = (item: BillItem) => {
    const product = products.find((p) => p.id === item.productId);
    if (!product) return "unknown";

    const remainingStock = product.stock - item.quantity;

    if (remainingStock <= 0) return "out-of-stock";
    if (remainingStock <= product.min_stock_level) return "low-stock";
    return "available";
  };
  const currencySymbol = profile?.currency
    ? getCurrencySymbol(profile.currency)
    : "Rs.";

  return (
    <Card className="bg-card border-primary">
      <CardHeader>
        <CardTitle className=" flex items-center justify-between">
          <span>Bill Items</span>
          {billItems.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearBill}
              className="text-red-400 hover:bg-red-500/10"
            >
              <X className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {billItems.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>No items added yet. Start by selecting a product above.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-primary/30">
                  <TableHead className="text-primary">Product</TableHead>
                  <TableHead className="text-primary">Price</TableHead>
                  <TableHead className="text-primary">Quantity</TableHead>
                  <TableHead className="text-primary">Total</TableHead>
                  <TableHead className="text-primary">Stock Status</TableHead>
                  <TableHead className="text-primary"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {billItems.map((item) => {
                  const stockStatus = getStockStatus(item);
                  const product = products.find((p) => p.id === item.productId);

                  return (
                    <TableRow
                      key={item.id}
                      className="border-primary/30 hover:bg-dark-gray"
                    >
                      <TableCell className=" font-medium">
                        <div className="flex flex-col">
                          <span>{item.productName}</span>
                          {product?.sku && (
                            <span className="text-xs text-gray-400">
                              SKU: {product.sku}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {currencySymbol}
                        {item.price.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              onUpdateQuantity(item.id, item.quantity - 1)
                            }
                            className="h-6 w-6 p-0 text-gray-400 hover: disabled:opacity-30"
                            disabled={item.quantity <= 1}
                          >
                            -
                          </Button>
                          <span className=" w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              onUpdateQuantity(item.id, item.quantity + 1)
                            }
                            className="h-6 w-6 p-0 text-gray-400 hover:"
                            disabled={product && item.quantity >= product.stock}
                          >
                            +
                          </Button>
                        </div>
                        {product && (
                          <p className="text-xs text-gray-400 mt-1">
                            Max: {product.stock}
                          </p>
                        )}
                      </TableCell>
                      <TableCell className=" font-medium">
                        {currencySymbol}
                        {item.total.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            stockStatus === "out-of-stock"
                              ? "bg-red-500/10 text-red-400"
                              : stockStatus === "low-stock"
                                ? "bg-orange-500/10 text-orange-400"
                                : "bg-green-500/10 text-green-400"
                          }`}
                        >
                          {stockStatus === "out-of-stock"
                            ? "No Stock"
                            : stockStatus === "low-stock"
                              ? "Low Stock"
                              : "Available"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onRemoveItem(item.id)}
                          className="text-red-400 hover:bg-red-500/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
