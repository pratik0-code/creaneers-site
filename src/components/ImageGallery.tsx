"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ImageGalleryProps {
    images: string[];
    title: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {images.map((img, idx) => (
                    <div
                        key={idx}
                        className={`relative overflow-hidden group cursor-pointer ${idx % 3 === 0 ? 'md:col-span-2 aspect-[21/9]' : 'aspect-[4/3]'}`}
                        onClick={() => setSelectedImage(img)}
                    >
                        <motion.img
                            layoutId={`img-${img}`} // Shared layout ID for smooth transition
                            src={img}
                            alt={`${title} image ${idx + 1}`}
                            className="object-cover w-full h-full filter grayscale hover:grayscale-0 active:grayscale-0 transition-[filter] duration-500 ease-in-out select-none"
                            style={{ WebkitTouchCallout: 'none' }}
                            onContextMenu={(e) => e.preventDefault()}
                            draggable={false}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 150, damping: 20 }}
                        />
                    </div>
                ))}
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        {/* Close Button */}
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ delay: 0.2 }}
                            className="absolute top-6 right-6 text-white hover:text-neutral-300 transition-colors z-50"
                            onClick={() => setSelectedImage(null)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </motion.button>

                        <div className="relative max-w-7xl w-full max-h-[90vh] flex items-center justify-center pointer-events-none">
                            <motion.img
                                layoutId={`img-${selectedImage}`} // Matching ID for shared transition
                                src={selectedImage}
                                alt="Full screen view"
                                className="max-w-full max-h-[90vh] object-contain shadow-2xl pointer-events-auto"
                                style={{ transformOrigin: "center" }} // Ensure origin is center for clean zoom
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                onClick={(e) => e.stopPropagation()}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
