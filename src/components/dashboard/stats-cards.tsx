"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, CreditCard, Package } from "lucide-react";

interface StatsProps {
  stats: {
    todaysSales: number;
    todaysProfit: number;
    creditBalance: number;
    totalProducts: number;
  };
}

const StatsCards = ({ stats }: StatsProps) => {
  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {/* Today's Sales */}
        <Card className="bg-[#0a0a0a] border-[#D4AF37]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Today's Sales
            </CardTitle>
            <DollarSign className="h-5 w-5 text-[#D4AF37]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              Rs. {stats.todaysSales.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        {/* Today's Profit */}
        <Card className="bg-[#0a0a0a] border-[#D4AF37]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Today's Profit
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-[#D4AF37]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              Rs. {stats.todaysProfit.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        {/* Credit Balance (Udhaar) */}
        <Card className="bg-[#0a0a0a] border-[#D4AF37]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Credit Balance (Udhaar)
            </CardTitle>
            <CreditCard className="h-5 w-5 text-[#D4AF37]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-400">
              Rs. {stats.creditBalance.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        {/* Total Products */}
        <Card className="bg-[#0a0a0a] border-[#D4AF37]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Total Products
            </CardTitle>
            <Package className="h-5 w-5 text-[#D4AF37]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {stats.totalProducts}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default StatsCards;
