"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, CreditCard, Package } from "lucide-react";

export default function DashboardPage() {
  // Mock data stored in state
  const [stats, setStats] = useState({
    todaysSales: 15240,
    todaysProfit: 4320,
    creditBalance: 2800,
    totalProducts: 156,
  });

  useEffect(() => {
    // prevent unused variable warning
    void setStats;
  }, []);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">
          Welcome back! Here's your business overview.
        </p>
      </div>

      {/* Stats Grid */}
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
            <p className="text-xs text-green-500 mt-1">+12.5% from yesterday</p>
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
            <p className="text-xs text-green-500 mt-1">+8.2% from yesterday</p>
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
            <p className="text-xs text-gray-500 mt-1">Outstanding payments</p>
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
            <p className="text-xs text-gray-500 mt-1">In inventory</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-[#0a0a0a] border-[#D4AF37]">
          <CardHeader>
            <CardTitle className="text-white">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Sale #1234</span>
                <span className="text-white font-medium">Rs. 450</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Sale #1233</span>
                <span className="text-white font-medium">Rs. 1,200</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Sale #1232</span>
                <span className="text-white font-medium">Rs. 850</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Sale #1231</span>
                <span className="text-white font-medium">Rs. 320</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#0a0a0a] border-[#D4AF37]">
          <CardHeader>
            <CardTitle className="text-white">Low Stock Alert</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Rice (5kg)</span>
                <span className="text-orange-400 font-medium">8 left</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Cooking Oil</span>
                <span className="text-orange-400 font-medium">5 left</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Sugar (1kg)</span>
                <span className="text-orange-400 font-medium">3 left</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Tea Bags</span>
                <span className="text-red-400 font-medium">2 left</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
