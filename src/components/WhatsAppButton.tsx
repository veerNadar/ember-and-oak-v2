"use client";

import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
    const pathname = usePathname();

    // Hide on all /admin pages
    if (pathname.startsWith("/admin")) return null;

    return (
        <a
            href="https://wa.me/15551234567"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
            className="group fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg animate-pulse"
            style={{ backgroundColor: "#25D366" }}
        >
            <MessageCircle size={28} color="white" strokeWidth={2} />

            {/* Tooltip */}
            <span
                className="
                    pointer-events-none absolute bottom-full right-0 mb-2
                    whitespace-nowrap rounded-sm bg-charcoal px-3 py-1.5
                    font-inter text-xs text-cream shadow-md
                    opacity-0 translate-y-1 transition-all duration-200
                    group-hover:opacity-100 group-hover:translate-y-0
                "
            >
                Chat with us
            </span>
        </a>
    );
}
