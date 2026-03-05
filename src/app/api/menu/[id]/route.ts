import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { isAdminAuthenticated } from "@/lib/auth";
import type { MenuItem } from "@/lib/types";

const VALID_CATEGORIES = ["starters", "mains", "desserts", "drinks"] as const;
type Category = typeof VALID_CATEGORIES[number];

function jsonError(message: string, status: number) {
    return NextResponse.json({ error: message }, { status });
}

// ── PUT /api/menu/[id] ─────────────────────────────────────────────────────
// Partial update — only supplied fields are changed.

export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    if (!(await isAdminAuthenticated())) return jsonError("Unauthorized.", 401);

    const { id } = params;
    if (!id) return jsonError("id is required.", 400);

    let body: Record<string, unknown>;
    try {
        body = await req.json();
    } catch {
        return jsonError("Invalid JSON body.", 400);
    }

    // Build the update payload from whitelisted fields only
    const allowed: (keyof MenuItem)[] = [
        "category", "name", "description", "price", "image_url", "is_available",
    ];
    const update: Partial<Record<keyof MenuItem, unknown>> = {};

    for (const field of allowed) {
        if (field in body) {
            update[field] = body[field];
        }
    }

    if (Object.keys(update).length === 0) {
        return jsonError("No valid fields provided for update.", 400);
    }

    // Validate individual fields if present
    if ("category" in update && !VALID_CATEGORIES.includes(update.category as Category)) {
        return jsonError(
            `category must be one of: ${VALID_CATEGORIES.join(", ")}.`,
            400
        );
    }
    if ("name" in update && (typeof update.name !== "string" || !update.name.trim())) {
        return jsonError("name must be a non-empty string.", 400);
    }
    if ("price" in update) {
        const p = Number(update.price);
        if (isNaN(p) || p < 0) return jsonError("price must be a non-negative number.", 400);
        update.price = p;
    }
    if ("is_available" in update && typeof update.is_available !== "boolean") {
        return jsonError("is_available must be a boolean.", 400);
    }

    // Trim string fields
    if (typeof update.name === "string") update.name = update.name.trim();
    if (typeof update.description === "string") update.description = update.description.trim() || null;
    if (typeof update.image_url === "string") update.image_url = update.image_url.trim() || null;

    const { data, error } = await supabaseAdmin
        .from("menu_items")
        .update(update)
        .eq("id", id)
        .select()
        .single();

    if (error) {
        // PostgREST returns PGRST116 when no row matched
        if (error.code === "PGRST116") {
            return jsonError("Menu item not found.", 404);
        }
        console.error("[menu/PUT] update error:", error);
        return jsonError("Failed to update menu item.", 500);
    }

    return NextResponse.json(data as MenuItem);
}

// ── DELETE /api/menu/[id] ──────────────────────────────────────────────────
// Soft delete: sets is_available = false rather than removing the row.

export async function DELETE(
    _req: NextRequest,
    { params }: { params: { id: string } }
) {
    if (!(await isAdminAuthenticated())) return jsonError("Unauthorized.", 401);

    const { id } = params;
    if (!id) return jsonError("id is required.", 400);

    const { data, error } = await supabaseAdmin
        .from("menu_items")
        .update({ is_available: false })
        .eq("id", id)
        .select("id, name, is_available")
        .single();

    if (error) {
        if (error.code === "PGRST116") {
            return jsonError("Menu item not found.", 404);
        }
        console.error("[menu/DELETE] soft-delete error:", error);
        return jsonError("Failed to delete menu item.", 500);
    }

    return NextResponse.json({
        message: `"${data.name}" has been marked unavailable.`,
        item: data,
    });
}
