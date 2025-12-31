import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Printer, Download } from "lucide-react";

type BillItem = {
  id: number;
  productName: string;
  price: number;
  quantity: number;
  total: number;
};

interface InvoicePreviewProps {
  billItems: BillItem[];
  customerName: string;
  subtotal: number;
  total: number;
  onPrint: () => void;
  onDownload: () => void;
  onClose: () => void;
}

export default function InvoicePreview({
  billItems,
  customerName,
  subtotal,
  total,
  onPrint,
  onDownload,
  onClose,
}: InvoicePreviewProps) {
  const invoiceNumber = Date.now().toString().slice(-6);
  const invoiceDate = new Date().toLocaleDateString();

  return (
    <DialogContent className="bg-[#0a0a0a] border-[#D4AF37] max-w-3xl">
      <DialogHeader>
        <DialogTitle className="text-white">Invoice Preview</DialogTitle>
      </DialogHeader>
      <div className="py-6 space-y-6" id="invoice-content">
        {/* Invoice Header */}
        <div className="text-center border-b border-[#D4AF37] pb-4">
          <h2 className="text-2xl font-bold text-[#D4AF37]">POS System</h2>
          <p className="text-gray-400 text-sm mt-1">Invoice #{invoiceNumber}</p>
          <p className="text-gray-400 text-sm">{invoiceDate}</p>
        </div>

        {customerName && (
          <div>
            <Label className="text-gray-400 text-sm">Customer:</Label>
            <p className="text-white font-medium">{customerName}</p>
          </div>
        )}

        {/* Invoice Items */}
        <Table>
          <TableHeader>
            <TableRow className="border-[#D4AF37]/30">
              <TableHead className="text-[#D4AF37]">Item</TableHead>
              <TableHead className="text-[#D4AF37]">Price</TableHead>
              <TableHead className="text-[#D4AF37]">Qty</TableHead>
              <TableHead className="text-[#D4AF37]">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {billItems.map((item) => (
              <TableRow key={item.id} className="border-[#D4AF37]/30">
                <TableCell className="text-white">{item.productName}</TableCell>
                <TableCell className="text-gray-300">
                  Rs. {item.price}
                </TableCell>
                <TableCell className="text-gray-300">{item.quantity}</TableCell>
                <TableCell className="text-white">
                  Rs. {item.total.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Invoice Total */}
        <div className="border-t border-[#D4AF37]/30 pt-4 space-y-2">
          <div className="flex justify-between text-gray-300">
            <span>Subtotal:</span>
            <span>Rs. {subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-white text-xl font-bold">
            <span>Total:</span>
            <span className="text-[#D4AF37]">Rs. {total.toLocaleString()}</span>
          </div>
        </div>

        <div className="text-center text-gray-500 text-sm border-t border-[#D4AF37]/30 pt-4">
          <p>Thank you for your business!</p>
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          onClick={onPrint}
          variant="outline"
          className="flex-1 border-[#D4AF37] text-[#D4AF37] bg-transparent"
        >
          <Printer className="mr-2 h-4 w-4" />
          Print
        </Button>
        <Button
          onClick={onDownload}
          variant="outline"
          className="flex-1 border-[#D4AF37] text-[#D4AF37]"
        >
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
        <Button
          onClick={onClose}
          className="flex-1 bg-[#8E7525] hover:bg-[#A38A2E] text-white"
        >
          Close
        </Button>
      </div>
    </DialogContent>
  );
}
