import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { MenuItem } from "@/lib/types";

async function fetchFeaturedDishes(): Promise<MenuItem[]> {
    const { data, error } = await supabase
        .from("menu_items")
        .select("*")
        .eq("category", "mains")
        .eq("is_available", true)
        .limit(3);

    if (error || !data) return [];
    return data as MenuItem[];
}

// Elegant gradient placeholders keyed by index
const CARD_GRADIENTS = [
    "from-oak via-charcoal to-oak-dark",
    "from-charcoal via-oak-light to-charcoal-light",
    "from-oak-dark via-charcoal to-oak",
];

const CARD_ACCENTS = [
    "after:from-ember/20 after:to-transparent",
    "after:from-oak/30 after:to-transparent",
    "after:from-ember/15 after:to-transparent",
];

export default async function FeaturedDishes() {
    const dishes = await fetchFeaturedDishes();

    if (dishes.length === 0) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {dishes.map((dish, i) => (
                <article
                    key={dish.id}
                    className="group relative bg-charcoal-light rounded-sm overflow-hidden border border-ash/20 hover:border-ember/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-ember/10"
                >
                    {/* Image placeholder */}
                    <div
                        className={`relative h-52 bg-gradient-to-br ${CARD_GRADIENTS[i % 3]} overflow-hidden`}
                    >
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="font-playfair text-4xl text-cream/10 select-none">
                                ✦
                            </span>
                        </div>
                        {/* Subtle ember shimmer on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-3">
                        <div className="flex items-start justify-between gap-4">
                            <h3 className="font-playfair text-lg font-semibold text-cream leading-snug group-hover:text-ember-light transition-colors duration-200">
                                {dish.name}
                            </h3>
                            <span className="shrink-0 font-inter text-base font-semibold text-ember">
                                ${Number(dish.price).toFixed(2)}
                            </span>
                        </div>
                        {dish.description && (
                            <p className="font-inter text-sm text-cream/60 leading-relaxed line-clamp-3">
                                {dish.description}
                            </p>
                        )}
                    </div>

                    {/* Bottom ember line on hover */}
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-ember scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </article>
            ))}
        </div>
    );
}

export function FeaturedDishesSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[0, 1, 2].map((i) => (
                <div
                    key={i}
                    className="bg-charcoal-light rounded-sm overflow-hidden border border-ash/20 animate-pulse"
                >
                    <div className="h-52 bg-ash/20" />
                    <div className="p-6 space-y-3">
                        <div className="flex justify-between gap-4">
                            <div className="h-5 bg-ash/20 rounded w-3/4" />
                            <div className="h-5 bg-ash/20 rounded w-12" />
                        </div>
                        <div className="space-y-2">
                            <div className="h-3 bg-ash/20 rounded w-full" />
                            <div className="h-3 bg-ash/20 rounded w-5/6" />
                            <div className="h-3 bg-ash/20 rounded w-4/6" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
