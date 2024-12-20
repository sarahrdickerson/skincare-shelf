"use client"

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Settings,
  Sparkles,
  User,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useRouter } from "next/navigation"
import { useUser } from "@/context/UserContext"
import UserAvatar from "../user/user-avatar"
import UserCard from "../user/user-card"
import Link from "next/link"

export function NavUser() {
  const { isMobile } = useSidebar();
  const router = useRouter();
  const { user } = useUser();

  const handleLogout = () => {
    // Clear the access token from localStorage
    window.localStorage.removeItem('access_token');
    
    // Clear the access token from cookies
    document.cookie = 'access_token=; path=/; max-age=0'; // Deletes the cookie
    
    console.log("Logging out...");

    // Redirect to the home page
    router.push('/login');

  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <UserCard/>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <UserCard />
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                  <Link href="/profile" className="flex flex-row space-x-2 items-center">
                    <User className="h-4 w-4"/>
                    <p>Profile</p>
                  </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                  <Link href="/profile" className="flex flex-row space-x-2 items-center">
                        <Settings className="h-4 w-4"/>
                        <p>Settings</p>
                  </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                  <Link href="/profile" className="flex flex-row space-x-2 items-center">
                    <Bell className="h-4 w-4"/>
                    <p>Notifications</p>
                  </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
