"use client";

import { Sidebar, MobileSidebar } from "@/components/dashboard/Sidebar";
import { ToastContainer } from "@/components/ui/ToastNotification";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-bambi-background">
      {/* Sidebar - visible uniquement sur desktop */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 p-6 overflow-y-auto pb-20 lg:pb-6">
        <main>{children}</main>
      </div>

      {/* Mobile Navigation - visible uniquement sur mobile */}
      <MobileSidebar />

      {/* Toast Notifications */}
      <ToastContainer position="top-right" />
    </div>
  );
}
