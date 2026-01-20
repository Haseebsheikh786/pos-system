"use client";

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
import { Trash2, Pencil } from "lucide-react";
import { Customer } from "@/types/customer";
import { getCurrencySymbol } from "@/lib/currency";

interface CustomerListProps {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
  onDelete: (id: string) => void;
  loading?: boolean;
  profile: {
    currency?: string;
  };
}

export default function CustomerList({
  customers,
  onEdit,
  onDelete,
  loading = false,
  profile,
}: CustomerListProps) {
  const currencySymbol = profile?.currency
    ? getCurrencySymbol(profile.currency)
    : "Rs.";

  if (loading && customers.length === 0) {
    return (
      <Card className="bg-card border-primary">
        <CardContent className="pt-6 text-center text-gray-400">
          Loading customers...
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card border-primary">
      <CardContent className="pt-6">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-primary/30">
                <TableHead className="text-primary">Name</TableHead>
                <TableHead className="text-primary">Phone</TableHead>
                <TableHead className="text-primary">Address</TableHead>
                <TableHead className="text-primary">Due Amount</TableHead>
                <TableHead className="text-primary">Total Purchases</TableHead>
                <TableHead className="text-primary text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center text-gray-400 py-8"
                  >
                    No customers found. Add your first customer!
                  </TableCell>
                </TableRow>
              ) : (
                customers.map((customer) => (
                  <TableRow
                    key={customer.id}
                    className="border-primary/30 hover:bg-dark-gray"
                  >
                    <TableCell>
                      <div className="flex flex-col">
                        <span className=" font-medium">{customer.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-300">
                      {customer.phone}
                    </TableCell>
                    <TableCell className="text-gray-400 text-sm">
                      {customer.address}
                    </TableCell>
                    <TableCell>
                      {customer.total_due_amount > 0 ? (
                        <Badge className="bg-orange-500/10 text-orange-400 border-orange-500">
                          {currencySymbol}
                          {customer.total_due_amount.toLocaleString()}
                        </Badge>
                      ) : (
                        <Badge className="bg-green-500/10 text-green-400 border-green-500">
                          No Dues
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-gray-300">
                      {customer.total_purchases.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEdit(customer)}
                          className="text-primary hover:bg-primary/10"
                          title="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDelete(customer.id)}
                          className="text-red-400 hover:bg-red-500/10"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
