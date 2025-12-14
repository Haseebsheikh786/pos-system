import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Heart, Target, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight text-balance">
              About <span className="text-[#D4AF37]">POS System</span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed text-pretty">
              We're on a mission to empower businesses with modern, intuitive
              point of sale technology that drives growth and success.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <Card className="bg-[#0A0A0A] border-[#D4AF37]">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center mb-4">
                  <Target className="text-[#D4AF37]" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Our Mission
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  To provide businesses of all sizes with enterprise-grade point
                  of sale technology that's simple to use, powerful in features,
                  and designed to scale with your growth.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#0A0A0A] border-[#D4AF37]">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="text-[#D4AF37]" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Our Vision
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  To become the most trusted and innovative POS platform
                  globally, helping millions of businesses streamline operations
                  and deliver exceptional customer experiences.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Values */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Our Values</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            <Card className="bg-black border-[#D4AF37] hover:border-[#D4AF37]/70 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Award className="text-[#D4AF37]" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Excellence
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  We strive for excellence in every feature, every interaction,
                  and every customer experience.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-black border-[#D4AF37] hover:border-[#D4AF37]/70 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Users className="text-[#D4AF37]" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Customer First
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Our customers' success is our success. We listen, adapt, and
                  continuously improve.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-black border-[#D4AF37] hover:border-[#D4AF37]/70 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Target className="text-[#D4AF37]" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Innovation
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  We embrace new technologies and ideas to stay ahead of
                  industry trends.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Stats */}
          <div className="bg-[#0A0A0A] border border-[#D4AF37] rounded-lg p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl md:text-5xl font-bold text-[#D4AF37] mb-2">
                  10,000+
                </div>
                <div className="text-gray-400">Active Businesses</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-[#D4AF37] mb-2">
                  99.9%
                </div>
                <div className="text-gray-400">Uptime Guarantee</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-[#D4AF37] mb-2">
                  24/7
                </div>
                <div className="text-gray-400">Customer Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
