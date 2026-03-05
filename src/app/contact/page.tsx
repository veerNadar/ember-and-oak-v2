import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, Car, CalendarCheck } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";

const BASE_URL = "https://www.emberandoak.com";

export const metadata: Metadata = {
    title: "Contact Us | Ember & Oak — Austin, TX",
    description:
        "Contact Ember & Oak at 2418 South Congress Ave, Austin, TX 78704. Call (512) 473-9200, email hello@emberandoak.com, or send us a message for general inquiries, private events, and feedback.",
    keywords: [
        "Ember & Oak contact",
        "restaurant Austin TX contact",
        "South Congress Austin restaurant",
        "private dining Austin TX",
        "Ember & Oak phone number",
        "Ember & Oak address",
    ],
    openGraph: {
        title: "Contact | Ember & Oak — 2418 South Congress Ave, Austin TX",
        description:
            "Questions, feedback, or planning a private event? Reach Ember & Oak at (512) 473-9200 or hello@emberandoak.com. Dinner nightly in Austin, TX.",
        url: `${BASE_URL}/contact`,
        siteName: "Ember & Oak",
        locale: "en_US",
        type: "website",
        images: [
            {
                url: `${BASE_URL}/og-image.jpg`,
                width: 1200,
                height: 630,
                alt: "Contact Ember & Oak — Austin, TX",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Contact | Ember & Oak, Austin TX",
        description: "Reach us at 2418 South Congress Ave, Austin TX. Call (512) 473-9200 or email hello@emberandoak.com.",
        images: [`${BASE_URL}/og-image.jpg`],
    },
    alternates: {
        canonical: `${BASE_URL}/contact`,
    },
};

// ── Hours ──────────────────────────────────────────────────────────────────
// dayIndex: 0 = Sunday … 6 = Saturday (matches Date.getDay())
const HOURS = [
    { label: "Monday – Thursday", days: [1, 2, 3, 4], time: "5:00 PM – 10:00 PM" },
    { label: "Friday – Saturday", days: [5, 6], time: "5:00 PM – 11:00 PM" },
    { label: "Sunday", days: [0], time: "4:00 PM – 9:00 PM" },
];

export default function ContactPage() {
    // Compute current Austin day (UTC-6, no DST correction needed for highlight UX)
    const nowUTC = new Date();
    const austinDay = new Date(
        nowUTC.toLocaleString("en-US", { timeZone: "America/Chicago" })
    ).getDay();

    return (
        <div className="min-h-screen bg-charcoal">

            {/* ── Page header ── */}
            <div className="relative bg-gradient-to-b from-oak/40 to-charcoal pt-16 pb-12 px-6 text-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_50%_-10%,rgba(200,105,42,0.15),transparent)] pointer-events-none" />
                <p className="font-inter text-xs text-ember font-semibold tracking-[0.2em] uppercase mb-3 relative z-10">
                    Ember &amp; Oak
                </p>
                <h1 className="font-playfair text-5xl md:text-6xl font-bold text-cream relative z-10 mb-4">
                    Contact Us
                </h1>
                <div className="flex items-center justify-center gap-4 relative z-10">
                    <div className="h-px w-16 bg-gradient-to-l from-ember to-transparent" />
                    <div className="w-1.5 h-1.5 rounded-full bg-ember" />
                    <div className="h-px w-16 bg-gradient-to-r from-ember to-transparent" />
                </div>
                <p className="mt-5 font-inter text-base text-cream/55 max-w-xl mx-auto relative z-10">
                    Questions, feedback, or planning a private event? We&apos;re here for all of it.
                </p>
            </div>

            {/* ── Two-column layout ── */}
            <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-start">

                {/* ── LEFT: Contact form (3/5) ── */}
                <div className="lg:col-span-3 bg-charcoal-light border border-ash/20 rounded-sm p-6 md:p-8">
                    <h2 className="font-playfair text-2xl font-semibold text-cream mb-1">
                        Send Us a Message
                    </h2>
                    <p className="font-inter text-sm text-cream/45 mb-7">
                        We&apos;ll reply within 24 hours during operating hours.
                    </p>
                    <ContactForm />
                </div>

                {/* ── RIGHT: Info panel (2/5) ── */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Map placeholder */}
                    <div className="relative w-full h-48 rounded-sm overflow-hidden bg-gradient-to-br from-oak via-charcoal-light to-oak-dark border border-ash/20">
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-cream/20">
                            <MapPin size={28} />
                            <p className="font-inter text-xs tracking-widest uppercase">
                                Map coming soon
                            </p>
                        </div>
                        {/* Corner accents */}
                        <div className="absolute top-3 left-3 w-8 h-8 border-t border-l border-ember/30" />
                        <div className="absolute bottom-3 right-3 w-8 h-8 border-b border-r border-ember/30" />
                    </div>

                    {/* Address & contact */}
                    <div className="bg-charcoal-light border border-ash/20 rounded-sm p-6 space-y-4">
                        <h3 className="font-playfair text-lg font-semibold text-cream">
                            Find Us
                        </h3>
                        <div className="space-y-3 font-inter text-sm text-cream/65">
                            <div className="flex items-start gap-3">
                                <MapPin size={15} className="text-ember mt-0.5 shrink-0" />
                                <div>
                                    <p>2418 South Congress Ave</p>
                                    <p>Austin, TX 78704</p>
                                </div>
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
                    </div>

                    {/* Hours — today highlighted */}
                    <div className="bg-charcoal-light border border-ash/20 rounded-sm p-6 space-y-4">
                        <div className="flex items-center gap-2">
                            <Clock size={15} className="text-ember" />
                            <h3 className="font-playfair text-lg font-semibold text-cream">
                                Opening Hours
                            </h3>
                        </div>
                        <div className="space-y-1.5">
                            {HOURS.map(({ label, days, time }) => {
                                const isToday = days.includes(austinDay);
                                return (
                                    <div
                                        key={label}
                                        className={[
                                            "flex justify-between items-center px-3 py-2 rounded-sm transition-colors duration-200",
                                            isToday
                                                ? "bg-ember/15 border border-ember/25"
                                                : "border border-transparent",
                                        ].join(" ")}
                                    >
                                        <span className={[
                                            "font-inter text-sm",
                                            isToday ? "text-cream font-semibold" : "text-cream/55",
                                        ].join(" ")}>
                                            {label}
                                            {isToday && (
                                                <span className="ml-2 font-inter text-[10px] text-ember uppercase tracking-widest">
                                                    Today
                                                </span>
                                            )}
                                        </span>
                                        <span className={[
                                            "font-inter text-sm tabular-nums",
                                            isToday ? "text-ember font-semibold" : "text-cream/70",
                                        ].join(" ")}>
                                            {time}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Parking */}
                    <div className="bg-charcoal-light border border-ash/20 rounded-sm p-6 space-y-3">
                        <div className="flex items-center gap-2">
                            <Car size={15} className="text-ember" />
                            <h3 className="font-playfair text-lg font-semibold text-cream">
                                Parking
                            </h3>
                        </div>
                        <p className="font-inter text-sm text-cream/60 leading-relaxed">
                            Complimentary valet is available Thursday through Saturday from
                            6:00 PM. Street parking is available on South Congress Avenue
                            and surrounding streets. The Sun & Moon parking garage (0.2 mi)
                            offers affordable all-evening rates.
                        </p>
                    </div>

                    {/* Private dining CTA */}
                    <div className="relative bg-gradient-to-br from-oak via-charcoal to-oak-dark border border-ember/25 rounded-sm p-6 space-y-3 overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_-20%,rgba(200,105,42,0.12),transparent)]" />
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-2">
                                <CalendarCheck size={15} className="text-ember" />
                                <h3 className="font-playfair text-lg font-semibold text-cream">
                                    Private Dining &amp; Events
                                </h3>
                            </div>
                            <p className="font-inter text-sm text-cream/60 leading-relaxed mb-4">
                                Our private dining room seats up to 30 guests and is available
                                for corporate events, celebrations, and rehearsal dinners.
                                Custom menus available on request.
                            </p>
                            <a
                                href="mailto:events@emberandoak.com"
                                className="inline-flex items-center gap-1.5 font-inter text-sm font-semibold text-ember hover:text-ember-light transition-colors duration-200 uppercase tracking-wider"
                            >
                                <Mail size={13} />
                                events@emberandoak.com
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
