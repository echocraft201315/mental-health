"use client";

import { 
  Home, 
  Users, 
  UserCircle, 
  BookOpen, 
  CheckSquare, 
  Calendar, 
  Settings, 
  HelpCircle 
} from "lucide-react"
import Link from "next/link";
import { usePathname } from "next/navigation";
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
} from "@/app/components/ui/sidebar"

const navigation = [
  { name: "Home", href: "/coach/dashboard", icon: Home },
  { name: "Clients", href: "/coach/clients", icon: Users },
  { name: "Groups", href: "/coach/groups", icon: UserCircle },
  { name: "Library", href: "/coach/library", icon: BookOpen },
  { name: "Tasks", href: "/coach/tasks", icon: CheckSquare },
  { name: "Sessions", href: "/coach/sessions", icon: Calendar },
  { name: "Settings", href: "/coach/settings", icon: Settings },
  { name: "Help", href: "/coach/help", icon: HelpCircle },
]

export function CoachSidebar() {
  const { state } = useSidebar()
  const collapsed = state === "collapsed"
  const pathname = usePathname();

  return (
    <>
      <Sidebar 
        className={`${collapsed ? "w-16" : "w-64"} border-r-0`}
        style={{
          background: 'linear-gradient(180deg, #1e293b 0%, #334155 100%)',
          color: '#f8fafc'
        }}
      >
        <SidebarContent 
          style={{
            background: 'linear-gradient(180deg, #1e293b 0%, #334155 100%)'
          }}
        >
          <SidebarGroup>
            <SidebarGroupLabel 
              className="sidebar-title font-bold text-lg mb-4 px-4"
              style={{
                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontWeight: '700',
                textShadow: '0 2px 4px rgba(251, 191, 36, 0.2)'
              }}
            >
              {!collapsed && "Coach Dashboard"}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton asChild>
                        <Link
                          href={item.href}
                          className={`sidebar-link flex items-center px-4 py-3 transition-all duration-300 ease-in-out ${
                            isActive 
                              ? "active text-white" 
                              : "text-white/80 hover:text-white"
                          }`}
                        >
                          <item.icon className="h-5 w-5 flex-shrink-0" />
                          {!collapsed && <span className="ml-3">{item.name}</span>}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </>
  )
}