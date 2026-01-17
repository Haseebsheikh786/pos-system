"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Package,
  TrendingDown,
  AlertCircle,
  DollarSign,
  MinusCircle,
  TrendingUp,
} from "lucide-react";
import { Product } from "@/types/product";
import { getCurrencySymbol } from "@/lib/currency";

interface InventoryStatsProps {
  stats?: {
    totalItems: number;
    lowStockItems: number;
    criticalStockItems: number;
    outOfStockItems: number;
    totalStockValue: number;
    itemsNeedingRestock: number;
  };
  loading?: boolean;
  profile: {
    currency?: string;
  };
}

export default function InventoryStats({
  stats,
  loading = false,
  profile,
}: InventoryStatsProps) {
  const currencySymbol = profile?.currency
    ? getCurrencySymbol(profile.currency)
    : "Rs.";
  const statCards = [
    {
      title: "Total Items",
      value: loading ? "-" : stats?.totalItems || 0,
      icon: Package,
      iconColor: "text-[#D4AF37]",
      valueColor: "text-white",
      description: "Active products",
    },
    {
      title: "Low Stock",
      value: loading ? "-" : stats?.lowStockItems || 0,
      icon: TrendingDown,
      iconColor: "text-orange-400",
      valueColor: "text-orange-400",
      description: "Below minimum level",
    },
    {
      title: "Critical Stock",
      value: loading ? "-" : stats?.criticalStockItems || 0,
      icon: AlertCircle,
      iconColor: "text-red-400",
      valueColor: "text-red-400",
      description: "Less than 10 units",
    },
    {
      title: "Out of Stock",
      value: loading ? "-" : stats?.outOfStockItems || 0,
      icon: MinusCircle,
      iconColor: "text-red-400",
      valueColor: "text-red-400",
      description: "Zero units available",
    },
    {
      title: "Stock Value",
      value: loading
        ? "-"
        : `${currencySymbol}${stats?.totalStockValue?.toLocaleString() || 0}`,
      icon: DollarSign,
      iconColor: "text-green-400",
      valueColor: "text-green-400",
      description: "Total inventory worth",
    },
    {
      title: "Need Restock",
      value: loading ? "-" : stats?.itemsNeedingRestock || 0,
      icon: TrendingUp,
      iconColor: "text-blue-400",
      valueColor: "text-blue-400",
      description: "Items to reorder",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="bg-[#0a0a0a] border-[#D4AF37]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                {stat.title}
              </CardTitle>
              <Icon className={`h-5 w-5 ${stat.iconColor}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${stat.valueColor}`}>
                {stat.value}
              </div>
              <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
