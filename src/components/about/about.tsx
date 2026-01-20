import { Card, CardContent } from "@/components/ui/card";
import { Award, Zap, Shield, Users, Clock, Smartphone } from "lucide-react";

function About() {
  return (
    <>
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h1 className="text-5xl md:text-6xl font-bold  mb-6 leading-tight">
              Shop Software Built by
              <span className="text-primary"> Shop Experts</span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed text-pretty">
              We visited 100+ shops and saw the same problems: billing takes too
              long, stock gets mismatched, and credit tracking is messy. So we
              built the simplest POS that just works.
            </p>
          </div>

          {/* Our Story */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <Card className="bg-card border-primary">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="text-primary" size={24} />
                </div>
                <h2 className="text-2xl font-bold  mb-4">
                  Why We're Different
                </h2>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>
                      <strong>Built for Small Shops</strong> – Not confusing
                      like big enterprise software
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>
                      <strong>Credit Focused</strong> – Track customer credit
                      easily
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>
                      <strong>Works Offline</strong> – Internet down? No problem
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>
                      <strong>Local Support</strong> – Call/WhatsApp support in
                      your language
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-card border-primary">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="text-primary" size={24} />
                </div>
                <h2 className="text-2xl font-bold  mb-4">Simple & Reliable</h2>
                <p className="text-gray-400 leading-relaxed mb-4">
                  We believe running a shop should be about serving customers,
                  not fighting complicated software. Our POS is designed to be
                  intuitive from day one, with no training needed.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  Everything from billing to inventory to customer credit is
                  just a tap away—no menus to dig through, no confusing settings
                  to adjust.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* What Makes Us Different */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold  mb-4">
              Designed for Real Shop Owners
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Every feature solves actual problems we saw in shops
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            <Card className="bg-background border-primary hover:border-primary/70 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Clock className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-semibold  mb-2">
                  Lightning-Fast Billing
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Create bills in 2 minutes flat. Scan, add, and print—no
                  complicated steps slowing down your counter.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background border-primary hover:border-primary/70 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Users className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-semibold  mb-2">
                  Smart Credit Tracking
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Built-in credit system that remembers who owes what, sends
                  gentle reminders, and keeps your cashflow clear.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background border-primary hover:border-primary/70 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Smartphone className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-semibold  mb-2">Works Anywhere</h3>
                <p className="text-gray-400 leading-relaxed">
                  Use it on your phone, tablet, or computer. Works offline,
                  syncs when you're back online. Never lose a sale.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Stats - Now Feature-Focused */}
          <div className="bg-card border border-primary rounded-lg p-8 md:p-12">
            <h3 className="text-2xl font-bold  text-center mb-8">
              Numbers That Matter to Shop Owners
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  2 Minutes
                </div>
                <div className="text-gray-400">Average first bill created</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  0 Skills
                </div>
                <div className="text-gray-400">Technical knowledge needed</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  24/7
                </div>
                <div className="text-gray-400">Local language support</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  100+ Shops
                </div>
                <div className="text-gray-400">Helped and counting</div>
              </div>
            </div>
          </div>

          {/* Closing Statement */}
          <div className="text-center mt-16 max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold  mb-6">
              Ready to Simplify Your Shop?
            </h3>
            <p className="text-xl text-gray-400 leading-relaxed">
              Join thousands of shop owners who switched from manual registers
              and complicated software to a POS system that actually understands
              how shops work.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
