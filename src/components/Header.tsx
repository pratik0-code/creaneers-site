"use client";

import Link from 'next/link';
import Image from 'next/image';
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
        const handleRouteChange = () => {
            setMobileMenuOpen(false);
            setSearchOpen(false);
        };
        handleRouteChange();
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

    const isTransparent = isHome && !scrolled && !searchOpen;

    const getHeaderClasses = () => {
        const classes = `${outfit.className} fixed top-0 w-full z-50 py-4 px-6 md:px-12 flex justify-between items-center transition-all duration-300`;

        if (mobileMenuOpen) {
            return `${classes} bg-transparent text-neutral-900 dark:text-white`;
        }

        if (isTransparent) {
            return `${classes} bg-transparent text-white`;
        }

        return `${classes} bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md text-neutral-900 dark:text-white border-b border-neutral-100 dark:border-neutral-800 shadow-sm`;
    };

    return (
        <header className={getHeaderClasses()}>
            <Link href="/" className="z-50 relative flex items-center">
                <Image
                    src="/icon.png"
                    alt="CREANEERS"
                    width={112}
                    height={28}
                    className={`h-6 md:h-7 w-auto object-contain transition-all duration-300 brightness-0 hover:opacity-70 ${isTransparent ? 'invert' : 'dark:invert'}`}
                />
            </Link>

            {/* Desktop Nav */}
            <nav className={`hidden md:flex space-x-8 text-sm uppercase tracking-widest font-light transition-opacity duration-300 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${searchOpen ? 'opacity-0 pointer-events-none' : ''}`}>
                <Link href="/works" className="hover:opacity-70 transition-opacity text-inherit no-underline">Works</Link>
                <Link href="/blog" className="hover:opacity-70 transition-opacity text-inherit no-underline">Blog</Link>
                <Link href="/articles" className="hover:opacity-70 transition-opacity text-inherit no-underline">Articles</Link>
                <Link href="/about" className="hover:opacity-70 transition-opacity text-inherit no-underline">About</Link>
                <Link href="/contact" className="hover:opacity-70 transition-opacity text-inherit no-underline">Contact</Link>
            </nav>

            <div className="flex items-center space-x-6 z-50 relative">
                <AnimatePresence mode="wait">
                    {searchOpen ? (
                        <motion.form
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: 'auto', opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            key="search-form"
                            onSubmit={handleSearchSubmit}
                            className="flex items-center overflow-hidden bg-neutral-100 dark:bg-neutral-800 rounded-full px-4 py-1"
                        >
                            <input
                                ref={searchInputRef}
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-transparent border-none outline-none w-48 text-sm font-light placeholder:text-neutral-400"
                            />
                            <button
                                type="button"
                                onClick={() => setSearchOpen(false)}
                                className="ml-2 text-neutral-500 hover:opacity-70 bg-none border-none cursor-pointer flex items-center justify-center"
                            >
                                <span className="sr-only">Close</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </motion.form>
                    ) : (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.2 }}
                            key="search-btn"
                            aria-label="Search"
                            className="hidden md:block hover:opacity-70 transition-opacity bg-none border-none cursor-pointer text-inherit"
                            onClick={() => setSearchOpen(true)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        </motion.button>
                    )}
                </AnimatePresence>

                {/* Mobile Menu Toggle */}
                <button
                    className="block md:hidden p-2 -mr-2 bg-none border-none cursor-pointer text-inherit"
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
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        className="fixed inset-0 bg-white dark:bg-neutral-950 z-40 flex flex-col items-center justify-center space-y-10"
                    >
                        <form onSubmit={handleSearchSubmit} className="relative w-3/4 max-w-xs mb-8 flex items-center bg-neutral-100 dark:bg-neutral-800 rounded-full px-6 py-3">
                            <input
                                type="text"
                                placeholder="Search projects..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-transparent border-none outline-none text-lg text-center font-light placeholder:text-neutral-400 text-inherit"
                            />
                        </form>

                        <Link href="/works" className="text-4xl font-serif text-neutral-900 dark:text-white hover:italic transition-all duration-300 no-underline" onClick={() => setMobileMenuOpen(false)}>Works</Link>
                        <Link href="/blog" className="text-4xl font-serif text-neutral-900 dark:text-white hover:italic transition-all duration-300 no-underline" onClick={() => setMobileMenuOpen(false)}>Blog</Link>
                        <Link href="/articles" className="text-4xl font-serif text-neutral-900 dark:text-white hover:italic transition-all duration-300 no-underline" onClick={() => setMobileMenuOpen(false)}>Articles</Link>
                        <Link href="/about" className="text-4xl font-serif text-neutral-900 dark:text-white hover:italic transition-all duration-300 no-underline" onClick={() => setMobileMenuOpen(false)}>About</Link>
                        <Link href="/contact" className="text-4xl font-serif text-neutral-900 dark:text-white hover:italic transition-all duration-300 no-underline" onClick={() => setMobileMenuOpen(false)}>Contact</Link>

                        <div className="absolute bottom-12 text-xs uppercase tracking-widest text-neutral-400">
                            Creaneers &copy; {new Date().getFullYear()}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
