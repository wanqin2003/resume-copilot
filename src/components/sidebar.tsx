"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { User, Kanban, Wand2, Sparkles, Github, Shield } from "lucide-react";

const navItems = [
  {
    title: "履历素材库",
    description: "Master Profile",
    href: "/profile",
    icon: User,
  },
  {
    title: "投递看板",
    description: "Application Tracker",
    href: "/applications",
    icon: Kanban,
  },
  {
    title: "AI 定制工作台",
    description: "Tailor Studio",
    href: "/tailor",
    icon: Wand2,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 flex-col bg-[hsl(var(--sidebar))] text-[hsl(var(--sidebar-foreground))]">
      {/* Brand */}
      <div className="flex items-center gap-3 px-5 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500 shadow-lg shadow-indigo-500/30">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-sm font-bold tracking-tight">Resume Copilot</h1>
          <p className="text-[10px] text-[hsl(var(--sidebar-foreground))] opacity-50">
            AI-Powered Career Assistant
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-4 h-px bg-white/10" />

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest opacity-40">
          工作区
        </p>
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200",
                isActive
                  ? "bg-white/10 font-medium text-white shadow-sm"
                  : "text-white/60 hover:bg-white/5 hover:text-white/90"
              )}
            >
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-md transition-colors",
                  isActive
                    ? "bg-indigo-500 text-white shadow shadow-indigo-500/30"
                    : "bg-white/5 text-white/50 group-hover:bg-white/10 group-hover:text-white/80"
                )}
              >
                <item.icon className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <span className="leading-tight">{item.title}</span>
                <span
                  className={cn(
                    "text-[10px] leading-tight",
                    isActive ? "text-white/50" : "text-white/30"
                  )}
                >
                  {item.description}
                </span>
              </div>
              {isActive && (
                <div className="ml-auto h-1.5 w-1.5 rounded-full bg-indigo-400" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="space-y-3 px-4 pb-5">
        <div className="mx-1 h-px bg-white/10" />
        <div className="flex items-center gap-2 px-1">
          <Shield className="h-3.5 w-3.5 text-emerald-400" />
          <span className="text-[11px] text-white/40">
            本地存储 · 隐私优先
          </span>
        </div>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-xs text-white/50 transition-colors hover:bg-white/10 hover:text-white/70"
        >
          <Github className="h-3.5 w-3.5" />
          Star on GitHub
        </a>
      </div>
    </aside>
  );
}
