import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Seo from "@/components/seo";
import About from "@/components/about/about";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Seo
        title="About Our POS Software - Streamline Your Business Operations"
        description="Discover our modern POS software, designed to help businesses manage sales, inventory, and customer interactions efficiently."
        keywords={[
          "POS software",
          "point of sale",
          "inventory management",
          "sales tracking",
          "business management",
        ]}
        url="/about"
        image="/og-pos-about.jpg"
        author="Your Company Name"
      />

      <Navbar />
      <About />
      <Footer />
    </div>
  );
}
