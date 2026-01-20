"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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
    <div className="lg:col-span-2">
      <Card className="bg-card border-primary">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold  mb-6">Send Us a Message</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {success && (
              <Alert className="bg-green-950/50 border-green-900">
                <AlertDescription className="text-green-200">
                  Thank you for your message! We'll get back to you soon.
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
                  className="bg-dark-gray border-primary/30  placeholder:text-gray-500 focus:border-primary"
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
                  className="bg-dark-gray border-primary/30  placeholder:text-gray-500 focus:border-primary"
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
                className="bg-dark-gray border-primary/30  placeholder:text-gray-500 focus:border-primary"
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
                className="bg-dark-gray border-primary/30  placeholder:text-gray-500 focus:border-primary resize-none"
                required
              />
            </div>

            <Button type="submit" className="w-full ">
              Send Message
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactForm;
