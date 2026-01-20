export default function LoadingCard() {
  return (
    <div className="w-full max-w-md">
      <div className="bg-card border border-primary rounded-lg p-8">
        {/* Logo skeleton */}
        <div className="flex justify-center mb-8">
          <div className="w-10 h-10 bg-primary/20 rounded flex items-center justify-center">
            <div className="w-6 h-6 bg-primary/40 rounded"></div>
          </div>
        </div>

        {/* Animated icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>

        {/* Title skeleton with animation */}
        <div className="text-center mb-4">
          <div className="h-8 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 rounded w-3/4 mx-auto mb-2 animate-pulse"></div>
          <div className="h-4 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 rounded w-1/2 mx-auto animate-pulse"></div>
        </div>

        {/* Content skeleton */}
        <div className="space-y-3 mb-6">
          <div className="h-4 bg-gray-800 rounded w-full"></div>
          <div className="h-4 bg-gray-800 rounded w-5/6"></div>
          <div className="h-4 bg-gray-800 rounded w-4/6"></div>
        </div>

        {/* Button skeleton */}
        <div className="h-10 bg-gray-800 rounded mb-4"></div>

        {/* Footer skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-800 rounded w-1/2 mx-auto"></div>
          <div className="h-1 bg-gray-800 rounded-full"></div>
          <div className="h-10 bg-gray-800 rounded"></div>
        </div>
      </div>
    </div>
  );
}
