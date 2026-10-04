import { useEffect, useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";

const MOTOR = [
  { to: "/motor", label: "Motor sizing" },
  { to: "/voltage-drop", label: "Voltage drop" },
  { to: "/service", label: "Service load" },
  { to: "/wire", label: "Wire amperes" },
] as const;

const trigger = "h-11 cursor-pointer rounded-full px-4 text-base font-medium text-ink hover:bg-[#f6e6da] hover:text-copper-deep focus-visible:bg-[#f6e6da] focus-visible:text-copper-deep data-[state=open]:bg-[#f6e6da] data-[state=open]:text-copper-deep";

export function SiteShell({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (state) => state.location.pathname });
  const [motorOpen, setMotorOpen] = useState(false);
  const motorOn = MOTOR.some((item) => item.to === path);

  useEffect(() => {
    setMotorOpen(false);
  }, [path]);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-line bg-paper/95 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <Link to="/" className="flex items-center gap-3 text-ink">
              <span className="grid size-11 place-items-center rounded-xl bg-ink text-base font-semibold text-paper">F</span>
              <span>
                <span className="block text-lg font-semibold leading-tight">FieldDesk</span>
                <span className="block text-sm text-muted">Electrical and HVAC</span>
              </span>
            </Link>
            <Menubar className="hidden h-auto gap-1 rounded-full border border-line bg-[#fff8f2] px-1.5 py-1 shadow-none md:flex">
              <MenubarMenu>
                <MenubarTrigger asChild>
                  <Link to="/" className={`${trigger} ${path === "/" ? "bg-[#f6e6da] font-semibold text-copper-deep" : ""}`}>Home</Link>
                </MenubarTrigger>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className={`${trigger} ${motorOn ? "bg-[#f6e6da] font-semibold text-copper-deep" : ""}`}>Motor</MenubarTrigger>
                <MenubarContent className="rounded-2xl border-line bg-[#fff8f2] p-2 text-ink">
                  {MOTOR.map((item) => (
                    <MenubarItem key={item.to} asChild className="rounded-xl px-3 py-2.5 text-base hover:bg-[#f6e6da] hover:text-copper-deep focus:bg-[#f6e6da] focus:text-copper-deep">
                      <Link to={item.to} className={path === item.to ? "bg-[#f6e6da] font-semibold text-copper-deep" : ""}>{item.label}</Link>
                    </MenubarItem>
                  ))}
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger asChild>
                  <Link to="/hvac" className={`${trigger} ${path === "/hvac" ? "bg-[#f6e6da] font-semibold text-copper-deep" : ""}`}>HVAC</Link>
                </MenubarTrigger>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger asChild>
                  <Link to="/feedback" className={`${trigger} ${path === "/feedback" ? "bg-[#f6e6da] font-semibold text-copper-deep" : ""}`}>Feedback</Link>
                </MenubarTrigger>
              </MenubarMenu>
            </Menubar>
          </div>

          <nav className="mt-3 md:hidden" aria-label="Pages">
            <div className="flex gap-1 rounded-full border border-line bg-[#fff8f2] p-1">
              <Link to="/" className={phoneTab(path === "/")}>Home</Link>
              <button
                type="button"
                aria-expanded={motorOpen}
                onClick={() => setMotorOpen((open) => !open)}
                className={phoneTab(motorOn || motorOpen)}
              >
                Motor
                <ChevronDown className={`size-3.5 shrink-0 ${motorOpen ? "rotate-180" : ""}`} aria-hidden="true" />
              </button>
              <Link to="/hvac" className={phoneTab(path === "/hvac")}>HVAC</Link>
              <Link to="/feedback" className={phoneTab(path === "/feedback")}>Feedback</Link>
            </div>
            {motorOpen ? (
              <div className="mt-2 grid gap-1 rounded-2xl border border-line bg-[#fff8f2] p-1">
                {MOTOR.map((item) => (
                  <Link key={item.to} to={item.to} className={`flex h-11 items-center rounded-xl px-3 text-base ${path === item.to ? "bg-[#f6e6da] font-semibold text-copper-deep" : "text-ink"}`}>
                    {item.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </nav>
        </div>
      </header>
      {children}
    </div>
  );
}

function phoneTab(on: boolean) {
  return `flex h-11 min-w-0 flex-1 items-center justify-center gap-0.5 whitespace-nowrap rounded-full px-1 text-sm font-medium active:bg-[#efd9c8] ${on ? "bg-[#f6e6da] font-semibold text-copper-deep" : "text-ink"}`;
}
