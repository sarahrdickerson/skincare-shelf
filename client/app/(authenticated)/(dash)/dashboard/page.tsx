import React from 'react'
import { AppSidebar } from "@/components/nav/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import UserCard from '@/components/user/user-card'
import { SkeletonCard } from '@/components/skeleton/skeleton-card'
import { Skeleton } from '@/components/ui/skeleton'
import { SkeletonPage } from '@/components/skeleton/skeleton-page'

const DashboardPage = () => {
  return (
    <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
        <header className="flex h-16 shrink-0 items-center space-x-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <p className='text-md'>Skincare Shelf</p>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <SkeletonPage />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default DashboardPage