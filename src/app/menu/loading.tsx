export default function MenuLoading() {
    return (
        <div className="min-h-screen bg-charcoal">
            {/* ── Page header skeleton ── */}
            <div className="relative bg-gradient-to-b from-oak/40 to-charcoal pt-16 pb-14 px-6 text-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_50%_-10%,rgba(200,105,42,0.1),transparent)] pointer-events-none" />
                <div className="h-3 w-24 bg-ash/20 rounded mx-auto mb-4 animate-pulse" />
                <div className="h-12 w-48 bg-ash/20 rounded mx-auto mb-5 animate-pulse" />
                {/* Decorative divider echo */}
                <div className="flex items-center justify-center gap-4 mt-2">
                    <div className="h-px w-16 bg-ash/20" />
                    <div className="w-1.5 h-1.5 rounded-full bg-ash/30" />
                    <div className="h-px w-16 bg-ash/20" />
                </div>
                <div className="mt-5 h-4 w-72 bg-ash/20 rounded mx-auto animate-pulse" />
            </div>

            {/* ── Menu grid skeleton ── */}
            <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
                {/* Category filter bar skeleton */}
                <div className="flex gap-2 flex-wrap mb-8">
                    {["All", "Starters", "Mains", "Desserts", "Drinks"].map((_, i) => (
                        <div
                            key={i}
                            className="h-8 w-20 rounded-sm bg-ash/20 animate-pulse"
                            style={{ animationDelay: `${i * 60}ms` }}
                        />
                    ))}
                </div>

                {/* Card grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 9 }).map((_, i) => (
                        <div
                            key={i}
                            className="bg-charcoal-light border border-ash/20 rounded-sm overflow-hidden animate-pulse"
                            style={{ animationDelay: `${i * 50}ms` }}
                        >
                            {/* Image area */}
                            <div className="h-44 bg-ash/20" />
                            {/* Content */}
                            <div className="p-5 space-y-3">
                                <div className="flex justify-between gap-3">
                                    <div className="h-4 bg-ash/25 rounded w-2/3" />
                                    <div className="h-4 bg-ash/25 rounded w-12" />
                                </div>
                                <div className="space-y-1.5">
                                    <div className="h-3 bg-ash/15 rounded w-full" />
                                    <div className="h-3 bg-ash/15 rounded w-4/5" />
                                </div>
                                {/* Badge echo */}
                                <div className="h-5 bg-ash/10 rounded w-20 mt-1" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
