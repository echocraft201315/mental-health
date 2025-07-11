import { CoachSidebar } from "@/app/components/CoachSidebar";
import { SidebarProvider } from "@/app/components/ui/sidebar";

export default function CoachLayout({ children }) {
  // Default to light mode for SSR
  const initialStyle = {
    '--luxury-background': '#d0f4f0',
    '--luxury-dark': '#0b0e19',
  };

  return (
    <html lang="en" style={initialStyle}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'light';
                  var root = document.documentElement;
                  if (theme === 'dark' || (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    root.classList.add('dark');
                    root.style.setProperty('--luxury-background', '#0b1120');
                    root.style.setProperty('--luxury-dark', '#f1f5f9');
                  } else {
                    root.classList.remove('dark');
                    root.style.setProperty('--luxury-background', '#d0f4f0');
                    root.style.setProperty('--luxury-dark', '#0b0e19');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <SidebarProvider>
          <div className="flex min-h-screen w-full">
            <CoachSidebar />
            <div className="flex-1">
              {children}
            </div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
} 