"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface InvoicePreviewProps {
  logoUrl?: string;
  businessName: string;
  businessAddress?: string;
  businessPhone?: string;
  invoiceFooterText?: string;
  nextInvoiceNumber: number;
}

export default function InvoicePreview({
  logoUrl,
  businessName,
  businessAddress,
  businessPhone,
  invoiceFooterText,
  nextInvoiceNumber,
}: InvoicePreviewProps) {
  const sampleItems = [
    { name: "Sample Item 1", price: 500 },
    { name: "Sample Item 2", price: 300 },
  ];

  const subtotal = sampleItems.reduce((sum, item) => sum + item.price, 0);
  const invoiceNumber = `$${String(nextInvoiceNumber).padStart(4, "0")}`;

  return (
    <Card className="bg-[#0a0a0a] border-[#D4AF37]">
      <CardHeader>
        <CardTitle className="text-white text-sm">Invoice Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-white p-4 rounded-lg space-y-3 text-xs">
          <div className="text-center border-b border-gray-300 pb-2">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt="Logo"
                className="h-12 mx-auto mb-2 object-contain"
              />
            ) : (
              <div className="h-12 flex items-center justify-center mb-2">
                <div className="w-12 h-12 bg-[#D4AF37] rounded flex items-center justify-center">
                  <span className="text-black font-bold text-xl">
                    {businessName.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
            )}
            <h3 className="font-bold text-black">{businessName}</h3>
            {businessAddress && (
              <p className="text-gray-600 text-xs">{businessAddress}</p>
            )}
            {businessPhone && (
              <p className="text-gray-600 text-xs">{businessPhone}</p>
            )}
          </div>

          <div className="flex justify-between items-center border-b border-gray-200 pb-2">
            <div>
              <p className="font-semibold text-black">INVOICE</p>
              <p className="text-gray-600">#{invoiceNumber}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-600">
                Date: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="space-y-1">
            <div className="grid grid-cols-12 text-gray-700 font-semibold text-xs border-b border-gray-200 pb-1">
              <div className="col-span-8">Description</div>
              <div className="col-span-2 text-right">Qty</div>
              <div className="col-span-2 text-right">Amount</div>
            </div>
            {sampleItems.map((item, index) => (
              <div key={index} className="grid grid-cols-12 text-gray-700">
                <div className="col-span-8">{item.name}</div>
                <div className="col-span-2 text-right">1</div>
                <div className="col-span-2 text-right">{item.price}</div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-300 pt-2">
            <div className="flex justify-between font-bold text-black">
              <span>Total:</span>
              <span>{subtotal.toLocaleString()}</span>
            </div>
          </div>

          {invoiceFooterText && (
            <div className="text-center text-gray-500 text-xs border-t border-gray-300 pt-2 mt-2">
              {invoiceFooterText}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
