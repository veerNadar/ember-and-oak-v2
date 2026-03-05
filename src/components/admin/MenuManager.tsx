"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import type { MenuItem } from "@/lib/types";
import Modal from "@/components/admin/Modal";
import MenuItemForm from "@/components/admin/MenuItemForm";

// ── Constants ─────────────────────────────────────────────────────────────────

const CATEGORIES = [
    { value: "all", label: "All" },
    { value: "starters", label: "Starters" },
    { value: "mains", label: "Mains" },
    { value: "desserts", label: "Desserts" },
    { value: "drinks", label: "Drinks" },
] as const;

type CategoryFilter = (typeof CATEGORIES)[number]["value"];

// ── Helpers ───────────────────────────────────────────────────────────────────

const PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='240' viewBox='0 0 400 240'%3E%3Crect fill='%23f0ebe4' width='400' height='240'/%3E%3Ctext fill='%23c9b99a' font-family='sans-serif' font-size='48' text-anchor='middle' dominant-baseline='middle' x='200' y='120'%3E🍽%3C/text%3E%3C/svg%3E";

// ── MenuManager ───────────────────────────────────────────────────────────────

export default function MenuManager({ initialItems }: { initialItems: MenuItem[] }) {
    const [items, setItems] = useState<MenuItem[]>(initialItems);
    const [category, setCategory] = useState<CategoryFilter>("all");
    const [modalOpen, setModalOpen] = useState(false);
    const [editItem, setEditItem] = useState<MenuItem | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<MenuItem | null>(null);
    const [busyId, setBusyId] = useState<string | null>(null);

    // ── Filtered list ────────────────────────────────────────────────────────

    const filtered = useMemo(
        () => category === "all" ? items : items.filter((i) => i.category === category),
        [items, category]
    );

    // ── Open add / edit modal ─────────────────────────────────────────────────

    function openAdd() { setEditItem(null); setModalOpen(true); }
    function openEdit(it: MenuItem) { setEditItem(it); setModalOpen(true); }
    function closeModal() { setModalOpen(false); setEditItem(null); }

    // ── Form success callback ─────────────────────────────────────────────────

    function handleFormSuccess(saved: MenuItem) {
        setItems((prev) => {
            const exists = prev.find((i) => i.id === saved.id);
            return exists
                ? prev.map((i) => (i.id === saved.id ? saved : i))
                : [saved, ...prev];
        });
        toast.success(editItem ? "Item updated!" : "Item added!");
        closeModal();
    }

    // ── Toggle availability ───────────────────────────────────────────────────

    async function toggleAvailability(item: MenuItem) {
        setBusyId(item.id);
        const next = !item.is_available;

        // Optimistic
        setItems((prev) =>
            prev.map((i) => (i.id === item.id ? { ...i, is_available: next } : i))
        );

        try {
            const res = await fetch(`/api/menu/${item.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ is_available: next }),
            });
            if (!res.ok) throw new Error((await res.json()).error ?? "Update failed");
            toast.success(next ? `"${item.name}" is now available.` : `"${item.name}" hidden from menu.`);
        } catch (e: unknown) {
            // Rollback
            setItems((prev) =>
                prev.map((i) => (i.id === item.id ? { ...i, is_available: item.is_available } : i))
            );
            toast.error(e instanceof Error ? e.message : "Failed to update.");
        } finally {
            setBusyId(null);
        }
    }

    // ── Delete ────────────────────────────────────────────────────────────────

    async function confirmDelete() {
        if (!deleteTarget) return;
        const id = deleteTarget.id;
        const name = deleteTarget.name;
        setDeleteTarget(null);
        setBusyId(id);

        // Optimistic removal
        setItems((prev) => prev.filter((i) => i.id !== id));

        try {
            const res = await fetch(`/api/menu/${id}`, { method: "DELETE" });
            if (!res.ok && res.status !== 204) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err.error ?? "Delete failed");
            }
            toast.success(`"${name}" removed.`);
        } catch (e: unknown) {
            // Rollback
            setItems(initialItems);
            toast.error(e instanceof Error ? e.message : "Failed to delete.");
        } finally {
            setBusyId(null);
        }
    }

    // ── Render ────────────────────────────────────────────────────────────────

    return (
        <div style={s.page}>
            {/* ── Top bar ── */}
            <div style={s.topBar}>
                {/* Category tabs */}
                <div style={s.tabs}>
                    {CATEGORIES.map((c) => (
                        <button
                            key={c.value}
                            onClick={() => setCategory(c.value)}
                            style={{ ...s.tab, ...(category === c.value ? s.tabActive : {}) }}
                        >
                            {c.label}
                        </button>
                    ))}
                </div>

                <button style={s.addBtn} onClick={openAdd}>
                    <Plus size={16} /> Add New Item
                </button>
            </div>

            <p style={s.count}>{filtered.length} item{filtered.length !== 1 ? "s" : ""}</p>

            {/* ── Card grid ── */}
            {filtered.length === 0 ? (
                <div style={s.empty}>No items in this category yet.</div>
            ) : (
                <div style={s.grid}>
                    {filtered.map((item) => (
                        <div
                            key={item.id}
                            style={{
                                ...s.card,
                                opacity: item.is_available ? 1 : 0.6,
                            }}
                        >
                            {/* Image */}
                            <div style={s.imgWrap}>
                                <Image
                                    src={item.image_url || PLACEHOLDER}
                                    alt={item.name}
                                    fill
                                    sizes="(max-width: 640px) 100vw, 340px"
                                    style={{ objectFit: "cover" }}
                                    unoptimized={!item.image_url}
                                    onError={(e) => {
                                        (e.currentTarget as HTMLImageElement).src = PLACEHOLDER;
                                    }}
                                />
                                {/* Unavailable overlay */}
                                {!item.is_available && (
                                    <div style={s.unavailableOverlay}>Hidden</div>
                                )}
                                {/* Action overlay */}
                                <div style={s.overlay}>
                                    <button
                                        style={s.overlayBtn}
                                        title="Edit"
                                        onClick={() => openEdit(item)}
                                    >
                                        <Pencil size={15} />
                                    </button>
                                    <button
                                        style={{ ...s.overlayBtn, background: "rgba(239,68,68,0.85)" }}
                                        title="Delete"
                                        onClick={() => setDeleteTarget(item)}
                                        disabled={busyId === item.id}
                                    >
                                        <Trash2 size={15} />
                                    </button>
                                </div>
                            </div>

                            {/* Body */}
                            <div style={s.body}>
                                <div style={s.bodyTop}>
                                    <span style={s.categoryTag}>{item.category}</span>
                                    <span style={s.price}>${item.price.toFixed(2)}</span>
                                </div>
                                <h3 style={s.name}>{item.name}</h3>
                                {item.description && (
                                    <p style={s.desc}>{item.description}</p>
                                )}

                                {/* Toggle availability */}
                                <button
                                    style={{
                                        ...s.toggleBtn,
                                        ...(item.is_available ? s.toggleBtnOn : s.toggleBtnOff),
                                    }}
                                    onClick={() => toggleAvailability(item)}
                                    disabled={busyId === item.id}
                                >
                                    {item.is_available
                                        ? <><Eye size={13} /> Available</>
                                        : <><EyeOff size={13} /> Hidden</>}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* ── Add / Edit Modal ── */}
            <Modal
                open={modalOpen}
                onClose={closeModal}
                title={editItem ? `Edit — ${editItem.name}` : "Add New Menu Item"}
            >
                <MenuItemForm
                    initial={editItem}
                    onSuccess={handleFormSuccess}
                    onCancel={closeModal}
                />
            </Modal>

            {/* ── Delete Confirmation Modal ── */}
            <Modal
                open={!!deleteTarget}
                onClose={() => setDeleteTarget(null)}
                title="Confirm Delete"
                maxWidth={420}
            >
                <div style={s.deleteBody}>
                    <p style={s.deleteText}>
                        Are you sure you want to remove <strong>{deleteTarget?.name}</strong>?
                        This cannot be undone.
                    </p>
                    <div style={s.deleteBtns}>
                        <button
                            style={s.cancelDeleteBtn}
                            onClick={() => setDeleteTarget(null)}
                        >
                            Cancel
                        </button>
                        <button style={s.confirmDeleteBtn} onClick={confirmDelete}>
                            Delete
                        </button>
                    </div>
                </div>
            </Modal>

            <style>{`
                button:disabled { opacity: 0.5 !important; cursor: not-allowed !important; }
                div[data-card]:hover div[data-overlay] { opacity: 1 !important; }
                /* 44px tap targets for admin tab buttons */
                .admin-tab-btn { min-height: 44px !important; }
                /* Stack topbar vertically on small screens */
                @media (max-width: 480px) {
                    .admin-topbar { flex-direction: column !important; align-items: stretch !important; }
                    .admin-topbar > div:first-child { flex: unset !important; }
                    .admin-add-btn { width: 100% !important; justify-content: center !important; }
                    .admin-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </div>
    );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const s: Record<string, React.CSSProperties> = {
    page: { display: "flex", flexDirection: "column", gap: "1rem", fontFamily: "'Inter', sans-serif" },
    topBar: { display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" },
    tabs: { display: "flex", gap: "4px", background: "#f0ebe4", borderRadius: "8px", padding: "3px", flex: 1, flexWrap: "wrap" },
    tab: {
        padding: "6px 14px", borderRadius: "6px", border: "none", background: "transparent",
        fontSize: "0.8125rem", fontWeight: 500, color: "#6b7280", cursor: "pointer", transition: "background 0.15s, color 0.15s"
    },
    tabActive: { background: "#fff", color: "#1c1009", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", fontWeight: 700 },
    addBtn: {
        display: "flex", alignItems: "center", gap: "6px", padding: "8px 18px",
        borderRadius: "8px", border: "none", background: "#c17f3b", color: "#fff",
        fontSize: "0.875rem", fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap"
    },
    count: { fontSize: "0.8rem", color: "#9ca3af", margin: 0 },
    grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.25rem" },
    empty: {
        textAlign: "center", padding: "3rem", color: "#9ca3af", background: "#fff",
        borderRadius: "12px", border: "1px solid #e9e0d5", fontSize: "0.9rem"
    },
    card: {
        background: "#fff", borderRadius: "12px", border: "1px solid #e9e0d5",
        overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        transition: "opacity 0.2s, box-shadow 0.2s", display: "flex", flexDirection: "column"
    },
    imgWrap: { position: "relative", height: "180px", background: "#f5f0eb", overflow: "hidden" },
    unavailableOverlay: {
        position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "#fff", fontWeight: 700, fontSize: "0.875rem", letterSpacing: "0.1em",
        textTransform: "uppercase"
    },
    overlay: {
        position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)",
        display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
        opacity: 0, transition: "opacity 0.2s"
    },
    overlayBtn: {
        padding: "8px", borderRadius: "8px", border: "none", background: "rgba(0,0,0,0.7)",
        color: "#fff", cursor: "pointer", display: "flex", alignItems: "center",
        transition: "background 0.15s"
    },
    body: { padding: "1rem", display: "flex", flexDirection: "column", gap: "6px", flex: 1 },
    bodyTop: { display: "flex", alignItems: "center", justifyContent: "space-between" },
    categoryTag: {
        fontSize: "0.7rem", fontWeight: 700, color: "#c17f3b", textTransform: "uppercase",
        letterSpacing: "0.06em", background: "#fef3e2", padding: "2px 8px", borderRadius: "999px"
    },
    price: { fontSize: "1rem", fontWeight: 700, color: "#1c1009" },
    name: { margin: "2px 0 0", fontSize: "0.9375rem", fontWeight: 700, color: "#1c1009" },
    desc: {
        margin: 0, fontSize: "0.8rem", color: "#6b7280", display: "-webkit-box",
        WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden"
    },
    toggleBtn: {
        display: "flex", alignItems: "center", gap: "5px", padding: "5px 12px",
        borderRadius: "999px", border: "none", fontSize: "0.75rem", fontWeight: 600,
        cursor: "pointer", marginTop: "auto", transition: "background 0.15s", alignSelf: "flex-start"
    },
    toggleBtnOn: { background: "#dcfce7", color: "#14532d" },
    toggleBtnOff: { background: "#f3f4f6", color: "#6b7280" },
    deleteBody: { fontFamily: "'Inter', sans-serif", display: "flex", flexDirection: "column", gap: "1.5rem" },
    deleteText: { margin: 0, fontSize: "0.9375rem", color: "#374151", lineHeight: 1.6 },
    deleteBtns: { display: "flex", gap: "0.75rem", justifyContent: "flex-end" },
    cancelDeleteBtn: {
        padding: "0.6rem 1.25rem", borderRadius: "8px", border: "1px solid #d1c9bf",
        background: "#fff", color: "#374151", fontSize: "0.875rem", fontWeight: 500, cursor: "pointer"
    },
    confirmDeleteBtn: {
        padding: "0.6rem 1.25rem", borderRadius: "8px", border: "none",
        background: "#ef4444", color: "#fff", fontSize: "0.875rem", fontWeight: 600, cursor: "pointer"
    },
};
