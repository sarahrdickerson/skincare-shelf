import * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
    Bookmark,
    Home,
    Package,
    Search
} from "lucide-react"
import { NavUser } from "./nav-user"

const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
      },
    navMain: [
        {
            title: "Home",
            url: "/dashboard",
            icon: Home,
            isActive: true
        },
        {
            title: "Explore",
            url: "/explore",
            icon: Search,
            isActive: false
        }
    ],
    navGroups: [
        {
            title: "Products",
            url: "#",
            items: [
                {
                    title: "My Products",
                    url: "/products/my-products",
                    icon: Package,
                    isActive: false
                },
                {
                    title: "Want list",
                    url: "/products/want-list",
                    icon: Bookmark,
                    isActive: false
                }
            ]
        },
        {
            title: "Shelves",
            url: "#",
            items: [
                // TODO: add shelves as collections
            ]
        }
    ]
}
export function AppSidebar({...props}: React.ComponentProps<typeof Sidebar>){
    return (
        <Sidebar {...props}>
            <SidebarHeader>
                
            </SidebarHeader>
            <SidebarContent className="p-2">
                <SidebarMenu className="px-2">
                    {data.navMain.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild isActive={item.isActive}>
                                <a href={item.url}><item.icon/><span>{item.title}</span></a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
                {data.navGroups.map((item) => (
                    <SidebarGroup key={item.title}>
                        <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {item.items.map((subItem) => (
                                    <SidebarMenuItem key={subItem.title}>
                                        <SidebarMenuButton asChild isActive={subItem.isActive}>
                                            <a href={item.url}><subItem.icon/><span>{subItem.title}</span></a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarFooter>
                <NavUser/>
            </SidebarFooter>
        </Sidebar>
    )
}