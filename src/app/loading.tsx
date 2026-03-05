export default function Loading() {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-charcoal">
            {/* Animated ember flame SVG */}
            <div className="relative flex items-center justify-center mb-6">
                {/* Outer glow ring */}
                <div className="absolute w-24 h-24 rounded-full bg-ember/10 animate-ping" />
                <div className="absolute w-16 h-16 rounded-full bg-ember/15 animate-pulse" />

                {/* Flame SVG */}
                <svg
                    width="48"
                    height="64"
                    viewBox="0 0 48 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="relative z-10 animate-[flicker_1.8s_ease-in-out_infinite]"
                    aria-hidden="true"
                >
                    {/* Outer flame */}
                    <path
                        d="M24 2C24 2 8 18 8 34C8 43.94 15.06 52 24 52C32.94 52 40 43.94 40 34C40 18 24 2 24 2Z"
                        fill="url(#outerFlame)"
                        opacity="0.9"
                    />
                    {/* Inner flame core */}
                    <path
                        d="M24 22C24 22 16 30 16 38C16 42.42 19.58 46 24 46C28.42 46 32 42.42 32 38C32 30 24 22 24 22Z"
                        fill="url(#innerFlame)"
                    />
                    {/* Ember tip */}
                    <ellipse cx="24" cy="48" rx="5" ry="3" fill="#ff9966" opacity="0.6" />

                    <defs>
                        <linearGradient id="outerFlame" x1="24" y1="2" x2="24" y2="52" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="#ffcc44" />
                            <stop offset="45%" stopColor="#C8692A" />
                            <stop offset="100%" stopColor="#7c2d12" />
                        </linearGradient>
                        <linearGradient id="innerFlame" x1="24" y1="22" x2="24" y2="46" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="#fff7cc" />
                            <stop offset="50%" stopColor="#ff9933" />
                            <stop offset="100%" stopColor="#C8692A" stopOpacity="0.7" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            {/* Wordmark */}
            <p className="font-playfair text-xl text-cream/80 tracking-wide mb-1">
                Ember <span className="text-ember">&amp;</span> Oak
            </p>
            <p className="font-inter text-xs text-cream/30 tracking-[0.2em] uppercase">
                Loading…
            </p>

            {/* Subtle ember bar at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ember/40 to-transparent" />

            <style>{`
        @keyframes flicker {
          0%, 100% { transform: scaleX(1) scaleY(1) rotate(-1deg); opacity: 1; }
          25%       { transform: scaleX(0.97) scaleY(1.03) rotate(1deg); opacity: 0.95; }
          50%       { transform: scaleX(1.02) scaleY(0.98) rotate(-0.5deg); opacity: 1; }
          75%       { transform: scaleX(0.98) scaleY(1.02) rotate(1.5deg); opacity: 0.97; }
        }
      `}</style>
        </div>
    );
}
