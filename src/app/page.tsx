// app/page.tsx
'use client';

import {useState, useEffect, JSX} from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ShoppingCart } from 'lucide-react';
import { categories } from '@/libs/productData';
import React from 'react';
import Footer from "@/components/footer";
import {storeConfig} from "@/libs/storeConfig";
import Navbar from "@/components/navbar";

export default function HomePage(): JSX.Element {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialCategory = searchParams.get('category') || 'ranks';
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  // Update URL when category changes
  useEffect(() => {
    router.push(`/?category=${activeCategory}`, { scroll: false });
  }, [activeCategory, router]);

  const currentCategory = categories.find(cat => cat.id === activeCategory);

  // Provide a fallback for type safety
  if (!currentCategory) {
    return <div>Category not found</div>;
  }

  return (
      <div className="min-h-screen bg-black text-white">
        <Navbar/>

        <nav className="border-b border-zinc-800 bg-zinc-900">
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
                                  ? 'text-white'
                                  : 'text-zinc-400 hover:text-zinc-300'
                          }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{category.name}</span>

                        {activeCategory === category.id && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
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
          <AnimatePresence mode="wait">
            <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
            >
              <div className="text-center mb-16">
                <motion.div
                    className="inline-block mb-4 p-3 rounded-lg bg-zinc-900"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                >
                  {React.createElement(currentCategory.icon, { className: "h-8 w-8" })}
                </motion.div>
                <h2 className="text-4xl font-bold tracking-tight mb-4">{currentCategory.name}</h2>
                <p className="max-w-2xl mx-auto text-zinc-400">
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
                              product.popular ? 'border-white' : 'border-zinc-800'
                          } hover:border-white transition-all duration-300 flex flex-col justify-between ${
                              product.comingSoon ? 'opacity-70' : ''
                          }`}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          onHoverStart={() => setHoveredProduct(product.id)}
                          onHoverEnd={() => setHoveredProduct(null)}
                          whileHover={{ scale: product.comingSoon ? 1 : 1.03 }}
                      >
                        {product.popular && (
                            <div className="absolute top-0 right-0 bg-white text-black text-xs font-bold py-1 px-3 tracking-wide">
                              MOST POPULAR
                            </div>
                        )}

                        {product.comingSoon && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
                              <div className="bg-white text-black text-sm font-bold py-2 px-4 rounded-md">
                                COMING SOON
                              </div>
                            </div>
                        )}

                        <div>
                          <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-lg ${
                                hoveredProduct === product.id && !product.comingSoon ? 'bg-white text-black' : 'bg-zinc-900'
                            } transition-colors duration-300`}>
                              <Icon className="h-6 w-6" />
                            </div>
                            <div className="text-xl font-bold">${product.price.toFixed(2)}</div>
                          </div>

                          <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                          <p className="text-zinc-400 text-sm mb-6">{product.description}</p>

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
                                  <ChevronRight className="h-4 w-4 mr-2 flex-shrink-0 text-zinc-500" />
                                  {feature}
                                </motion.li>
                            ))}
                          </ul>
                        </div>

                        {product.comingSoon ? (
                            <motion.button
                                className="w-full py-3 rounded-lg font-medium bg-zinc-800 cursor-not-allowed"
                                disabled
                            >
                              Coming Soon
                            </motion.button>
                        ) : (
                            <Link href={`/checkout/${product.id}`}>
                              <motion.button
                                  className={`w-full py-3 rounded-lg font-medium transition-colors ${
                                      hoveredProduct === product.id
                                          ? 'bg-white text-black'
                                          : 'bg-zinc-900 hover:bg-zinc-800'
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
            </motion.div>
          </AnimatePresence>
        </main>

        <Footer/>

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