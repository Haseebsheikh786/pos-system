import type React from "react";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import StoreProvider from "@/providers/StoreProvider";
import AuthProvider from "@/components/authProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <StoreProvider>
          <AuthProvider>{children}</AuthProvider>
        </StoreProvider>
        <Analytics />
      </body>
    </html>
  );
}
