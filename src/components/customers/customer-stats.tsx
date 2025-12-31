import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Customer = {
  id: number;
  name: string;
  phone: string;
  address: string;
  creditBalance: number;
  totalPurchases: number;
  payments: { date: string; amount: number; type: "paid" | "credit" }[];
};

interface CustomerStatsProps {
  customers: Customer[];
}

export default function CustomerStats({ customers }: CustomerStatsProps) {
  const totalCredit = customers.reduce((sum, c) => sum + c.creditBalance, 0);
  const customersWithCredit = customers.filter(
    (c) => c.creditBalance > 0
  ).length;

  const stats = [
    {
      title: "Total Customers",
      value: customers.length,
      color: "text-white",
      description: "",
    },
    {
      title: "Total Credit (Udhaar)",
      value: `Rs. ${totalCredit.toLocaleString()}`,
      color: "text-orange-400",
      description: "",
    },
    {
      title: "Customers with Credit",
      value: customersWithCredit,
      color: "text-white",
      description: "",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3 mb-6">
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
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
