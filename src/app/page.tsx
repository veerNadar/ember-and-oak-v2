import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Star, ArrowRight, UtensilsCrossed, Flame } from "lucide-react";
import FeaturedDishes, { FeaturedDishesSkeleton } from "@/components/home/FeaturedDishes";
import FeaturedDishesErrorBoundary from "@/components/home/FeaturedDishesErrorBoundary";

const BASE_URL = "https://www.emberandoak.com";

export const metadata: Metadata = {
  title: "Ember & Oak | Modern American Bistro in Austin, TX",
  description:
    "Ember & Oak is Austin's premier fire-crafted dining experience. Bold, wood-fired modern American cuisine made with seasonal local ingredients. Reserve your table today.",
  keywords: [
    "Ember & Oak",
    "restaurant Austin TX",
    "fine dining Austin",
    "wood fired restaurant Austin",
    "Modern American Bistro Austin",
    "fire crafted food Austin",
    "best restaurants Austin Texas",
  ],
  openGraph: {
    title: "Ember & Oak | Fire-Crafted Modern American Bistro",
    description:
      "Bold, wood-fired modern American cuisine in the heart of Austin, TX. Seasonal ingredients, intimate atmosphere, and a belief that a great meal is the finest form of storytelling.",
    url: BASE_URL,
    siteName: "Ember & Oak",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${BASE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Ember & Oak — Fire-Crafted Modern American Bistro, Austin TX",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ember & Oak | Modern American Bistro",
    description: "Bold, fire-crafted food rooted in tradition. Reserve your table in Austin, TX.",
    images: [`${BASE_URL}/og-image.jpg`],
  },
  alternates: {
    canonical: BASE_URL,
  },
};

// ── Testimonials data ───────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah M.",
    location: "Austin, TX",
    rating: 5,
    text: "Ember & Oak completely redefined what fine dining means to us. The dry-aged ribeye was the best piece of beef I've had in years — perfectly charred, impossibly tender. We'll be back for every anniversary.",
  },
  {
    id: 2,
    name: "James T.",
    location: "Dallas, TX",
    rating: 5,
    text: "The oak-smoked burrata alone is worth the drive from Dallas. Intimate atmosphere, impeccable service, and a wine list that genuinely complements the menu. Rare to find this level of care.",
  },
  {
    id: 3,
    name: "Priya K.",
    location: "Austin, TX",
    rating: 5,
    text: "As someone who rarely orders vegetarian when dining out, the wild mushroom risotto here made me a convert for the evening. Rich, earthy, and beautifully balanced. Stunning room too.",
  },
];

