import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-black border-t border-[#D4AF37] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#D4AF37] rounded flex items-center justify-center">
                <span className="text-black font-bold text-xl">P</span>
              </div>
              <span className="text-white font-bold text-lg">POS System</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Professional point of sale solution for modern businesses.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/how-it-works"
                  className="text-gray-400 hover:text-[#D4AF37] text-sm transition-colors"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-[#D4AF37] text-sm transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-400 hover:text-[#D4AF37] text-sm transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-[#D4AF37] text-sm transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-400 hover:text-[#D4AF37] text-sm transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-400 hover:text-[#D4AF37] text-sm transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Get Started */}
          <div>
            <h3 className="text-white font-semibold mb-4">Get Started</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/signup"
                  className="text-gray-400 hover:text-[#D4AF37] text-sm transition-colors"
                >
                  Sign Up
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-gray-400 hover:text-[#D4AF37] text-sm transition-colors"
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#D4AF37]/30">
          <p className="text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} POS System. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
