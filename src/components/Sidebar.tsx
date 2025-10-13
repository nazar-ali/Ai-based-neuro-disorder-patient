"use client"

import { useState, useEffect, useMemo } from "react"
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
  LogOut,
  ChevronLeft,
  ChevronRight,
  HistoryIcon,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useLoggedInUser } from "@/hooks/userLoggedIn"
import { getAccessToken } from "@/lib/helpers"
import { useLogOutUser } from "@/hooks/useLoggedOutUser"
import { cn } from "@/utils"
import logo from "@/assets/logo.jpg"
const navItems = [
  { title: "Dashboard Overview", icon: HomeIcon, url: "/dashboard" },
  { title: "Chatbot Assistant", icon: MessageSquare, url: "/chatbot" },
  { title: "MRI Scan Analysis", icon: Brain, url: "/mri" },
  { title: "Recommendations", icon: Users, url: "/recommendations" },
  { title: "Patient Profiles", icon: Users, url: "/patients" },
  {title: "Patient history", icon:HistoryIcon, url: "/history"},
  { title: "Notifications & Alerts", icon: Bell, url: "/alerts" },
  { title: "Reports & Analytics", icon: BarChart3, url: "/reports" },
  { title: "Settings", icon: Settings, url: "/settings" },
]

export default function AppSidebar() {
  const { loggedInUser } = useLoggedInUser()
  const { logoutUser } = useLogOutUser()
  const pathname = usePathname()
  const router = useRouter()
  const accessToken = getAccessToken()
  const { open } = useSidebar()

  const initial = useMemo(() => loggedInUser?.name?.charAt(0)?.toUpperCase() || "U", [loggedInUser?.name])

  useEffect(() => {
    if (!accessToken) {
      logoutUser()
      router.replace("/login")
    }
  }, [accessToken, logoutUser, router])

  if (!loggedInUser) return null

  return (
   <div
  className={cn(
    "transition-all duration-300 max-h-screen flex flex-col border-r border-gray-500 border-double shadow-lg bg-transparent",
    open ? "w-64" : "w-20"
  )}
>

      {/* Header */}
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

      {/* Navigation */}
      <SidebarContent className="flex-1 overflow-y-auto">
        <SidebarGroup>
          {open && (
            <SidebarGroupLabel className="mt-3 mb-1 text-xs font-semibold tracking-wide text-gray-400 px-5 uppercase">
              Main Menu
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
                          : " hover:bg-gray-200 hover:text-black"
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

      {/* Footer */}
      {/* <SidebarFooter className="border-t border-gray-700 px-3 py-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 border border-gray-600">
            <AvatarImage src={loggedInUser?.profileImageUrl || ""} alt={loggedInUser?.name || "User"} />
            <AvatarFallback className="text-xs bg-gray-700 text-gray-200">{initial}</AvatarFallback>
          </Avatar>

          {open && (
            <div className="flex-1">
              <p className="text-sm font-medium text-white truncate">{loggedInUser?.name || "User"}</p>
              <p className="text-xs text-gray-400 truncate">{loggedInUser?.email}</p>
            </div>
          )}

          <Button
            variant="ghost"
            size="icon"
            aria-label="Log out"
            onClick={logoutUser}
            className="hover:text-white text-gray-400 hover:bg-gray-700/50"
          >
            <LogOut size={18} />
          </Button>
        </div>
      </SidebarFooter> */}
    </div>
  )
}
