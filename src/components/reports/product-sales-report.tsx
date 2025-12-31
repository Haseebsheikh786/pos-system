import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package } from "lucide-react";

type ProductSale = {
  product: string;
  quantity: number;
  revenue: number;
};

interface ProductSalesReportProps {
  productSales: ProductSale[];
}

export default function ProductSalesReport({
  productSales,
}: ProductSalesReportProps) {
  const totalRevenue = productSales.reduce((sum, p) => sum + p.revenue, 0);

  return (
    <Card className="bg-[#0a0a0a] border-[#D4AF37]">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-white">Product-wise Sales Report</CardTitle>
        <Package className="h-5 w-5 text-[#D4AF37]" />
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-[#D4AF37]/30">
              <TableHead className="text-[#D4AF37]">Product</TableHead>
              <TableHead className="text-[#D4AF37]">Units Sold</TableHead>
              <TableHead className="text-[#D4AF37]">Revenue (Rs.)</TableHead>
              <TableHead className="text-[#D4AF37]">% of Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productSales.map((item, index) => {
              const percentage = ((item.revenue / totalRevenue) * 100).toFixed(
                1
              );

              return (
                <TableRow key={index} className="border-[#D4AF37]/30">
                  <TableCell className="text-white font-medium">
                    {item.product}
                  </TableCell>
                  <TableCell className="text-gray-300">
                    {item.quantity} units
                  </TableCell>
                  <TableCell className="text-gray-300">
                    Rs. {item.revenue.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-[#1a1a1a] rounded-full h-2">
                        <div
                          className="bg-[#D4AF37] h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-gray-300 text-sm w-12">
                        {percentage}%
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
