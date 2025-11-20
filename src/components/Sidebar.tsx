"use client"

import { useEffect, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import {
  HomeIcon,
  MessageSquare,
  Brain,
  Users,
  Bell,
  BarChart3,
  Settings,
  HistoryIcon,
} from "lucide-react"

import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

import { useLoggedInUser } from "@/hooks/userLoggedIn"
import { getAccessToken } from "@/lib/helpers"
import { useLogOutUser } from "@/hooks/useLoggedOutUser"
import { cn } from "@/utils"
import logo from "@/assets/logo.jpg"
import { UserRole } from "@/types/user"

// 🔹 Essential 12-day role-based menu
type NavItem = {
  title: string;
  url: string;
  icon: any;
};

const navItemsByRole: Record<UserRole, NavItem[]> = {
  admin: [
    { title: "Dashboard", icon: HomeIcon, url: "/admin/dashboard" },
    { title: "Appointments", icon: Users, url: "/appointments" },
    { title: "Reports", icon: BarChart3, url: "/reports" },
    { title: "Settings", icon: Settings, url: "/settings" },
  ],
  doctor: [
    { title: "Dashboard", icon: HomeIcon, url: "/doctor/dashboard" },
    { title: "My Patients", icon: Users, url: "/doctor/patients" },
    { title: "Appointments", icon: Bell, url: "/doctor/appointments" },
    { title: "Reports", icon: BarChart3, url: "/doctor/reports" },
  ],
  patient: [
    { title: "Dashboard", icon: HomeIcon, url: "/patient/dashboard" },
    { title: "Appointments", icon: Bell, url: "/patient/appointments" },
    { title: "Prescriptions", icon: HistoryIcon, url: "/patient/prescriptions" },
    { title: "History", icon: Users, url: "/patient/history" },
  ],
  caretaker: [
    { title: "Dashboard", icon: HomeIcon, url: "/dashboard" },
    { title: "Assigned Patients", icon: Users, url: "/caretaker/patients" },
    { title: "Tasks", icon: Bell, url: "/caretaker/tasks" },
    { title: "Vitals Log", icon: HistoryIcon, url: "/caretaker/vitals" },
  ],
};


export default function AppSidebar() {
  const { loggedInUser } = useLoggedInUser()
  const { logoutUser } = useLogOutUser()
  const pathname = usePathname()
  const router = useRouter()
  const accessToken = getAccessToken()
  const { open } = useSidebar()

  useEffect(() => {
    if (!accessToken) {
      logoutUser()
      router.replace("/login")
    }
  }, [accessToken])

  if (!loggedInUser) return null

  const role = loggedInUser.role
const navItems =
  loggedInUser.role && navItemsByRole[loggedInUser.role as UserRole]
    ? navItemsByRole[loggedInUser.role as UserRole]
    : [];



  return (
    <div
      className={cn(
        "transition-all duration-300  flex flex-col border-r border-gray-200  shadow-lg bg-transparent",
        open ? "w-48" : "w-20"
      )}
    >
      {/* Header */}
      <div className="flex items-center px-4 py-4 border-b border-gray-200     ">
        <Image src={logo} alt="Logo" width={32} height={32} className="rounded-md" />
        {open && (
          <div className="ml-3">
            <h1 className="font-semibold text-base">Neuro Care</h1>
            <p className="text-xs text-gray-400">Assistant</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <SidebarContent className="flex-1 overflow-y-auto">
        <SidebarGroup>
          {open && (
            <SidebarGroupLabel className="mt-3 mb-1 text-md font-bold text-gray-400 px-5 uppercase">
              {role} Menu
            </SidebarGroupLabel>
          )}

          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const active = pathname?.startsWith(item.url)
                const Icon = item.icon

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={active}
                      className={cn(
                        "flex items-center gap-4 mx-2 my-1 px-3 py-2 rounded-lg text-sm font-medium transition",
                        active
                          ? "bg-blue-600 text-white"
                          : "hover:bg-gray-200 hover:text-black"
                      )}
                    >
                      <Link href={item.url}>
                        <Icon className="h-5 w-5" />
                        {open && <span>{item.title}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </div>
  )
}
