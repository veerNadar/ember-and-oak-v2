import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { isAdminAuthenticated } from "@/lib/auth";

const VALID_STATUSES = ["pending", "confirmed", "cancelled", "seated"] as const;
type ValidStatus = (typeof VALID_STATUSES)[number];

function jsonError(message: string, status: number) {
    return NextResponse.json({ error: message }, { status });
}

// ── PATCH /api/reservations/[id] ───────────────────────────────────────────
// Body: { status: "pending" | "confirmed" | "cancelled" | "seated" }

export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    // Auth guard — must be signed-in admin
    if (!(await isAdminAuthenticated())) {
        return jsonError("Unauthorized.", 401);
    }

    const { id } = params;
    if (!id) return jsonError("Missing reservation id.", 400);

    let body: { status?: unknown };
    try {
        body = await req.json();
    } catch {
        return jsonError("Invalid JSON body.", 400);
    }

    const { status } = body;

    if (!status || !VALID_STATUSES.includes(status as ValidStatus)) {
        return jsonError(
            `status must be one of: ${VALID_STATUSES.join(", ")}.`,
            400
        );
    }

    const { data, error } = await supabaseAdmin
        .from("reservations")
        .update({ status })
        .eq("id", id)
        .select()
        .single();

    if (error) {
        // Row not found
        if (error.code === "PGRST116") return jsonError("Reservation not found.", 404);
        console.error("[reservations/PATCH] update error:", error);
        return jsonError("Failed to update reservation.", 500);
    }

    return NextResponse.json(data);
}
