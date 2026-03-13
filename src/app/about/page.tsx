import type { Metadata } from "next";
import Image from "next/image";
import { Flame, Leaf, Sparkles, Star } from "lucide-react";
import StatsCounter from "@/components/about/StatsCounter";

const BASE_URL = "https://www.emberandoak.com";

export const metadata: Metadata = {
    title: "Our Story | Ember & Oak — Austin, TX",
    description:
        "Discover the story behind Ember & Oak — from Executive Chef Marcus Cole's wood-fire obsession to one of Austin's most celebrated modern American bistros. Est. 2019, South Congress Ave.",
    keywords: [
        "Ember & Oak story",
        "Austin restaurant about",
        "Marcus Cole chef Austin",
        "fire crafted restaurant history",
        "wood fire cooking Austin Texas",
    ],
    openGraph: {
        title: "Our Story | Ember & Oak — Fire, Tradition & Austin Roots",
        description:
            "Founded in 2019 on South Congress Ave, Ember & Oak was born from a wood-fire obsession and a belief that great food tells a story. Meet Chef Marcus Cole and discover our philosophy.",
        url: `${BASE_URL}/about`,
        siteName: "Ember & Oak",
        locale: "en_US",
        type: "website",
        images: [
            {
                url: `${BASE_URL}/og-image.jpg`,
                width: 1200,
                height: 630,
                alt: "Ember & Oak — Our Story, Austin TX",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Our Story | Ember & Oak",
        description: "Founded in 2019 in Austin, TX. A wood-fire obsession turned into one of Texas's most celebrated modern American bistros.",
        images: [`${BASE_URL}/og-image.jpg`],
    },
    alternates: {
        canonical: `${BASE_URL}/about`,
    },
};

const PHILOSOPHY = [
    {
        icon: Leaf,
        title: "The Ingredients",
        body: "Every dish begins with an honest conversation — with a local rancher, a Hill Country forager, or an heirloom vegetable farmer two counties over. We source within 200 miles whenever possible, not because it's fashionable, but because the flavour is simply incomparable. When you taste our food, you taste the land.",
    },
    {
        icon: Flame,
        title: "The Fire",
        body: "Wood fire is not a technique. It is a philosophy. It demands patience, presence, and respect — for the heat, the ingredient, and the moment. At Ember & Oak, we cook over live oak, cherry, and pecan wood, each chosen to match the protein or vegetable it will transform. You cannot rush fire, and we never do.",
    },
    {
        icon: Sparkles,
        title: "The Experience",
        body: "A great meal is theatre, ritual, and memory all at once. From the moment you walk through our doors, you are our only concern. Every detail — the lighting, the silence between courses, the warmth of the room — is considered to make your evening feel like the most important one of the year.",
    },
];

// Photo gallery gradient configs
const GALLERY_CELLS = [
    "from-oak via-charcoal to-oak-dark col-span-2",
    "from-charcoal via-oak-light to-charcoal-dark",
    "from-oak-dark via-charcoal to-oak",
    "from-charcoal-light via-oak to-charcoal",
    "from-oak via-charcoal-dark to-oak-light col-span-2",
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-charcoal">

            {/* ══════════════════════════════════
          1. PAGE HERO
      ══════════════════════════════════ */}
            <section className="relative bg-gradient-to-b from-oak/50 via-oak/20 to-charcoal pt-20 pb-20 px-6 text-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_-10%,rgba(200,105,42,0.18),transparent)] pointer-events-none" />

                <p className="font-inter text-xs text-ember font-semibold tracking-[0.2em] uppercase mb-3 relative z-10">
                    Ember &amp; Oak
                </p>
                <h1 className="font-playfair text-5xl md:text-6xl font-bold text-cream relative z-10 mb-4 leading-tight">
                    No shortcuts.<br />
                    <span className="text-ember">No apologies.</span>
                </h1>
                <div className="flex items-center justify-center gap-4 relative z-10">
                    <div className="h-px w-16 bg-gradient-to-l from-ember to-transparent" />
                    <div className="w-1.5 h-1.5 rounded-full bg-ember" />
                    <div className="h-px w-16 bg-gradient-to-r from-ember to-transparent" />
                </div>
                <p className="mt-5 font-inter text-base text-cream/55 max-w-xl mx-auto relative z-10">
                    Just fire, craft, and food worth talking about.
                </p>
            </section>

            {/* ══════════════════════════════════
          2. ORIGIN STORY
      ══════════════════════════════════ */}
            <section className="py-20 md:py-28 px-6">
                <div className="max-w-3xl mx-auto space-y-7 font-inter text-base leading-relaxed text-cream/70">
                    <p>
                        Ember &amp; Oak was born in the summer of 2019, in a converted
                        1940s icehouse on South Congress Avenue. The building still
                        smelled faintly of cedar and cool limestone. We kept it that way.
                    </p>
                    <p>
                        The idea was simple — almost naïve in its ambition. We wanted to
                        cook the food of Central Texas the way it had always deserved to
                        be cooked: with technique, with intention, and above all, with
                        fire. Not the gas-fuelled approximation of fire, but actual wood
                        — whole split logs of live oak, Hill Country pecan, and wild
                        cherry — burning in a custom hearth built by a fourth-generation
                        Austin ironworker named Roy Garza.
                    </p>
                    <p>
                        The earliest menus were handwritten. There were eight tables.
                        On the first Saturday we opened, every seat was taken by 5:15 PM
                        and we turned away over forty people. We were not ready for that.
                        Looking back, we are grateful for it. It reminded us, from the
                        very first night, that what people hunger for most is not just
                        food, but the feeling of being welcomed somewhere that cares.
                    </p>
                    <p>
                        Five years on, Ember &amp; Oak has grown — more tables, a deeper
                        wine programme, a pastry kitchen that produces everything in-house
                        — but the convictions that lit the first fire have never changed.
                        We cook over wood. We source from people we know. We welcome every
                        guest as if the restaurant exists for them alone. Because it does.
                    </p>
                </div>
            </section>

            {/* ══════════════════════════════════
          3. MEET THE CHEF
      ══════════════════════════════════ */}
            <section className="py-20 md:py-24 px-6 bg-oak/30">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-center">

                    {/* Chef portrait */}
                    <div className="flex justify-center md:justify-end">
                        <div className="relative">
                            {/* Circle portrait */}
                            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full border-2 border-ash/30 overflow-hidden">
                                <Image
                                    src="https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=600&q=80"
                                    alt="Executive Chef Marcus Cole"
                                    width={320}
                                    height={320}
                                    className="w-full h-full object-cover object-top"
                                    priority
                                />
                            </div>
                            {/* Ember ring accent */}
                            <div className="absolute inset-0 rounded-full border-2 border-ember/20 scale-110 pointer-events-none" />
                            {/* Name tag */}
                            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap bg-charcoal border border-ash/30 px-5 py-2 text-center shadow-xl">
                                <p className="font-playfair text-sm font-semibold text-cream">Marcus Cole</p>
                                <p className="font-inter text-[10px] text-ember uppercase tracking-widest mt-0.5">Executive Chef</p>
                            </div>
                        </div>
                    </div>

                    {/* Bio */}
                    <div className="space-y-5">
                        <p className="font-inter text-xs text-ember font-semibold tracking-[0.2em] uppercase">
                            The Chef
                        </p>
                        <h2 className="font-playfair text-4xl font-bold text-cream leading-tight">
                            Marcus Cole
                        </h2>
                        <div className="flex items-center gap-2 mb-1">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={13} className="fill-ember text-ember" />
                            ))}
                            <span className="font-inter text-xs text-cream/40 ml-1">James Beard Nominated, 2023</span>
                        </div>
                        <div className="space-y-4 font-inter text-sm leading-relaxed text-cream/65">
                            <p>
                                Marcus grew up in Austin in the 1980s, the son of a barbecue pitmaster
                                who ran a trailer off Cesar Chavez for twenty-two years. He spent
                                summers learning patience from his father — how long to wait for the
                                bark to set, how to read smoke colour, when to trust the fire and when
                                to intervene.
                            </p>
                            <p>
                                He left Texas at nineteen to train in New York under a classically
                                French-trained chef who taught him that restraint is the hardest
                                technique to learn. A decade later he moved west to San Francisco,
                                where he spent three years as sous chef at a celebrated Californian
                                restaurant, deepening his commitment to produce-first cooking and
                                fermentation.
                            </p>
                            <p>
                                In 2019, Marcus returned to Austin with a single conviction: that
                                the food of his childhood — bold, smoky, generous — deserved the
                                same craft and care that the finest restaurants in the world applied
                                to their tasting menus. Ember &amp; Oak is that conviction, plated.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════
          4. PHILOSOPHY — 3 COLUMNS
      ══════════════════════════════════ */}
            <section className="py-20 md:py-28 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-14">
                        <p className="font-inter text-xs text-ember font-semibold tracking-[0.2em] uppercase mb-3">
                            What We Believe
                        </p>
                        <h2 className="font-playfair text-4xl md:text-5xl font-bold text-cream">
                            Our Philosophy
                        </h2>
                        <div className="mt-4 mx-auto w-12 h-px bg-ember" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {PHILOSOPHY.map(({ icon: Icon, title, body }) => (
                            <div
                                key={title}
                                className="group bg-charcoal-light border border-ash/20 rounded-sm p-8 space-y-5 hover:border-ember/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ember/10"
                            >
                                <div className="w-12 h-12 rounded-full bg-ember/10 border border-ember/20 flex items-center justify-center group-hover:bg-ember/20 transition-colors duration-300">
                                    <Icon size={20} className="text-ember" />
                                </div>
                                <h3 className="font-playfair text-xl font-semibold text-cream">
                                    {title}
                                </h3>
                                <p className="font-inter text-sm leading-relaxed text-cream/60">
                                    {body}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════
          5. BY THE NUMBERS
      ══════════════════════════════════ */}
            <section className="py-16 md:py-20 px-6 bg-charcoal-dark relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ember/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ember/40 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_80%_at_50%_50%,rgba(200,105,42,0.07),transparent)] pointer-events-none" />

                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-10">
                        <p className="font-inter text-xs text-ember font-semibold tracking-[0.2em] uppercase mb-3">
                            Five Years In
                        </p>
                        <h2 className="font-playfair text-4xl font-bold text-cream">
                            By the Numbers
                        </h2>
                    </div>
                    <StatsCounter />
                </div>
            </section>

            {/* ══════════════════════════════════
          6. PHOTO GALLERY PLACEHOLDERS
      ══════════════════════════════════ */}
            <section className="py-20 md:py-28 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <p className="font-inter text-xs text-ember font-semibold tracking-[0.2em] uppercase mb-3">
                            Inside Ember &amp; Oak
                        </p>
                        <h2 className="font-playfair text-4xl md:text-5xl font-bold text-cream">
                            The Space
                        </h2>
                        <div className="mt-4 mx-auto w-12 h-px bg-ember" />
                    </div>

                    <div className="grid grid-cols-3 grid-rows-2 gap-3 h-[480px] md:h-[600px]">
                        {/* Cell 1 — tall left (row-span-2) */}
                        <div className="row-span-2 rounded-sm overflow-hidden relative group">
                            <Image
                                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80"
                                alt="Ember & Oak dining room interior"
                                fill
                                sizes="33vw"
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />
                        </div>
                        {/* Cell 2 */}
                        <div className="rounded-sm overflow-hidden relative group">
                            <Image
                                src="https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=800&q=80"
                                alt="Outdoor terrace at golden hour"
                                fill
                                sizes="33vw"
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                        {/* Cell 3 */}
                        <div className="rounded-sm overflow-hidden relative group">
                            <Image
                                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80"
                                alt="Restaurant bar and lounge area"
                                fill
                                sizes="33vw"
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                        {/* Cell 4 */}
                        <div className="rounded-sm overflow-hidden relative group">
                            <Image
                                src="https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&q=80"
                                alt="Chef plating a gourmet dish"
                                fill
                                sizes="33vw"
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                        {/* Cell 5 */}
                        <div className="rounded-sm overflow-hidden relative group">
                            <Image
                                src="https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&q=80"
                                alt="Artisan cocktail with garnishes"
                                fill
                                sizes="33vw"
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
