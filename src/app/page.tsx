import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  BarChart3,
  Package,
  ShoppingCart,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight text-balance">
              Transform Your Business with{" "}
              <span className="text-[#D4AF37]">Professional POS</span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 leading-relaxed text-pretty">
              Streamline sales, manage inventory, and grow your business with
              our modern, intuitive point of sale system designed for success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="bg-[#8E7525] hover:bg-[#A38A2E] text-white text-lg px-8 py-6"
                >
                  Get Started Free
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 text-lg px-8 py-6 bg-transparent"
                >
                  See How It Works
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
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
                  Process transactions quickly and efficiently with our
                  intuitive sales interface
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

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-400 mb-8 leading-relaxed">
            Join thousands of businesses already using our POS system
          </p>
          <Link href="/signup">
            <Button
              size="lg"
              className="bg-[#8E7525] hover:bg-[#A38A2E] text-white text-lg px-8 py-6"
            >
              Start Your Free Trial
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
