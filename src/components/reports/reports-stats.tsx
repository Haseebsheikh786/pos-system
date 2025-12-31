import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, BarChart3, Calendar } from "lucide-react";

type SaleData = {
  date: string;
  sales: number;
  profit: number;
  transactions: number;
};

interface ReportsStatsProps {
  salesData: SaleData[];
  reportType: string;
}

export default function ReportsStats({
  salesData,
  reportType,
}: ReportsStatsProps) {
  const totalSales = salesData.reduce((sum, day) => sum + day.sales, 0);
  const totalProfit = salesData.reduce((sum, day) => sum + day.profit, 0);
  const totalTransactions = salesData.reduce(
    (sum, day) => sum + day.transactions,
    0
  );

  const stats = [
    {
      title: "Total Sales",
      value: totalSales,
      icon: TrendingUp,
      valuePrefix: "Rs. ",
      description: reportType === "daily" ? "Last 5 days" : "Last 4 months",
      descriptionColor: "text-green-500",
    },
    {
      title: "Total Profit",
      value: totalProfit,
      icon: BarChart3,
      valuePrefix: "Rs. ",
      description: `${((totalProfit / totalSales) * 100).toFixed(
        1
      )}% profit margin`,
      descriptionColor: "text-gray-500",
    },
    {
      title: "Total Transactions",
      value: totalTransactions,
      icon: Calendar,
      valuePrefix: "",
      description: `Avg: Rs. ${Math.round(
        totalSales / totalTransactions
      ).toLocaleString()} per transaction`,
      descriptionColor: "text-gray-500",
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
              <Icon className="h-5 w-5 text-[#D4AF37]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {stat.valuePrefix}
                {stat.value.toLocaleString()}
              </div>
              <p className={`text-xs ${stat.descriptionColor} mt-1`}>
                {stat.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
