"use client";

import { Loader2 } from "lucide-react";

interface LoadingProps {
  fullScreen?: boolean;
  size?: "sm" | "md" | "lg";
  text?: string;
  className?: string;
}

export default function Loading({
  fullScreen = true,
  size = "md",
  text = "Loading...",
  className = "",
}: LoadingProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  };

  const textSizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const content = (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {/* Animated Logo Container */}
      <div className="relative">
        {/* Outer ring */}
        <div
          className={`${sizeClasses[size]} border-4 border-primary/20 rounded-full`}
        ></div>

        {/* Inner spinning ring */}
        <div
          className={`absolute top-0 left-0 ${sizeClasses[size]} border-4 border-transparent border-t-primary border-r-primary rounded-full animate-spin`}
        ></div>

        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="h-2 w-2 bg-primary rounded-full"></div>
        </div>
      </div>

      {/* Loading text */}
      {text && (
        <p className={`mt-4 text-gray-400 ${textSizes[size]} font-medium`}>
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-card z-50 flex items-center justify-center">
        {content}
      </div>
    );
  }

  return content;
}

// Also export a simple spinner component for inline loading
export function Spinner({
  size = "md",
  className = "",
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  return (
    <Loader2
      className={`${sizeClasses[size]} animate-spin text-primary ${className}`}
    />
  );
}
