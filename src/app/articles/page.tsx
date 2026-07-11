"use client";

import { useState } from "react";
import { ARTICLES, Article } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { Outfit } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"] });

export default function ArticlesPage() {
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

    return (
        <main className="min-h-screen pt-32 pb-16 px-6 md:px-12 bg-neutral-50 dark:bg-neutral-950">
            <div className="max-w-7xl mx-auto">
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`${outfit.className} text-5xl md:text-7xl font-light mb-12 text-neutral-900 dark:text-white uppercase tracking-tighter`}
                >
                    Articles
                </motion.h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {ARTICLES.map((article, index) => (
                        <motion.div
                            key={article.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group cursor-pointer bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                            onClick={() => setSelectedArticle(article)}
                        >
                            <div className="p-8 flex-1 flex flex-col">
                                <div className="text-xs uppercase tracking-widest text-neutral-500 mb-4 font-medium">
                                    {new Date(article.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                                </div>
                                <h2 className="text-2xl font-serif text-neutral-900 dark:text-white mb-4 group-hover:italic transition-all">
                                    {article.title}
                                </h2>
                                <p className="text-neutral-600 dark:text-neutral-400 font-light flex-1 line-clamp-3">
                                    {article.excerpt}
                                </p>
                                <div className="mt-6 flex items-center justify-between border-t border-neutral-100 dark:border-neutral-800 pt-6">
                                    <span className="text-sm font-medium text-neutral-900 dark:text-white">
                                        {article.author}
                                    </span>
                                    <span className="text-sm uppercase tracking-widest text-neutral-500 group-hover:text-black dark:group-hover:text-white transition-colors flex items-center gap-2">
                                        Read PDF
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {ARTICLES.length === 0 && (
                    <div className="py-20 text-center">
                        <p className="text-xl text-neutral-500 font-light">No articles published yet.</p>
                    </div>
                )}
            </div>

            {/* PDF Modal Viewer */}
            <AnimatePresence>
                {selectedArticle && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-10"
                        onClick={() => setSelectedArticle(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="bg-white dark:bg-neutral-900 rounded-xl overflow-hidden w-full max-w-6xl h-full max-h-[90vh] flex flex-col shadow-2xl relative"
                            onClick={(e) => e.stopPropagation()} // Prevent clicks inside modal from closing it
                        >
                            <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-800">
                                <h3 className="text-lg font-serif text-neutral-900 dark:text-white truncate pr-4">
                                    {selectedArticle.title}
                                </h3>
                                <div className="flex items-center gap-4">
                                    <a 
                                        href={selectedArticle.pdfUrl} 
                                        download 
                                        className="text-sm font-medium uppercase tracking-widest text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
                                    >
                                        Download
                                    </a>
                                    <button 
                                        onClick={() => setSelectedArticle(null)}
                                        className="p-2 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-full transition-colors text-neutral-900 dark:text-white"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                    </button>
                                </div>
                            </div>
                            
                            <div className="flex-1 bg-neutral-200 dark:bg-neutral-950 w-full h-full relative">
                                {selectedArticle.pdfUrl ? (
                                    <iframe 
                                        src={`${selectedArticle.pdfUrl}#toolbar=0`}
                                        className="absolute inset-0 w-full h-full border-none"
                                        title={selectedArticle.title}
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center text-neutral-500">
                                        No PDF attached to this article.
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
