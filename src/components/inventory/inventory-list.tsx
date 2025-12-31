import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

type InventoryItem = {
  id: number;
  name: string;
  stock: number;
  minStock: number;
  lastSold: string;
  category: string;
};

interface InventoryListProps {
  inventory: InventoryItem[];
}

export default function InventoryList({ inventory }: InventoryListProps) {
  const getStockStatus = (item: InventoryItem) => {
    const stockPercentage = (item.stock / item.minStock) * 100;

    if (item.stock < 10) return "critical";
    if (item.stock < item.minStock) return "low";
    if (stockPercentage < 150) return "normal";
    return "good";
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "critical":
        return (
          <Badge className="bg-red-500/10 text-red-400 border-red-500">
            Critical
          </Badge>
        );
      case "low":
        return (
          <Badge className="bg-orange-500/10 text-orange-400 border-orange-500">
            Low Stock
          </Badge>
        );
      case "normal":
        return (
          <Badge className="bg-blue-500/10 text-blue-400 border-blue-500">
            Normal
          </Badge>
        );
      case "good":
        return (
          <Badge className="bg-green-500/10 text-green-400 border-green-500">
            Good Stock
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="bg-[#0a0a0a] border-[#D4AF37]">
      <CardHeader>
        <CardTitle className="text-white">All Inventory Items</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-[#D4AF37]/30">
              <TableHead className="text-[#D4AF37]">ID</TableHead>
              <TableHead className="text-[#D4AF37]">Product Name</TableHead>
              <TableHead className="text-[#D4AF37]">Category</TableHead>
              <TableHead className="text-[#D4AF37]">Current Stock</TableHead>
              <TableHead className="text-[#D4AF37]">Min Stock</TableHead>
              <TableHead className="text-[#D4AF37]">Status</TableHead>
              <TableHead className="text-[#D4AF37]">Last Sold</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventory.map((item) => {
              const status = getStockStatus(item);

              return (
                <TableRow key={item.id} className="border-[#D4AF37]/30">
                  <TableCell className="text-gray-300">{item.id}</TableCell>
                  <TableCell className="text-white font-medium">
                    {item.name}
                  </TableCell>
                  <TableCell className="text-gray-300">
                    {item.category}
                  </TableCell>
                  <TableCell className="text-white">
                    {item.stock} units
                  </TableCell>
                  <TableCell className="text-gray-400">
                    {item.minStock} units
                  </TableCell>
                  <TableCell>{getStatusBadge(status)}</TableCell>
                  <TableCell className="text-gray-400 text-sm">
                    {item.lastSold}
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
