"use client";

import Link from 'next/link';
import { Outfit } from 'next/font/google';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const outfit = Outfit({ subsets: ['latin'] });

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const isHome = pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [pathname]);

    const getHeaderClasses = () => {
        const baseClasses = `${outfit.className} fixed top-0 w-full z-50 py-6 px-6 md:px-12 flex justify-between items-center transition-all duration-300`;

        if (mobileMenuOpen) {
            return `${baseClasses} bg-transparent text-neutral-900 dark:text-white`;
        }

        if (isHome && !scrolled) {
            return `${baseClasses} bg-transparent text-white`;
        }

        return `${baseClasses} bg-white/90 dark:bg-black/90 backdrop-blur-md text-neutral-900 dark:text-white border-b border-neutral-100 dark:border-neutral-800 shadow-sm`;
    };

    return (
        <header className={getHeaderClasses()}>
            <Link href="/" className="text-2xl font-bold tracking-tighter uppercase z-50 relative">
                CREANEERS
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-8 text-sm uppercase tracking-widest font-light">
                <Link href="/works" className="hover:opacity-70 transition-opacity">Works</Link>
                <Link href="/about" className="hover:opacity-70 transition-opacity">About</Link>
                <Link href="/contact" className="hover:opacity-70 transition-opacity">Contact</Link>
            </nav>

            <div className="flex items-center space-x-6 z-50 relative">
                <button aria-label="Search" className="hover:opacity-70 transition-opacity hidden md:block">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </button>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden p-2 -mr-2"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                    )}
                </button>
            </div>

            {/* Mobile Nav Overlay */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 bg-white/95 dark:bg-black/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center space-y-10 md:hidden animate-in fade-in duration-200">
                    <Link href="/works" className="text-4xl font-serif text-neutral-900 dark:text-white hover:italic transition-all" onClick={() => setMobileMenuOpen(false)}>Works</Link>
                    <Link href="/about" className="text-4xl font-serif text-neutral-900 dark:text-white hover:italic transition-all" onClick={() => setMobileMenuOpen(false)}>About</Link>
                    <Link href="/contact" className="text-4xl font-serif text-neutral-900 dark:text-white hover:italic transition-all" onClick={() => setMobileMenuOpen(false)}>Contact</Link>

                    <div className="absolute bottom-12 text-xs uppercase tracking-widest text-neutral-400">
                        Creaneers &copy; {new Date().getFullYear()}
                    </div>
                </div>
            )}
        </header>
    );
}
