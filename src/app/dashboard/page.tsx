"use client";

import { useEffect, useState } from "react";
import StatsCards from "@/components/dashboard/stats-cards";
import ActivityAndAlerts from "@/components/dashboard/activity-and-alerts";

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
      <StatsCards stats={stats} />
      <ActivityAndAlerts />
    </div>
  );
}
