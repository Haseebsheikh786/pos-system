import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Seo from "@/components/seo";
import Home from "@/components/home/home";
export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Seo
        title="POS Software - Streamline Your Business | "
        description="Manage sales, inventory, and grow your business with our modern POS software. Easy to use and designed for success."
        keywords={[
          "POS software",
          "inventory management",
          "sales tracking",
          "business growth",
        ]}
        url="/"
        image="/og-pos-home.jpg"
        author="FreshPrep"
      />
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
}
