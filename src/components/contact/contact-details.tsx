"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
const ContactDetails = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-card border-primary">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Mail className="text-primary" size={24} />
            </div>
            <div>
              <h3 className=" font-semibold mb-1">Email</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                support@possystem.com
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-primary">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Phone className="text-primary" size={24} />
            </div>
            <div>
              <h3 className=" font-semibold mb-1">Phone</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                +1 (555) 123-4567
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-primary">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <MapPin className="text-primary" size={24} />
            </div>
            <div>
              <h3 className=" font-semibold mb-1">Address</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                123 Business Street
                <br />
                San Francisco, CA 94103
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-primary">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Clock className="text-primary" size={24} />
            </div>
            <div>
              <h3 className=" font-semibold mb-1">Business Hours</h3>
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
  );
};

export default ContactDetails;
