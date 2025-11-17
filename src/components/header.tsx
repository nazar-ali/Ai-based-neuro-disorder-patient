"use client"

import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useLoggedInUser } from "@/hooks/userLoggedIn"
import { useLogOutUser } from "@/hooks/useLoggedOutUser"

export function AppHeader() {
  const { loggedInUser } = useLoggedInUser()
  const { logoutUser } = useLogOutUser()
  if (!loggedInUser) return null
const { open } = useSidebar()

  const initial = loggedInUser?.name?.charAt(0)?.toUpperCase?.() || "U"

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200     bg-background/70 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 shadow-xs transition-all duration-300">
      <div className={`${open ? 'h-18' : 'h-16'} flex   items-center justify-between px-5`}>
        {/* Left: Sidebar Trigger + Welcome */}
        <div className="flex items-center gap-4">
          <SidebarTrigger
            className="rounded-md hover:bg-muted transition-colors p-2"
            aria-label="Open sidebar"
          />
          <Separator orientation="vertical" className="h-6" />
          <div className="flex flex-col leading-tight">
            <p className="text-xs text-muted-foreground">Welcome back,</p>
            <h1 className="text-sm font-semibold text-foreground tracking-wide">
              {loggedInUser?.fullName || "User"}
            </h1>
          </div>
        </div>

        {/* Right: User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="group relative flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-muted/60"
            >
              <Avatar className="h-9 w-9 ring-1 ring-border shadow-sm group-hover:ring-primary/40 transition-all">
                <AvatarImage
                  src={loggedInUser?.profileImageUrl || ""}
                  alt={loggedInUser?.name ? `${loggedInUser.fullName}'s avatar` : "User avatar"}
                />
                <AvatarFallback className="bg-primary/10 text-foreground font-semibold text-sm">
                  {initial}
                </AvatarFallback>
              </Avatar>

              <div className="hidden md:flex md:flex-col md:items-start md:leading-none">
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {loggedInUser?.fullName}
                </span>
                {loggedInUser?.email ? (
                  <span className="text-xs text-muted-foreground truncate max-w-[140px]">
                    {loggedInUser.email}
                  </span>
                ) : null}
              </div>

              <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-48 mt-2 rounded-lg border border-border/40 bg-popover shadow-md backdrop-blur-sm"
          >
            <DropdownMenuItem
              onClick={logoutUser}
              className="cursor-pointer text-destructive focus:text-destructive hover:bg-destructive/10 transition-colors"
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
