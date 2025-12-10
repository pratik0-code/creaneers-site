"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function SignaturePreloader() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 5000); // Extended duration for multiple signatures
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                    <svg
                        viewBox="0 0 600 300"
                        className="w-full h-full max-w-2xl px-10 text-neutral-900 dark:text-white"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        {/* Creaneers Cursive Signature - Centered */}
                        <motion.g transform="translate(50, 100)">
                            {/* Letter C */}
                            <motion.path
                                d="M 80 50 c -40 -40 -60 60 -10 60"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                transition={{ duration: 0.4, ease: "easeInOut", delay: 0.5 }}
                            />
                            {/* Letters reaneers */}
                            <motion.path
                                d="M 70 110 c 10 -10 10 -30 20 -30 c 10 0 10 20 10 30 c 10 -20 20 -30 30 -10 c 5 10 0 20 -10 10 c -10 -10 0 -30 20 -20 c 20 10 10 30 30 30 c 10 -10 20 -20 30 -20 c 10 0 10 20 10 30 c 0 -20 10 -30 20 -30 c 10 0 10 20 10 30 c 10 -20 20 -30 30 -10 c 5 10 0 20 -10 10 c -10 -10 0 -30 20 -20 c 20 10 10 30 30 30 c 10 -20 20 -30 30 -10 c 5 10 0 20 -10 10 c -10 -10 0 -30 20 -20 c 20 10 10 30 30 30 c 10 -20 10 -30 20 -30 c 10 0 10 20 10 20 c 10 -10 20 -20 30 0 c 10 20 -10 20 -20 10"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                transition={{ duration: 2.0, ease: "linear", delay: 0.9 }}
                            />

                            {/* Energetic Underline/Swoosh */}
                            <motion.path
                                d="M 40 140 q 100 20 250 -10 t 150 10"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                strokeWidth="3"
                                transition={{ duration: 0.6, ease: "easeOut", delay: 3.0 }}
                            />
                        </motion.g>
                    </svg>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
