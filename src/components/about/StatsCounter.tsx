"use client";

import { useEffect, useRef, useState } from "react";

interface Stat {
    value: number;
    suffix: string;
    label: string;
    prefix?: string;
}

const STATS: Stat[] = [
    { value: 5, suffix: "", label: "Years Open" },
    { value: 40, suffix: "+", label: "Dishes on Menu" },
    { value: 12, suffix: "", label: "Local Suppliers" },
    { value: 25000, suffix: "+", label: "Reservations Served", prefix: "" },
];

function useCountUp(target: number, duration = 1800, active: boolean) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!active) return;
        let start: number | null = null;
        const step = (ts: number) => {
            if (!start) start = ts;
            const progress = Math.min((ts - start) / duration, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [target, duration, active]);

    return count;
}

function StatCard({ stat, active }: { stat: Stat; active: boolean }) {
    const count = useCountUp(stat.value, 1800, active);

    const display =
        stat.value >= 1000
            ? count.toLocaleString()
            : count.toString();

    return (
        <div className="text-center space-y-2 p-6">
            <p className="font-playfair text-5xl md:text-6xl font-bold text-ember">
                {stat.prefix ?? ""}{display}{stat.suffix}
            </p>
            <p className="font-inter text-sm text-cream/55 uppercase tracking-widest">
                {stat.label}
            </p>
        </div>
    );
}

export default function StatsCounter() {
    const ref = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setActive(true); observer.disconnect(); } },
            { threshold: 0.3 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-ash/20"
        >
            {STATS.map((stat) => (
                <StatCard key={stat.label} stat={stat} active={active} />
            ))}
        </div>
    );
}
