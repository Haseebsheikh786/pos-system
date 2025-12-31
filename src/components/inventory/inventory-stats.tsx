import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, TrendingDown, AlertCircle } from "lucide-react";

type InventoryItem = {
  id: number;
  name: string;
  stock: number;
  minStock: number;
  lastSold: string;
  category: string;
};

interface InventoryStatsProps {
  inventory: InventoryItem[];
  lowStockItems: InventoryItem[];
  criticalStockItems: InventoryItem[];
}

export default function InventoryStats({
  inventory,
  lowStockItems,
  criticalStockItems,
}: InventoryStatsProps) {
  const stats = [
    {
      title: "Total Items",
      value: inventory.length,
      icon: Package,
      iconColor: "text-[#D4AF37]",
      valueColor: "text-white",
      description: "In inventory",
    },
    {
      title: "Low Stock Items",
      value: lowStockItems.length,
      icon: TrendingDown,
      iconColor: "text-orange-400",
      valueColor: "text-orange-400",
      description: "Need restock",
    },
    {
      title: "Critical Stock",
      value: criticalStockItems.length,
      icon: AlertCircle,
      iconColor: "text-red-400",
      valueColor: "text-red-400",
      description: "Urgent attention",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3 mb-6">
      {stats.map((stat, index) => {
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