// ── Star rating ─────────────────────────────────────────────────────────────
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < rating ? "fill-ember text-ember" : "text-ash"}
        />
      ))}
    </div>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      {/* ══════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════ */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden"
        aria-label="Hero"
      >
        {/* Background layers */}
        <div className="absolute inset-0 bg-charcoal" />
        <div className="absolute inset-0 bg-gradient-to-br from-oak/60 via-charcoal to-charcoal-dark" />
        {/* Warm ember vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(200,105,42,0.18),transparent)]" />
        {/* Bottom fade to page */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-charcoal to-transparent" />

        {/* Decorative ember orb */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-ember/5 blur-3xl pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-ember/30 bg-ember/10">
            <Flame size={13} className="text-ember" />
            <span className="font-inter text-xs text-ember font-semibold tracking-[0.15em] uppercase">
              Austin, Texas
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-playfair text-5xl sm:text-6xl lg:text-7xl font-bold text-cream leading-[1.1] tracking-tight mb-6">
            Where Every Meal{" "}
            <em className="text-ember not-italic">Tells a Story</em>
          </h1>

          {/* Sub-headline */}
          <p className="font-inter text-lg sm:text-xl text-cream/65 leading-relaxed max-w-2xl mx-auto mb-10">
            At Ember &amp; Oak, we honour the ancient ritual of cooking over
            fire. Seasonal ingredients, patient craftsmanship, and a belief
            that a great meal is the finest form of storytelling.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-ember hover:bg-ember-light active:bg-ember-dark text-cream font-inter text-sm font-semibold tracking-wider uppercase rounded-sm transition-all duration-200 shadow-lg shadow-ember/25 hover:shadow-ember/40 hover:shadow-xl"
            >
              <UtensilsCrossed size={16} />
              View Our Menu
            </Link>
            <Link
              href="/reservations"
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-cream/30 hover:border-ember text-cream/80 hover:text-ember font-inter text-sm font-semibold tracking-wider uppercase rounded-sm transition-all duration-200"
            >
              Reserve a Table
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-cream/30 animate-bounce">
          <span className="font-inter text-[10px] tracking-widest uppercase">Scroll</span>
          <ChevronDown size={16} />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          2. FEATURED DISHES
      ══════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-charcoal px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-14">
            <p className="font-inter text-xs text-ember font-semibold tracking-[0.2em] uppercase mb-3">
              From the Kitchen
            </p>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-cream">
              Tonight&apos;s Highlights
            </h2>
            <div className="mt-4 mx-auto w-12 h-px bg-ember" />
          </div>

          {/* Cards with Suspense + Error Boundary */}
          <FeaturedDishesErrorBoundary>
            <Suspense fallback={<FeaturedDishesSkeleton />}>
              <FeaturedDishes />
            </Suspense>
          </FeaturedDishesErrorBoundary>

          {/* CTA */}
          <div className="text-center mt-12">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 font-inter text-sm font-semibold text-ember hover:text-ember-light tracking-wider uppercase transition-colors duration-200 group"
            >
              View Full Menu
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          3. ABOUT SNIPPET
      ══════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-oak/40 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Text */}
          <div className="space-y-6">
            <p className="font-inter text-xs text-ember font-semibold tracking-[0.2em] uppercase">
              Our Story
            </p>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-cream leading-tight">
              Rooted in Tradition,{" "}
              <em className="text-ember not-italic">Fired by Passion</em>
            </h2>
            <div className="space-y-4 text-cream/65 font-inter text-base leading-relaxed">
              <p>
                Ember &amp; Oak was born from a simple obsession: the transformative
                power of cooking over live fire. Executive Chef Marcus Webb spent
                a decade in Michelin-starred kitchens across Europe before
                returning to Austin with a vision — a restaurant that honours
                the primal ritual of flame while honouring the complexity of
                modern American cuisine.
              </p>
              <p>
                Every dish begins with a relationship — with a local farmer, a
                forager, or a fifth-generation rancher. We believe the finest
                ingredient is trust. When you sit down at Ember &amp; Oak, you taste
                the labour of an entire community, bound together by fire.
              </p>
            </div>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 font-inter text-sm font-semibold text-ember hover:text-ember-light tracking-wider uppercase transition-colors duration-200 group"
            >
              Meet the Team
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </div>

          {/* Photo panel */}
          <div className="relative hidden lg:block">
            <div className="relative w-full aspect-[4/5] rounded-sm overflow-hidden border border-ash/20">
              <Image
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80"
                alt="Ember & Oak — warm restaurant interior with moody lighting"
                fill
                sizes="50vw"
                className="object-cover"
                priority
              />
              {/* Ember gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent" />
              {/* Corner accent */}
              <div className="absolute top-6 right-6 w-16 h-16 border-t border-r border-ember/40" />
              <div className="absolute bottom-6 left-6 w-16 h-16 border-b border-l border-ember/40" />
            </div>
            {/* Floating stat card */}
            <div className="absolute -bottom-6 -left-6 bg-charcoal border border-ash/30 px-6 py-4 shadow-2xl">
              <p className="font-inter text-xs text-cream/50 uppercase tracking-widest mb-1">
                Est.
              </p>
              <p className="font-playfair text-3xl font-bold text-ember">2019</p>
              <p className="font-inter text-xs text-cream/50 mt-1">Austin, Texas</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          4. RESERVATION CTA BANNER
      ══════════════════════════════════════════ */}
      <section className="relative py-20 md:py-24 px-6 overflow-hidden bg-charcoal-dark">
        {/* Background accents */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_50%_50%,rgba(200,105,42,0.12),transparent)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ember/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ember/50 to-transparent" />

        <div className="relative max-w-3xl mx-auto text-center space-y-6">
          <p className="font-inter text-xs text-ember font-semibold tracking-[0.2em] uppercase">
            Reservations
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-cream">
            Reserve Your Table Tonight
          </h2>
          <p className="font-inter text-base text-cream/60 max-w-xl mx-auto">
            Tables fill quickly — especially on weekends. Secure your evening
            at Ember &amp; Oak and let us take care of the rest.
          </p>
          <div className="pt-2">
            <Link
              href="/reservations"
              className="inline-flex items-center gap-2 px-10 py-4 bg-ember hover:bg-ember-light text-cream font-inter text-sm font-semibold tracking-wider uppercase rounded-sm transition-all duration-200 shadow-lg shadow-ember/30 hover:shadow-ember/50 hover:shadow-xl"
            >
              Book a Table
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          5. TESTIMONIALS
      ══════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-charcoal px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-14">
            <p className="font-inter text-xs text-ember font-semibold tracking-[0.2em] uppercase mb-3">
              Guest Experiences
            </p>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-cream">
              Words from Our Guests
            </h2>
            <div className="mt-4 mx-auto w-12 h-px bg-ember" />
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {TESTIMONIALS.map((t) => (
              <blockquote
                key={t.id}
                className="flex flex-col bg-charcoal-light border border-ash/20 rounded-sm p-7 space-y-4 hover:border-ember/30 transition-colors duration-300"
              >
                <StarRating rating={t.rating} />
                <p className="font-inter text-sm text-cream/70 leading-relaxed flex-1">
                  &ldquo;{t.text}&rdquo;
                </p>
                <footer className="pt-2 border-t border-ash/20">
                  <p className="font-playfair text-sm font-semibold text-cream">
                    {t.name}
                  </p>
                  <p className="font-inter text-xs text-cream/40 mt-0.5">
                    {t.location}
                  </p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
