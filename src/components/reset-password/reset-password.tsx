"use client";

import Link from "next/link";
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
import { MailCheck, ShieldCheck, Clock, ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";
import { supabase } from "@/supabase-client";

// Define validation schema with Zod
const resetPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [successEmail, setSuccessEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    watch,
    reset,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  // Countdown timer for resend
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (countdown === 0 && isResendDisabled) {
      setIsResendDisabled(false);
    }
    return () => clearTimeout(timer);
  }, [countdown, isResendDisabled]);

  // Format seconds to MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      setIsLoading(true);
      clearErrors("root");
      setResendSuccess(false);

      // Send password reset email via Supabase
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${window.location.origin}/dashboard/update-password`,
      });

      if (error) {
        if (error.message.includes("rate limit")) {
          throw new Error(
            "Too many attempts. Please try again in a few minutes."
          );
        } else {
          // For security, don't reveal if user exists or not
          console.log("Password reset request processed");
        }
      }

      // Always show success for security (even if user doesn't exist)
      setSuccessEmail(data.email);
      setShowSuccess(true);
      setIsResendDisabled(true);
      setCountdown(60); // 60-second cooldown
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to send reset link. Please try again.";

      setError("root", {
        type: "manual",
        message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendLink = async () => {
    const email = watch("email");

    if (!email) {
      setError("root", {
        type: "manual",
        message: "Please enter your email address first",
      });
      return;
    }

    try {
      setIsLoading(true);
      clearErrors("root");

      // Resend password reset email via Supabase
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/dashboard/update-password`,
      });

      if (error) {
        if (error.message.includes("rate limit")) {
          throw new Error(
            "Too many attempts. Please wait before trying again."
          );
        } else {
          throw new Error("Failed to resend link. Please try again.");
        }
      }

      // Show success and reset timer
      setResendSuccess(true);
      setIsResendDisabled(true);
      setCountdown(60);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to resend link. Please try again.";

      setError("root", {
        type: "manual",
        message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input change to clear errors
  const handleInputChange = (fieldName: keyof ResetPasswordFormData) => {
    if (errors[fieldName]) {
      clearErrors(fieldName);
    }
    if (errors.root) {
      clearErrors("root");
    }
    // Clear success state if user starts typing again
    if (showSuccess) {
      setShowSuccess(false);
      setResendSuccess(false);
    }
  };

  const handleResetForm = () => {
    setShowSuccess(false);
    setResendSuccess(false);
    reset();
    setIsResendDisabled(false);
    setCountdown(0);
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
            {showSuccess ? (
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center">
                  <MailCheck className="text-[#D4AF37]" size={32} />
                </div>
              </div>
            ) : null}
            <CardTitle className="text-2xl font-bold text-white text-center">
              {showSuccess ? "Check Your Email" : "Reset Password"}
            </CardTitle>
            <CardDescription className="text-gray-400 text-center">
              {showSuccess
                ? "Check your inbox for reset instructions"
                : "Enter your email to receive a reset link"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {showSuccess ? (
              <>
                <Alert className="bg-[#1A1A1A] border-[#D4AF37]">
                  <AlertDescription className="text-gray-300">
                    If an account exists with{" "}
                    <strong className="text-white">{successEmail}</strong>,
                    you'll receive a password reset link shortly. Click the link
                    in the email to reset your password.
                  </AlertDescription>
                </Alert>

                <div className="bg-[#1A1A1A] p-4 rounded-lg border border-[#D4AF37]/30">
                  <div className="flex items-center gap-3 mb-3">
                    <ShieldCheck className="text-[#D4AF37]" size={20} />
                    <h4 className="font-semibold text-white">What's Next?</h4>
                  </div>
                  <ul className="text-sm text-gray-400 space-y-2 list-disc pl-5">
                    <li>Check your inbox (and spam folder) for our email</li>
                    <li>Click the password reset link in the email</li>
                    <li>Create a new secure password</li>
                    <li>Sign in with your new password</li>
                  </ul>
                </div>

                <div className="space-y-4 pt-2">
                  {countdown > 0 && (
                    <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>Resend available in {formatTime(countdown)}</span>
                    </div>
                  )}

                  <Button
                    type="button"
                    onClick={handleResendLink}
                    disabled={isResendDisabled || isLoading}
                    className="w-full bg-[#8E7525] hover:bg-[#A38A2E] text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading
                      ? "Sending..."
                      : countdown > 0
                      ? `Resend in ${formatTime(countdown)}`
                      : "Resend Reset Link"}
                  </Button>

                  {resendSuccess && (
                    <Alert className="bg-green-950/30 border-green-800">
                      <AlertDescription className="text-green-200">
                        Password reset email resent successfully! You can resend
                        again in 1 minute.
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {errors.root && (
                  <Alert
                    variant="destructive"
                    className="bg-red-950/50 border-red-900 text-red-200"
                  >
                    <AlertDescription>{errors.root.message}</AlertDescription>
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
                    {...register("email")}
                    onChange={(e) => {
                      handleInputChange("email");
                      register("email").onChange(e);
                    }}
                    className={`bg-[#1A1A1A] border text-white placeholder:text-gray-500 focus:border-[#D4AF37] ${
                      errors.email
                        ? "border-red-500 focus:border-red-500"
                        : "border-[#D4AF37]/30"
                    }`}
                    disabled={isLoading}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#8E7525] hover:bg-[#A38A2E] text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </Button>
              </form>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            {showSuccess ? (
              <>
                <Button
                  variant="outline"
                  onClick={handleResetForm}
                  className="w-full border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 bg-transparent"
                >
                  Try a different email
                </Button>
                <div className="relative w-full">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-[#D4AF37]/30" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-[#0A0A0A] px-2 text-gray-500">or</span>
                  </div>
                </div>
              </>
            ) : null}

            <Link href="/login" className="w-full">
              <Button
                variant="ghost"
                className="w-full text-[#D4AF37] hover:text-[#D4AF37] hover:bg-[#D4AF37]/10"
                disabled={isLoading}
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

export default ResetPassword;
