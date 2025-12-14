"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft } from "lucide-react"

export default function VerifyCodePage() {
  const [code, setCode] = useState(["", "", "", "", "", ""])
  const [error, setError] = useState("")

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return

    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`)
      nextInput?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`)
      prevInput?.focus()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const verificationCode = code.join("")
    if (verificationCode.length !== 6) {
      setError("Please enter the complete 6-digit code")
      return
    }

    // Handle verification logic here
    console.log("Verify code:", verificationCode)
  }

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
            <CardTitle className="text-2xl font-bold text-white text-center">Verify Your Email</CardTitle>
            <CardDescription className="text-gray-400 text-center">
              Enter the 6-digit code we sent to your email
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive" className="bg-red-950/50 border-red-900 text-red-200">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label className="text-gray-300 text-center block">Verification Code</Label>
                <div className="flex gap-2 justify-center">
                  {code.map((digit, index) => (
                    <Input
                      key={index}
                      id={`code-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-12 h-14 text-center text-xl font-bold bg-[#1A1A1A] border-[#D4AF37]/30 text-white focus:border-[#D4AF37]"
                      required
                    />
                  ))}
                </div>
              </div>

              <Button type="submit" className="w-full bg-[#8E7525] hover:bg-[#A38A2E] text-white">
                Verify Code
              </Button>

              <div className="text-center">
                <p className="text-sm text-gray-400 mb-2">Didn't receive the code?</p>
                <Button type="button" variant="link" className="text-[#D4AF37] hover:text-[#D4AF37]/80 p-0 h-auto">
                  Resend Code
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Link href="/login" className="w-full">
              <Button variant="ghost" className="w-full text-[#D4AF37] hover:text-[#D4AF37] hover:bg-[#D4AF37]/10">
                <ArrowLeft className="mr-2" size={16} />
                Back to Login
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
