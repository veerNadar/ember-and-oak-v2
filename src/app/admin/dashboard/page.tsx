import { unstable_noStore as noStore } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase";
import type { Reservation } from "@/lib/types";
import {
    CalendarDays,
    Clock,
    UtensilsCrossed,
    CalendarCheck,
} from "lucide-react";

// Force this page to always be dynamically rendered — never statically cached.
export const dynamic = "force-dynamic";

// ── Helpers ───────────────────────────────────────────────────────────────────

function todayISO() {
    return new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"
}

function weekRangeISO() {
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - day);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    return {
        start: startOfWeek.toISOString().split("T")[0],
        end: endOfWeek.toISOString().split("T")[0],
    };
}

function formatTime(time: string) {
    // time comes as "HH:MM:SS" or "HH:MM"
    const [h, m] = time.split(":").map(Number);
    const ampm = h >= 12 ? "PM" : "AM";
    const hour = h % 12 || 12;
    return `${hour}:${String(m).padStart(2, "0")} ${ampm}`;
}

function formatDate(date: string) {
    return new Date(date + "T00:00:00").toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
    });
}

// ── Status badge ──────────────────────────────────────────────────────────────

const STATUS_STYLES: Record<string, { bg: string; color: string; label: string }> = {
    pending: { bg: "#fef9c3", color: "#854d0e", label: "Pending" },
    confirmed: { bg: "#dcfce7", color: "#14532d", label: "Confirmed" },
    cancelled: { bg: "#fee2e2", color: "#7f1d1d", label: "Cancelled" },
    seated: { bg: "#dbeafe", color: "#1e3a5f", label: "Seated" },
};

function StatusBadge({ status }: { status: string }) {
    const st = STATUS_STYLES[status] ?? { bg: "#f3f4f6", color: "#374151", label: status };
    return (
        <span
            style={{
                background: st.bg,
                color: st.color,
                padding: "2px 10px",
                borderRadius: "999px",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
            }}
        >
            {st.label}
        </span>
    );
}

// ── Data fetching ─────────────────────────────────────────────────────────────

async function fetchDashboardData() {
    // Opt out of Next.js data cache for this specific fetch.
    noStore();

    const today = todayISO();
    const { start: weekStart, end: weekEnd } = weekRangeISO();

    const [
        { count: todayCount },
        { count: pendingCount },
        { count: menuCount },
        { count: weekCount },
        { data: todayReservations },
        { data: recentReservations },
    ] = await Promise.all([
        supabaseAdmin
            .from("reservations")
            .select("id", { count: "exact", head: true })
            .eq("date", today),

        supabaseAdmin
            .from("reservations")
            .select("id", { count: "exact", head: true })
            .eq("status", "pending"),

        supabaseAdmin
            .from("menu_items")
            .select("id", { count: "exact", head: true }),

        supabaseAdmin
            .from("reservations")
            .select("id", { count: "exact", head: true })
            .gte("date", weekStart)
            .lte("date", weekEnd),

        supabaseAdmin
            .from("reservations")
            .select("*")
            .eq("date", today)
            .order("time", { ascending: true }),

        supabaseAdmin
            .from("reservations")
            .select("*")
            .order("created_at", { ascending: false })
            .limit(5),
    ]);

    const result = {
        todayCount: todayCount ?? 0,
        pendingCount: pendingCount ?? 0,
        menuCount: menuCount ?? 0,
        weekCount: weekCount ?? 0,
        todayReservations: (todayReservations as Reservation[]) ?? [],
        recentReservations: (recentReservations as Reservation[]) ?? [],
    };

    console.log(`[admin/dashboard] todayCount=${result.todayCount} pending=${result.pendingCount} recentRows=${result.recentReservations.length}`);
    return result;
}

// ── Stat card ─────────────────────────────────────────────────────────────────

