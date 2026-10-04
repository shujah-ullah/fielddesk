import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/motor", label: "Motor" },
  { to: "/voltage-drop", label: "Drop" },
  { to: "/service", label: "Service" },
  { to: "/wire", label: "Wire" },
  { to: "/hvac", label: "HVAC" },
  { to: "/feedback", label: "Feedback" },
] as const;

export function SiteShell({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (state) => state.location.pathname });
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-line bg-paper/95 backdrop-blur">
        <div className="mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between gap-4 px-4">
          <Link to="/" className="flex items-center gap-3 text-ink">
            <span className="grid size-11 place-items-center rounded-xl bg-ink text-base font-semibold text-paper">F</span>
            <span>
              <span className="block text-lg font-semibold leading-tight">FieldDesk</span>
              <span className="block text-sm text-muted">Electrical and HVAC</span>
            </span>
          </Link>
          <nav className="hidden gap-5 text-base lg:flex">
            {LINKS.map((link) => (
              <Link key={link.to} to={link.to} className={path === link.to ? "font-semibold text-copper-deep" : "text-ink"}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <nav className="flex gap-2 overflow-x-auto px-4 pb-3 lg:hidden">
          {LINKS.map((link) => (
            <Link key={link.to} to={link.to} className={`shrink-0 rounded-full border px-4 py-2.5 text-base ${path === link.to ? "border-ink bg-ink text-paper" : "border-line bg-surface text-ink"}`}>
              {link.label}
            </Link>
          ))}
        </nav>
      </header>
      {children}
    </div>
  );
}
