"use client";

import type React from "react";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail, MapPin, Phone, Clock } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      setError("Please fill in all fields");
      return;
    }

    // Handle form submission
    console.log("Contact form:", formData);
    setSuccess(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight text-balance">
              Get in <span className="text-[#D4AF37]">Touch</span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed text-pretty">
              Have questions? We're here to help. Reach out to our team and
              we'll get back to you as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="space-y-6">
              <Card className="bg-[#0A0A0A] border-[#D4AF37]">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="text-[#D4AF37]" size={24} />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">Email</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        support@possystem.com
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#0A0A0A] border-[#D4AF37]">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="text-[#D4AF37]" size={24} />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">Phone</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        +1 (555) 123-4567
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#0A0A0A] border-[#D4AF37]">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="text-[#D4AF37]" size={24} />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">Address</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        123 Business Street
                        <br />
                        San Francisco, CA 94103
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#0A0A0A] border-[#D4AF37]">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="text-[#D4AF37]" size={24} />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">
                        Business Hours
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        Monday - Friday: 9am - 6pm
                        <br />
                        Saturday: 10am - 4pm
                        <br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="bg-[#0A0A0A] border-[#D4AF37]">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">
                    Send Us a Message
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {success && (
                      <Alert className="bg-green-950/50 border-green-900">
                        <AlertDescription className="text-green-200">
                          Thank you for your message! We'll get back to you
                          soon.
                        </AlertDescription>
                      </Alert>
                    )}

                    {error && (
                      <Alert
                        variant="destructive"
                        className="bg-red-950/50 border-red-900 text-red-200"
                      >
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-300">
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={handleChange}
                          className="bg-[#1A1A1A] border-[#D4AF37]/30 text-white placeholder:text-gray-500 focus:border-[#D4AF37]"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-300">
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          className="bg-[#1A1A1A] border-[#D4AF37]/30 text-white placeholder:text-gray-500 focus:border-[#D4AF37]"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-gray-300">
                        Subject
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        placeholder="How can we help?"
                        value={formData.subject}
                        onChange={handleChange}
                        className="bg-[#1A1A1A] border-[#D4AF37]/30 text-white placeholder:text-gray-500 focus:border-[#D4AF37]"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-gray-300">
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us more about your inquiry..."
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        className="bg-[#1A1A1A] border-[#D4AF37]/30 text-white placeholder:text-gray-500 focus:border-[#D4AF37] resize-none"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-[#8E7525] hover:bg-[#A38A2E] text-white"
                    >
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
