"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Calendar } from "lucide-react";
import type { Customer } from "@/types/customer";

interface InvoiceFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  paymentStatus: string;
  onPaymentStatusChange: (value: string) => void;
  customerId: string;
  onCustomerChange: (value: string) => void;
  dateRange: string;
  onDateRangeChange: (value: string) => void;
  customers: Customer[];
  loading?: boolean;
  onClearFilters: () => void;
}

export default function InvoiceFilters({
  searchQuery,
  onSearchChange,
  paymentStatus,
  onPaymentStatusChange,
  customerId,
  onCustomerChange,
  dateRange,
  onDateRangeChange,
  customers,
  loading = false,
  onClearFilters,
}: InvoiceFiltersProps) {
  const hasActiveFilters =
    searchQuery || paymentStatus !== "all" || customerId || dateRange !== "all";

  return (
    <Card className="bg-card border-primary mb-6">
      <CardContent className="pt-6">
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by invoice number or customer name..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-dark-gray border-primary/30 "
              disabled={loading}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Date Range */}
            <div>
              <Label className="text-gray-300 text-sm mb-2 block">
                Date Range
              </Label>
              <Select
                value={dateRange}
                onValueChange={onDateRangeChange}
                disabled={loading}
              >
                <SelectTrigger className="bg-dark-gray border-primary/30 ">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <SelectValue placeholder="All dates" />
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-card border-primary">
                  <SelectItem value="all">All Dates</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="yesterday">Yesterday</SelectItem>
                  <SelectItem value="this_week">This Week</SelectItem>
                  <SelectItem value="this_month">This Month</SelectItem>
                  <SelectItem value="last_month">Last Month</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Payment Status */}
            <div>
              <Label className="text-gray-300 text-sm mb-2 block">
                Payment Status
              </Label>
              <Select
                value={paymentStatus}
                onValueChange={onPaymentStatusChange}
                disabled={loading}
              >
                <SelectTrigger className="bg-dark-gray border-primary/30 ">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <SelectValue placeholder="All status" />
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-card border-primary">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="partial">Partial</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Customer */}
            <div>
              <Label className="text-gray-300 text-sm mb-2 block">
                Customer
              </Label>
              <Select
                value={customerId}
                onValueChange={onCustomerChange}
                disabled={loading || customers.length === 0}
              >
                <SelectTrigger className="bg-dark-gray border-primary/30 ">
                  <SelectValue placeholder="All customers" />
                </SelectTrigger>
                <SelectContent className="bg-card border-primary max-h-60">
                  <SelectItem value="all">All Customers</SelectItem>
                  {customers.map((customer) => (
                    <SelectItem
                      key={customer.id}
                      value={customer.id}
                      className=""
                    >
                      {customer.name}
                      {customer.phone && ` (${customer.phone})`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Actions */}
            <div className="flex items-end">
              {hasActiveFilters && (
                <Button
                  onClick={onClearFilters}
                  variant="outline"
                  className="w-full flex items-start justify-start bg-dark-gray border-primary/30 "
                  disabled={loading}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
