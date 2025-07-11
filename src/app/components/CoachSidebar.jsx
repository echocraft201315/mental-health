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

  return (
    <>
      <style jsx>{`
        .sidebar-link {
          background-color: transparent;
        }
        .sidebar-link:hover {
          background-color: rgba(255, 255, 255, 0.1) !important;
        }
        .sidebar-link.active {
          background-color: #ff5670 !important;
        }
        .sidebar-link.active:hover {
          background-color: #ff5670 !important;
        }
      `}</style>
      <Sidebar 
        className={`${collapsed ? "w-16" : "w-64"} border-r-0`}
        style={{
          backgroundColor: '#233950',
          color: '#ffffff'
        }}
      >
        <SidebarContent 
          style={{
            backgroundColor: '#233950'
          }}
        >
          <SidebarGroup>
            <SidebarGroupLabel 
              className="font-bold text-lg mb-4 px-4"
              style={{
                color: '#ffc052'
              }}
            >
              {!collapsed && "Coach Dashboard"}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navigation.map((item) => (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.href}
                        className={({ isActive }) =>
                          `sidebar-link flex items-center px-4 py-3 rounded-lg transition-colors ${
                            isActive 
                              ? "active text-white" 
                              : "text-white/80 hover:text-white"
                          }`
                        }
                      >
                        <item.icon className="h-5 w-5 flex-shrink-0" />
                        {!collapsed && <span className="ml-3">{item.name}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </>
  )
}