"use client";

import Link from 'next/link';
import { Outfit } from 'next/font/google';
import { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { STORIES } from '@/lib/data';
import { AnimatePresence, motion } from 'framer-motion';

const outfit = Outfit({ subsets: ['latin'] });

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const searchInputRef = useRef<HTMLInputElement>(null);
    const pathname = usePathname();
    const router = useRouter();
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
        setSearchOpen(false);
    }, [pathname]);

    useEffect(() => {
        if (searchOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [searchOpen]);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const query = searchQuery.trim().toLowerCase();
        if (!query) return;

        const project = STORIES.find(s => s.title.toLowerCase().includes(query));

        if (project) {
            router.push(`/works/${project.id}`);
            setSearchQuery('');
            setSearchOpen(false);
            setMobileMenuOpen(false);
        } else {
            // Optional: Show error or shake animation
            alert('Project not found');
        }
    };

    const getHeaderClasses = () => {
        const baseClasses = `${outfit.className} fixed top-0 w-full z-50 py-6 px-6 md:px-12 flex justify-between items-center transition-all duration-300`;

        if (mobileMenuOpen) {
            return `${baseClasses} bg-transparent text-neutral-900 dark:text-white`;
        }

        if (isHome && !scrolled && !searchOpen) {
            return `${baseClasses} bg-transparent text-white`;
        }

        // Header.tsx updates
        return `${baseClasses} bg-background/90 backdrop-blur-md text-neutral-900 dark:text-white border-b border-neutral-100 dark:border-neutral-800 shadow-sm`;

    };

    return (
        <header className={getHeaderClasses()}>
            <Link href="/" className="z-50 relative">
                <img src="/icon.png" alt="CREANEERS" className="h-12 md:h-24 w-auto object-contain" />
            </Link>

            {/* Desktop Nav */}
            <nav className={`hidden md:flex space-x-8 text-sm uppercase tracking-widest font-light transition-opacity duration-300 ${searchOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                <Link href="/works" className="hover:opacity-70 transition-opacity">Works</Link>
                <Link href="/about" className="hover:opacity-70 transition-opacity">About</Link>
                <Link href="/contact" className="hover:opacity-70 transition-opacity">Contact</Link>
            </nav>

            <div className="flex items-center space-x-6 z-50 relative">
                {searchOpen ? (
                    <form onSubmit={handleSearchSubmit} className="flex items-center">
                        <input
                            ref={searchInputRef}
                            type="text"
                            placeholder="Search projects..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-transparent border-b border-current focus:outline-none w-32 py-1 text-sm font-mono placeholder:text-current/50"
                        />
                        <button
                            type="button"
                            onClick={() => setSearchOpen(false)}
                            className="ml-4 hover:opacity-70"
                        >
                            <span className="sr-only">Close</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    </form>
                ) : (
                    <button
                        aria-label="Search"
                        className="hover:opacity-70 transition-opacity hidden md:block"
                        onClick={() => setSearchOpen(true)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    </button>
                )}

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
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="fixed inset-0 bg-background/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center space-y-10 md:hidden"
                    >
                        <form onSubmit={handleSearchSubmit} className="relative w-3/4 max-w-xs mb-4">
                            <input
                                type="text"
                                placeholder="Search projects..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-transparent border-b border-neutral-800 dark:border-white/20 py-2 text-xl font-serif text-center placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors"
                            />
                        </form>

                        <Link href="/works" className="text-4xl font-serif text-neutral-900 dark:text-white hover:italic transition-all" onClick={() => setMobileMenuOpen(false)}>Works</Link>
                        <Link href="/about" className="text-4xl font-serif text-neutral-900 dark:text-white hover:italic transition-all" onClick={() => setMobileMenuOpen(false)}>About</Link>
                        <Link href="/contact" className="text-4xl font-serif text-neutral-900 dark:text-white hover:italic transition-all" onClick={() => setMobileMenuOpen(false)}>Contact</Link>

                        <div className="absolute bottom-12 text-xs uppercase tracking-widest text-neutral-400">
                            Creaneers &copy; {new Date().getFullYear()}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
