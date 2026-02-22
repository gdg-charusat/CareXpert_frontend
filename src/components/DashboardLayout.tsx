import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Sidebar } from "./sidebar";
import { Navbar } from "./navbar";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { useAuthStore } from "@/store/authstore";
import { LoadingSpinner } from "./ui/loading-spinner";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, isHydrated } = useAuthStore();

  // 1. Wait for Zustand to load from localStorage
  if (!isHydrated) return <LoadingSpinner />;

  // 2. If no user is found after loading, kick to login
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  // 3. Render the full layout shell for authenticated users
  return (
    <div className="h-screen bg-slate-50 dark:bg-zinc-900 flex flex-col overflow-hidden">
      {/* Top Navigation */}
      <Navbar />
      
      {/* Sidebar - Pass state and toggle function */}
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex-1 flex pt-16 md:ml-64 overflow-hidden">
        {/* Mobile Menu Trigger */}
        <div className="md:hidden fixed top-16 left-4 z-30">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(true)}
            className="bg-white/70 dark:bg-zinc-900/40 backdrop-blur-sm border border-slate-200/60 dark:border-zinc-700/60 shadow-md rounded-xl"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* This renders the actual page content (e.g. PatientDashboard) */}
        <main className="flex-1 overflow-y-auto scrollbar-hide p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}