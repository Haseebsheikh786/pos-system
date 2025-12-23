import ContactDetails from "./contact-details";
import ContactForm from "./contact-form";

 
const Contact = () => {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight text-balance">
            Get in <span className="text-[#D4AF37]">Touch</span>
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed text-pretty">
            Have questions? We're here to help. Reach out to our team and we'll
            get back to you as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <ContactDetails/>
            <ContactForm/>
        
        </div>
      </div>
    </section>
  );
};

export default Contact;
