import { useEffect, useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";

const MOTOR = [
  { to: "/motor", label: "Motor sizing" },
  { to: "/voltage-drop", label: "Voltage drop" },
  { to: "/service", label: "Service load" },
  { to: "/wire", label: "Wire amperes" },
] as const;

export function SiteShell({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (state) => state.location.pathname });
  const [open, setOpen] = useState(false);
  const motorOn = MOTOR.some((item) => item.to === path);

  useEffect(() => {
    setOpen(false);
  }, [path]);

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
          <nav className="hidden items-center gap-6 text-base lg:flex">
            <TopLink to="/" active={path === "/"}>Home</TopLink>
            <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
              <button
                type="button"
                aria-expanded={open}
                aria-haspopup="true"
                onClick={() => setOpen((value) => !value)}
                className={motorOn || open ? "font-semibold text-copper-deep" : "text-ink"}
              >
                Motor
              </button>
              {open ? <MotorMenu path={path} /> : null}
            </div>
            <TopLink to="/hvac" active={path === "/hvac"}>HVAC</TopLink>
            <TopLink to="/feedback" active={path === "/feedback"}>Feedback</TopLink>
          </nav>
        </div>
        <nav className="px-4 pb-3 lg:hidden">
          <div className="flex gap-2 overflow-x-auto">
            <Pill to="/" active={path === "/"}>Home</Pill>
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
              className={`shrink-0 rounded-full border px-4 py-2.5 text-base ${motorOn || open ? "border-ink bg-ink text-paper" : "border-line bg-surface text-ink"}`}
            >
              Motor
            </button>
            <Pill to="/hvac" active={path === "/hvac"}>HVAC</Pill>
            <Pill to="/feedback" active={path === "/feedback"}>Feedback</Pill>
          </div>
          {open ? (
            <div className="mt-2 grid gap-2">
              {MOTOR.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`rounded-xl border px-4 py-3 text-base ${path === item.to ? "border-ink bg-ink text-paper" : "border-line bg-surface"}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          ) : null}
        </nav>
      </header>
      {children}
    </div>
  );
}

function TopLink({ to, active, children }: { to: string; active: boolean; children: ReactNode }) {
  return (
    <Link to={to} className={active ? "font-semibold text-copper-deep" : "text-ink"}>
      {children}
    </Link>
  );
}

function Pill({ to, active, children }: { to: string; active: boolean; children: ReactNode }) {
  return (
    <Link to={to} className={`shrink-0 rounded-full border px-4 py-2.5 text-base ${active ? "border-ink bg-ink text-paper" : "border-line bg-surface text-ink"}`}>
      {children}
    </Link>
  );
}

function MotorMenu({ path }: { path: string }) {
  return (
    <div className="absolute left-0 top-full z-40 w-56 pt-2">
      <div className="rounded-2xl border border-line bg-surface p-2 shadow-sm">
        {MOTOR.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`block rounded-xl px-3 py-2.5 ${path === item.to ? "bg-ink font-medium text-paper" : "hover:bg-paper"}`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
