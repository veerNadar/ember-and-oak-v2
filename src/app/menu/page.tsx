import { Suspense } from "react";
import { supabase } from "@/lib/supabase";
import type { MenuItem } from "@/lib/types";
import MenuGrid from "@/components/menu/MenuGrid";
import type { Metadata } from "next";

const BASE_URL = "https://www.emberandoak.com";

export const metadata: Metadata = {
    title: "Menu | Ember & Oak",
    description:
        "Explore the Ember & Oak menu — fire-crafted starters, wood-fired mains, house desserts, and hand-crafted drinks. Made with seasonal local ingredients in Austin, TX.",
    keywords: [
        "Ember & Oak menu",
        "Austin restaurant menu",
        "wood fired food Austin",
        "modern American menu Austin TX",
        "fire crafted cuisine",
    ],
    openGraph: {
        title: "Our Menu | Ember & Oak — Fire-Crafted Austin Cuisine",
        description:
            "Starters, wood-fired mains, desserts, and craft drinks. Every dish cooked over open flame with seasonal Texas ingredients.",
        url: `${BASE_URL}/menu`,
        siteName: "Ember & Oak",
        locale: "en_US",
        type: "website",
        images: [
            {
                url: `${BASE_URL}/og-image.jpg`,
                width: 1200,
                height: 630,
                alt: "Ember & Oak Menu — Fire-Crafted Modern American Cuisine",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Menu | Ember & Oak",
        description: "Fire-crafted starters, mains, desserts & drinks made with seasonal Texas ingredients.",
        images: [`${BASE_URL}/og-image.jpg`],
    },
    alternates: {
        canonical: `${BASE_URL}/menu`,
    },
};

// Revalidate every 5 minutes so menu updates appear without a redeploy
export const revalidate = 300;

async function fetchMenuItems(): Promise<MenuItem[]> {
    const { data, error } = await supabase
        .from("menu_items")
        .select("*")
        .order("category")
        .order("name");

    if (error || !data) {
        console.error("Failed to fetch menu items:", error);
        return [];
    }
    return data as MenuItem[];
}

function MenuSkeleton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
                <div
                    key={i}
                    className="bg-charcoal-light border border-ash/20 rounded-sm overflow-hidden animate-pulse"
                >
                    <div className="h-44 bg-ash/20" />
                    <div className="p-5 space-y-3">
                        <div className="flex justify-between gap-3">
                            <div className="h-4 bg-ash/20 rounded w-2/3" />
                            <div className="h-4 bg-ash/20 rounded w-12" />
                        </div>
                        <div className="space-y-1.5">
                            <div className="h-3 bg-ash/20 rounded w-full" />
                            <div className="h-3 bg-ash/20 rounded w-4/5" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

async function MenuContent() {
    const items = await fetchMenuItems();
    return <MenuGrid items={items} />;
}

export default function MenuPage() {
    return (
        <div className="min-h-screen bg-charcoal">
            {/* ── Page header ── */}
            <div className="relative bg-gradient-to-b from-oak/40 to-charcoal pt-16 pb-14 px-6 text-center overflow-hidden">
                {/* Ember radial glow */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_50%_-10%,rgba(200,105,42,0.15),transparent)] pointer-events-none" />

                <p className="font-inter text-xs text-ember font-semibold tracking-[0.2em] uppercase mb-3">
                    Ember &amp; Oak
                </p>
                <h1 className="font-playfair text-5xl md:text-6xl font-bold text-cream mb-5">
                    Our Menu
                </h1>

                {/* Decorative divider */}
                <div className="flex items-center justify-center gap-4 mt-2">
                    <div className="h-px w-16 bg-gradient-to-l from-ember to-transparent" />
                    <div className="w-1.5 h-1.5 rounded-full bg-ember" />
                    <div className="h-px w-16 bg-gradient-to-r from-ember to-transparent" />
                </div>

                <p className="mt-5 font-inter text-base text-cream/55 max-w-xl mx-auto">
                    Every dish is crafted with seasonal ingredients and cooked over
                    open flame. Menus change with the seasons.
                </p>
            </div>

            {/* ── Menu grid ── */}
            <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
                <Suspense fallback={<MenuSkeleton />}>
                    <MenuContent />
                </Suspense>
            </div>
        </div>
    );
}
