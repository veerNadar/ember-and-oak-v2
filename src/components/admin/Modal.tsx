"use client";

import { useEffect, useCallback } from "react";
import { X } from "lucide-react";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    maxWidth?: number;
}

export default function Modal({
    open,
    onClose,
    title,
    children,
    maxWidth = 520,
}: ModalProps) {
    // Close on Escape
    const handleKey = useCallback(
        (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); },
        [onClose]
    );

    useEffect(() => {
        if (!open) return;
        document.addEventListener("keydown", handleKey);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", handleKey);
            document.body.style.overflow = "";
        };
    }, [open, handleKey]);

    if (!open) return null;

    return (
        <div style={s.backdrop} onClick={onClose} aria-modal="true" role="dialog">
            <div
                style={{ ...s.panel, maxWidth }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div style={s.header}>
                    <h2 style={s.title}>{title}</h2>
                    <button style={s.closeBtn} onClick={onClose} aria-label="Close modal">
                        <X size={18} />
                    </button>
                </div>

                {/* Body */}
                <div style={s.body}>{children}</div>
            </div>

            <style>{`
                @keyframes fadeIn  { from { opacity: 0 } to { opacity: 1 } }
                @keyframes slideUp { from { transform: translateY(24px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
            `}</style>
        </div>
    );
}

const s: Record<string, React.CSSProperties> = {
    backdrop: {
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.55)",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        animation: "fadeIn 0.15s ease",
    },
    panel: {
        background: "#fff",
        borderRadius: "14px",
        width: "100%",
        boxShadow: "0 24px 64px rgba(0,0,0,0.25)",
        animation: "slideUp 0.2s ease",
        overflow: "hidden",
    },
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1.25rem 1.5rem",
        borderBottom: "1px solid #f0ebe4",
    },
    title: {
        margin: 0,
        fontSize: "1.05rem",
        fontWeight: 700,
        color: "#1c1009",
        fontFamily: "'Inter', sans-serif",
    },
    closeBtn: {
        background: "none",
        border: "none",
        color: "#9ca3af",
        cursor: "pointer",
        padding: "4px",
        display: "flex",
        alignItems: "center",
        borderRadius: "6px",
        transition: "background 0.15s, color 0.15s",
    },
    body: {
        padding: "1.5rem",
        maxHeight: "80vh",
        overflowY: "auto",
    },
};
