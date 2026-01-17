"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrencySymbol } from "@/lib/currency";
import { Customer } from "@/types/customer";

interface CustomerStatsProps {
  customers: Customer[];
  loading?: boolean;
  profile: {
    currency?: string;
  };
}

export default function CustomerStats({
  customers,
  loading = false,
  profile,
}: CustomerStatsProps) {
  const totalCustomers = customers.length;
  const totalCredit = customers.reduce((sum, c) => sum + c.total_due_amount, 0);
  const customersWithCredit = customers.filter(
    (c) => c.total_due_amount > 0,
  ).length;
  const totalPurchases = customers.reduce(
    (sum, c) => sum + c.total_purchases,
    0,
  );
  const currencySymbol = profile?.currency
    ? getCurrencySymbol(profile.currency)
    : "Rs.";
  const stats = [
    {
      title: "Total Customers",
      value: loading ? "-" : totalCustomers,
      color: "text-white",
      description: "",
    },
    {
      title: "Total Credit",
      value: loading ? "-" : `${currencySymbol}${totalCredit.toLocaleString()}`,
      color: "text-orange-400",
      description:
        customersWithCredit > 0
          ? `${customersWithCredit} customers with dues`
          : "",
    },
    {
      title: "Total Purchases",
      value: loading
        ? "-"
        : `${currencySymbol}${totalPurchases.toLocaleString()}`,
      color: "text-green-400",
      description: "",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-[#0a0a0a] border-[#D4AF37]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              {stat.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${stat.color}`}>
              {stat.value}
            </div>
            {stat.description && (
              <p className="text-xs text-gray-400 mt-1">{stat.description}</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
