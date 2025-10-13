"use client";

import { ReactNode, useState } from "react";
// import { Sidebar } from "../layouts/Sidebar";
// import Header from "../header";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
// import AppSidebar from "./Sidebar";

export function DashboardLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="">
      {/* Sidebar (Desktop) */}
     
        {/* <AppSidebar /> */}
     

      {/* Mobile Sidebar (Sheet Drawer) */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden absolute top-4 left-4 z-50"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-72">
          {/* <AppSidebar onNavigate={() => setOpen(false)} /> */}
        </SheetContent>
      </Sheet>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-auto">
        {/* <Header /> */}
        {/* <main className="flex-1 p-6 mt-16">{children}</main> */}
      </div>
    </div>
  );
}
