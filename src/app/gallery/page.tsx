import type { Metadata } from "next";
import Image from "next/image";

const BASE_URL = "https://www.emberandoak.com";

export const metadata: Metadata = {
    title: "Gallery | Ember & Oak — Austin, TX",
    description:
        "Browse the Ember & Oak gallery — fire-crafted dishes, our warm interior, the craft behind every plate, and the ambiance that makes every evening memorable.",
    keywords: [
        "Ember & Oak gallery",
        "restaurant photos Austin TX",
        "fine dining interior Austin",
        "food photography Austin",
        "Ember & Oak ambiance",
    ],
    openGraph: {
        title: "Gallery | Ember & Oak — Austin, TX",
        description:
            "A visual story of fire-crafted cuisine, warm interiors, and unforgettable evenings at Ember & Oak in Austin, TX.",
        url: `${BASE_URL}/gallery`,
        siteName: "Ember & Oak",
        locale: "en_US",
        type: "website",
        images: [
            {
                url: `${BASE_URL}/og-image.jpg`,
                width: 1200,
                height: 630,
                alt: "Gallery | Ember & Oak",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Gallery | Ember & Oak, Austin TX",
        description: "Fire-crafted cuisine and warm ambiance at Ember & Oak, Austin TX.",
        images: [`${BASE_URL}/og-image.jpg`],
    },
    alternates: {
        canonical: `${BASE_URL}/gallery`,
    },
};

// ── Gallery images ───────────────────────────────────────────────────────────
const GALLERY_ITEMS = [
    {
        src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
        alt: "Elegantly plated fine-dining entrée",
        category: "Cuisine",
        tall: true,
    },
    {
        src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
        alt: "Colorful fresh ingredients arranged on a table",
        category: "Ingredients",
        tall: false,
    },
    {
        src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
        alt: "Chef preparing a dish in a professional kitchen",
        category: "Chef",
        tall: false,
    },
    {
        src: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&q=80",
        alt: "Artistic cocktail with garnishes",
        category: "Cocktails",
        tall: true,
    },
    {
        src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80",
        alt: "Restaurant bar and interior ambiance",
        category: "Interior",
        tall: false,
    },
    {
        src: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=800&q=80",
        alt: "Sourdough toast with toppings",
        category: "Cuisine",
        tall: false,
    },
    {
        src: "https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=800&q=80",
        alt: "Warm moody dining room lighting",
        category: "Ambiance",
        tall: true,
    },
    {
        src: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&q=80",
        alt: "Chef plating a gourmet dish",
        category: "Chef",
        tall: false,
    },
    {
        src: "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=800&q=80",
        alt: "Outdoor terrace dining at golden hour",
        category: "Ambiance",
        tall: false,
    },
    {
        src: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
        alt: "Grilled steak with seasonal sides",
        category: "Cuisine",
        tall: true,
    },
    {
        src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80",
        alt: "Wood-fired pizza fresh from the oven",
        category: "Cuisine",
        tall: false,
    },
    {
        src: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=80",
        alt: "Vibrant salad with fresh herbs",
        category: "Ingredients",
        tall: false,
    },
];

// ── Category badge color map ─────────────────────────────────────────────────
const CATEGORY_COLORS: Record<string, string> = {
    Cuisine: "bg-ember/80",
    Chef: "bg-oak/80",
    Interior: "bg-ash/60",
    Ambiance: "bg-ember-dark/80",
    Cocktails: "bg-oak-dark/80",
    Ingredients: "bg-ember/60",
};

export default function GalleryPage() {
    return (
        <div className="min-h-screen bg-charcoal">

            {/* ── Hero ── */}
            <div className="relative bg-gradient-to-b from-oak/40 to-charcoal pt-16 pb-12 px-6 text-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_50%_-10%,rgba(200,105,42,0.18),transparent)] pointer-events-none" />

                <p className="font-inter text-xs text-ember font-semibold tracking-[0.2em] uppercase mb-3 relative z-10">
                    Ember &amp; Oak
                </p>
                <h1 className="font-playfair text-5xl md:text-6xl font-bold text-cream relative z-10 mb-4">
                    Don&apos;t take our word for it.
                </h1>
                <div className="flex items-center justify-center gap-4 relative z-10">
                    <div className="h-px w-16 bg-gradient-to-l from-ember to-transparent" />
                    <div className="w-1.5 h-1.5 rounded-full bg-ember" />
                    <div className="h-px w-16 bg-gradient-to-r from-ember to-transparent" />
                </div>
                <p className="mt-5 font-inter text-base text-cream/55 max-w-xl mx-auto relative z-10">
                    Take a look.
                </p>
            </div>

            {/* ── Masonry Grid ── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-14">
                {/*
                    CSS columns masonry — 1 col mobile, 2 tablet, 3 desktop.
                    Each item has break-inside-avoid so images don't split across columns.
                */}
                <div
                    className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
                >
                    {GALLERY_ITEMS.map((item, i) => {
                        const badgeBg = CATEGORY_COLORS[item.category] ?? "bg-ember/70";
                        return (
                            <div
                                key={i}
                                className="break-inside-avoid group relative overflow-hidden rounded-sm border border-ash/10 hover:border-ember/40 transition-colors duration-300"
                            >
                                {/* Image */}
                                <div
                                    className={[
                                        "relative w-full overflow-hidden",
                                        // Alternate tall/short images for visual rhythm
                                        item.tall ? "aspect-[3/4]" : "aspect-[4/3]",
                                    ].join(" ")}
                                >
                                    <Image
                                        src={item.src}
                                        alt={item.alt}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                                    />

                                    {/* Dark overlay on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                                    {/* Category badge — bottom-left on hover */}
                                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-between">
                                        <span
                                            className={[
                                                "inline-block font-inter text-[10px] font-semibold uppercase tracking-[0.15em] text-cream px-2.5 py-1 rounded-sm backdrop-blur-sm",
                                                badgeBg,
                                            ].join(" ")}
                                        >
                                            {item.category}
                                        </span>
                                        {/* Subtle ember dot accent */}
                                        <span className="w-2 h-2 rounded-full bg-ember shadow-[0_0_6px_rgba(200,105,42,0.8)]" />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* ── Bottom CTA ── */}
            <div className="relative border-t border-ash/15 bg-gradient-to-b from-charcoal to-oak/30 py-16 px-6 text-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_50%_100%,rgba(200,105,42,0.08),transparent)] pointer-events-none" />
                <p className="font-inter text-sm text-ember font-semibold tracking-[0.2em] uppercase mb-3 relative z-10">
                    Experience it in person
                </p>
                <h2 className="font-playfair text-3xl md:text-4xl font-bold text-cream mb-5 relative z-10">
                    Ready for your own story?
                </h2>
                <a
                    href="/reservations"
                    className="relative z-10 inline-flex items-center px-7 py-3.5 rounded-sm bg-ember hover:bg-ember-light active:bg-ember-dark text-cream font-inter text-sm font-semibold tracking-wider uppercase transition-all duration-200 shadow-md hover:shadow-ember/30 hover:shadow-lg"
                >
                    Reserve a Table
                </a>
            </div>
        </div>
    );
}
