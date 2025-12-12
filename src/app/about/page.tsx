export default function AboutPage() {
    return (
        <div className="bg-background min-h-screen pt-32 pb-24 px-6 md:px-12">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-7xl font-serif mb-12 text-neutral-900 dark:text-white">About CREANEERS</h1>

                <div className="prose prose-lg prose-p:font-light prose-p:leading-loose">
                    <p className="text-xl md:text-2xl font-serif italic text-neutral-900 dark:text-neutral-100 mb-12">
                        "We build not just structures, but experiences. We engineer dreams into concrete reality."
                    </p>

                    <p className="text-neutral-800 dark:text-neutral-300">
                        CREANEERS is an avant-garde architectural firm committed to pushing the boundaries of design. Founded on the principles of sustainability, innovation, and aesthetic purity, we strive to create spaces that resonate with the human spirit.
                    </p>

                    <p className="text-neutral-800 dark:text-neutral-300">
                        Our team of architects, designers, and thinkers work collaboratively to solve complex spatial challenges. We believe that good architecture is a dialogue between the built environment and the natural world.
                    </p>

                    <h3 className="mt-12 font-serif text-3xl text-neutral-900 dark:text-white">Our Vision</h3>
                    <p className="text-neutral-800 dark:text-neutral-300">
                        To be global leaders in sustainable design, creating landmarks that stand the test of time. We approach every project, regardless of scale, with the same level of rigor and passion.
                    </p>
                </div>

                <div className="mt-20 border-t border-neutral-200 dark:border-neutral-800 pt-12">
                    <h4 className="text-sm uppercase tracking-widest font-medium mb-8 text-neutral-900 dark:text-neutral-100">Leadership</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-neutral-50 dark:bg-neutral-900 p-8">
                            <div className="w-16 h-16 bg-neutral-200 dark:bg-neutral-700 rounded-full mb-4" />
                            <h5 className="font-serif text-xl text-neutral-900 dark:text-white">Pranav Gautam</h5>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 uppercase tracking-wider mt-1">Founder</p>
                        </div>
                        <div className="bg-neutral-50 dark:bg-neutral-900 p-8">
                            <div className="w-16 h-16 bg-neutral-200 dark:bg-neutral-700 rounded-full mb-4" />
                            <h5 className="font-serif text-xl text-neutral-900 dark:text-white">Prayush Giri</h5>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 uppercase tracking-wider mt-1">Co-Founder</p>
                        </div>
                        <div className="bg-neutral-50 dark:bg-neutral-900 p-8">
                            <div className="w-16 h-16 bg-neutral-200 dark:bg-neutral-700 rounded-full mb-4" />
                            <h5 className="font-serif text-xl text-neutral-900 dark:text-white">Goveenda Budathoki</h5>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 uppercase tracking-wider mt-1">Co-Founder</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
