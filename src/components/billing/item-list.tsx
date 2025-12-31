import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2, X } from "lucide-react";

type BillItem = {
  id: number;
  productName: string;
  price: number;
  quantity: number;
  total: number;
};

interface ItemListProps {
  billItems: BillItem[];
  onRemoveItem: (id: number) => void;
  onUpdateQuantity: (id: number, newQty: number) => void;
  onClearBill: () => void;
}

export default function ItemList({
  billItems,
  onRemoveItem,
  onUpdateQuantity,
  onClearBill,
}: ItemListProps) {
  return (
    <Card className="bg-[#0a0a0a] border-[#D4AF37]">
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-between">
          <span>Bill Items</span>
          {billItems.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearBill}
              className="text-red-400 hover:bg-red-500/10"
            >
              <X className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {billItems.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>No items added yet. Start by selecting a product above.</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="border-[#D4AF37]/30">
                <TableHead className="text-[#D4AF37]">Product</TableHead>
                <TableHead className="text-[#D4AF37]">Price</TableHead>
                <TableHead className="text-[#D4AF37]">Quantity</TableHead>
                <TableHead className="text-[#D4AF37]">Total</TableHead>
                <TableHead className="text-[#D4AF37]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {billItems.map((item) => (
                <TableRow key={item.id} className="border-[#D4AF37]/30">
                  <TableCell className="text-white font-medium">
                    {item.productName}
                  </TableCell>
                  <TableCell className="text-gray-300">
                    Rs. {item.price}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          onUpdateQuantity(item.id, item.quantity - 1)
                        }
                        className="h-6 w-6 p-0 text-gray-400 hover:text-white"
                      >
                        -
                      </Button>
                      <span className="text-white w-8 text-center">
                        {item.quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          onUpdateQuantity(item.id, item.quantity + 1)
                        }
                        className="h-6 w-6 p-0 text-gray-400 hover:text-white"
                      >
                        +
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="text-white font-medium">
                    Rs. {item.total.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemoveItem(item.id)}
                      className="text-red-400 hover:bg-red-500/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
