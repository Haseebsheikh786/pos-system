import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type SaleData = {
  date: string;
  sales: number;
  profit: number;
  transactions: number;
};

interface SalesReportTableProps {
  salesData: SaleData[];
  reportType: string;
}

export default function SalesReport({
  salesData,
  reportType,
}: SalesReportTableProps) {
  const reportTitle =
    reportType === "daily" ? "Daily Sales Report" : "Monthly Sales Report";

  return (
    <Card className="bg-[#0a0a0a] border-[#D4AF37] mb-6">
      <CardHeader>
        <CardTitle className="text-white">{reportTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-[#D4AF37]/30">
              <TableHead className="text-[#D4AF37]">Date</TableHead>
              <TableHead className="text-[#D4AF37]">Sales (Rs.)</TableHead>
              <TableHead className="text-[#D4AF37]">Profit (Rs.)</TableHead>
              <TableHead className="text-[#D4AF37]">Transactions</TableHead>
              <TableHead className="text-[#D4AF37]">Avg Transaction</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {salesData.map((data, index) => (
              <TableRow key={index} className="border-[#D4AF37]/30">
                <TableCell className="text-white font-medium">
                  {data.date}
                </TableCell>
                <TableCell className="text-gray-300">
                  Rs. {data.sales.toLocaleString()}
                </TableCell>
                <TableCell className="text-green-400">
                  Rs. {data.profit.toLocaleString()}
                </TableCell>
                <TableCell className="text-gray-300">
                  {data.transactions}
                </TableCell>
                <TableCell className="text-gray-300">
                  Rs.{" "}
                  {Math.round(data.sales / data.transactions).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
