"use client";

import { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import type { Reservation } from "@/lib/types";

// ── Types ─────────────────────────────────────────────────────────────────────

type Status = "all" | "pending" | "confirmed" | "cancelled" | "seated";
type SortDir = "asc" | "desc";

// ── Constants ─────────────────────────────────────────────────────────────────

const PAGE_SIZE = 20;

const STATUS_TABS: { value: Status; label: string }[] = [
    { value: "all", label: "All" },
    { value: "pending", label: "Pending" },
    { value: "confirmed", label: "Confirmed" },
    { value: "seated", label: "Seated" },
    { value: "cancelled", label: "Cancelled" },
];

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
    pending: { bg: "#fef9c3", color: "#854d0e" },
    confirmed: { bg: "#dcfce7", color: "#14532d" },
    cancelled: { bg: "#fee2e2", color: "#7f1d1d" },
    seated: { bg: "#dbeafe", color: "#1e3a5f" },
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatTime(time: string) {
    const [h, m] = time.split(":").map(Number);
    const ampm = h >= 12 ? "PM" : "AM";
    return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${ampm}`;
}

function formatDate(date: string) {
    return new Date(date + "T00:00:00").toLocaleDateString("en-US", {
        month: "short", day: "numeric", year: "numeric",
    });
}

function exportCSV(rows: Reservation[]) {
    const header = ["Name", "Phone", "Email", "Date", "Time", "Party", "Status", "Notes", "Created"];
    const lines = rows.map((r) => [
        r.customer_name,
        r.phone,
        r.email ?? "",
        r.date,
        r.time,
        r.party_size,
        r.status,
        (r.notes ?? "").replace(/,/g, ";"),
        r.created_at,
    ].join(","));

    const csv = [header.join(","), ...lines].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `reservations-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
}

// ── Status badge ──────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
    const st = STATUS_STYLES[status] ?? { bg: "#f3f4f6", color: "#374151" };
    return (
        <span style={{
            background: st.bg, color: st.color,
            padding: "2px 10px", borderRadius: "999px",
            fontSize: "0.7rem", fontWeight: 700,
            letterSpacing: "0.05em", textTransform: "uppercase",
            whiteSpace: "nowrap",
        }}>
            {status}
        </span>
    );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function ReservationsTable({
    initialData,
}: {
    initialData: Reservation[];
}) {
    const router = useRouter();
    const [rows, setRows] = useState<Reservation[]>(initialData);
    const [statusFilter, setStatus] = useState<Status>("all");
    const [dateFilter, setDate] = useState("");
    const [sortDir, setSortDir] = useState<SortDir>("asc");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState<string | null>(null); // id being updated

    // ── Filter + sort ─────────────────────────────────────────────────────────

    const filtered = useMemo(() => {
        let r = rows;
        if (statusFilter !== "all") r = r.filter((x) => x.status === statusFilter);
        if (dateFilter) r = r.filter((x) => x.date === dateFilter);
        r = [...r].sort((a, b) =>
            sortDir === "asc"
                ? a.date.localeCompare(b.date) || a.time.localeCompare(b.time)
                : b.date.localeCompare(a.date) || b.time.localeCompare(a.time)
        );
        return r;
    }, [rows, statusFilter, dateFilter, sortDir]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    // ── Reset page on filter change ───────────────────────────────────────────

    function handleStatusFilter(s: Status) { setStatus(s); setPage(1); }
    function handleDateFilter(d: string) { setDate(d); setPage(1); }

    // ── Status update ─────────────────────────────────────────────────────────

    const updateStatus = useCallback(async (id: string, newStatus: string) => {
        setLoading(id);

        // Optimistic update
        setRows((prev) =>
            prev.map((r) => (r.id === id ? { ...r, status: newStatus as Reservation["status"] } : r))
        );

        try {
            const res = await fetch(`/api/reservations/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error ?? "Update failed");
            }

            toast.success(`Reservation marked as ${newStatus}.`);
            router.refresh(); // keep server caches in sync
        } catch (e: unknown) {
            // Rollback
            setRows(initialData);
            toast.error(e instanceof Error ? e.message : "Failed to update status.");
        } finally {
            setLoading(null);
        }
    }, [initialData, router]);

    // ── Render ────────────────────────────────────────────────────────────────

    return (
        <div style={s.wrapper}>
            {/* ── Toolbar ── */}
            <div style={s.toolbar}>
                {/* Status tabs */}
                <div style={s.tabs}>
                    {STATUS_TABS.map((tab) => (
                        <button
                            key={tab.value}
                            onClick={() => handleStatusFilter(tab.value)}
                            style={{
                                ...s.tab,
                                ...(statusFilter === tab.value ? s.tabActive : {}),
                            }}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div style={s.toolbarRight}>
                    {/* Date filter */}
                    <input
                        type="date"
                        value={dateFilter}
                        onChange={(e) => handleDateFilter(e.target.value)}
                        style={s.dateInput}
                        title="Filter by date"
                    />
                    {dateFilter && (
                        <button style={s.clearBtn} onClick={() => handleDateFilter("")}>
                            ✕ Clear date
                        </button>
                    )}

                    {/* Export CSV */}
                    <button style={s.exportBtn} onClick={() => exportCSV(filtered)}>
                        ↓ Export CSV
                    </button>
                </div>
            </div>

            {/* ── Count ── */}
            <p style={s.count}>
                {filtered.length} reservation{filtered.length !== 1 ? "s" : ""}
                {statusFilter !== "all" && ` · ${statusFilter}`}
                {dateFilter && ` · ${formatDate(dateFilter)}`}
            </p>

            {/* ── Table ── */}
            <div style={s.tableWrap}>
                <table style={s.table}>
                    <thead>
                        <tr style={s.theadRow}>
                            <th style={s.th}>Name</th>
                            <th style={s.th}>Contact</th>
                            <th
                                style={{ ...s.th, cursor: "pointer", userSelect: "none" }}
                                onClick={() => { setSortDir((d) => d === "asc" ? "desc" : "asc"); setPage(1); }}
                            >
                                Date {sortDir === "asc" ? "↑" : "↓"}
                            </th>
                            <th style={s.th}>Time</th>
                            <th style={s.th}>Party</th>
                            <th style={s.th}>Status</th>
                            <th style={s.th}>Notes</th>
                            <th style={s.th}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginated.length === 0 ? (
                            <tr>
                                <td colSpan={8} style={s.emptyCell}>
                                    No reservations found.
                                </td>
                            </tr>
                        ) : (
                            paginated.map((r) => (
                                <tr key={r.id} style={s.row}>
                                    <td style={s.td}>
                                        <span style={s.guestName}>{r.customer_name}</span>
                                    </td>
                                    <td style={s.td}>
                                        <span style={s.contact}>{r.phone}</span>
                                        {r.email && (
                                            <span style={s.email}>{r.email}</span>
                                        )}
                                    </td>
                                    <td style={s.td}>{formatDate(r.date)}</td>
                                    <td style={s.td}>{formatTime(r.time)}</td>
                                    <td style={{ ...s.td, textAlign: "center" }}>{r.party_size}</td>
                                    <td style={s.td}>
                                        <StatusBadge status={r.status} />
                                    </td>
                                    <td style={{ ...s.td, maxWidth: "180px" }}>
                                        <span style={s.notes}>{r.notes ?? "—"}</span>
                                    </td>
                                    <td style={s.td}>
                                        <div style={s.actions}>
                                            {r.status === "pending" && (
                                                <button
                                                    style={s.btnConfirm}
                                                    disabled={loading === r.id}
                                                    onClick={() => updateStatus(r.id, "confirmed")}
                                                >
                                                    Confirm
                                                </button>
                                            )}
                                            {r.status === "confirmed" && (
                                                <button
                                                    style={s.btnSeat}
                                                    disabled={loading === r.id}
                                                    onClick={() => updateStatus(r.id, "seated")}
                                                >
                                                    Seat
                                                </button>
                                            )}
                                            {r.status !== "cancelled" && r.status !== "seated" && (
                                                <button
                                                    style={s.btnCancel}
                                                    disabled={loading === r.id}
                                                    onClick={() => updateStatus(r.id, "cancelled")}
                                                >
                                                    Cancel
                                                </button>
                                            )}
                                            {(r.status === "cancelled" || r.status === "seated") && (
                                                <span style={{ color: "#9ca3af", fontSize: "0.75rem" }}>—</span>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* ── Pagination ── */}
            {totalPages > 1 && (
                <div style={s.pagination}>
                    <button
                        style={s.pageBtn}
                        disabled={page === 1}
                        onClick={() => setPage((p) => p - 1)}
                    >
                        ← Prev
                    </button>
                    <span style={s.pageInfo}>
                        Page {page} of {totalPages}
                    </span>
                    <button
                        style={s.pageBtn}
                        disabled={page === totalPages}
                        onClick={() => setPage((p) => p + 1)}
                    >
                        Next →
                    </button>
                </div>
            )}

            <style>{`
                button:disabled { opacity: 0.5; cursor: not-allowed !important; }
                tr[data-row]:hover td { background: #faf7f4 !important; }
                /* 44px min tap targets for table action buttons */
                .res-action-btn { min-height: 36px !important; padding: 6px 14px !important; }
                /* Stack toolbar vertically on small screens */
                @media (max-width: 600px) {
                    .res-toolbar { flex-direction: column !important; align-items: stretch !important; }
                    .res-toolbar > div:first-child { flex: unset !important; }
                    .res-toolbar-right { flex-wrap: wrap !important; }
                    .res-tab { min-height: 40px !important; }
                }
            `}</style>
        </div>
    );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const s: Record<string, React.CSSProperties> = {
    wrapper: {
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
    },
    toolbar: {
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        flexWrap: "wrap",
    },
    tabs: {
        display: "flex",
        gap: "4px",
        background: "#f0ebe4",
        borderRadius: "8px",
        padding: "3px",
        flex: 1,
        flexWrap: "wrap",
    },
    tab: {
        padding: "6px 14px",
        borderRadius: "6px",
        border: "none",
        background: "transparent",
        fontSize: "0.8125rem",
        fontWeight: 500,
        color: "#6b7280",
        cursor: "pointer",
        transition: "background 0.15s, color 0.15s",
    },
    tabActive: {
        background: "#fff",
        color: "#1c1009",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        fontWeight: 700,
    },
    toolbarRight: {
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        flexWrap: "wrap",
    },
    dateInput: {
        padding: "6px 10px",
        borderRadius: "7px",
        border: "1px solid #d1c9bf",
        fontSize: "0.8125rem",
        color: "#1c1009",
        background: "#fff",
        cursor: "pointer",
    },
    clearBtn: {
        padding: "6px 10px",
        borderRadius: "7px",
        border: "1px solid #d1c9bf",
        background: "#fff",
        color: "#6b7280",
        fontSize: "0.8rem",
        cursor: "pointer",
    },
    exportBtn: {
        padding: "6px 14px",
        borderRadius: "7px",
        border: "1px solid #c17f3b",
        background: "transparent",
        color: "#c17f3b",
        fontSize: "0.8125rem",
        fontWeight: 600,
        cursor: "pointer",
    },
    count: {
        fontSize: "0.8rem",
        color: "#9ca3af",
        margin: 0,
    },
    tableWrap: {
        overflowX: "auto",
        background: "#fff",
        borderRadius: "12px",
        border: "1px solid #e9e0d5",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        fontSize: "0.875rem",
    },
    theadRow: {
        borderBottom: "2px solid #f0ebe4",
    },
    th: {
        padding: "12px 16px",
        textAlign: "left" as const,
        fontSize: "0.72rem",
        fontWeight: 700,
        color: "#9ca3af",
        textTransform: "uppercase" as const,
        letterSpacing: "0.05em",
        whiteSpace: "nowrap" as const,
    },
    row: {
        borderBottom: "1px solid #f5f0eb",
        transition: "background 0.1s",
    },
    td: {
        padding: "12px 16px",
        color: "#374151",
        verticalAlign: "middle",
    },
    emptyCell: {
        padding: "2.5rem",
        textAlign: "center" as const,
        color: "#9ca3af",
        fontSize: "0.875rem",
    },
    guestName: {
        fontWeight: 600,
        color: "#1c1009",
    },
    contact: {
        display: "block",
        color: "#374151",
        fontSize: "0.875rem",
    },
    email: {
        display: "block",
        color: "#9ca3af",
        fontSize: "0.75rem",
        marginTop: "2px",
    },
    notes: {
        display: "block",
        color: "#6b7280",
        fontSize: "0.8rem",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        maxWidth: "160px",
    },
    actions: {
        display: "flex",
        gap: "6px",
        alignItems: "center",
        flexWrap: "wrap",
    },
    btnConfirm: {
        padding: "4px 12px",
        borderRadius: "6px",
        border: "none",
        background: "#dcfce7",
        color: "#14532d",
        fontSize: "0.75rem",
        fontWeight: 700,
        cursor: "pointer",
        transition: "background 0.15s",
    },
    btnSeat: {
        padding: "4px 12px",
        borderRadius: "6px",
        border: "none",
        background: "#dbeafe",
        color: "#1e3a5f",
        fontSize: "0.75rem",
        fontWeight: 700,
        cursor: "pointer",
        transition: "background 0.15s",
    },
    btnCancel: {
        padding: "4px 12px",
        borderRadius: "6px",
        border: "none",
        background: "#fee2e2",
        color: "#7f1d1d",
        fontSize: "0.75rem",
        fontWeight: 700,
        cursor: "pointer",
        transition: "background 0.15s",
    },
    pagination: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        paddingTop: "0.5rem",
    },
    pageBtn: {
        padding: "6px 16px",
        borderRadius: "7px",
        border: "1px solid #d1c9bf",
        background: "#fff",
        color: "#1c1009",
        fontSize: "0.8125rem",
        fontWeight: 500,
        cursor: "pointer",
    },
    pageInfo: {
        fontSize: "0.8125rem",
        color: "#6b7280",
    },
};
