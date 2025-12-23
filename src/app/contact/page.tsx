 
 

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Seo from "@/components/seo";
import Contact from "@/components/contact/contact";

export default function FAQPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Seo
        title="Contact Us - POS Software Support & Inquiries"
        description="Get in touch with our team for questions, support, or inquiries about our POS software. We're here to help your business succeed."
        keywords={[
          "POS software",
          "contact",
          "support",
          "sales inquiry",
          "customer service",
          "business solutions",
        ]}
        url="/contact"
        image="/og-pos-contact.jpg"
        author="Your Company Name"
      />
      <Navbar />
      <Contact />
      <Footer />
    </div>
  );
}
