// app/checkout/[id]/page.tsx
'use client';

import React, {useState, useEffect, JSX} from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    ChevronLeft,
    ChevronRight,
    ShoppingCart,
    CreditCard as CreditCardIcon,
    ArrowRight
} from 'lucide-react';
import Image from 'next/image';
import { getProductById, getCategoryName } from '@/libs/productData';
import { Product } from '@/libs/productData';
import GoldShimmerText from "@/components/ui/goldshimmertext";
import Footer from "@/components/footer";
import {storeConfig} from "@/libs/storeConfig";
import Navbar from "@/components/navbar";

export default function CheckoutPage(): JSX.Element {
    const params = useParams();
    const id = params.id as string;

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedImage, setSelectedImage] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(1);

    // Get product based on ID from URL
    useEffect(() => {
        if (id) {
            const productId = parseInt(id, 10);
            const foundProduct = getProductById(productId);

            if (foundProduct) {
                setProduct(foundProduct);
            }

            setLoading(false);
        }
    }, [id]);

    // Handle quantity change
    const handleQuantityChange = (value: number) => {
        if (value >= 1 && value <= 10) {
            setQuantity(value);
        }
    };

    // Calculate total price
    const calculateTotal = (): string => {
        if (product) {
            return (product.price * quantity).toFixed(2);
        }
        return '0.00';
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
                <h1 className="text-2xl mb-4">Product Not Found</h1>
                <p className="mb-6">The product you're looking for doesn't exist.</p>
                <Link href="/" className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-zinc-200 transition-colors">
                    Return to Store
                </Link>
            </div>
        );
    }

    const Icon = product.icon;

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar/>

            <div className="py-4 px-4 sm:px-6 lg:px-8 border-b border-zinc-800">
                <div className="max-w-7xl mx-auto">
                    <Link href="/" className="inline-flex items-center text-zinc-400 hover:text-white transition-colors">
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        <span>Back to Store</span>
                    </Link>
                </div>
            </div>

            <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left Column - Product Images */}
                    <div>
                        <div className="bg-zinc-900 rounded-lg overflow-hidden mb-4 relative aspect-[4/3]">
                            {/* Main image */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className="w-full h-full relative"
                            >
                                <Image
                                    src={product.images[selectedImage].src}
                                    alt={product.images[selectedImage].alt}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority
                                />
                            </motion.div>

                            {/* Navigation arrows */}
                            {product.images.length > 1 && (
                                <>
                                    <button
                                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full"
                                        onClick={() => setSelectedImage((selectedImage - 1 + product.images.length) % product.images.length)}
                                    >
                                        <ChevronLeft className="h-6 w-6" />
                                    </button>
                                    <button
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full"
                                        onClick={() => setSelectedImage((selectedImage + 1) % product.images.length)}
                                    >
                                        <ChevronRight className="h-6 w-6" />
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Thumbnail row */}
                        {product.images.length > 1 && (
                            <div className="grid grid-cols-4 gap-2">
                                {product.images.map((image, index) => (
                                    <button
                                        key={image.id}
                                        onClick={() => setSelectedImage(index)}
                                        className={`bg-zinc-900 rounded-md overflow-hidden relative aspect-square ${
                                            selectedImage === index ? 'ring-2 ring-white' : 'opacity-60 hover:opacity-100'
                                        }`}
                                    >
                                        <Image
                                            src={image.src}
                                            alt={image.alt}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 25vw, 10vw"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right Column - Product Details */}
                    <div>
                        <div className="mb-6">
                            <div className="flex items-center space-x-2 text-zinc-400 text-sm mb-2">
                                <Link href="/" className="hover:text-white transition-colors">
                                    Home
                                </Link>
                                <ChevronRight className="h-3 w-3" />
                                <Link href={`/?category=${product.categoryId}`} className="hover:text-white transition-colors">
                                    {getCategoryName(product.categoryId)}
                                </Link>
                                <ChevronRight className="h-3 w-3" />
                                <span className="text-white">{product.name}</span>
                            </div>

                            <div className="flex items-start justify-between">
                                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                                <div className="bg-zinc-900 p-3 rounded-lg">
                                    <Icon className="h-6 w-6" />
                                </div>
                            </div>

                            {product.popular && (
                                <div className="inline-block bg-white text-black text-xs font-bold py-1 px-3 tracking-wide mb-4">
                                    MOST POPULAR
                                </div>
                            )}

                            <p className="text-2xl font-bold mb-4">${product.price.toFixed(2)}</p>
                            <p className="text-zinc-300 mb-6">{product.description}</p>
                        </div>

                        <div className="bg-zinc-900 rounded-lg p-6 mb-8">
                            <h3 className="text-lg font-semibold mb-4">Quantity</h3>
                            <div className="flex items-center space-x-4 mb-6">
                                <button
                                    onClick={() => handleQuantityChange(quantity - 1)}
                                    className="bg-zinc-800 hover:bg-zinc-700 p-2 rounded-md"
                                    disabled={quantity <= 1}
                                >
                                    <span className="text-xl font-bold">-</span>
                                </button>
                                <span className="text-xl font-semibold">{quantity}</span>
                                <button
                                    onClick={() => handleQuantityChange(quantity + 1)}
                                    className="bg-zinc-800 hover:bg-zinc-700 p-2 rounded-md"
                                    disabled={quantity >= 10}
                                >
                                    <span className="text-xl font-bold">+</span>
                                </button>
                            </div>

                            <div className="flex items-center justify-between mb-6">
                                <span className="text-zinc-400">Subtotal:</span>
                                <span className="font-bold">${calculateTotal()}</span>
                            </div>

                            <motion.button
                                className="w-full bg-white text-black py-4 rounded-lg font-semibold text-center flex items-center justify-center"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                disabled={product.comingSoon}
                            >
                                <ShoppingCart className="h-5 w-5 mr-2" />
                                {product.comingSoon ? 'Coming Soon' : 'Add to Cart'}
                            </motion.button>

                            <motion.button
                                className="w-full mt-3 bg-zinc-800 hover:bg-zinc-700 py-4 rounded-lg font-semibold text-center flex items-center justify-center"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                disabled={product.comingSoon}
                            >
                                <CreditCardIcon className="h-5 w-5 mr-2" />
                                {product.comingSoon ? 'Coming Soon' : 'Buy Now'}
                            </motion.button>
                        </div>

                        {/* Features */}
                        <div className="mb-8">
                            <h3 className="text-xl font-bold mb-4">Features</h3>
                            <ul className="space-y-3">
                                {product.features.map((feature, i) => (
                                    <motion.li
                                        key={i}
                                        className="flex items-start"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: i * 0.05 }}
                                    >
                                        <ChevronRight className="h-5 w-5 mr-2 flex-shrink-0 text-zinc-500" />
                                        <span>{feature}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Product Description */}
                <div className="mt-16 border-t border-zinc-800 pt-12">
                    <h2 className="text-2xl font-bold mb-6">Product Description</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div>
                            <p className="text-zinc-300 mb-8 leading-relaxed">{product.longDescription}</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-4">Benefits</h3>
                            <ul className="space-y-4">
                                {product.benefits.map((benefit, i) => (
                                    <motion.li
                                        key={i}
                                        className="flex items-start"
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: i * 0.1 }}
                                    >
                                        <div className="bg-zinc-900 p-2 rounded-full mr-3 flex-shrink-0">
                                            <ArrowRight className="h-4 w-4" />
                                        </div>
                                        <GoldShimmerText>{benefit}</GoldShimmerText>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </main>

           <Footer/>
        </div>
    );
}