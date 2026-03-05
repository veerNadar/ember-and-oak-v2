"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
    LayoutDashboard,
    CalendarDays,
    UtensilsCrossed,
    LogOut,
    Flame,
    Menu,
    X,
    Clock,
} from "lucide-react";

// ── Navigation items ──────────────────────────────────────────────────────────

const NAV = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/reservations", label: "Reservations", icon: CalendarDays },
    { href: "/admin/menu", label: "Menu Items", icon: UtensilsCrossed },
];

// ── Page title map ────────────────────────────────────────────────────────────

function pageTitle(pathname: string): string {
    if (pathname.startsWith("/admin/dashboard")) return "Dashboard";
    if (pathname.startsWith("/admin/reservations")) return "Reservations";
    if (pathname.startsWith("/admin/menu")) return "Menu Items";
    if (pathname.startsWith("/admin/login")) return "Sign In";
    return "Admin";
}

// ── Live clock ────────────────────────────────────────────────────────────────

function useClock() {
    const [now, setNow] = useState(new Date());
    useEffect(() => {
        const id = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(id);
    }, []);
    return now;
}

// ── AdminShell ────────────────────────────────────────────────────────────────

export default function AdminShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const { data: session } = useSession();
    const now = useClock();
    const [open, setOpen] = useState(false); // mobile sidebar

    const isLoginPage = pathname === "/admin/login";
    if (isLoginPage) return <>{children}</>;

    const username = session?.user?.name ?? session?.user?.email ?? "Admin";
    const title = pageTitle(pathname);

    const formattedDate = now.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
    });
    const formattedTime = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
    });

    async function handleLogout() {
        await signOut({ redirect: false });
        router.push("/admin/login");
    }

    return (
        <div className="flex min-h-screen bg-[#F8F5F0] font-[Inter,sans-serif]">

            {/* ── Mobile backdrop ─────────────────────────────────── */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* ── Sidebar ─────────────────────────────────────────── */}
            <aside
                className={[
                    // base layout
                    "fixed top-0 left-0 bottom-0 z-50 w-60 flex flex-col",
                    "bg-gradient-to-b from-[#1a1208] to-[#231808]",
                    "transition-transform duration-250 ease-in-out overflow-y-auto",
                    // mobile: slide in/out; desktop: always visible
                    open ? "translate-x-0" : "-translate-x-full",
                    "md:translate-x-0 md:sticky md:top-0 md:h-screen",
                ].join(" ")}
            >
                {/* Logo */}
                <div className="flex items-center gap-2.5 px-5 py-5 border-b border-white/[0.06]">
                    <Flame size={22} color="#c17f3b" />
                    <span className="flex-1 text-base font-bold text-[#f5f0eb] tracking-wide">
                        E&amp;O Admin
                    </span>
                    {/* Mobile close */}
                    <button
                        className="md:hidden text-[#9ca3af] hover:text-white p-1.5 rounded transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                        onClick={() => setOpen(false)}
                        aria-label="Close menu"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* User badge */}
                <div className="flex items-center gap-2.5 px-5 py-4">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#c17f3b] to-[#a86d2e] flex items-center justify-center text-sm font-bold text-white shrink-0">
                        {username.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                        <p className="text-sm font-semibold text-[#f5f0eb] leading-tight truncate">{username}</p>
                        <p className="text-[0.72rem] text-[#9ca3af] leading-tight">Administrator</p>
                    </div>
                </div>

                <div className="h-px bg-white/[0.06] mx-5" />

                {/* Nav links */}
                <nav className="flex-1 flex flex-col gap-0.5 p-3">
                    {NAV.map(({ href, label, icon: Icon }) => {
                        const active = pathname === href || pathname.startsWith(href + "/");
                        return (
                            <Link
                                key={href}
                                href={href}
                                onClick={() => setOpen(false)}
                                className={[
                                    "relative flex items-center gap-2.5 px-3.5 py-3 rounded-lg text-sm font-medium transition-all duration-150 min-h-[44px]",
                                    active
                                        ? "bg-[rgba(193,127,59,0.15)] text-[#c17f3b]"
                                        : "text-[#9ca3af] hover:bg-[rgba(193,127,59,0.08)] hover:text-[#e0c8a8]",
                                ].join(" ")}
                            >
                                <Icon size={18} className="shrink-0" />
                                <span>{label}</span>
                                {active && (
                                    <div className="absolute right-0 top-[20%] bottom-[20%] w-0.5 rounded-sm bg-[#c17f3b]" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Logout at bottom */}
                <div className="pb-5">
                    <div className="h-px bg-white/[0.06] mx-5 mb-3" />
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2.5 w-[calc(100%-1.5rem)] mx-3 px-3.5 py-3 rounded-lg text-sm font-medium text-[#fca5a5] bg-[rgba(239,68,68,0.08)] border border-[rgba(239,68,68,0.18)] min-h-[44px] transition-colors hover:bg-[rgba(239,68,68,0.15)]"
                    >
                        <LogOut size={16} />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* ── Main area ───────────────────────────────────────── */}
            <div className="flex-1 flex flex-col min-h-screen md:ml-60 min-w-0">
                {/* Top header bar */}
                <header className="sticky top-0 z-10 flex items-center gap-3 px-4 md:px-8 h-16 bg-white border-b border-[#e9e0d5] shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                    {/* Mobile hamburger — 44px tap target */}
                    <button
                        className="md:hidden flex items-center justify-center w-11 h-11 -ml-1.5 text-[#6b7280] hover:text-[#c17f3b] transition-colors rounded-lg"
                        onClick={() => setOpen(true)}
                        aria-label="Open menu"
                    >
                        <Menu size={22} />
                    </button>

                    <h1 className="flex-1 text-base md:text-lg font-bold text-[#1c1009] m-0 truncate">
                        {title}
                    </h1>

                    {/* Clock — date hidden on smallest screens */}
                    <div className="hidden sm:flex items-center gap-2 text-[#6b7280] shrink-0">
                        <Clock size={14} className="text-[#9ca3af] shrink-0" />
                        <span className="hidden md:inline text-[0.8125rem]">{formattedDate}</span>
                        <span className="text-[0.8125rem] font-semibold text-[#3d2b10] tabular-nums min-w-[60px]">
                            {formattedTime}
                        </span>
                    </div>
                </header>

                {/* Scrollable content */}
                <main className="flex-1 p-4 md:p-8 bg-[#F8F5F0] overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
