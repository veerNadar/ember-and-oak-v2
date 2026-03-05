"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Flame, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
    const router = useRouter();
    const { data: session, status } = useSession();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Redirect if already authenticated
    useEffect(() => {
        if (status === "authenticated" && session?.user?.role === "admin") {
            router.replace("/admin/dashboard");
        }
    }, [status, session, router]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);

        const result = await signIn("credentials", {
            username,
            password,
            redirect: false,
        });

        setLoading(false);

        if (result?.error) {
            setError("Invalid credentials. Please try again.");
        } else {
            router.push("/admin/dashboard");
        }
    }

    // Show nothing while checking session to avoid flash
    if (status === "loading" || (status === "authenticated")) {
        return (
            <div style={styles.page}>
                <Loader2 size={32} style={{ color: "#c17f3b", animation: "spin 1s linear infinite" }} />
            </div>
        );
    }

    return (
        <div style={styles.page}>
            <div style={styles.card}>
                {/* Logo / Brand */}
                <div style={styles.brand}>
                    <Flame size={28} style={{ color: "#c17f3b" }} />
                    <span style={styles.brandText}>Ember &amp; Oak</span>
                </div>
                <h1 style={styles.title}>Admin Portal</h1>
                <p style={styles.subtitle}>Sign in to manage your restaurant</p>

                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.field}>
                        <label htmlFor="username" style={styles.label}>
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            autoComplete="username"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={styles.input}
                            placeholder="admin"
                        />
                    </div>

                    <div style={styles.field}>
                        <label htmlFor="password" style={styles.label}>
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={styles.input}
                            placeholder="••••••••"
                        />
                    </div>

                    {error && <p style={styles.error}>{error}</p>}

                    <button type="submit" disabled={loading} style={styles.button}>
                        {loading ? (
                            <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} />
                        ) : (
                            "Sign In"
                        )}
                    </button>
                </form>
            </div>

            <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        input::placeholder { color: #6b7280; }
        input:focus {
          outline: none;
          border-color: #c17f3b !important;
          box-shadow: 0 0 0 3px rgba(193,127,59,0.18);
        }
        button:hover:not(:disabled) { background: #a86d2e !important; }
        button:disabled { opacity: 0.6; cursor: not-allowed; }
      `}</style>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    page: {
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0f0f0f 0%, #1a1208 50%, #0f0f0f 100%)",
        padding: "1rem",
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
    },
    card: {
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "16px",
        padding: "2.5rem 2rem",
        width: "100%",
        maxWidth: "400px",
        backdropFilter: "blur(12px)",
        boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
    },
    brand: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        marginBottom: "1.25rem",
    },
    brandText: {
        fontSize: "1.1rem",
        fontWeight: 600,
        color: "#c17f3b",
        letterSpacing: "0.02em",
    },
    title: {
        fontSize: "1.6rem",
        fontWeight: 700,
        color: "#f5f0eb",
        margin: "0 0 0.25rem",
    },
    subtitle: {
        fontSize: "0.875rem",
        color: "#9ca3af",
        margin: "0 0 2rem",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
    },
    field: {
        display: "flex",
        flexDirection: "column",
        gap: "0.4rem",
    },
    label: {
        fontSize: "0.8125rem",
        fontWeight: 600,
        color: "#d1c9bf",
        letterSpacing: "0.04em",
        textTransform: "uppercase",
    },
    input: {
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: "8px",
        padding: "0.75rem 1rem",
        fontSize: "0.9375rem",
        color: "#f5f0eb",
        transition: "border-color 0.2s, box-shadow 0.2s",
    },
    error: {
        background: "rgba(239,68,68,0.12)",
        border: "1px solid rgba(239,68,68,0.3)",
        borderRadius: "8px",
        padding: "0.625rem 0.875rem",
        fontSize: "0.875rem",
        color: "#fca5a5",
        margin: "0",
    },
    button: {
        background: "#c17f3b",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        padding: "0.825rem",
        fontSize: "0.9375rem",
        fontWeight: 600,
        cursor: "pointer",
        transition: "background 0.2s",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5rem",
        marginTop: "0.25rem",
    },
};
