import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";

const MOTOR = [
  { to: "/motor", label: "Motor sizing" },
  { to: "/voltage-drop", label: "Voltage drop" },
  { to: "/service", label: "Service load" },
  { to: "/wire", label: "Wire amperes" },
] as const;

const trigger = "h-11 cursor-pointer rounded-full px-3 text-base font-medium text-ink focus:bg-paper focus:text-ink data-[state=open]:bg-ink data-[state=open]:text-paper";

export function SiteShell({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (state) => state.location.pathname });
  const motorOn = MOTOR.some((item) => item.to === path);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-line bg-paper/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <Link to="/" className="flex items-center gap-3 text-ink">
            <span className="grid size-11 place-items-center rounded-xl bg-ink text-base font-semibold text-paper">F</span>
            <span>
              <span className="block text-lg font-semibold leading-tight">FieldDesk</span>
              <span className="block text-sm text-muted">Electrical and HVAC</span>
            </span>
          </Link>
          <Menubar className="h-auto gap-1 border-0 bg-transparent p-0 shadow-none">
            <MenubarMenu>
              <MenubarTrigger asChild>
                <Link to="/" className={`${trigger} ${path === "/" ? "font-semibold text-copper-deep" : ""}`}>Home</Link>
              </MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger className={`${trigger} ${motorOn ? "font-semibold text-copper-deep" : ""}`}>Motor</MenubarTrigger>
              <MenubarContent className="rounded-2xl border-line bg-surface p-2 text-ink">
                {MOTOR.map((item) => (
                  <MenubarItem key={item.to} asChild className="rounded-xl px-3 py-2.5 text-base focus:bg-paper focus:text-ink">
                    <Link to={item.to} className={path === item.to ? "font-semibold text-copper-deep" : ""}>{item.label}</Link>
                  </MenubarItem>
                ))}
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger asChild>
                <Link to="/hvac" className={`${trigger} ${path === "/hvac" ? "font-semibold text-copper-deep" : ""}`}>HVAC</Link>
              </MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger asChild>
                <Link to="/feedback" className={`${trigger} ${path === "/feedback" ? "font-semibold text-copper-deep" : ""}`}>Feedback</Link>
              </MenubarTrigger>
            </MenubarMenu>
          </Menubar>
        </div>
      </header>
      {children}
    </div>
  );
}
