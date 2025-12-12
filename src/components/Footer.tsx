import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-neutral-900 text-white py-20 px-6 md:px-6 mt-auto border-t border-neutral-800 dark:border-neutral-800">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start">
                <div>
                    <Link href="/" className="flex flex-col items-center mb-6 group w-fit">
                        <h2 className="text-4xl md:text-5xl tracking-tighter text-white leading-none group-hover:opacity-80 transition-opacity text-center">
                            CREANEERS
                        </h2>
                        <span className="text-xs md:text-sm font-light tracking-[0.2em] pl-[0.8em] text-neutral-500 block -mt-1 group-hover:text-white transition-colors duration-300 text-center">
                            Design & Consults
                        </span>
                    </Link>
                    <p className="text-neutral-300 dark:text-neutral-400 max-w-xs text-sm leading-relaxed">
                        Sculpting spaces that inspire, endure, and elevate the human experience.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-12 text-sm uppercase tracking-widest font-light">
                    <div className="flex flex-col space-y-4">
                        <span className="text-neutral-400 dark:text-neutral-500 mb-2 block">Connect</span>
                        <Link href="https://www.instagram.com/creaneers" target="_blank" className="hover:text-neutral-200 dark:hover:text-white transition-colors">Instagram</Link>
                        <Link href="https://twitter.com" target="_blank" className="hover:text-neutral-200 dark:hover:text-white transition-colors">Twitter</Link>
                        <Link href="https://linkedin.com" target="_blank" className="hover:text-neutral-200 dark:hover:text-white transition-colors">LinkedIn</Link>
                    </div>
                    <div className="flex flex-col space-y-4">
                        <span className="text-neutral-400 dark:text-neutral-500 mb-2 block">Sitemap</span>
                        <Link href="/works" className="hover:text-neutral-200 dark:hover:text-white transition-colors">Works</Link>
                        <Link href="/about" className="hover:text-neutral-200 dark:hover:text-white transition-colors">About</Link>
                        <Link href="/contact" className="hover:text-neutral-200 dark:hover:text-white transition-colors">Contact</Link>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-neutral-800 dark:border-neutral-800 flex justify-between items-center text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                <span>© {new Date().getFullYear()} CREANEERS Design and Consult.</span>
                <span>Made by Pratik Fuyal</span>
            </div>
        </footer >
    );
}
