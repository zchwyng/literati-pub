'use client';

import { usePathname } from 'next/navigation';
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { DashboardSidebar } from "../components/DashboardSidebar"
import { ProjectRightSidebar, RightSidebarProvider, RightSidebarTrigger } from "../components/ProjectRightSidebar"
import { ProjectBreadcrumb } from "../components/ProjectBreadcrumb"
import { FilePreviewProvider } from "../components/FilePreviewContext"
import { ThemeToggle } from "../components/ThemeToggle"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const isProjectPage = pathname?.startsWith('/dashboard/project/');

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <RightSidebarProvider>
        <FilePreviewProvider>
          <div className="flex w-full">
            <SidebarInset className="flex-1">
              <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-background/95 backdrop-blur-sm sticky top-0 z-10">
                <SidebarTrigger className="-ml-1" />
                <div className="mr-2 h-4 w-px bg-zinc-200 dark:bg-zinc-800" />
                <ProjectBreadcrumb />
                <div className="ml-auto flex items-center gap-2">
                  <ThemeToggle />
                  {isProjectPage && <RightSidebarTrigger />}
                </div>
              </header>
              <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                {children}
              </div>
            </SidebarInset>
            <ProjectRightSidebar />
          </div>
        </FilePreviewProvider>
      </RightSidebarProvider>
    </SidebarProvider>
  )
}
