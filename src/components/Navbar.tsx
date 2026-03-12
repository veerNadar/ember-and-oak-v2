"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Menu } from "lucide-react";

const NAV_LINKS = [
    { href: "/", label: "Home" },
    { href: "/menu", label: "Menu" },
    { href: "/gallery", label: "Gallery" },
    { href: "/reservations", label: "Reservations" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
];

export default function Navbar() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    // Track scroll position to show border
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [menuOpen]);

    const isActive = (href: string) =>
        href === "/" ? pathname === "/" : pathname.startsWith(href);

    return (
        <>
            <header
                className={[
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                    "bg-charcoal",
                    scrolled
                        ? "border-b border-ash/30 shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
                        : "border-b border-transparent",
                ].join(" ")}
            >
                <nav className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-16 md:h-20">

                    {/* ── Logo ── */}
                    <Link
                        href="/"
                        className="font-playfair text-xl md:text-2xl font-semibold tracking-wide text-ember hover:text-ember-light transition-colors duration-200"
                        aria-label="Ember & Oak — Home"
                    >
                        Ember &amp; Oak
                    </Link>

                    {/* ── Desktop nav ── */}
                    <ul className="hidden md:flex items-center gap-8" role="list">
                        {NAV_LINKS.map(({ href, label }) => (
                            <li key={href}>
                                <Link
                                    href={href}
                                    className={[
                                        "relative font-inter text-sm font-medium tracking-wider uppercase transition-colors duration-200",
                                        "after:absolute after:-bottom-1 after:left-0 after:w-full after:h-px",
                                        "after:scale-x-0 after:transition-transform after:duration-200 after:origin-left",
                                        isActive(href)
                                            ? "text-ember after:bg-ember after:scale-x-100"
                                            : "text-cream/70 hover:text-cream after:bg-cream hover:after:scale-x-100",
                                    ].join(" ")}
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* ── Desktop CTA ── */}
                    <div className="hidden md:block">
                        <Link
                            href="/reservations"
                            className={[
                                "inline-flex items-center px-5 py-2.5 rounded-sm",
                                "bg-ember hover:bg-ember-light active:bg-ember-dark",
                                "text-cream font-inter text-sm font-semibold tracking-wider uppercase",
                                "transition-all duration-200 shadow-md hover:shadow-ember/30 hover:shadow-lg",
                            ].join(" ")}
                        >
                            Book a Table
                        </Link>
                    </div>

                    {/* ── Mobile hamburger ── */}
                    <button
                        className="md:hidden flex items-center justify-center w-11 h-11 -mr-1.5 text-cream hover:text-ember transition-colors duration-200 rounded-lg"
                        onClick={() => setMenuOpen(true)}
                        aria-label="Open navigation menu"
                        aria-expanded={menuOpen}
                    >
                        <Menu size={24} />
                    </button>
                </nav>
            </header>

            {/* ── Mobile full-screen overlay ── */}
            <div
                role="dialog"
                aria-modal="true"
                aria-label="Navigation menu"
                className={[
                    "fixed inset-0 z-[60] bg-charcoal/98 backdrop-blur-sm flex flex-col",
                    "transition-all duration-300 ease-in-out",
                    menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
                ].join(" ")}
            >
                {/* Close button */}
                <div className="flex justify-end px-6 pt-4">
                    <button
                        className="flex items-center justify-center w-11 h-11 text-cream hover:text-ember transition-colors duration-200 rounded-lg"
                        onClick={() => setMenuOpen(false)}
                        aria-label="Close navigation menu"
                    >
                        <X size={26} />
                    </button>
                </div>

                {/* Logo in overlay */}
                <div className="px-8 pt-2 pb-10">
                    <span className="font-playfair text-2xl font-semibold text-ember">
                        Ember &amp; Oak
                    </span>
                </div>

                {/* Links */}
                <nav className="flex-1 flex flex-col px-8 gap-2">
                    {NAV_LINKS.map(({ href, label }, i) => (
                        <Link
                            key={href}
                            href={href}
                            onClick={() => setMenuOpen(false)}
                            style={{ transitionDelay: menuOpen ? `${i * 50}ms` : "0ms" }}
                            className={[
                                "font-playfair text-3xl font-medium py-3 border-b",
                                "transition-all duration-300",
                                menuOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4",
                                isActive(href)
                                    ? "text-ember border-ember/20"
                                    : "text-cream/80 border-ash/20 hover:text-ember",
                            ].join(" ")}
                        >
                            {label}
                        </Link>
                    ))}
                </nav>

                {/* Mobile CTA */}
                <div className="px-8 pb-12 pt-8">
                    <Link
                        href="/reservations"
                        onClick={() => setMenuOpen(false)}
                        className={[
                            "flex items-center justify-center w-full px-6 py-4 rounded-sm",
                            "bg-ember hover:bg-ember-light",
                            "text-cream font-inter text-base font-semibold tracking-wider uppercase",
                            "transition-colors duration-200",
                        ].join(" ")}
                    >
                        Book a Table
                    </Link>
                </div>
            </div>
        </>
    );
}
