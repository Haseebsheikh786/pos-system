"use client";

import type React from "react";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!email) {
      setError("Please enter your email address");
      return;
    }

    // Handle reset password logic here
    console.log("Reset password for:", email);
    setSuccess(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-black">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 bg-[#D4AF37] rounded flex items-center justify-center">
            <span className="text-black font-bold text-2xl">P</span>
          </div>
          <span className="text-white font-bold text-2xl">POS System</span>
        </Link>

        <Card className="bg-[#0A0A0A] border-[#D4AF37]">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-white text-center">
              Reset Password
            </CardTitle>
            <CardDescription className="text-gray-400 text-center">
              {success
                ? "Check your email for reset instructions"
                : "Enter your email to receive a reset link"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {success ? (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="text-[#D4AF37]" size={32} />
                  </div>
                </div>
                <Alert className="bg-[#1A1A1A] border-[#D4AF37]">
                  <AlertDescription className="text-gray-300 text-center">
                    We've sent a password reset link to{" "}
                    <strong className="text-white">{email}</strong>. Please
                    check your inbox and follow the instructions.
                  </AlertDescription>
                </Alert>
                <p className="text-sm text-gray-400 text-center leading-relaxed">
                  Didn't receive the email? Check your spam folder or try again.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <Alert
                    variant="destructive"
                    className="bg-red-950/50 border-red-900 text-red-200"
                  >
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-[#1A1A1A] border-[#D4AF37]/30 text-white placeholder:text-gray-500 focus:border-[#D4AF37]"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#8E7525] hover:bg-[#A38A2E] text-white"
                >
                  Send Reset Link
                </Button>
              </form>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-3">
            <Link href="/login" className="w-full">
              <Button
                variant="ghost"
                className="w-full text-[#D4AF37] hover:text-[#D4AF37] hover:bg-[#D4AF37]/10"
              >
                <ArrowLeft className="mr-2" size={16} />
                Back to Login
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
