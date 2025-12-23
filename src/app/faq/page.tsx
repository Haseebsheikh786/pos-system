import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Seo from "@/components/seo";
import FAQ from "@/components/faq/faq";

export default function FAQPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Seo
        title="FAQ - Your POS Software Questions Answered"
        description="Find answers to frequently asked questions about our POS software, including setup, features, pricing, and usage tips."
        keywords={[
          "POS software",
          "FAQ",
          "frequently asked questions",
          "point of sale",
          "inventory management",
          "sales tracking",
        ]}
        url="/faq"
        image="/og-pos-faq.jpg"
        author="Your Company Name"
      />
      <Navbar />
      <FAQ />
      <Footer />
    </div>
  );
}
