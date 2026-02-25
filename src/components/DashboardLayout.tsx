import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./sidebar";
import { Navbar } from "./navbar";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { useAuthStore } from "@/store/authstore";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = useAuthStore((state) => state.user);

  return (
    <div className="h-screen bg-slate-50 dark:bg-zinc-900 flex flex-col overflow-hidden">
      {/* Fixed Top Navbar */}
      <Navbar />
      
      {/* Fixed Sidebar */}
      {/* Desktop Sidebar */}
<div className="hidden md:block fixed top-16 left-0 h-[calc(100vh-4rem)] w-64">
  <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
</div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex pt-16 md:ml-64 overflow-hidden">
        {/* Mobile Menu Button */}
        {user && (
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
        )}

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto scrollbar-hide">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
