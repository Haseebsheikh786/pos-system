"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ActivityAndAlerts = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="bg-[#0a0a0a] border-[#D4AF37]">
        <CardHeader>
          <CardTitle className="text-white">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Sale #1234</span>
              <span className="text-white font-medium">Rs. 450</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Sale #1233</span>
              <span className="text-white font-medium">Rs. 1,200</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Sale #1232</span>
              <span className="text-white font-medium">Rs. 850</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Sale #1231</span>
              <span className="text-white font-medium">Rs. 320</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#0a0a0a] border-[#D4AF37]">
        <CardHeader>
          <CardTitle className="text-white">Low Stock Alert</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Rice (5kg)</span>
              <span className="text-orange-400 font-medium">8 left</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Cooking Oil</span>
              <span className="text-orange-400 font-medium">5 left</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Sugar (1kg)</span>
              <span className="text-orange-400 font-medium">3 left</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Tea Bags</span>
              <span className="text-red-400 font-medium">2 left</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivityAndAlerts;
