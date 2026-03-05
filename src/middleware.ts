import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        // If we get here, the user is already authenticated.
        // Add any additional logic here if needed (e.g., role checks).
        return NextResponse.next();
    },
    {
        callbacks: {
            authorized({ token }) {
                // Allow access to /admin/* only when a valid admin token exists
                return token?.role === "admin";
            },
        },
        pages: {
            signIn: "/admin/login",
        },
    }
);

// Protect all /admin routes except /admin/login itself
export const config = {
    matcher: ["/admin/:path*"],
};
