import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import type { Reservation } from "@/lib/types";

// ── Helpers ────────────────────────────────────────────────────────────────

function jsonError(message: string, status: number) {
    return NextResponse.json({ error: message }, { status });
}

function isValidDate(dateStr: string): boolean {
    const d = new Date(dateStr);
    return !isNaN(d.getTime()) && /^\d{4}-\d{2}-\d{2}$/.test(dateStr);
}

// ── Types ──────────────────────────────────────────────────────────────────

interface ReservationBody {
    customer_name: unknown;
    phone: unknown;
    email?: unknown;
    date: unknown;
    time: unknown;
    party_size: unknown;
    notes?: unknown;
}

// ── POST /api/reservations ─────────────────────────────────────────────────

export async function POST(req: NextRequest) {
    let body: ReservationBody;

    try {
        body = await req.json();
    } catch {
        return jsonError("Invalid JSON body.", 400);
    }

    // ── Field presence validation ──────────────────────────────────────────
    const { customer_name, phone, email, date, time, party_size, notes } = body;

    if (!customer_name || typeof customer_name !== "string" || !customer_name.trim()) {
        return jsonError("customer_name is required.", 400);
    }
    if (!phone || typeof phone !== "string" || !phone.trim()) {
        return jsonError("phone is required.", 400);
    }
    if (!date || typeof date !== "string") {
        return jsonError("date is required (YYYY-MM-DD).", 400);
    }
    if (!time || typeof time !== "string" || !time.trim()) {
        return jsonError("time is required.", 400);
    }
    if (party_size === undefined || party_size === null) {
        return jsonError("party_size is required.", 400);
    }

    // ── Date validation ────────────────────────────────────────────────────
    if (!isValidDate(date)) {
        return jsonError("date must be a valid date in YYYY-MM-DD format.", 400);
    }

    // Compare date-only (no time component) against today in UTC
    const today = new Date().toISOString().split("T")[0];
    if (date < today) {
        return jsonError("date cannot be in the past.", 400);
    }

    // ── Party size validation ──────────────────────────────────────────────
    const partySizeNum = Number(party_size);
    if (!Number.isInteger(partySizeNum) || partySizeNum < 1 || partySizeNum > 10) {
        return jsonError("party_size must be an integer between 1 and 10.", 400);
    }

    // ── Conflict check: max 5 reservations per date+time slot ─────────────
    const { count, error: countError } = await supabaseAdmin
        .from("reservations")
        .select("id", { count: "exact", head: true })
        .eq("date", date)
        .eq("time", time)
        .neq("status", "cancelled");

    if (countError) {
        console.error("[reservations/POST] conflict check error:", countError);
        return jsonError("Internal server error.", 500);
    }

    if ((count ?? 0) >= 5) {
        return jsonError(
            "This time slot is fully booked. Please choose another time.",
            409
        );
    }

    // ── Insert ─────────────────────────────────────────────────────────────
    const payload = {
        customer_name: customer_name.trim(),
        phone: (phone as string).trim(),
        email: typeof email === "string" && email.trim() ? email.trim() : null,
        date,
        time: (time as string).trim(),
        party_size: partySizeNum,
        notes: typeof notes === "string" && notes.trim() ? notes.trim() : null,
        status: "pending" as const,
    };

    const { data, error: insertError } = await supabaseAdmin
        .from("reservations")
        .insert(payload)
        .select()
        .single();

    if (insertError || !data) {
        console.error("[reservations/POST] insert error:", insertError);
        return jsonError("Failed to create reservation.", 500);
    }

    return NextResponse.json(data as Reservation, { status: 201 });
}

// ── GET /api/reservations ──────────────────────────────────────────────────
// Query params: status (pending|confirmed|cancelled|seated), date (YYYY-MM-DD)

export async function GET(req: NextRequest) {
    const { searchParams } = req.nextUrl;
    const statusParam = searchParams.get("status");
    const dateParam = searchParams.get("date");

    // Validate query params
    const VALID_STATUSES = ["pending", "confirmed", "cancelled", "seated"] as const;
    type ValidStatus = typeof VALID_STATUSES[number];

    if (statusParam && !VALID_STATUSES.includes(statusParam as ValidStatus)) {
        return jsonError(
            `status must be one of: ${VALID_STATUSES.join(", ")}.`,
            400
        );
    }
    if (dateParam && !isValidDate(dateParam)) {
        return jsonError("date must be a valid date in YYYY-MM-DD format.", 400);
    }

    let query = supabaseAdmin
        .from("reservations")
        .select("*")
        .order("date", { ascending: true })
        .order("time", { ascending: true });

    if (statusParam) query = query.eq("status", statusParam);
    if (dateParam) query = query.eq("date", dateParam);

    const { data, error } = await query;

    if (error) {
        console.error("[reservations/GET] query error:", error);
        return jsonError("Failed to fetch reservations.", 500);
    }

    return NextResponse.json(data as Reservation[]);
}
