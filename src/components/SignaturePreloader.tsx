"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { useEffect, useState } from "react";

export default function SignaturePreloader() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 4000); // Extended duration to ensure text is fully visible
        return () => clearTimeout(timer);
    }, []);

    // Handwritten House Animation - Exact Logo Replication
    // Path 1: Base Left -> Left Wall -> Roof Peak -> Roof Right limit.
    // The logo shows the base line connects to the left wall.
    // Path 2: First Vertical Pillar (Tall)
    // Path 3: Second Vertical Pillar (Short)

    const drawVariants: Variants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: (custom: number) => ({
            pathLength: 1,
            opacity: 1,
            transition: {
                pathLength: { delay: custom * 0.4, type: "spring", duration: 1.5, bounce: 0 },
                opacity: { delay: custom * 0.4, duration: 0.01 }
            }
        })
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950"
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                    <div className="flex items-center gap-6 md:gap-10 translate-y-[-10%]">
                        {/* Logo Container */}
                        <div className="w-32 h-32 md:w-40 md:h-40 relative flex-shrink-0">
                            <svg
                                viewBox="0 0 200 200"
                                className="w-full h-full text-white"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="10"
                                strokeLinecap="square" // Rectangular edges
                                strokeLinejoin="miter" // Sharp corners
                            >
                                {/* Main Outline: Base(Right-to-Left) -> Wall -> Roof Peak -> Roof End */}
                                <motion.path
                                    d="M 110 150 L 50 150 L 50 80 L 100 30 L 130 60"
                                    variants={drawVariants}
                                    initial="hidden"
                                    animate="visible"
                                    custom={0}
                                />

                                {/* Vertical Pillar 1 (Taller) */}
                                <motion.path
                                    d="M 150 150 L 150 80"
                                    variants={drawVariants}
                                    initial="hidden"
                                    animate="visible"
                                    custom={1}
                                />

                                {/* Vertical Pillar 2 (Shorter) - Moved right for gap */}
                                <motion.path
                                    d="M 180 150 L 180 110"
                                    variants={drawVariants}
                                    initial="hidden"
                                    animate="visible"
                                    custom={2}
                                />

                                {/* Dashed Connector: Bottoms (House Base -> Pillars) */}
                                <motion.path
                                    d="M 110 150 L 190 150"
                                    variants={drawVariants}
                                    initial="hidden"
                                    animate="visible"
                                    custom={3}
                                    strokeDasharray="4 4"
                                    strokeWidth="3" // Very thin
                                    className="opacity-50"
                                />

                                {/* Dashed Connector: Tops (Roof Projection) */}
                                <motion.path
                                    d="M 130 60 L 190 120"
                                    variants={drawVariants}
                                    initial="hidden"
                                    animate="visible"
                                    custom={4}
                                    strokeDasharray="4 4"
                                    strokeWidth="3" // Very thin
                                    className="opacity-50"
                                />
                            </svg>
                        </div>

                        {/* Text Container */}
                        <div className="flex flex-col text-white">
                            <motion.h1
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
                                className="text-4xl md:text-6xl font-bold tracking-tight leading-none"
                            >
                                Creaneers
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.8, duration: 0.8 }}
                                className="text-sm md:text-lg font-light tracking-[0.3em] uppercase opacity-80 mt-1 md:mt-2"
                            >
                                Design & Consults
                            </motion.p>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
