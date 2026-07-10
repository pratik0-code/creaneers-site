import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-neutral-900 text-white py-20 px-6 mt-auto border-t border-neutral-800">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start">
                <div>
                    <Link href="/" className="flex flex-col items-center mb-6 w-fit text-decoration-none group">
                        <h2 className="text-4xl md:text-5xl tracking-tighter text-white leading-none text-center transition-opacity group-hover:opacity-80">
                            CREANEERS
                        </h2>
                        <span className="text-xs md:text-sm font-light tracking-[0.2em] pl-[0.8em] text-neutral-500 block -mt-1 text-center transition-colors group-hover:text-white">
                            Design & Consults
                        </span>
                    </Link>
                    <p className="text-neutral-300 dark:text-neutral-400 max-w-xs text-sm leading-relaxed">
                        Sculpting spaces that inspire, endure, and elevate the human experience.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-12 text-sm uppercase tracking-widest font-light mt-12 md:mt-0">
                    <div className="flex flex-col space-y-4">
                        <span className="text-neutral-400 dark:text-neutral-500 mb-2 block">Connect</span>
                        <Link href="https://www.instagram.com/creaneers" target="_blank" className="text-inherit hover:text-neutral-200 dark:hover:text-white transition-colors no-underline">Instagram</Link>
                        <Link href="https://www.tiktok.com/@creaneers.design" target="_blank" className="text-inherit hover:text-neutral-200 dark:hover:text-white transition-colors no-underline">Tiktok</Link>
                        <Link href="https://www.linkedin.com/in/creaneers-design-and-consults-0048a33a3/" target="_blank" className="text-inherit hover:text-neutral-200 dark:hover:text-white transition-colors no-underline">LinkedIn</Link>
                    </div>
                    <div className="flex flex-col space-y-4">
                        <span className="text-neutral-400 dark:text-neutral-500 mb-2 block">Sitemap</span>
                        <Link href="/works" className="text-inherit hover:text-neutral-200 dark:hover:text-white transition-colors no-underline">Works</Link>
                        <Link href="/blog" className="text-inherit hover:text-neutral-200 dark:hover:text-white transition-colors no-underline">Blog</Link>
                        <Link href="/about" className="text-inherit hover:text-neutral-200 dark:hover:text-white transition-colors no-underline">About</Link>
                        <Link href="/contact" className="text-inherit hover:text-neutral-200 dark:hover:text-white transition-colors no-underline">Contact</Link>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-neutral-800 flex justify-between items-center text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                <span>© {new Date().getFullYear()} CREANEERS Design and Consult.</span>
            </div>
        </footer >
    );
}
