/**
 * NotFound.tsx
 *
 * Displays a professional 404 error page when a route is not found.
 * Provides clear feedback and a navigation option back to the home page.
 */

import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    /* Full screen container with app-wide gradient background */
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center px-4">

      {/* Application brand name */}
      <div className="flex items-center gap-2 mb-8">
        <span className="text-2xl font-bold text-gray-900 dark:text-white">
          CareXpert
        </span>
      </div>

      {/* Large error code */}
      <h1 className="text-[9rem] sm:text-[11rem] font-extrabold leading-none text-blue-600 dark:text-blue-400 select-none">
        404
      </h1>

      {/* Main error message */}
      <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white text-center">
        Page Not Found
      </h2>

      {/* Supporting description */}
      <p className="mt-4 max-w-md text-center text-gray-600 dark:text-gray-300 text-lg">
        The page you are looking for does not exist or has been moved.
      </p>

      {/* Navigation button to return to home page */}
      <Link to="/" className="mt-10">
        <Button
          size="lg"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl text-base font-semibold shadow-md transition-colors duration-200"
        >
          <Home className="h-5 w-5" />
          Return to Home
        </Button>
      </Link>
    </div>
  );
}