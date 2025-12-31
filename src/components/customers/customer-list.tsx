import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Trash2 } from "lucide-react";

type Customer = {
  id: number;
  name: string;
  phone: string;
  address: string;
  creditBalance: number;
  totalPurchases: number;
  payments: { date: string; amount: number; type: "paid" | "credit" }[];
};

interface CustomerListProps {
  customers: Customer[];
  onView: (customer: Customer) => void;
  onDelete: (id: number) => void;
}

export default function CustomerList({
  customers,
  onView,
  onDelete,
}: CustomerListProps) {
  return (
    <Card className="bg-[#0a0a0a] border-[#D4AF37]">
      <CardContent className="pt-6">
        <Table>
          <TableHeader>
            <TableRow className="border-[#D4AF37]/30">
              <TableHead className="text-[#D4AF37]">ID</TableHead>
              <TableHead className="text-[#D4AF37]">Name</TableHead>
              <TableHead className="text-[#D4AF37]">Phone</TableHead>
              <TableHead className="text-[#D4AF37]">Address</TableHead>
              <TableHead className="text-[#D4AF37]">Credit Balance</TableHead>
              <TableHead className="text-[#D4AF37]">Total Purchases</TableHead>
              <TableHead className="text-[#D4AF37] text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id} className="border-[#D4AF37]/30">
                <TableCell className="text-gray-300">{customer.id}</TableCell>
                <TableCell className="text-white font-medium">
                  {customer.name}
                </TableCell>
                <TableCell className="text-gray-300">
                  {customer.phone}
                </TableCell>
                <TableCell className="text-gray-400 text-sm">
                  {customer.address}
                </TableCell>
                <TableCell>
                  {customer.creditBalance > 0 ? (
                    <Badge className="bg-orange-500/10 text-orange-400 border-orange-500">
                      Rs. {customer.creditBalance.toLocaleString()}
                    </Badge>
                  ) : (
                    <Badge className="bg-green-500/10 text-green-400 border-green-500">
                      Paid
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-gray-300">
                  Rs. {customer.totalPurchases.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onView(customer)}
                    className="text-[#D4AF37] hover:bg-[#1a1a1a]"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(customer.id)}
                    className="text-red-400 hover:bg-[#1a1a1a]"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
