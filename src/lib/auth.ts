import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getServerSession } from "next-auth";

// NOTE: Plain-text password comparison used during local development on Windows.
// The $ characters in bcrypt hashes are corrupted by PowerShell / Next.js's
// dotenv parser when unquoted. Replace with bcrypt before deploying to production.

// ── Auth options ───────────────────────────────────────────────────────────

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) {
                    console.log("[auth] authorize: missing credentials");
                    return null;
                }

                const adminUsername = process.env.ADMIN_USERNAME;
                const adminPassword = process.env.ADMIN_PASSWORD;

                // ── DEBUG ──────────────────────────────────────────────────
                console.log("[auth] ADMIN_USERNAME set:", !!adminUsername, "| value:", adminUsername);
                console.log("[auth] ADMIN_PASSWORD set:", !!adminPassword);
                console.log("[auth] credentials.username:", credentials.username);
                // ──────────────────────────────────────────────────────────

                if (!adminUsername || !adminPassword) {
                    console.error("[auth] ADMIN_USERNAME or ADMIN_PASSWORD is not set in environment.");
                    return null;
                }

                // Username check (case-insensitive)
                const usernameMatch =
                    credentials.username.toLowerCase() === adminUsername.toLowerCase();
                console.log("[auth] username match:", usernameMatch);
                if (!usernameMatch) return null;

                // Password check — plain comparison (dev only)
                const passwordMatch = credentials.password === adminPassword;
                console.log("[auth] password match:", passwordMatch);
                if (!passwordMatch) return null;

                // Return a minimal user object — stored in the JWT
                return {
                    id: "admin",
                    name: "Admin",
                    role: "admin",
                };
            },

        }),
    ],

    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60, // 24 hours in seconds
    },

    jwt: {
        maxAge: 24 * 60 * 60,
    },

    callbacks: {
        async jwt({ token, user }) {
            if (user) token.role = user.role;
            return token;
        },
        async session({ session, token }) {
            if (session.user) session.user.role = token.role;
            return session;
        },
    },

    pages: {
        signIn: "/admin/login",
    },

    secret: process.env.NEXTAUTH_SECRET,
};

// ── Helper: check admin session in API routes ──────────────────────────────

/**
 * Returns true if the incoming request carries a valid admin JWT session.
 * Use this in API route handlers that need to restrict access to admins.
 *
 * @example
 * if (!(await isAdminAuthenticated(req))) {
 *   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
 * }
 */
export async function isAdminAuthenticated(): Promise<boolean> {
    const session = await getServerSession(authOptions);
    return session?.user?.role === "admin";
}
