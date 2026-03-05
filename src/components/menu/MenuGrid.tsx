"use client";

import { useState } from "react";
import type { MenuItem } from "@/lib/types";
import MenuCard from "@/components/MenuCard";

type Category = MenuItem["category"] | "all";

const TABS: { value: Category; label: string }[] = [
    { value: "all", label: "All" },
    { value: "starters", label: "Starters" },
    { value: "mains", label: "Mains" },
    { value: "desserts", label: "Desserts" },
    { value: "drinks", label: "Drinks" },
];

interface MenuGridProps {
    items: MenuItem[];
}

export default function MenuGrid({ items }: MenuGridProps) {
    const [active, setActive] = useState<Category>("all");

    const filtered =
        active === "all" ? items : items.filter((item) => item.category === active);

    return (
        <div>
            {/* ── Filter tabs ── */}
            <div
                role="tablist"
                aria-label="Filter by category"
                className="flex flex-wrap justify-center gap-2 mb-10"
            >
                {TABS.map(({ value, label }) => {
                    const isActive = active === value;
                    return (
                        <button
                            key={value}
                            role="tab"
                            aria-selected={isActive}
                            onClick={() => setActive(value)}
                            className={[
                                "px-5 py-2.5 min-h-[44px] rounded-full font-inter text-sm font-medium tracking-wide transition-all duration-200",
                                isActive
                                    ? "bg-ember text-cream shadow-lg shadow-ember/25"
                                    : "bg-charcoal-light border border-ash/30 text-cream/60 hover:border-ember/40 hover:text-cream",
                            ].join(" ")}
                        >
                            {label}
                        </button>
                    );
                })}
            </div>

            {/* ── Count ── */}
            <p className="text-center font-inter text-xs text-cream/35 tracking-widest uppercase mb-8">
                {filtered.length} {filtered.length === 1 ? "item" : "items"}
                {active !== "all" ? ` in ${active}` : " on the menu"}
            </p>

            {/* ── Grid ── */}
            {filtered.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((item) => (
                        <MenuCard key={item.id} item={item} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 text-cream/30 font-inter text-sm">
                    No items found in this category.
                </div>
            )}
        </div>
    );
}
