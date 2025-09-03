"use client";

import {
  Home,
  MessageSquare,
  Brain,
  Users,
  Bell,
  BarChart3,
  Settings,
} from "lucide-react";
import { SidebarLink } from "./SidebarLink";

export function Sidebar() {
  return (
    <aside className=" w-80 flex-shrink-0 border-r border-[var(--border-color)] p-6 flex flex-col justify-between">
      <div>
        <nav className="flex flex-col gap-2">
          <SidebarLink href="/dashboard" label="Dashboard Overview" icon={Home} active />
          <SidebarLink href="/chatbot" label="Chatbot Assistant" icon={MessageSquare} />
          <SidebarLink href="/mri" label="MRI Scan Analysis" icon={Brain} />
          <SidebarLink href="/recommendations" label="Specialist Recommendations" icon={Users} />
          <SidebarLink href="/patients" label="Patient Profiles" icon={Users} />
          <SidebarLink href="/alerts" label="Notifications & Alerts" icon={Bell} />
          <SidebarLink href="/reports" label="Reports & Analytics" icon={BarChart3} />
        </nav>
      </div>
      <div>
        <SidebarLink href="/settings" label="Settings" icon={Settings} />
      </div>
    </aside>
  );
}
