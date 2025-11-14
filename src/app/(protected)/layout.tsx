"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "@/components/Sidebar";
import { Toaster } from "@/components/ui/sonner";
import Loader from "@/components/common/Loader";
import { getAccessToken } from "@/lib/helpers";
import { AppHeader } from "@/components/header";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const pathname=usePathname()

  useEffect(() => {
    const token = getAccessToken();

    if (!token) {
      router.replace(`/login?redirectURL=${pathname}`);
      return;
    }

    setIsAuthenticated(true);
    setIsChecking(false);
  }, [router]);

  if (isChecking) return <Loader />;
  if (!isAuthenticated) return null;

  return (
    <>
      <Toaster />
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          {/* ✅ Sidebar section */}
          <AppSidebar />
          {/* ✅ Main content section */}
          <SidebarInset className="flex flex-col flex-1">
            <AppHeader/>
            <main className="flex-1 bg-gray-50 p-4">{children}</main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </>
  );
}
