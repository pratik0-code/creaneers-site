import Link from 'next/link';
import { Outfit } from 'next/font/google';

const outfit = Outfit({ subsets: ['latin'] });

export default function Header() {
    return (
        <header className={`${outfit.className} fixed top-0 w-full z-50 mix-blend-difference text-white py-6 px-6 md:px-12 flex justify-between items-center transition-all duration-300`}>
            <Link href="/" className="text-2xl font-bold tracking-tighter uppercase">
                CREANEERS
            </Link>

            <nav className="hidden md:flex space-x-8 text-sm uppercase tracking-widest font-light">
                <Link href="/works" className="hover:opacity-70 transition-opacity">Works</Link>
                <Link href="/about" className="hover:opacity-70 transition-opacity">About</Link>
                <Link href="/contact" className="hover:opacity-70 transition-opacity">Contact</Link>
            </nav>

            <div className="flex items-center space-x-6">
                <button aria-label="Search" className="hover:opacity-70 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </button>
            </div>
        </header>
    );
}
