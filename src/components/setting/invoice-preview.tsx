"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrencySymbol, getCurrencyName } from "@/lib/currency";

interface InvoicePreviewProps {
  logoUrl?: string;
  businessName: string;
  businessAddress?: string;
  businessPhone?: string;
  businessCurrency?: string;
  invoiceFooterText?: string;
  nextInvoiceNumber: number;
}

export default function InvoicePreview({
  logoUrl,
  businessName,
  businessAddress,
  businessPhone,
  businessCurrency = "pkr",
  invoiceFooterText,
  nextInvoiceNumber,
}: InvoicePreviewProps) {
  const sampleItems = [
    { name: "Sample Item 1", price: 500 },
    { name: "Sample Item 2", price: 300 },
  ];

  const subtotal = sampleItems.reduce((sum, item) => sum + item.price, 0);
  const invoiceNumber = `INV-${String(nextInvoiceNumber).padStart(6, "0")}`;
  const currencySymbol = getCurrencySymbol(businessCurrency);
  const currencyName = getCurrencyName(businessCurrency);

  return (
    <Card className="bg-card border-primary">
      <CardHeader>
        <CardTitle className=" text-sm">Invoice Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-white p-4 rounded-lg space-y-3 text-xs">
          {/* Header */}
          <div className="text-center border-b border-gray-300 pb-2">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt="Logo"
                className="h-12 mx-auto mb-2 object-contain"
              />
            ) : (
              <div className="h-12 flex items-center justify-center mb-2">
                <div className="w-12 h-12 bg-primary rounded flex items-center justify-center">
                  <span className="text-background font-bold text-xl">
                    {businessName.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
            )}
            <h3 className="font-bold text-background">{businessName}</h3>
            {businessAddress && (
              <p className="text-gray-600 text-xs">{businessAddress}</p>
            )}
            {businessPhone && (
              <p className="text-gray-600 text-xs">{businessPhone}</p>
            )}
          </div>

          {/* Invoice Info */}
          <div className="flex justify-between items-center border-b border-gray-200 pb-2">
            <div>
              <p className="font-semibold text-background">INVOICE</p>
              <p className="text-gray-600">#{invoiceNumber}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-600">
                Date: {new Date().toLocaleDateString()}
              </p>
              <p className="text-gray-600 text-xs">
                Currency: {currencyName} ({currencySymbol})
              </p>
            </div>
          </div>

          {/* Items Table */}
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
                <div className="col-span-2 text-right">
                  {currencySymbol}
                  {item.price.toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="border-t border-gray-300 pt-2">
            <div className="flex justify-between font-bold text-background">
              <span>Total:</span>
              <span>
                {currencySymbol}
                {subtotal.toLocaleString()}
              </span>
            </div>
            {/* Optional: Show currency name */}
            <div className="flex justify-between text-gray-500 text-xs mt-1">
              <span>Currency:</span>
              <span>{currencyName}</span>
            </div>
          </div>

          {invoiceFooterText && (
            <div className="text-center text-gray-500 text-xs border-t border-gray-300 pt-2 mt-2">
              {invoiceFooterText}
            </div>
          )}

          {/* Currency Info Note */}
          <div className="text-center text-gray-400 text-[10px] mt-2">
            Note: All prices shown in {currencyName} ({currencySymbol})
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
