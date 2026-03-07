import type { MenuItem } from "@/lib/types";
import Image from "next/image";

// Category label map
const CATEGORY_LABELS: Record<MenuItem["category"], string> = {
    starters: "Starter",
    mains: "Main",
    desserts: "Dessert",
    drinks: "Drink",
};

// Per-category gradient for the image placeholder
const CATEGORY_GRADIENTS: Record<MenuItem["category"], string> = {
    starters: "from-oak via-charcoal to-oak-dark",
    mains: "from-charcoal via-oak-light to-charcoal-dark",
    desserts: "from-charcoal-light via-oak to-charcoal",
    drinks: "from-oak-dark via-charcoal-light to-oak",
};

interface MenuCardProps {
    item: MenuItem;
}

export default function MenuCard({ item }: MenuCardProps) {
    const firstLetter = item.name.charAt(0).toUpperCase();

    return (
        <article className="relative group bg-charcoal-light border border-ash/20 rounded-sm overflow-hidden hover:border-ember/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ember/10 flex flex-col">

            {/* ── Image / placeholder ── */}
            <div className={`relative h-44 bg-gradient-to-br ${CATEGORY_GRADIENTS[item.category]} shrink-0 overflow-hidden`}>
                {item.image_url ? (
                    <Image
                        src={item.image_url}
                        alt={item.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-playfair text-5xl font-bold text-cream/10 select-none">
                            {firstLetter}
                        </span>
                    </div>
                )}

                {/* Bottom fade */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent" />

                {/* Category badge */}
                <div className="absolute top-3 left-3 z-10">
                    <span className="inline-block px-2.5 py-0.5 bg-charcoal/80 backdrop-blur-sm border border-ash/30 rounded-full font-inter text-[10px] font-semibold text-cream/70 tracking-widest uppercase">
                        {CATEGORY_LABELS[item.category]}
                    </span>
                </div>
            </div>

            {/* ── Content ── */}
            <div className="flex flex-col flex-1 p-5 space-y-2">
                <div className="flex items-start justify-between gap-3">
                    <h3 className="font-playfair text-base font-semibold text-cream leading-snug group-hover:text-ember-light transition-colors duration-200">
                        {item.name}
                    </h3>
                    <span className="shrink-0 font-inter text-sm font-bold text-ember pt-0.5">
                        ${Number(item.price).toFixed(2)}
                    </span>
                </div>

                {item.description && (
                    <p className="font-inter text-xs text-cream/55 leading-relaxed line-clamp-2 flex-1">
                        {item.description}
                    </p>
                )}
            </div>

            {/* ── Hover ember bottom line ── */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-ember scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

            {/* ── Unavailable overlay ── */}
            {!item.is_available && (
                <div className="absolute inset-0 bg-charcoal/80 backdrop-blur-[2px] flex items-center justify-center z-20">
                    <span className="font-inter text-xs font-semibold text-cream/50 tracking-widest uppercase border border-ash/30 px-4 py-1.5 rounded-full">
                        Unavailable
                    </span>
                </div>
            )}
        </article>
    );
}
