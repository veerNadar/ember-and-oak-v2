"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
    return (
        <Toaster
            position="top-right"
            toastOptions={{
                duration: 4000,
                style: {
                    background: "#2E2E2E",   // charcoal-light
                    color: "#F5F0E8",        // cream
                    border: "1px solid #4A4A4A",
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: "0.875rem",
                    borderRadius: "2px",
                },
                success: {
                    iconTheme: {
                        primary: "#C8692A",   // ember
                        secondary: "#F5F0E8",
                    },
                },
                error: {
                    iconTheme: {
                        primary: "#ef4444",
                        secondary: "#F5F0E8",
                    },
                },
            }}
        />
    );
}
