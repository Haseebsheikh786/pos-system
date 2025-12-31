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
import { Pencil, Trash2, Eye } from "lucide-react";
import { Product } from "@/types/product";

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export default function ProductList({
  products,
  onEdit,
  onDelete,
}: ProductListProps) {
  const getStockColor = (stock: number, minStock: number) => {
    if (stock === 0) return "bg-red-500/20 text-red-400 border-red-500/30";
    if (stock <= minStock)
      return "bg-orange-500/20 text-orange-400 border-orange-500/30";
    return "bg-green-500/20 text-green-400 border-green-500/30";
  };

  return (
    <Card className="bg-[#0a0a0a] border-[#D4AF37]">
      <CardContent className="pt-6">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-[#D4AF37]/30">
                <TableHead className="text-[#D4AF37]">Name</TableHead>
                <TableHead className="text-[#D4AF37]">Price</TableHead>
                <TableHead className="text-[#D4AF37]">Cost</TableHead>
                <TableHead className="text-[#D4AF37]">Stock</TableHead>
                <TableHead className="text-[#D4AF37] text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center text-gray-400 py-8"
                  >
                    No products found. Add your first product!
                  </TableCell>
                </TableRow>
              ) : (
                products.map((product) => (
                  <TableRow
                    key={product.id}
                    className="border-[#D4AF37]/30 hover:bg-[#1a1a1a]"
                  >
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-white font-medium">
                          {product.name}
                        </span>
                        {product.description && (
                          <span className="text-xs text-gray-400 truncate max-w-[200px]">
                            {product.description}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-300">
                      {product.price.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-gray-300">
                      {product.cost_price
                        ? `${product.cost_price.toFixed(2)}`
                        : "N/A"}
                    </TableCell>
                    <TableCell>
                      <div className="">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStockColor(
                            product.stock,
                            product.min_stock_level
                          )}`}
                        >
                          {product.stock} units
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEdit(product)}
                          className="text-[#D4AF37] hover:bg-[#D4AF37]/10"
                          title="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDelete(product.id)}
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
