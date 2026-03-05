import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, AlertCircle, CheckCircle2 } from "lucide-react";
import ReservationForm from "@/components/reservations/ReservationForm";

const BASE_URL = "https://www.emberandoak.com";

export const metadata: Metadata = {
    title: "Book a Table | Ember & Oak — Austin, TX",
    description:
        "Reserve your table at Ember & Oak in Austin, TX. Online bookings available up to 60 days in advance — confirmation within 2 hours. Dinner nightly from 5 PM.",
    keywords: [
        "book a table Austin TX",
        "restaurant reservations Austin",
        "Ember & Oak reservations",
        "fine dining reservation Austin",
        "dinner reservation South Congress Austin",
    ],
    openGraph: {
        title: "Reserve Your Table | Ember & Oak, Austin TX",
        description:
            "Secure your evening at Ember & Oak. Online reservations open up to 60 days ahead — confirmation within 2 hours. Dinner nightly from 5 PM on South Congress.",
        url: `${BASE_URL}/reservations`,
        siteName: "Ember & Oak",
        locale: "en_US",
        type: "website",
        images: [
            {
                url: `${BASE_URL}/og-image.jpg`,
                width: 1200,
                height: 630,
                alt: "Reserve a Table at Ember & Oak, Austin TX",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Book a Table | Ember & Oak",
        description: "Reserve your table at Austin's premier fire-crafted bistro. Confirmation within 2 hours.",
        images: [`${BASE_URL}/og-image.jpg`],
    },
    alternates: {
        canonical: `${BASE_URL}/reservations`,
    },
};

// ── Info sidebar data ──────────────────────────────────────────────────────
const HOURS = [
    { days: "Monday – Thursday", time: "5:00 PM – 10:00 PM" },
    { days: "Friday – Saturday", time: "5:00 PM – 11:00 PM" },
    { days: "Sunday", time: "5:00 PM – 9:00 PM" },
];

const WHAT_TO_EXPECT = [
    "We'll review your request and confirm within 2 hours during operating hours.",
    "A confirmation will be sent to your email address if provided.",
    "You'll receive a reminder the day before your reservation.",
    "Please arrive within 15 minutes of your booking time.",
];

export default function ReservationsPage() {
    return (
        <div className="min-h-screen bg-charcoal">
            {/* ── Page header ── */}
            <div className="relative bg-gradient-to-b from-oak/40 to-charcoal pt-16 pb-12 px-6 text-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_50%_-10%,rgba(200,105,42,0.15),transparent)] pointer-events-none" />
                <p className="font-inter text-xs text-ember font-semibold tracking-[0.2em] uppercase mb-3">
                    Ember &amp; Oak
                </p>
                <h1 className="font-playfair text-5xl md:text-6xl font-bold text-cream mb-4">
                    Reserve a Table
                </h1>
                <div className="flex items-center justify-center gap-4 mt-2">
                    <div className="h-px w-16 bg-gradient-to-l from-ember to-transparent" />
                    <div className="w-1.5 h-1.5 rounded-full bg-ember" />
                    <div className="h-px w-16 bg-gradient-to-r from-ember to-transparent" />
                </div>
                <p className="mt-5 font-inter text-base text-cream/55 max-w-xl mx-auto">
                    Join us for an unforgettable evening. Fill in your details below and
                    we&apos;ll confirm your table within two hours.
                </p>
            </div>

            {/* ── Two-column layout ── */}
            <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-start">

                {/* ── LEFT: Form (60% ≈ 3/5 cols) ── */}
                <div className="lg:col-span-3 bg-charcoal-light border border-ash/20 rounded-sm p-6 md:p-8">
                    <h2 className="font-playfair text-2xl font-semibold text-cream mb-1">
                        Your Details
                    </h2>
                    <p className="font-inter text-sm text-cream/45 mb-7">
                        All reservations are requests — we&apos;ll confirm your table shortly.
                    </p>
                    <ReservationForm />
                </div>

                {/* ── RIGHT: Info panel (40% ≈ 2/5 cols) ── */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Contact & location */}
                    <div className="bg-charcoal-light border border-ash/20 rounded-sm p-6 space-y-4">
                        <h3 className="font-playfair text-lg font-semibold text-cream">
                            Find Us
                        </h3>

                        <div className="space-y-3 font-inter text-sm text-cream/65">
                            <div className="flex items-start gap-3">
                                <MapPin size={15} className="text-ember mt-0.5 shrink-0" />
                                <span>
                                    2418 South Congress Ave<br />
                                    Austin, TX 78704
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone size={15} className="text-ember shrink-0" />
                                <a href="tel:+15124739200" className="hover:text-ember transition-colors duration-200">
                                    (512) 473-9200
                                </a>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail size={15} className="text-ember shrink-0" />
                                <a href="mailto:hello@emberandoak.com" className="hover:text-ember transition-colors duration-200 break-all">
                                    hello@emberandoak.com
                                </a>
                            </div>
                        </div>

                        <div className="pt-2 border-t border-ash/20 space-y-2">
                            <div className="flex items-center gap-2 font-inter text-xs text-cream/50 uppercase tracking-widest">
                                <Clock size={12} className="text-ember" />
                                <span>Hours</span>
                            </div>
                            {HOURS.map(({ days, time }) => (
                                <div key={days} className="flex flex-col sm:flex-row sm:justify-between gap-0.5 font-inter text-sm">
                                    <span className="text-cream/50">{days}</span>
                                    <span className="text-cream/80">{time}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* What to expect */}
                    <div className="bg-charcoal-light border border-ash/20 rounded-sm p-6 space-y-4">
                        <h3 className="font-playfair text-lg font-semibold text-cream">
                            What Happens Next
                        </h3>
                        <ul className="space-y-3">
                            {WHAT_TO_EXPECT.map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <CheckCircle2 size={15} className="text-ember shrink-0 mt-0.5" />
                                    <span className="font-inter text-sm text-cream/65 leading-relaxed">
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Large party note */}
                    <div className="flex items-start gap-3 bg-ember/10 border border-ember/25 rounded-sm p-5">
                        <AlertCircle size={16} className="text-ember shrink-0 mt-0.5" />
                        <div className="space-y-1">
                            <p className="font-inter text-sm font-semibold text-ember">
                                Large Parties (8+ guests)
                            </p>
                            <p className="font-inter text-xs text-cream/60 leading-relaxed">
                                For groups of 8 or more, please call us directly at{" "}
                                <a href="tel:+15124739200" className="text-ember hover:text-ember-light transition-colors">
                                    (512) 473-9200
                                </a>{" "}
                                so we can arrange the best seating and experience for your group.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
