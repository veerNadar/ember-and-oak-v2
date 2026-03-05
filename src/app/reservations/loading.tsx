export default function ReservationsLoading() {
    return (
        <div className="min-h-screen bg-charcoal">
            {/* ── Page header skeleton ── */}
            <div className="relative bg-gradient-to-b from-oak/40 to-charcoal pt-16 pb-12 px-6 text-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_50%_-10%,rgba(200,105,42,0.1),transparent)] pointer-events-none" />
                <div className="h-3 w-24 bg-ash/20 rounded mx-auto mb-4 animate-pulse" />
                <div className="h-12 w-56 bg-ash/20 rounded mx-auto mb-4 animate-pulse" />
                <div className="flex items-center justify-center gap-4 mt-2">
                    <div className="h-px w-16 bg-ash/20" />
                    <div className="w-1.5 h-1.5 rounded-full bg-ash/30" />
                    <div className="h-px w-16 bg-ash/20" />
                </div>
                <div className="mt-5 h-4 w-80 bg-ash/20 rounded mx-auto animate-pulse" />
            </div>

            {/* ── Two-column layout skeleton ── */}
            <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-start">

                {/* LEFT: Form panel (3/5) */}
                <div className="lg:col-span-3 bg-charcoal-light border border-ash/20 rounded-sm p-6 md:p-8 space-y-6 animate-pulse">
                    {/* Form heading */}
                    <div className="space-y-2">
                        <div className="h-6 bg-ash/25 rounded w-36" />
                        <div className="h-3 bg-ash/15 rounded w-64" />
                    </div>

                    {/* Row 1: Name + Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <div className="h-3 bg-ash/20 rounded w-20" />
                            <div className="h-10 bg-ash/15 rounded-sm border border-ash/20" />
                        </div>
                        <div className="space-y-2">
                            <div className="h-3 bg-ash/20 rounded w-24" />
                            <div className="h-10 bg-ash/15 rounded-sm border border-ash/20" />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <div className="h-3 bg-ash/20 rounded w-28" />
                        <div className="h-10 bg-ash/15 rounded-sm border border-ash/20" />
                    </div>

                    {/* Row 2: Date + Time */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <div className="h-3 bg-ash/20 rounded w-12" />
                            <div className="h-10 bg-ash/15 rounded-sm border border-ash/20" />
                        </div>
                        <div className="space-y-2">
                            <div className="h-3 bg-ash/20 rounded w-14" />
                            <div className="h-10 bg-ash/15 rounded-sm border border-ash/20" />
                        </div>
                    </div>

                    {/* Party size */}
                    <div className="space-y-2">
                        <div className="h-3 bg-ash/20 rounded w-20" />
                        <div className="h-10 bg-ash/15 rounded-sm border border-ash/20" />
                    </div>

                    {/* Notes textarea */}
                    <div className="space-y-2">
                        <div className="h-3 bg-ash/20 rounded w-32" />
                        <div className="h-28 bg-ash/15 rounded-sm border border-ash/20" />
                    </div>

                    {/* Submit button */}
                    <div className="h-12 bg-ash/25 rounded-sm" />
                </div>

                {/* RIGHT: Info panels (2/5) */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Contact card */}
                    <div className="bg-charcoal-light border border-ash/20 rounded-sm p-6 space-y-4 animate-pulse">
                        <div className="h-5 bg-ash/25 rounded w-20" />
                        <div className="space-y-3">
                            {[60, 44, 56].map((w, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-4 h-4 rounded-sm bg-ash/25 shrink-0" />
                                    <div className={`h-3 bg-ash/15 rounded w-${w === 60 ? "3/5" : w === 44 ? "2/5" : "1/2"}`} />
                                </div>
                            ))}
                        </div>
                        <div className="pt-2 border-t border-ash/20 space-y-2">
                            <div className="h-3 bg-ash/20 rounded w-16" />
                            {[0, 1, 2].map((i) => (
                                <div key={i} className="flex justify-between">
                                    <div className="h-3 bg-ash/15 rounded w-2/5" />
                                    <div className="h-3 bg-ash/15 rounded w-1/4" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* What to expect card */}
                    <div className="bg-charcoal-light border border-ash/20 rounded-sm p-6 space-y-4 animate-pulse">
                        <div className="h-5 bg-ash/25 rounded w-36" />
                        <div className="space-y-3">
                            {[0, 1, 2, 3].map((i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <div className="w-4 h-4 rounded-full bg-ash/25 shrink-0 mt-0.5" />
                                    <div className="space-y-1 flex-1">
                                        <div className="h-3 bg-ash/15 rounded w-full" />
                                        <div className="h-3 bg-ash/15 rounded w-4/5" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Alert card */}
                    <div className="flex items-start gap-3 bg-ember/5 border border-ember/20 rounded-sm p-5 animate-pulse">
                        <div className="w-4 h-4 rounded-sm bg-ember/20 shrink-0 mt-0.5" />
                        <div className="space-y-2 flex-1">
                            <div className="h-3 bg-ash/20 rounded w-36" />
                            <div className="h-3 bg-ash/15 rounded w-full" />
                            <div className="h-3 bg-ash/15 rounded w-4/5" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
