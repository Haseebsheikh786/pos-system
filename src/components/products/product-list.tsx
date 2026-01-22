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
import { getCurrencySymbol } from "@/lib/currency";
import { getStatusBadge } from "@/lib/badges";

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  profile: {
    currency?: string;
  };
}

export default function ProductList({
  products,
  onEdit,
  onDelete,
  profile,
}: ProductListProps) {
  const currencySymbol = profile?.currency
    ? getCurrencySymbol(profile.currency)
    : "Rs.";
  const getStockStatus = (stock: number, minStock: number) => {
    if (stock === 0) return "out_of_stock";
    if (stock <= minStock) return "low_stock";
    return "good_stock";
  };

  return (
    <Card className="bg-card border-primary">
      <CardContent className="pt-6">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-primary/30">
                <TableHead className="text-primary">Name</TableHead>
                <TableHead className="text-primary">Price</TableHead>
                <TableHead className="text-primary">Cost</TableHead>
                <TableHead className="text-primary">Barcode</TableHead>
                <TableHead className="text-primary">Stock</TableHead>
                <TableHead className="text-primary text-right">
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
                    className="border-primary/30 hover:bg-dark-gray"
                  >
                    <TableCell>
                      <div className="flex flex-col">
                        <span className=" font-medium">{product.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-300">
                      {currencySymbol}
                      {product.price.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-gray-300">
                      {currencySymbol}
                      {product.cost_price
                        ? `${product.cost_price.toFixed(2)}`
                        : "N/A"}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className=" font-medium">
                          {product.barcode || "-"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(
                        getStockStatus(product.stock, product.min_stock_level),
                        `${product.stock} units`,
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEdit(product)}
                          className="text-primary hover:bg-primary/10"
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
