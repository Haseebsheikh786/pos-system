"use client";

import { useState } from "react";
import { AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InventoryList from "@/components/inventory/inventory-list";
import InventoryStats from "@/components/inventory/inventory-stats";

type InventoryItem = {
  id: number;
  name: string;
  stock: number;
  minStock: number;
  lastSold: string;
  category: string;
};

export default function InventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>([
    {
      id: 1,
      name: "Rice (5kg)",
      stock: 45,
      minStock: 20,
      lastSold: "2 hours ago",
      category: "Groceries",
    },
    {
      id: 2,
      name: "Cooking Oil (1L)",
      stock: 32,
      minStock: 15,
      lastSold: "30 mins ago",
      category: "Groceries",
    },
    {
      id: 3,
      name: "Sugar (1kg)",
      stock: 8,
      minStock: 25,
      lastSold: "1 hour ago",
      category: "Groceries",
    },
    {
      id: 4,
      name: "Tea Bags (100pcs)",
      stock: 5,
      minStock: 20,
      lastSold: "3 hours ago",
      category: "Beverages",
    },
    {
      id: 5,
      name: "Flour (5kg)",
      stock: 51,
      minStock: 30,
      lastSold: "4 hours ago",
      category: "Groceries",
    },
    {
      id: 6,
      name: "Coffee (200g)",
      stock: 3,
      minStock: 10,
      lastSold: "1 hour ago",
      category: "Beverages",
    },
    {
      id: 7,
      name: "Milk Powder (400g)",
      stock: 18,
      minStock: 15,
      lastSold: "5 hours ago",
      category: "Dairy",
    },
  ]);

  const lowStockItems = inventory.filter((item) => item.stock < item.minStock);
  const criticalStockItems = inventory.filter((item) => item.stock < 10);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Inventory Management
        </h1>
        <p className="text-gray-400">
          Monitor stock levels and get low-stock alerts.
        </p>
      </div>

      {/* Stats Grid */}
      <InventoryStats
        inventory={inventory}
        lowStockItems={lowStockItems}
        criticalStockItems={criticalStockItems}
      />

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
              You have {lowStockItems.length} item(s) below minimum stock level.
              Consider restocking soon.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Inventory Table */}
      <InventoryList inventory={inventory} />
    </div>
  );
}
