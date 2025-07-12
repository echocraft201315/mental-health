"use client"

import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useRouter } from "next/navigation"

const NotFound = () => {
  const location = useLocation();
  const router = useRouter()

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-gentle-neutral bg-pattern-subtle">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          404
        </h1>
        <p className="text-xl text-muted-foreground mb-6">Oops! Page not found</p>
        <button 
          onClick={() => router.push("/")}
          className="px-6 py-3 bg-gradient-gentle-primary hover:bg-gradient-gentle-secondary rounded-lg text-white font-medium transition-all duration-300 shadow-soft"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
