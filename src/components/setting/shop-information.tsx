import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Store } from "lucide-react";

interface ShopInformationProps {
  shopName: string;
  setShopName: (value: string) => void;
  shopAddress: string;
  setShopAddress: (value: string) => void;
  shopPhone: string;
  setShopPhone: (value: string) => void;
  shopEmail: string;
  setShopEmail: (value: string) => void;
}

export default function ShopInformation({
  shopName,
  setShopName,
  shopAddress,
  setShopAddress,
  shopPhone,
  setShopPhone,
  shopEmail,
  setShopEmail,
}: ShopInformationProps) {
  return (
    <Card className="bg-[#0a0a0a] border-[#D4AF37]">
      <CardHeader className="flex flex-row items-center gap-2">
        <Store className="h-5 w-5 text-[#D4AF37]" />
        <CardTitle className="text-white">Shop Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="shop-name" className="text-gray-300">
            Shop Name
          </Label>
          <Input
            id="shop-name"
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            className="bg-[#1a1a1a] border-[#D4AF37]/30 text-white"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="shop-address" className="text-gray-300">
            Shop Address
          </Label>
          <Textarea
            id="shop-address"
            value={shopAddress}
            onChange={(e) => setShopAddress(e.target.value)}
            className="bg-[#1a1a1a] border-[#D4AF37]/30 text-white"
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="shop-phone" className="text-gray-300">
              Phone Number
            </Label>
            <Input
              id="shop-phone"
              value={shopPhone}
              onChange={(e) => setShopPhone(e.target.value)}
              className="bg-[#1a1a1a] border-[#D4AF37]/30 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="shop-email" className="text-gray-300">
              Email
            </Label>
            <Input
              id="shop-email"
              type="email"
              value={shopEmail}
              onChange={(e) => setShopEmail(e.target.value)}
              className="bg-[#1a1a1a] border-[#D4AF37]/30 text-white"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
