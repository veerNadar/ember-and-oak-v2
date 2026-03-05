"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import type { MenuItem } from "@/lib/types";

const CATEGORIES = [
    { value: "starters", label: "Starters" },
    { value: "mains", label: "Mains" },
    { value: "desserts", label: "Desserts" },
    { value: "drinks", label: "Drinks" },
] as const;

type Category = (typeof CATEGORIES)[number]["value"];

interface FormData {
    name: string;
    category: Category;
    description: string;
    price: string;
    image_url: string;
    is_available: boolean;
}

interface MenuItemFormProps {
    initial?: MenuItem | null;
    onSuccess: (item: MenuItem) => void;
    onCancel: () => void;
}

const DEFAULT_FORM: FormData = {
    name: "",
    category: "mains",
    description: "",
    price: "",
    image_url: "",
    is_available: true,
};

export default function MenuItemForm({ initial, onSuccess, onCancel }: MenuItemFormProps) {
    const isEdit = !!initial;

    const [form, setForm] = useState<FormData>(
        initial
            ? {
                name: initial.name,
                category: initial.category as Category,
                description: initial.description ?? "",
                price: String(initial.price),
                image_url: initial.image_url ?? "",
                is_available: initial.is_available,
            }
            : DEFAULT_FORM
    );

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    function set<K extends keyof FormData>(key: K, value: FormData[K]) {
        setForm((f) => ({ ...f, [key]: value }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");

        const price = parseFloat(form.price);
        if (isNaN(price) || price < 0) {
            setError("Price must be a valid positive number.");
            return;
        }

        setLoading(true);

        const payload = {
            name: form.name.trim(),
            category: form.category,
            description: form.description.trim() || null,
            price,
            image_url: form.image_url.trim() || null,
            is_available: form.is_available,
        };

        try {
            const res = await fetch(
                isEdit ? `/api/menu/${initial!.id}` : "/api/menu",
                {
                    method: isEdit ? "PUT" : "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                }
            );

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error ?? "Request failed");
            }

            const data: MenuItem = await res.json();
            onSuccess(data);
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : "Something went wrong.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} style={s.form}>
            {/* Name */}
            <Field label="Item Name *">
                <input
                    style={s.input}
                    required
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    placeholder="e.g. Grilled Salmon"
                />
            </Field>

            {/* Category */}
            <Field label="Category *">
                <select
                    style={s.input}
                    value={form.category}
                    onChange={(e) => set("category", e.target.value as Category)}
                    required
                >
                    {CATEGORIES.map((c) => (
                        <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                </select>
            </Field>

            {/* Description */}
            <Field label="Description">
                <textarea
                    style={{ ...s.input, minHeight: "80px", resize: "vertical" }}
                    value={form.description}
                    onChange={(e) => set("description", e.target.value)}
                    placeholder="A short description of the dish…"
                />
            </Field>

            {/* Price */}
            <Field label="Price ($) *">
                <input
                    style={s.input}
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    value={form.price}
                    onChange={(e) => set("price", e.target.value)}
                    placeholder="18.00"
                />
            </Field>

            {/* Image URL */}
            <Field label="Image URL">
                <input
                    style={s.input}
                    type="url"
                    value={form.image_url}
                    onChange={(e) => set("image_url", e.target.value)}
                    placeholder="https://…"
                />
            </Field>

            {/* Available toggle */}
            <div style={s.toggleRow}>
                <label style={s.toggleLabel} htmlFor="is_available">Available on menu</label>
                <button
                    type="button"
                    id="is_available"
                    role="switch"
                    aria-checked={form.is_available}
                    onClick={() => set("is_available", !form.is_available)}
                    style={{
                        ...s.toggle,
                        background: form.is_available ? "#16a34a" : "#d1d5db",
                    }}
                >
                    <span style={{
                        ...s.toggleThumb,
                        transform: form.is_available ? "translateX(20px)" : "translateX(2px)",
                    }} />
                </button>
            </div>

            {error && <p style={s.error}>{error}</p>}

            {/* Buttons */}
            <div style={s.btnRow}>
                <button type="button" onClick={onCancel} style={s.cancelBtn} disabled={loading}>
                    Cancel
                </button>
                <button
                    type="submit"
                    style={s.submitBtn}
                    disabled={loading}
                    className="flex items-center gap-2"
                >
                    {loading ? (
                        <>
                            <Loader2 size={14} className="animate-spin" />
                            Saving…
                        </>
                    ) : (
                        isEdit ? "Save Changes" : "Add Item"
                    )}
                </button>
            </div>

            <style>{`
                input[type=number]::-webkit-inner-spin-button { opacity: 0.6; }
                input:focus, select:focus, textarea:focus {
                    outline: none;
                    border-color: #c17f3b !important;
                    box-shadow: 0 0 0 3px rgba(193,127,59,0.15);
                }
                button:disabled { opacity: 0.6; cursor: not-allowed !important; }
            `}</style>
        </form>
    );
}

// ── Small label wrapper ───────────────────────────────────────────────────────

function Field({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{
                fontSize: "0.78rem", fontWeight: 600, color: "#6b7280",
                textTransform: "uppercase", letterSpacing: "0.04em"
            }}>
                {label}
            </label>
            {children}
        </div>
    );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const s: Record<string, React.CSSProperties> = {
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "1.1rem",
        fontFamily: "'Inter', sans-serif",
    },
    input: {
        padding: "0.6rem 0.875rem",
        borderRadius: "8px",
        border: "1px solid #d1c9bf",
        fontSize: "0.9rem",
        color: "#1c1009",
        background: "#faf7f4",
        transition: "border-color 0.2s, box-shadow 0.2s",
        width: "100%",
        boxSizing: "border-box",
        fontFamily: "inherit",
    },
    toggleRow: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0.5rem 0",
    },
    toggleLabel: {
        fontSize: "0.9rem",
        fontWeight: 500,
        color: "#374151",
    },
    toggle: {
        width: "44px",
        height: "24px",
        borderRadius: "12px",
        border: "none",
        cursor: "pointer",
        position: "relative",
        transition: "background 0.2s",
        padding: 0,
        flexShrink: 0,
    },
    toggleThumb: {
        position: "absolute",
        top: "2px",
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        background: "#fff",
        transition: "transform 0.2s",
        boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
    },
    error: {
        background: "#fee2e2",
        border: "1px solid #fca5a5",
        borderRadius: "8px",
        padding: "0.6rem 0.875rem",
        color: "#7f1d1d",
        fontSize: "0.875rem",
        margin: 0,
    },
    btnRow: {
        display: "flex",
        gap: "0.75rem",
        justifyContent: "flex-end",
        paddingTop: "0.25rem",
    },
    cancelBtn: {
        padding: "0.6rem 1.25rem",
        borderRadius: "8px",
        border: "1px solid #d1c9bf",
        background: "#fff",
        color: "#374151",
        fontSize: "0.875rem",
        fontWeight: 500,
        cursor: "pointer",
    },
    submitBtn: {
        padding: "0.6rem 1.5rem",
        borderRadius: "8px",
        border: "none",
        background: "#c17f3b",
        color: "#fff",
        fontSize: "0.875rem",
        fontWeight: 600,
        cursor: "pointer",
        transition: "background 0.15s",
    },
};
