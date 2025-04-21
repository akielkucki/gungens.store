import React from 'react';
import {motion} from "framer-motion";
import {Category, getDiscountedPrice, sale} from "@/libs/productData";
import {ChevronRight} from "lucide-react";
import Link from "next/link";

interface Props {
    currentCategory: Category;
    hoverOverProduct: (productId: number) => void;
    hoveredProduct: number | null;
    setHoveredProduct: (id: number | null) => void;
}
const Products = ({currentCategory,hoverOverProduct,setHoveredProduct, hoveredProduct}: Props) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {currentCategory.products.map((product, index) => {
                const Icon = product.icon;
                return (

                    <motion.div
                        key={product.id}
                        className={`relative rounded-2xl overflow-hidden p-6 border ${
                            product.popular ? 'border-[#d4af37] shadow-lg' : 'border-gray-800'
                        } hover:border-[#d4af37] hover:shadow-xl transition-all duration-300 flex flex-col justify-between ${
                            product.comingSoon ? 'opacity-70' : ''
                        } luxury-card`}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        onHoverStart={() => hoverOverProduct(product.id)}
                        onHoverEnd={() => setHoveredProduct(null)}
                        whileHover={{ scale: product.comingSoon ? 1 : 1.03 }}
                    >
                        {product.popular && (
                            <div className="absolute top-0 right-0 bg-[#d4af37] text-black text-xs font-bold py-1 px-3 tracking-wide">
                                MOST POPULAR
                            </div>
                        )}

                        {product.comingSoon && (
                            <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center z-10">
                                <div className="bg-[#d4af37] text-black text-sm font-bold py-2 px-4 rounded-md">
                                    COMING SOON
                                </div>
                            </div>
                        )}

                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-lg ${
                                    hoveredProduct === product.id && !product.comingSoon ? 'bg-[#d4af37] text-black' : 'bg-[#171717]'
                                } transition-colors duration-300`}>
                                    <Icon className="h-6 w-6" />
                                </div>
                                {sale > 0 && (
                                    <div className="absolute top-0 left-0 bg-red-600 text-white text-xs font-bold py-1 px-2 rounded-br-lg">
                                        {Math.floor(sale * 100)}% OFF
                                    </div>
                                )}

                                <div className="text-right">

                                    {sale > 0 && (
                                        <div className="text-sm line-through text-gray-500">
                                            ${product.price.toFixed(2)}
                                        </div>
                                    )}
                                    <div className="text-xl font-bold luxury-accent">
                                        ${getDiscountedPrice(product.price)}
                                    </div>
                                </div>

                            </div>

                            <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                            <p className="text-gray-400 text-sm mb-6">{product.description}</p>

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
                                            hoveredProduct === product.id ? 'text-[#d4af37]' : 'text-gray-500'
                                        }`} />
                                        {feature}
                                    </motion.li>
                                ))}
                            </ul>
                        </div>

                        {product.comingSoon ? (
                            <motion.button
                                className="w-full py-3 rounded-lg font-medium bg-[#171717] cursor-not-allowed"
                                disabled
                            >
                                Coming Soon
                            </motion.button>
                        ) : (
                            <Link href={`/checkout/${product.id}`}>
                                <motion.button
                                    className={`w-full py-3 rounded-lg font-medium transition-colors cursor-pointer ${
                                        hoveredProduct === product.id
                                            ? 'luxury-button'
                                            : 'bg-gradient-to-r from-[#0a0a0a] to-[#1f1f1f] text-white border border-[#d4af37] hover:border-[#f5d592]'
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
    );
};

export default Products;