"use client";

import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import Header from "../header";

export function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
    
        <div className="fixed top-0 left-0 w-full z-10">
        <Header />
        </div>
        <div className="flex mt-13  min-h-screen bg-[var(--background-color)]">
        <Sidebar />
        <main className="flex-1 p-8">{children}</main>
        </div>
    </>
  );
}
