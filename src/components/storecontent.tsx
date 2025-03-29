// components/StoreContent.tsx
'use client';

import {useState, useEffect, JSX} from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Star, Shield, Award, Clock, Heart } from 'lucide-react';
import { categories } from '@/libs/productData';
import React from 'react';
import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";

// Testimonial interface
interface Testimonial {
    id: number;
    name: string;
    role: string;
    content: string;
    avatar: string;
    rating: number;
}

// Sample testimonials
const testimonials: Testimonial[] = [
    {
        id: 1,
        name: "Sarah Johnson",
        role: "Premium Member",
        content: "The Gold Rank has completely transformed my experience. The exclusive features are worth every penny!",
        avatar: "/avatars/sarah.jpg",
        rating: 5
    },
    {
        id: 2,
        name: "Michael Chen",
        role: "Regular Player",
        content: "I started with the Silver package and immediately noticed the difference. Planning to upgrade to Gold soon!",
        avatar: "/avatars/michael.jpg",
        rating: 4
    },
    {
        id: 3,
        name: "Jessica Williams",
        role: "Tournament Player",
        content: "The priority support alone makes the Diamond rank worth it. I've never had issues resolved so quickly.",
        avatar: "/avatars/jessica.jpg",
        rating: 5
    }
];

// Featured products for the promotional banner
const featuredProducts = [
    {
        id: 101,
        name: "Limited Edition Titan Package",
        description: "Our most exclusive offering with premium benefits",
        discount: "25% OFF",
        endDate: "April 31, 2025",
        backgroundImage: "/images/gold-package-bg.jpeg"
    },
    {
        id: 102,
        name: "Spring Promotion Bundle",
        description: "Special seasonal package with bonus tokens",
        discount: "30% OFF",
        endDate: "May 15, 2025",
        backgroundImage: "/images/spring-bundle-bg.png"
    }
];

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

    return (
        <div className="min-h-screen bg-white text-black">
            <Header />

            {/* Hero Promotion Banner */}
            {showPromotion && (
                <div className="relative bg-gradient-to-r from-black to-gray-900 text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <Star className="h-4 w-4 text-yellow-400" />
                            <p className="text-sm font-medium">
                                <span className="text-yellow-400">LIMITED TIME:</span> {featuredProducts[currentFeaturedIndex].discount} {featuredProducts[currentFeaturedIndex].name} - Ends {featuredProducts[currentFeaturedIndex].endDate}
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
            <nav className="border-b border-gray-200 bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ul className="flex overflow-x-auto hide-scrollbar space-x-8">
                        {categories.map((category, index) => {
                            const Icon = category.icon;
                            return (
                                <motion.li
                                    key={category.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                >
                                    <button
                                        onClick={() => setActiveCategory(category.id)}
                                        className={`py-4 px-1 flex items-center space-x-2 relative ${
                                            activeCategory === category.id
                                                ? 'text-black font-medium'
                                                : 'text-gray-500 hover:text-gray-800'
                                        }`}
                                    >
                                        <Icon className={`h-4 w-4 ${activeCategory === category.id ? 'text-yellow-500' : ''}`} />
                                        <span>{category.name}</span>

                                        {activeCategory === category.id && (
                                            <motion.div
                                                layoutId="activeTab"
                                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-500"
                                                initial={false}
                                            />
                                        )}
                                    </button>
                                </motion.li>
                            );
                        })}
                    </ul>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                {/* Featured banner */}
                <div
                    className="mb-16 rounded-2xl overflow-hidden relative bg-gradient-to-r from-gray-900 to-black text-white">
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
                                <div
                                    className="inline-block px-3 py-1 rounded-full bg-yellow-500 text-black text-xs font-bold mb-4">
                                    FEATURED OFFER
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold mb-4">{featuredProducts[currentFeaturedIndex].name}</h2>
                                <p className="mb-6 text-gray-300">{featuredProducts[currentFeaturedIndex].description}</p>
                                <div className="flex items-center mb-6">
                                    <div
                                        className="text-2xl font-bold text-yellow-400 mr-3">{featuredProducts[currentFeaturedIndex].discount}</div>
                                    <div className="text-sm text-gray-300">Offer
                                        ends {featuredProducts[currentFeaturedIndex].endDate}</div>
                                </div>
                                <button
                                    className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-medium rounded-lg transition-colors">
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
                                    <div className="w-40 h-40 rounded-full bg-yellow-500 opacity-20 absolute blur-3xl"></div>
                                    <Image src={featuredProducts[currentFeaturedIndex].backgroundImage} alt={featuredProducts[currentFeaturedIndex].name} width={400} height={400} />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                    <div className="absolute inset-0 bg-yellow-500 opacity-5 z-0"></div>
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
                            <motion.div
                                className="inline-block mb-4 p-3 rounded-lg bg-gray-100 text-yellow-500"
                                initial={{scale: 0.8}}
                                animate={{scale: 1}}
                                transition={{duration: 0.3}}
                            >
                                {React.createElement(currentCategory.icon, {className: "h-8 w-8"})}
                            </motion.div>
                            <h2 className="text-4xl font-bold tracking-tight mb-4">{currentCategory.name}</h2>
                            <p className="max-w-2xl mx-auto text-gray-600">
                                {activeCategory === 'ranks' && "Choose from our premium ranks to unlock exclusive features and stand out from the crowd."}
                                {activeCategory === 'crates' && "Unlock rare and powerful items with our premium crate keys."}
                                {activeCategory === 'punishments' && "Appeal bans and restrictions to get back in the game."}
                                {activeCategory === 'tokens' && "Purchase token packs to use in our in-game marketplace."}
                                {activeCategory === 'bank' && "Securely manage your in-game finances with our premium banking system."}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {currentCategory.products.map((product, index) => {
                                const Icon = product.icon;
                                return (
                                    <motion.div
                                        key={product.id}
                                        className={`relative rounded-2xl overflow-hidden p-6 border ${
                                            product.popular ? 'border-yellow-500 shadow-lg' : 'border-gray-200'
                                        } hover:border-yellow-500 hover:shadow-xl transition-all duration-300 flex flex-col justify-between ${
                                            product.comingSoon ? 'opacity-70' : ''
                                        } bg-white`}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        onHoverStart={() => setHoveredProduct(product.id)}
                                        onHoverEnd={() => setHoveredProduct(null)}
                                        whileHover={{ scale: product.comingSoon ? 1 : 1.03 }}
                                    >
                                        {product.popular && (
                                            <div className="absolute top-0 right-0 bg-yellow-500 text-black text-xs font-bold py-1 px-3 tracking-wide">
                                                MOST POPULAR
                                            </div>
                                        )}

                                        {product.comingSoon && (
                                            <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-10">
                                                <div className="bg-black text-white text-sm font-bold py-2 px-4 rounded-md">
                                                    COMING SOON
                                                </div>
                                            </div>
                                        )}

                                        <div>
                                            <div className="flex justify-between items-start mb-4">
                                                <div className={`p-3 rounded-lg ${
                                                    hoveredProduct === product.id && !product.comingSoon ? 'bg-yellow-500 text-white' : 'bg-gray-100'
                                                } transition-colors duration-300`}>
                                                    <Icon className="h-6 w-6" />
                                                </div>
                                                <div className="text-xl font-bold">${product.price.toFixed(2)}</div>
                                            </div>

                                            <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                                            <p className="text-gray-600 text-sm mb-6">{product.description}</p>

                                            <ul className="space-y-2 mb-8">
                                                {product.features.map((feature, i) => (
                                                    <motion.li
                                                        key={i}
                                                        className="flex items-start text-sm"
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{
                                                            opacity: hoveredProduct === product.id ? 1 : 0.7,
                                                            x: 0
                                                        }}
                                                        transition={{ duration: 0.3, delay: i * 0.05 }}
                                                    >
                                                        <ChevronRight className={`h-4 w-4 mr-2 flex-shrink-0 ${
                                                            hoveredProduct === product.id ? 'text-yellow-500' : 'text-gray-400'
                                                        }`} />
                                                        {feature}
                                                    </motion.li>
                                                ))}
                                            </ul>
                                        </div>

                                        {product.comingSoon ? (
                                            <motion.button
                                                className="w-full py-3 rounded-lg font-medium bg-gray-200 cursor-not-allowed"
                                                disabled
                                            >
                                                Coming Soon
                                            </motion.button>
                                        ) : (
                                            <Link href={`/checkout/${product.id}`}>
                                                <motion.button
                                                    className={`w-full py-3 rounded-lg font-medium transition-colors ${
                                                        hoveredProduct === product.id
                                                            ? 'bg-yellow-500 text-black'
                                                            : 'bg-black text-white hover:bg-gray-800'
                                                    }`}
                                                    whileTap={{ scale: 0.97 }}
                                                >
                                                    Purchase {product.name}
                                                </motion.button>
                                            </Link>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Benefits Section */}
                        <div className="mt-24 mb-16">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold mb-4">Why Choose Our Premium Services</h2>
                                <p className="max-w-2xl mx-auto text-gray-600">
                                    We&apos;re committed to providing the best experience for our players with premium features and exceptional support.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <motion.div
                                    className="p-6 rounded-xl border border-gray-200 bg-white hover:border-yellow-500 transition-all duration-300"
                                    whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                                >
                                    <div className="p-3 rounded-lg bg-yellow-100 text-yellow-500 w-fit mb-4">
                                        <Shield className="h-6 w-6" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">Secure Transactions</h3>
                                    <p className="text-gray-600">
                                        All payments are processed through secure channels with advanced encryption technology.
                                    </p>
                                </motion.div>

                                <motion.div
                                    className="p-6 rounded-xl border border-gray-200 bg-white hover:border-yellow-500 transition-all duration-300"
                                    whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                                >
                                    <div className="p-3 rounded-lg bg-yellow-100 text-yellow-500 w-fit mb-4">
                                        <Clock className="h-6 w-6" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">Instant Delivery</h3>
                                    <p className="text-gray-600">
                                        Receive your purchases immediately after payment confirmation, no waiting required.
                                    </p>
                                </motion.div>

                                <motion.div
                                    className="p-6 rounded-xl border border-gray-200 bg-white hover:border-yellow-500 transition-all duration-300"
                                    whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                                >
                                    <div className="p-3 rounded-lg bg-yellow-100 text-yellow-500 w-fit mb-4">
                                        <Heart className="h-6 w-6" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">Premium Support</h3>
                                    <p className="text-gray-600">
                                        Access to 24/7 customer support with priority assistance for premium members.
                                    </p>
                                </motion.div>
                            </div>
                        </div>

                        {/* Testimonials Section */}
                        <div className="mt-24 mb-16 bg-gray-50 p-8 rounded-2xl">
                            <div className="text-center mb-12">
                                <div className="inline-block p-3 rounded-lg bg-yellow-100 text-yellow-500 mb-4">
                                    <Award className="h-6 w-6" />
                                </div>
                                <h2 className="text-3xl font-bold mb-4">What Our Players Say</h2>
                                <p className="max-w-2xl mx-auto text-gray-600">
                                    Don&apos;t just take our word for it - hear from our satisfied members about their experiences.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {testimonials.map((testimonial) => (
                                    <motion.div
                                        key={testimonial.id}
                                        className="p-6 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                        whileHover={{ y: -5 }}
                                    >
                                        <div className="flex items-center space-x-1 mb-4">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`h-4 w-4 ${
                                                        i < testimonial.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                        <p className="text-gray-700 mb-6 italic">&ldquo;{testimonial.content}&ldquo;</p>
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 rounded-full bg-gray-300 mr-3">
                                                {/* Avatar image would go here */}
                                            </div>
                                            <div>
                                                <h4 className="font-bold">{testimonial.name}</h4>
                                                <p className="text-sm text-gray-600">{testimonial.role}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* FAQ Section */}
                        <div className="mt-24 mb-16">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
                                <p className="max-w-2xl mx-auto text-gray-600">
                                    Find answers to common questions about our products and services.
                                </p>
                            </div>

                            <div className="max-w-3xl mx-auto">
                                {[
                                    {
                                        question: "How long do ranks last?",
                                        answer: "All ranks are permanent unless otherwise specified. Some special event ranks may have limited duration, which will be clearly indicated in the product description."
                                    },
                                    {
                                        question: "Can I upgrade my existing rank?",
                                        answer: "Yes! You can upgrade your rank at any time and you'll only pay the difference between your current rank and the new one."
                                    },
                                    {
                                        question: "Are refunds available?",
                                        answer: "We offer refunds within 48 hours of purchase if you haven't used any of the rank benefits. Please contact our support team for assistance."
                                    },
                                    {
                                        question: "Which payment methods do you accept?",
                                        answer: "We accept all major credit cards, PayPal, and various cryptocurrency options for your convenience and security."
                                    }
                                ].map((faq, index) => (
                                    <motion.div
                                        key={index}
                                        className="mb-4 border-b border-gray-200 pb-4"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                    >
                                        <h3 className="text-xl font-medium mb-2">{faq.question}</h3>
                                        <p className="text-gray-600">{faq.answer}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Call to Action */}
                        <div className="mt-24 mb-16 bg-gradient-to-r from-gray-900 to-black text-white rounded-2xl overflow-hidden">
                            <div className="p-12 relative">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500 rounded-full opacity-10 transform translate-x-1/2 -translate-y-1/2"></div>

                                <div className="max-w-2xl relative z-10">
                                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to enhance your experience?</h2>
                                    <p className="mb-8 text-gray-300">
                                        Join thousands of players who have upgraded their gaming experience with our premium services.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <button className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-medium rounded-lg transition-colors">
                                            Browse All Products
                                        </button>
                                        <button className="px-6 py-3 bg-transparent border border-white hover:bg-white hover:text-black text-white font-medium rounded-lg transition-colors">
                                            Learn More
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
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