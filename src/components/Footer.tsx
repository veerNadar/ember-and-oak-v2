import Link from "next/link";
import { Instagram, Facebook, Twitter, MapPin, Phone, Mail, Clock } from "lucide-react";

const QUICK_LINKS = [
    { href: "/", label: "Home" },
    { href: "/menu", label: "Menu" },
    { href: "/gallery", label: "Gallery" },
    { href: "/reservations", label: "Reservations" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
];

const SOCIAL_LINKS = [
    {
        href: "https://instagram.com",
        label: "Instagram",
        icon: Instagram,
    },
    {
        href: "https://facebook.com",
        label: "Facebook",
        icon: Facebook,
    },
    {
        href: "https://twitter.com",
        label: "Twitter / X",
        icon: Twitter,
    },
];

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-oak text-cream">
            {/* ── Ember divider line ── */}
            <div className="h-px bg-gradient-to-r from-transparent via-ember to-transparent" />

            {/* ── Main grid ── */}
            <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 md:py-20 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16">

                {/* ── Column 1: Brand & about ── */}
                <div className="space-y-5">
                    <div>
                        <h2 className="font-playfair text-2xl font-semibold text-ember">
                            Ember &amp; Oak
                        </h2>
                        <p className="mt-1 font-inter text-sm text-cream/50 italic tracking-wide">
                            Fired up since 2019.
                        </p>
                    </div>

                    <p className="font-inter text-sm leading-relaxed text-cream/70">
                        Nestled in the heart of Austin, Ember &amp; Oak is a fine-dining
                        destination where open-flame cooking meets seasonal ingredients.
                        Every dish is a story of craft, patience, and passion for the
                        table. We invite you to slow down and savour the moment.
                    </p>

                    {/* Social icons */}
                    <div className="flex items-center gap-4 pt-1">
                        {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                className="w-9 h-9 rounded-full border border-cream/20 flex items-center justify-center text-cream/60 hover:border-ember hover:text-ember transition-all duration-200"
                            >
                                <Icon size={16} />
                            </a>
                        ))}
                    </div>
                </div>

                {/* ── Column 2: Quick links ── */}
                <div className="space-y-5">
                    <h3 className="font-playfair text-lg font-semibold text-cream tracking-wide">
                        Quick Links
                    </h3>
                    <ul className="space-y-3" role="list">
                        {QUICK_LINKS.map(({ href, label }) => (
                            <li key={href}>
                                <Link
                                    href={href}
                                    className="font-inter text-sm text-cream/65 hover:text-ember transition-colors duration-200 flex items-center gap-2 group"
                                >
                                    <span className="w-4 h-px bg-ember scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* ── Column 3: Contact & hours ── */}
                <div className="space-y-5">
                    <h3 className="font-playfair text-lg font-semibold text-cream tracking-wide">
                        Find Us
                    </h3>

                    <ul className="space-y-4 font-inter text-sm text-cream/70" role="list">
                        <li className="flex items-start gap-3">
                            <MapPin size={16} className="text-ember mt-0.5 shrink-0" />
                            <span>
                                2418 South Congress Ave<br />
                                Austin, TX 78704
                            </span>
                        </li>

                        <li className="flex items-center gap-3">
                            <Phone size={16} className="text-ember shrink-0" />
                            <a
                                href="tel:+15124739200"
                                className="hover:text-ember transition-colors duration-200"
                            >
                                (512) 473-9200
                            </a>
                        </li>

                        <li className="flex items-center gap-3">
                            <Mail size={16} className="text-ember shrink-0" />
                            <a
                                href="mailto:hello@emberandoak.com"
                                className="hover:text-ember transition-colors duration-200 break-all"
                            >
                                hello@emberandoak.com
                            </a>
                        </li>

                        <li className="flex items-start gap-3 pt-1">
                            <Clock size={16} className="text-ember mt-0.5 shrink-0" />
                            <div className="space-y-0.5">
                                <p>
                                    <span className="text-cream/50">Mon – Thu</span>
                                    &ensp;5:00 pm – 10:00 pm
                                </p>
                                <p>
                                    <span className="text-cream/50">Fri – Sat</span>
                                    &ensp;5:00 pm – 11:00 pm
                                </p>
                                <p>
                                    <span className="text-cream/50">Sunday</span>
                                    &ensp;5:00 pm – 9:00 pm
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            {/* ── Bottom bar ── */}
            <div className="border-t border-cream/10">
                <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-inter text-cream/35">
                    <p>&copy; {year} Ember &amp; Oak. All rights reserved.</p>
                    <p>
                        Crafted with care in Austin, Texas&nbsp;🔥
                    </p>
                </div>
            </div>
        </footer>
    );
}
