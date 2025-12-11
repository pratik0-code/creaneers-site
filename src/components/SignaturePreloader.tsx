"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function SignaturePreloader() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 2500); // Reduced to 2.5s for faster dismissal
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
                    <div className="w-full max-w-4xl px-4">
                        <svg
                            viewBox="0 0 800 300"
                            className="w-full h-auto"
                        >
                            <motion.path
                                d="M 120 160 C 60 160 60 40 140 60 C 160 65 150 120 170 120 C 180 120 180 90 190 90 C 200 90 210 90 195 120 C 190 130 220 130 230 120 C 240 110 230 90 245 90 C 260 90 260 130 245 120 C 240 115 270 120 280 120 C 290 120 290 90 305 90 C 320 90 320 120 330 120 C 340 120 350 120 340 90 C 330 80 360 130 380 120 C 390 120 400 120 390 90 C 380 80 410 130 430 120 C 440 115 430 90 450 90 C 470 90 460 130 490 110 C 500 100 490 90 470 120 M 100 180 C 200 190 400 170 550 180"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="4"
                                className="text-neutral-900 dark:text-white"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                transition={{ duration: 2.0, ease: "easeInOut" }}
                            />
                        </svg>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
