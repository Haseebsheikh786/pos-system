import { Card, CardContent } from "@/components/ui/card";
import {
  BarChart3,
  Package,
  ShoppingCart,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
const FeaturesGrid = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Everything You Need
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Powerful features to manage every aspect of your business
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-black border-[#D4AF37] hover:border-[#D4AF37]/70 transition-colors">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center mb-4">
                <ShoppingCart className="text-[#D4AF37]" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Sales Management
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Process transactions quickly and efficiently with our intuitive
                sales interface
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black border-[#D4AF37] hover:border-[#D4AF37]/70 transition-colors">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center mb-4">
                <Package className="text-[#D4AF37]" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Inventory Control
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Track stock levels, manage products, and automate reordering
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black border-[#D4AF37] hover:border-[#D4AF37]/70 transition-colors">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="text-[#D4AF37]" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Analytics & Reports
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Gain insights with detailed reports and real-time analytics
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black border-[#D4AF37] hover:border-[#D4AF37]/70 transition-colors">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="text-[#D4AF37]" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Customer Management
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Build customer profiles and track purchase history
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black border-[#D4AF37] hover:border-[#D4AF37]/70 transition-colors">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="text-[#D4AF37]" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Growth Tools
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Marketing integrations and loyalty programs to drive sales
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black border-[#D4AF37] hover:border-[#D4AF37]/70 transition-colors">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center mb-4">
                <Zap className="text-[#D4AF37]" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Fast & Reliable
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Lightning-fast performance with 99.9% uptime guarantee
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
