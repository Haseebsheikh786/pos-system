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
import { Pencil, Trash2 } from "lucide-react";

type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
};

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

export default function ProductList({
  products,
  onEdit,
  onDelete,
}: ProductListProps) {
  const getStockColor = (stock: number) => {
    if (stock < 10) return "bg-red-500/10 text-red-400";
    if (stock < 30) return "bg-orange-500/10 text-orange-400";
    return "bg-green-500/10 text-green-400";
  };

  return (
    <Card className="bg-[#0a0a0a] border-[#D4AF37]">
      <CardContent className="pt-6">
        <Table>
          <TableHeader>
            <TableRow className="border-[#D4AF37]/30">
              <TableHead className="text-[#D4AF37]">ID</TableHead>
              <TableHead className="text-[#D4AF37]">Product Name</TableHead>
              <TableHead className="text-[#D4AF37]">Price (Rs.)</TableHead>
              <TableHead className="text-[#D4AF37]">Stock</TableHead>
              <TableHead className="text-[#D4AF37] text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id} className="border-[#D4AF37]/30">
                <TableCell className="text-gray-300">{product.id}</TableCell>
                <TableCell className="text-white font-medium">
                  {product.name}
                </TableCell>
                <TableCell className="text-gray-300">
                  Rs. {product.price.toLocaleString()}
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStockColor(
                      product.stock
                    )}`}
                  >
                    {product.stock} units
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(product)}
                    className="text-[#D4AF37] hover:bg-[#1a1a1a]"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(product.id)}
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
