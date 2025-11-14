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
  Sidebar,
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

// 🔹 Full list of navigation items
const allNavItems = [
  { title: "Dashboard Overview", icon: HomeIcon, url: "/dashboard" },
  { title: "Chatbot Assistant", icon: MessageSquare, url: "/chatbot" },
  { title: "MRI Scan Analysis", icon: Brain, url: "/mri" },
  { title: "Doctor Profile", icon: Users, url: "/doctors" },
  { title: "Caretaker Profiles", icon: Users, url: "/caretakers" },
  { title: "Patient Profiles", icon: Users, url: "/patients" },
  { title: "Patient History", icon: HistoryIcon, url: "/history" },
  { title: "Notifications & Alerts", icon: Bell, url: "/alerts" },
  { title: "Reports & Analytics", icon: BarChart3, url: "/reports" },
  { title: "Settings", icon: Settings, url: "/settings" },
]

// 🔹 Role-based filtering logic
const getNavItemsByRole = (role: string | undefined) => {
  switch (role) {
    case "patient":
      return allNavItems.filter((item) =>
        ["Patient Profiles", "Chatbot Assistant", "MRI Scan Analysis", "Notifications & Alerts"].includes(item.title)
      )

    case "caretaker":
      return allNavItems.filter((item) =>
        ["Chatbot Assistant", "Notifications & Alerts", "Recommendations", "MRI Scan Analysis"].includes(item.title)
      )

    case "doctor":
      return allNavItems.filter((item) =>
        [
          "Dashboard Overview",
          "Patient History",
         
          "MRI Scan Analysis",
          "Reports & Analytics",
          "Notifications & Alerts",
        ].includes(item.title)
      )

    case "admin":
      return allNavItems.filter((item) =>
        [
          "Dashboard Overview",
          "Reports & Analytics",
          "Notifications & Alerts",
          "Settings",
        ].includes(item.title)
      )

    default:
      return []
  }
}

export default function AppSidebar() {
  const { loggedInUser } = useLoggedInUser()
  const { logoutUser } = useLogOutUser()
  const pathname = usePathname()
  const router = useRouter()
  const accessToken = getAccessToken()
  const { open } = useSidebar()

  const initial = useMemo(
    () => loggedInUser?.name?.charAt(0)?.toUpperCase() || "U",
    [loggedInUser?.name]
  )

  useEffect(() => {
    if (!accessToken) {
      logoutUser()
      router.replace("/login")
    }
  }, [accessToken, logoutUser, router])

  if (!loggedInUser) return null

  // 🔹 Get filtered items based on user role
  const navItems = getNavItemsByRole(loggedInUser.role)

  return (
    <div
      className={cn(
        "transition-all duration-300 max-h-screen flex flex-col border-r border-gray-500 border-double shadow-lg bg-transparent",
        open ? "w-64" : "w-20"
      )}
    >
      {/* 🔹 Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <Image src={logo} alt="Logo" width={32} height={32} className="rounded-md" />
          {open && (
            <div>
              <h1 className="font-semibold text-base">Neuro Care</h1>
              <p className="text-xs text-gray-400">Assistant</p>
            </div>
          )}
        </div>
      </div>

      {/* 🔹 Navigation */}
      <SidebarContent className="flex-1 overflow-y-auto">
        <SidebarGroup>
          {open && (
            <SidebarGroupLabel className="mt-3 mb-1 text-md font-bold tracking-wide text-gray-400 px-5 uppercase">
              {loggedInUser?.role} Main Menu
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
                        "group relative flex items-center gap-4 rounded-lg mx-2 my-1 px-3 py-2 text-sm font-medium transition-all",
                        active
                          ? "bg-gray-700 text-white shadow-sm"
                          : "hover:bg-gray-200 hover:text-black"
                      )}
                    >
                      <Link href={item.url}>
                        <Icon className={cn("h-5 w-5", active && "text-blue-100")} />
                        {open && <span className="truncate">{item.title}</span>}
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
