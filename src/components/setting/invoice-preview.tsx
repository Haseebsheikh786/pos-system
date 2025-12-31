import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface InvoicePreviewProps {
  logoPreview: string;
  shopName: string;
  shopAddress: string;
  shopPhone: string;
  invoiceFooter: string;
}

export default function InvoicePreview({
  logoPreview,
  shopName,
  shopAddress,
  shopPhone,
  invoiceFooter,
}: InvoicePreviewProps) {
  return (
    <Card className="bg-[#0a0a0a] border-[#D4AF37]">
      <CardHeader>
        <CardTitle className="text-white text-sm">Invoice Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-white p-4 rounded-lg space-y-3 text-xs">
          <div className="text-center border-b border-gray-300 pb-2">
            {logoPreview ? (
              <img
                src={logoPreview || "/placeholder.svg"}
                alt="Logo"
                className="h-12 mx-auto mb-2"
              />
            ) : (
              <div className="h-12 flex items-center justify-center mb-2">
                <div className="w-12 h-12 bg-[#D4AF37] rounded flex items-center justify-center">
                  <span className="text-black font-bold text-xl">P</span>
                </div>
              </div>
            )}
            <h3 className="font-bold text-black">{shopName}</h3>
            <p className="text-gray-600 text-xs">{shopAddress}</p>
            <p className="text-gray-600 text-xs">{shopPhone}</p>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-gray-700">
              <span>Sample Item 1</span>
              <span>Rs. 500</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Sample Item 2</span>
              <span>Rs. 300</span>
            </div>
          </div>
          <div className="border-t border-gray-300 pt-2">
            <div className="flex justify-between font-bold text-black">
              <span>Total:</span>
              <span>Rs. 800</span>
            </div>
          </div>
          <div className="text-center text-gray-500 text-xs border-t border-gray-300 pt-2">
            {invoiceFooter}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
