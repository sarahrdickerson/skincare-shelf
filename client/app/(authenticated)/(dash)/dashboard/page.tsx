import React from 'react'
import { AppSidebar } from "@/components/nav/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import UserCard from '@/components/user/user-card'

const DashboardPage = () => {
  return (
    <SidebarProvider>
        <AppSidebar />
    </SidebarProvider>
  )
}

export default DashboardPage