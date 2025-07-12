import { CoachSidebar } from "@/app/components/CoachSidebar";
import { SidebarProvider } from "@/app/components/ui/sidebar";

export default function CoachLayout({ children }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <CoachSidebar />
        <div className="flex-1">
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
} 