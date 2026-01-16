import { Card, CardContent } from "@/components/ui/card";
import {
  Zap,
  Package,
  CreditCard,
  BarChart3,
  Smartphone,
  ThumbsUp,
} from "lucide-react";

const FeaturesGrid = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Everything Your Shop Needs
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Simple features that make running your shop easier
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Fast Billing */}
          <Card className="bg-black border-[#D4AF37] hover:border-[#D4AF37]/70 transition-colors">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center mb-4">
                <Zap className="text-[#D4AF37]" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Fast Billing
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Create bills in seconds. Add items quickly, print receipts,
                accept cash or credit.
              </p>
            </CardContent>
          </Card>

          {/* Stock Management */}
          <Card className="bg-black border-[#D4AF37] hover:border-[#D4AF37]/70 transition-colors">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center mb-4">
                <Package className="text-[#D4AF37]" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Stock Management
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Get alerts when stock is low. Never run out of best-selling
                items.
              </p>
            </CardContent>
          </Card>

          {/* Customer Credit (Udhaar) */}
          <Card className="bg-black border-[#D4AF37] hover:border-[#D4AF37]/70 transition-colors">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center mb-4">
                <CreditCard className="text-[#D4AF37]" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Customer Credit 
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Track who owes you money. Send reminders automatically.
              </p>
            </CardContent>
          </Card>

          {/* Daily Reports */}
          <Card className="bg-black border-[#D4AF37] hover:border-[#D4AF37]/70 transition-colors">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="text-[#D4AF37]" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Daily Reports
              </h3>
              <p className="text-gray-400 leading-relaxed">
                See today's sales, profit, and top products at a glance.
              </p>
            </CardContent>
          </Card>

          {/* Mobile Friendly */}
          <Card className="bg-black border-[#D4AF37] hover:border-[#D4AF37]/70 transition-colors">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center mb-4">
                <Smartphone className="text-[#D4AF37]" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Mobile Friendly
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Use on computer, tablet, or phone. Works anywhere.
              </p>
            </CardContent>
          </Card>

          {/* No Tech Skills Needed */}
          <Card className="bg-black border-[#D4AF37] hover:border-[#D4AF37]/70 transition-colors">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center mb-4">
                <ThumbsUp className="text-[#D4AF37]" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                No Tech Skills Needed
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Simple as WhatsApp. Setup in 10 minutes.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
