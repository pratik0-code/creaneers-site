import Link from 'next/link';

export default function HeroSection() {
    return (
        <section className="relative h-[90vh] w-full overflow-hidden flex items-center justify-center">
            {/* Background Image - Placeholder until we have real assets */}
            <div className="absolute inset-0 z-0 bg-neutral-200">
                {/* In a real app, this would be a high-quality Next/Image */}
                <div className="w-full h-full bg-stone-300 animate-pulse relative">
                    <div className="absolute inset-0 flex items-center justify-center text-stone-400 text-6xl opacity-20 font-serif italic">
                        Visual Storytelling
                    </div>
                </div>
            </div>

            <div className="absolute inset-0 bg-black/40 z-10" />

            <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 uppercase leading-[0.9]">
                    Design For <br /> <span className="font-serif italic capitalize font-normal">Living</span>
                </h1>
                <p className="text-lg md:text-xl font-light tracking-wide mb-10 max-w-2xl mx-auto opacity-90">
                    We believe architecture is not just about buildings, but about shaping the invisible space between them.
                </p>
                <Link
                    href="/works"
                    className="inline-block border border-white px-8 py-3 text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
                >
                    View Projects
                </Link>
            </div>
        </section>
    );
}
