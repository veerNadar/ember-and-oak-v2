import { NextRequest, NextResponse } from "next/server";
import { supabase, supabaseAdmin } from "@/lib/supabase";
import type { MenuItem } from "@/lib/types";

const VALID_CATEGORIES = ["starters", "mains", "desserts", "drinks"] as const;
type Category = typeof VALID_CATEGORIES[number];

function jsonError(message: string, status: number) {
    return NextResponse.json({ error: message }, { status });
}

// ── GET /api/menu ──────────────────────────────────────────────────────────
// Query params: category (starters|mains|desserts|drinks)

export async function GET(req: NextRequest) {
    const { searchParams } = req.nextUrl;
    const categoryParam = searchParams.get("category");

    if (categoryParam && !VALID_CATEGORIES.includes(categoryParam as Category)) {
        return jsonError(
            `category must be one of: ${VALID_CATEGORIES.join(", ")}.`,
            400
        );
    }

    let query = supabase
        .from("menu_items")
        .select("*")
        .eq("is_available", true)
        .order("category")
        .order("name");

    if (categoryParam) {
        query = query.eq("category", categoryParam as Category);
    }

    const { data, error } = await query;

    if (error) {
        console.error("[menu/GET] query error:", error);
        return jsonError("Failed to fetch menu items.", 500);
    }

    return NextResponse.json(data as MenuItem[]);
}

// ── POST /api/menu ─────────────────────────────────────────────────────────
// Admin only — creates a new menu item.

interface MenuItemBody {
    category?: unknown;
    name?: unknown;
    description?: unknown;
    price?: unknown;
    image_url?: unknown;
    is_available?: unknown;
}

export async function POST(req: NextRequest) {
    let body: MenuItemBody;

    try {
        body = await req.json();
    } catch {
        return jsonError("Invalid JSON body.", 400);
    }

    const { category, name, description, price, image_url, is_available } = body;

    // Required field validation
    if (!category || !VALID_CATEGORIES.includes(category as Category)) {
        return jsonError(
            `category is required and must be one of: ${VALID_CATEGORIES.join(", ")}.`,
            400
        );
    }
    if (!name || typeof name !== "string" || !name.trim()) {
        return jsonError("name is required.", 400);
    }

    const priceNum = Number(price);
    if (price === undefined || price === null || isNaN(priceNum) || priceNum < 0) {
        return jsonError("price is required and must be a non-negative number.", 400);
    }

    const payload = {
        category: category as Category,
        name: (name as string).trim(),
        description: typeof description === "string" && description.trim() ? description.trim() : null,
        price: priceNum,
        image_url: typeof image_url === "string" && image_url.trim() ? image_url.trim() : null,
        is_available: typeof is_available === "boolean" ? is_available : true,
    };

    const { data, error } = await supabaseAdmin
        .from("menu_items")
        .insert(payload)
        .select()
        .single();

    if (error || !data) {
        console.error("[menu/POST] insert error:", error);
        return jsonError("Failed to create menu item.", 500);
    }

    return NextResponse.json(data as MenuItem, { status: 201 });
}
