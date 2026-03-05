"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Flame, RefreshCw, Home } from "lucide-react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log to an error reporting service in production
        console.error("[Error Boundary]", error);
    }, [error]);

    return (
        <div className="min-h-screen bg-charcoal flex flex-col items-center justify-center px-6 text-center">
            {/* Ambient ember glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(200,105,42,0.08),transparent)] pointer-events-none" />

            <div className="relative z-10 max-w-md mx-auto space-y-8">
                {/* Icon */}
                <div className="flex items-center justify-center">
                    <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-ember/10 blur-xl scale-150" />
                        <div className="relative w-20 h-20 rounded-full bg-charcoal-light border border-ash/20 flex items-center justify-center">
                            <Flame size={32} className="text-ember/70" />
                        </div>
                    </div>
                </div>

                {/* Eyebrow */}
                <div>
                    <p className="font-inter text-xs text-ember font-semibold tracking-[0.2em] uppercase mb-3">
                        Something went wrong
                    </p>
                    <h1 className="font-playfair text-4xl md:text-5xl font-bold text-cream mb-4">
                        The Kitchen Hit a Snag
                    </h1>
                    <p className="font-inter text-base text-cream/55 leading-relaxed">
                        Even the finest kitchens have off nights. We&apos;ve run into an
                        unexpected error — please try again or head back to the home page.
                    </p>
                </div>

                {/* Digest (helpful for debugging) */}
                {error.digest && (
                    <p className="font-inter text-xs text-cream/25 font-mono tracking-wider">
                        Error ID: {error.digest}
                    </p>
                )}

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                        onClick={reset}
                        className="inline-flex items-center gap-2 px-7 py-3 bg-ember hover:bg-ember-light active:bg-ember-dark text-cream font-inter text-sm font-semibold tracking-wider uppercase rounded-sm transition-all duration-200 shadow-lg shadow-ember/25 hover:shadow-ember/40"
                    >
                        <RefreshCw size={15} />
                        Try Again
                    </button>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-7 py-3 border border-cream/20 hover:border-ember text-cream/70 hover:text-ember font-inter text-sm font-semibold tracking-wider uppercase rounded-sm transition-all duration-200"
                    >
                        <Home size={15} />
                        Back to Home
                    </Link>
                </div>
            </div>

            {/* Bottom ember accent */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ember/30 to-transparent" />
        </div>
    );
}
