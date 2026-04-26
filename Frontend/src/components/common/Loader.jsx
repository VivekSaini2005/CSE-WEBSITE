import React from "react";

/**
 * Reusable Loader component for consistent loading states across the application.
 * Supports a spinner (default) and a skeleton-ready container.
 */
const Loader = ({ fullPage = false, className = "" }) => {
  return (
    <div className={`flex justify-center items-center ${fullPage ? "min-h-[60vh]" : "py-10"} ${className}`}>
      <div className="relative w-12 h-12">
        {/* Outer Ring */}
        <div className="absolute top-0 left-0 w-full h-full border-4 border-slate-100 rounded-full"></div>
        {/* Animated Inner Ring */}
        <div className="absolute top-0 left-0 w-full h-full border-4 border-primary rounded-full border-t-transparent animate-spin shadow-sm"></div>
      </div>
    </div>
  );
};

export default Loader;
