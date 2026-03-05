"use client";

import React from "react";
import Link from "next/link";
import { Flame, ArrowRight } from "lucide-react";

interface State {
    hasError: boolean;
}

// Elegant placeholder cards shown when the DB fetch fails
const PLACEHOLDERS = [
    {
        name: "Dry-Aged Ribeye",
        description: "28-day aged prime ribeye, oak-ember charred, with bone marrow butter and roasted shallot jus.",
        price: "68",
    },
    {
        name: "Wild Mushroom Risotto",
        description: "Arborio, forest mushroom duxelles, truffle oil, aged Parmesan, and fresh herbed breadcrumbs.",
        price: "32",
    },
    {
        name: "Oak-Smoked Burrata",
        description: "House-smoked burrata, heirloom tomato, basil oil, wild arugula, and grilled sourdough.",
        price: "24",
    },
];

const CARD_GRADIENTS = [
    "from-oak via-charcoal to-oak-dark",
    "from-charcoal via-oak-light to-charcoal-light",
    "from-oak-dark via-charcoal to-oak",
];

function PlaceholderCards() {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                {PLACEHOLDERS.map((dish, i) => (
                    <article
                        key={dish.name}
                        className="group relative bg-charcoal-light rounded-sm overflow-hidden border border-ash/20 hover:border-ember/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-ember/10"
                    >
                        {/* Decorative image area */}
                        <div
                            className={`relative h-52 bg-gradient-to-br ${CARD_GRADIENTS[i % 3]} overflow-hidden`}
                        >
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Flame size={40} className="text-ember/20" />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-3">
                            <div className="flex items-start justify-between gap-4">
                                <h3 className="font-playfair text-lg font-semibold text-cream leading-snug group-hover:text-ember-light transition-colors duration-200">
                                    {dish.name}
                                </h3>
                                <span className="shrink-0 font-inter text-base font-semibold text-ember">
                                    ${dish.price}
                                </span>
                            </div>
                            <p className="font-inter text-sm text-cream/60 leading-relaxed line-clamp-3">
                                {dish.description}
                            </p>
                        </div>

                        {/* Bottom ember line on hover */}
                        <div className="absolute bottom-0 left-0 right-0 h-px bg-ember scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    </article>
                ))}
            </div>

            {/* Subtle note */}
            <p className="text-center font-inter text-xs text-cream/25 italic">
                Live menu unavailable — showing featured selections.
            </p>
        </div>
    );
}

export default class FeaturedDishesErrorBoundary extends React.Component<
    { children: React.ReactNode },
    State
> {
    constructor(props: { children: React.ReactNode }) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(): State {
        return { hasError: true };
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        console.error("[FeaturedDishes] Error fetching dishes:", error, info.componentStack);
    }

    render() {
        if (this.state.hasError) {
            return <PlaceholderCards />;
        }
        return this.props.children;
    }
}
