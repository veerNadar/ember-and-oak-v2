import Link from "next/link";
import { UtensilsCrossed, ArrowRight, Search } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "404 — Page Not Found | Ember & Oak",
    description: "This page doesn't exist. Head back to Ember & Oak and explore our menu or make a reservation.",
};

export default function NotFound() {
    return (
        <div className="min-h-screen bg-charcoal flex flex-col items-center justify-center px-6 text-center">
            {/* Ambient glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(200,105,42,0.07),transparent)] pointer-events-none" />

            <div className="relative z-10 max-w-lg mx-auto space-y-8">
                {/* Large 404 numeral */}
                <div className="relative">
                    <p
                        className="font-playfair font-bold text-cream/[0.04] select-none"
                        style={{ fontSize: "clamp(7rem, 22vw, 14rem)", lineHeight: 1 }}
                        aria-hidden="true"
                    >
                        404
                    </p>
                    {/* Floating icon over the number */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative">
                            <div className="absolute inset-0 rounded-full bg-ember/10 blur-xl scale-150" />
                            <div className="relative w-20 h-20 rounded-full bg-charcoal-light border border-ash/20 flex items-center justify-center">
                                <Search size={30} className="text-ember/70" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copy */}
                <div>
                    <p className="font-inter text-xs text-ember font-semibold tracking-[0.2em] uppercase mb-3">
                        Page not found
                    </p>
                    <h1 className="font-playfair text-4xl md:text-5xl font-bold text-cream mb-4">
                        Lost in the Smoke
                    </h1>
                    <p className="font-inter text-base text-cream/55 leading-relaxed">
                        The page you&apos;re looking for has wandered off the menu. It may
                        have moved, been removed, or never existed at all.
                    </p>
                </div>

                {/* Decorative divider */}
                <div className="flex items-center justify-center gap-4">
                    <div className="h-px w-12 bg-gradient-to-l from-ember/40 to-transparent" />
                    <div className="w-1.5 h-1.5 rounded-full bg-ember/40" />
                    <div className="h-px w-12 bg-gradient-to-r from-ember/40 to-transparent" />
                </div>

                {/* Navigation links */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-7 py-3 bg-ember hover:bg-ember-light active:bg-ember-dark text-cream font-inter text-sm font-semibold tracking-wider uppercase rounded-sm transition-all duration-200 shadow-lg shadow-ember/25 hover:shadow-ember/40"
                    >
                        Back to Home
                        <ArrowRight size={15} />
                    </Link>
                    <Link
                        href="/menu"
                        className="inline-flex items-center gap-2 px-7 py-3 border border-cream/20 hover:border-ember text-cream/70 hover:text-ember font-inter text-sm font-semibold tracking-wider uppercase rounded-sm transition-all duration-200"
                    >
                        <UtensilsCrossed size={15} />
                        View Menu
                    </Link>
                </div>
            </div>

            {/* Bottom ember accent */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ember/30 to-transparent" />
        </div>
    );
}
