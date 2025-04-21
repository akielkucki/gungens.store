'use client';

import React, {JSX, useEffect, useState} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import {AnimatePresence, motion} from 'framer-motion';
import {Star} from 'lucide-react';
import {categories, featuredProducts} from '@/libs/productData';
import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";
import Navbar from "@/components/navbar";
import CTA from "@/components/cta";
import FAQ from "@/components/faq";
import Testimonials from "@/components/testimonials";
import Benefits from "@/components/benefits";
import Products from "@/components/products";

export default function StoreContent(): JSX.Element {
    const searchParams = useSearchParams();
    const router = useRouter();

    const initialCategory = searchParams.get('category') || 'ranks';
    const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
    const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
    const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0);
    const [showPromotion, setShowPromotion] = useState(true);

    // Update URL when category changes
    useEffect(() => {
        router.push(`/?category=${activeCategory}`, { scroll: false });
    }, [activeCategory, router]);

    // Rotate featured products
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentFeaturedIndex((prev) => (prev + 1) % featuredProducts.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const currentCategory = categories.find(cat => cat.id === activeCategory);

    // Provide a fallback for type safety
    if (!currentCategory) {
        return <div>Category not found</div>;
    }

    function hoverOverProduct(id: number) {
        setHoveredProduct(id)

    }

    return (
        <div className="min-h-screen luxury-bg-texture">
            <Header />

            {/* Hero Promotion Banner */}
            {showPromotion && (
                <div className="relative bg-gradient-to-r from-black to-gray-900 text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <Star className="h-4 w-4 luxury-accent" />
                            <p className="text-sm font-medium">
                                <span className="gold-gradient-text">LIMITED TIME:</span> {featuredProducts[currentFeaturedIndex].discount} {featuredProducts[currentFeaturedIndex].name} - Ends {featuredProducts[currentFeaturedIndex].endDate}
                            </p>
                        </div>
                        <button
                            onClick={() => setShowPromotion(false)}
                            className="text-white opacity-70 hover:opacity-100"
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}

            {/* Navigation */}
            <Navbar setActiveCategory={setActiveCategory} activeCategory={activeCategory} />

            <main className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                {/* Featured banner */}
                <div className="mb-16 rounded-2xl overflow-hidden relative luxury-card">
                    <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentFeaturedIndex}
                                initial={{opacity: 0, x: 20}}
                                animate={{opacity: 1, x: 0}}
                                exit={{opacity: 0, x: -20}}
                                transition={{duration: 0.5}}
                                className="mb-8 md:mb-0 md:mr-8 md:w-2/3"
                            >
                                <div className="flex flex-col ">
                                <div
                                    className="inline-block px-3 py-1 rounded-full bg-[#d4af37] text-black text-xs font-bold mb-4 ">
                                    FEATURED OFFER
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold mb-4 gold-gradient-text">{featuredProducts[currentFeaturedIndex].name}</h2>
                                </div>
                                <p className="mb-6 text-gray-300">{featuredProducts[currentFeaturedIndex].description}</p>
                                <div className="flex items-center mb-6">
                                    <div
                                        className="text-2xl font-bold luxury-accent mr-3">{featuredProducts[currentFeaturedIndex].discount}</div>
                                    <div className="text-sm text-gray-300">Offer
                                        ends {featuredProducts[currentFeaturedIndex].endDate}</div>
                                </div>
                                <button
                                    className="luxury-button px-6 py-3 rounded-lg transition-all">
                                    Shop Now
                                </button>

                            </motion.div>
                        </AnimatePresence>
                        <div className="w-full md:w-1/3 flex justify-center">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentFeaturedIndex}
                                    initial={{scale: 0, opacity: 0}}
                                    animate={{scale: 1.1, opacity: 1}}
                                    exit={{scale: 0, opacity: 0}}
                                    transition={{duration: 0.5}}
                                >
                                    <div className="w-40 h-40 rounded-full bg-[#d4af37] opacity-20 absolute blur-3xl"></div>
                                    <Image src={featuredProducts[currentFeaturedIndex].backgroundImage} alt={featuredProducts[currentFeaturedIndex].name} width={400} height={400} />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                    <div className="absolute inset-0 bg-[#d4af37] opacity-5 z-0"></div>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCategory}
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -20}}
                        transition={{duration: 0.4}}
                    >
                        <div className="text-center mb-16">
                            <div className="flex items-center justify-center">
                            <motion.div
                                className="inline-block mb-4 p-3 rounded-lg bg-[#171717] text-[#d4af37] "
                                initial={{scale: 0.8}}
                                animate={{scale: 1}}
                                transition={{duration: 0.3}}
                            >
                                {React.createElement(currentCategory.icon, {className: "h-8 w-8"})}
                            </motion.div>
                            <h2 className="text-4xl font-bold tracking-tight mb-4  gold-gradient-text">{currentCategory.name}</h2>
                            </div>
                            <p className="max-w-2xl mx-auto text-gray-400">
                                {activeCategory === 'ranks' && "Choose from our premium ranks to unlock exclusive features and stand out from the crowd."}
                                {activeCategory === 'crates' && "Unlock rare and powerful items with our premium crate keys."}
                                {activeCategory === 'punishments' && "Appeal bans and restrictions to get back in the game."}
                                {activeCategory === 'tokens' && "Purchase token packs to use in our in-game marketplace."}
                                {activeCategory === 'bank' && "Securely manage your in-game finances with our premium banking system."}
                            </p>
                        </div>

                        <Products setHoveredProduct={setHoveredProduct} hoverOverProduct={hoverOverProduct} currentCategory={currentCategory} hoveredProduct={hoveredProduct} />

                        {/* Benefits Section */}
                        <Benefits/>

                        {/* Testimonials Section */}
                        <Testimonials/>

                        {/* FAQ Section */}
                        <FAQ/>

                        {/* Call to Action */}
                        <CTA/>
                    </motion.div>
                </AnimatePresence>
            </main>

            <Footer />

            <style jsx global>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
}