function StatCard({
    label,
    value,
    icon: Icon,
    accent,
}: {
    label: string;
    value: number;
    icon: React.ElementType;
    accent: string;
}) {
    return (
        <div style={s.card}>
            <div style={{ ...s.cardIcon, background: accent + "18", color: accent }}>
                <Icon size={20} />
            </div>
            <div>
                <p style={s.cardLabel}>{label}</p>
                <p style={s.cardValue}>{value}</p>
            </div>
        </div>
    );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function AdminDashboardPage() {
    const {
        todayCount,
        pendingCount,
        menuCount,
        weekCount,
        todayReservations,
        recentReservations,
    } = await fetchDashboardData();

    return (
        <div style={s.page}>
            {/* ── Stat cards ── */}
            <div style={s.statsGrid}>
                <StatCard label="Today's Reservations" value={todayCount} icon={CalendarDays} accent="#c17f3b" />
                <StatCard label="Pending Approval" value={pendingCount} icon={Clock} accent="#f59e0b" />
                <StatCard label="Total Menu Items" value={menuCount} icon={UtensilsCrossed} accent="#10b981" />
                <StatCard label="This Week" value={weekCount} icon={CalendarCheck} accent="#6366f1" />
            </div>

            {/* ── Panels ── */}
            <div style={s.panels}>
                {/* Left — today's reservations */}
                <section style={s.panel}>
                    <h2 style={s.panelTitle}>Today&rsquo;s Reservations</h2>
                    {todayReservations.length === 0 ? (
                        <p style={s.empty}>No reservations today.</p>
                    ) : (
                        <ul style={s.list}>
                            {todayReservations.map((r) => (
                                <li key={r.id} style={s.row}>
                                    <div style={s.rowMain}>
                                        <span style={s.guestName}>{r.customer_name}</span>
                                        <div style={s.rowMeta}>
                                            <span style={s.metaChip}>🕐 {formatTime(r.time)}</span>
                                            <span style={s.metaChip}>👥 {r.party_size}</span>
                                        </div>
                                    </div>
                                    <StatusBadge status={r.status} />
                                </li>
                            ))}
                        </ul>
                    )}
                </section>

                {/* Right — recent bookings */}
                <section style={s.panel}>
                    <h2 style={s.panelTitle}>Recent Bookings</h2>
                    {recentReservations.length === 0 ? (
                        <p style={s.empty}>No bookings yet.</p>
                    ) : (
                        <ul style={s.list}>
                            {recentReservations.map((r) => (
                                <li key={r.id} style={s.row}>
                                    <div style={s.rowMain}>
                                        <span style={s.guestName}>{r.customer_name}</span>
                                        <div style={s.rowMeta}>
                                            <span style={s.metaChip}>📅 {formatDate(r.date)}</span>
                                            <span style={s.metaChip}>🕐 {formatTime(r.time)}</span>
                                            <span style={s.metaChip}>👥 {r.party_size}</span>
                                        </div>
                                    </div>
                                    <StatusBadge status={r.status} />
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            </div>
        </div>
    );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const s: Record<string, React.CSSProperties> = {
    page: {
        display: "flex",
        flexDirection: "column",
        gap: "1.75rem",
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
    },
    statsGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "1rem",
    },
    card: {
        background: "#fff",
        borderRadius: "12px",
        padding: "1.25rem 1.5rem",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
        border: "1px solid #e9e0d5",
    },
    cardIcon: {
        width: "44px",
        height: "44px",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
    },
    cardLabel: {
        fontSize: "0.78rem",
        color: "#9ca3af",
        margin: "0 0 2px",
        fontWeight: 500,
        textTransform: "uppercase",
        letterSpacing: "0.04em",
    },
    cardValue: {
        fontSize: "1.75rem",
        fontWeight: 800,
        color: "#1c1009",
        margin: 0,
        lineHeight: 1,
    },
    panels: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "1.25rem",
    },
    panel: {
        background: "#fff",
        borderRadius: "12px",
        padding: "1.5rem",
        boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
        border: "1px solid #e9e0d5",
    },
    panelTitle: {
        fontSize: "1rem",
        fontWeight: 700,
        color: "#1c1009",
        margin: "0 0 1rem",
        paddingBottom: "0.75rem",
        borderBottom: "1px solid #f0ebe4",
    },
    empty: {
        color: "#9ca3af",
        fontSize: "0.875rem",
        margin: 0,
    },
    list: {
        listStyle: "none",
        margin: 0,
        padding: 0,
        display: "flex",
        flexDirection: "column",
        gap: "0",
    },
    row: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "0.75rem",
        padding: "0.75rem 0",
        borderBottom: "1px solid #f5f0eb",
    },
    rowMain: {
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        minWidth: 0,
    },
    guestName: {
        fontSize: "0.9rem",
        fontWeight: 600,
        color: "#1c1009",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },
    rowMeta: {
        display: "flex",
        gap: "6px",
        flexWrap: "wrap",
    },
    metaChip: {
        fontSize: "0.75rem",
        color: "#6b7280",
    },
};
