"use client";
// app/admin-realty-8x2d9/layout.tsx
// ============================================================
// ADMIN DASHBOARD LAYOUT
// Protected by middleware (see middleware.ts)
// Sidebar navigation for all admin sections
// ============================================================

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  Users,
  FileText,
  Settings,
  Star,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";

const NAV = [
  { label: "Dashboard", href: "/admin-realty-8x2d9/dashboard", icon: LayoutDashboard },
  { label: "Flats", href: "/admin-realty-8x2d9/apartments", icon: Building2 },
  { label: "Houses", href: "/admin-realty-8x2d9/houses", icon: Building2 },
  { label: "Lands", href: "/admin-realty-8x2d9/lands", icon: Building2 },
  { label: "Leads", href: "/admin-realty-8x2d9/leads", icon: Users },
  { label: "Blog Posts", href: "/admin-realty-8x2d9/blog-posts", icon: FileText },
  { label: "Google Indexing", href: "/admin-realty-8x2d9/seo-indexing", icon: Globe },
  { label: "Placements", href: "/admin-realty-8x2d9/featured", icon: Star },
  { label: "Settings", href: "/admin-realty-8x2d9/settings", icon: Settings },
];


export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loadingSession, setLoadingSession] = useState(true);

  const isLoginPage = pathname === "/admin-realty-8x2d9/login";

  useEffect(() => {
    async function checkSession() {
      if (isLoginPage) return;
      
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push("/admin-realty-8x2d9/login");
      } else {
        setLoadingSession(false);
      }
    }
    
    checkSession();
  }, [isLoginPage, router]);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin-realty-8x2d9/login");
  }

  // Bypass layout for the login page
  if (isLoginPage) {
    return <>{children}</>;
  }

  if (loadingSession) {
    return (
      <div className="min-h-screen bg-[#F9F9FA] flex flex-col items-center justify-center">
        <div className="flex">
          <span className="font-display text-3xl text-gray-900 lowercase">real</span>
          <span className="font-display text-3xl text-[var(--gold)] lowercase">ty</span>
        </div>
        <p className="font-body text-gray-500 text-sm mt-4 tracking-widest uppercase">Verifying authorization...</p>
      </div>
    );
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-gray-100">
        <Link href="/admin-realty-8x2d9/dashboard" className="flex items-center gap-2">
          <span className="font-display text-lg text-gray-900 lowercase">real</span>
          <span className="font-display text-lg text-[var(--gold)] lowercase">ty</span>
          <span className="font-body text-xs text-gray-500 ml-2 border border-gray-200 px-2 py-0.5 rounded bg-gray-50">
            Admin
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 font-body text-sm transition-all rounded",
                active
                  ? "bg-blue-50 text-blue-700 font-medium"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              )}
            >
              <item.icon size={18} className={active ? "text-blue-700" : "text-gray-500"} />
              {item.label}
              {active && <ChevronRight size={14} className="ml-auto opacity-50" />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 pb-4 space-y-1 border-t border-gray-100 pt-4">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 font-body text-sm text-gray-600 hover:text-gray-900 transition-colors rounded hover:bg-gray-50"
        >
          <Building2 size={18} className="text-gray-500" />
          View Site
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 font-body text-sm text-gray-600 hover:text-red-600 transition-colors rounded hover:bg-red-50"
        >
          <LogOut size={18} className="text-gray-500 hover:text-red-600" />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F9F9FA] text-gray-900 flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-gray-200 bg-white">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="relative z-10 w-64 flex flex-col bg-white shadow-xl">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 border-b border-gray-200 bg-white flex items-center px-6 gap-4 sticky top-0 z-20">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-500 hover:text-gray-900 transition-colors"
          >
            <Menu size={24} />
          </button>
          <div className="ml-auto flex items-center gap-3">
            <span className="font-body text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {new Date().toLocaleDateString("en-AE", { weekday: "long", day: "numeric", month: "long" })}
            </span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 md:p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
