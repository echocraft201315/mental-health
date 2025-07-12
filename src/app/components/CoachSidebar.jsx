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
          background: transparent;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 0.75rem;
          margin: 0.25rem 0.5rem;
          position: relative;
          overflow: hidden;
        }
        .sidebar-link::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          transition: left 0.5s;
        }
        .sidebar-link:hover::before {
          left: 100%;
        }
        .sidebar-link:hover {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(37, 99, 235, 0.15) 100%) !important;
          transform: translateX(6px);
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.2);
        }
        .sidebar-link.active {
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%) !important;
          box-shadow: 0 6px 25px rgba(59, 130, 246, 0.4), 0 2px 8px rgba(0, 0, 0, 0.1);
          transform: translateX(4px);
        }
        .sidebar-link.active:hover {
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%) !important;
          transform: translateX(6px);
          box-shadow: 0 8px 32px rgba(59, 130, 246, 0.5), 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        .sidebar-container {
          background: linear-gradient(180deg, #1e293b 0%, #334155 100%);
          border-right: 1px solid rgba(71, 85, 105, 0.3);
          box-shadow: 8px 0 32px rgba(0, 0, 0, 0.15), 4px 0 12px rgba(0, 0, 0, 0.1);
        }
        .sidebar-title {
          background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 700;
          text-shadow: 0 2px 4px rgba(251, 191, 36, 0.2);
        }
      `}</style>
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
              className="font-bold text-lg mb-4 px-4"
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
                {navigation.map((item) => (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.href}
                        className={({ isActive }) =>
                          `sidebar-link flex items-center px-4 py-3 transition-all duration-300 ease-in-out ${
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