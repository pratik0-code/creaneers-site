import Image from "next/image";

export default function AboutPage() {
    return (
        <div className="bg-white dark:bg-neutral-950 min-h-screen pt-32 pb-24 px-6 md:px-12">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-7xl font-serif mb-12 text-neutral-900 dark:text-white">About CREANEERS</h1>

                <div className="prose prose-lg prose-p:font-light prose-p:leading-loose">
                    <p className="text-xl md:text-2xl font-serif italic text-neutral-900 dark:text-neutral-100 mb-12 leading-loose">
                        &ldquo;We build not just structures, but experiences. We engineer dreams into concrete reality.&rdquo;
                    </p>

                    <p className="text-neutral-800 dark:text-neutral-300 mb-6 leading-relaxed">
                        CREANEERS is an avant-garde architectural firm committed to pushing the boundaries of design. Founded on the principles of sustainability, innovation, and aesthetic purity, we strive to create spaces that resonate with the human spirit.
                    </p>

                    <p className="text-neutral-800 dark:text-neutral-300 mb-6 leading-relaxed">
                        Our team of architects, designers, and thinkers work collaboratively to solve complex spatial challenges. We believe that good architecture is a dialogue between the built environment and the natural world.
                    </p>

                    <h3 className="mt-12 font-serif text-3xl text-neutral-900 dark:text-white mb-4">Our Vision</h3>
                    <p className="text-neutral-800 dark:text-neutral-300 mb-6 leading-relaxed">
                        To be global leaders in sustainable design, creating landmarks that stand the test of time. We approach every project, regardless of scale, with the same level of rigor and passion.
                    </p>
                </div>

                <div className="mt-20 border-t border-neutral-200 dark:border-neutral-800 pt-12">
                    <h4 className="text-sm uppercase tracking-widest font-medium mb-8 text-neutral-900 dark:text-neutral-100">Leadership</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="group relative w-full aspect-square overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                            <Image
                                src="/images/Professionals/pranav_gautam.JPG"
                                alt="Pranav Gautam"
                                fill
                                quality={100}
                                priority
                                unoptimized
                                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-5 pt-20 flex flex-col items-start justify-end">
                                <h5 className="font-serif text-2xl text-white mb-1">Pranav Gautam</h5>
                                <p className="text-sm text-neutral-300 uppercase tracking-wider mt-1">Founder</p>
                                <p className="text-sm text-neutral-300 uppercase tracking-wider mt-1">Engineer</p>
                            </div>
                        </div>
                        <div className="group relative w-full aspect-square overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                            <Image
                                src="/images/Professionals/prayushgiri.jpeg"
                                alt="Prayush Giri"
                                fill
                                quality={100}
                                priority
                                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-5 pt-20 flex flex-col items-start justify-end">
                                <h5 className="font-serif text-2xl text-white mb-1">Prayush Giri</h5>
                                <p className="text-sm text-neutral-300 uppercase tracking-wider mt-1">Co-Founder</p>
                                <p className="text-sm text-neutral-300 uppercase tracking-wider mt-1">Architect</p>
                            </div>
                        </div>
                        <div className="group relative w-full aspect-square overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                            <Image
                                src="/images/Professionals/govindabudathoki.jpeg"
                                alt="Goveenda Budathoki"
                                fill
                                quality={100}
                                priority
                                unoptimized
                                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-5 pt-20 flex flex-col items-start justify-end">
                                <h5 className="font-serif text-2xl text-white mb-1">Goveenda Budathoki</h5>
                                <p className="text-sm text-neutral-300 uppercase tracking-wider mt-1">Co-Founder</p>
                                <p className="text-sm text-neutral-300 uppercase tracking-wider mt-1">Architect</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
