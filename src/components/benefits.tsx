import React from 'react';
import {motion} from "framer-motion";
import {Clock, Heart, Shield} from "lucide-react";

const Benefits = () => {
    return (
        <div className="mt-24 mb-16">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4 gold-gradient-text">Why Choose Our Premium Services</h2>
                <p className="max-w-2xl mx-auto text-gray-400">
                    We&apos;re committed to providing the best experience for our players with premium features and exceptional support.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <motion.div
                    className="p-6 rounded-xl border border-gray-800 luxury-card hover:border-[#d4af37] transition-all duration-300"
                    whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(212, 175, 55, 0.15)' }}
                >
                    <div className="p-3 rounded-lg bg-[#171717] text-[#d4af37] w-fit mb-4">
                        <Shield className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 luxury-accent">Secure Transactions</h3>
                    <p className="text-gray-400">
                        All payments are processed through secure channels with advanced encryption technology.
                    </p>
                </motion.div>

                <motion.div
                    className="p-6 rounded-xl border border-gray-800 luxury-card hover:border-[#d4af37] transition-all duration-300"
                    whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(212, 175, 55, 0.15)' }}
                >
                    <div className="p-3 rounded-lg bg-[#171717] text-[#d4af37] w-fit mb-4">
                        <Clock className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 luxury-accent">Instant Delivery</h3>
                    <p className="text-gray-400">
                        Receive your purchases immediately after payment confirmation, no waiting required.
                    </p>
                </motion.div>

                <motion.div
                    className="p-6 rounded-xl border border-gray-800 luxury-card hover:border-[#d4af37] transition-all duration-300"
                    whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(212, 175, 55, 0.15)' }}
                >
                    <div className="p-3 rounded-lg bg-[#171717] text-[#d4af37] w-fit mb-4">
                        <Heart className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 luxury-accent">Premium Support</h3>
                    <p className="text-gray-400">
                        Access to 24/7 customer support with priority assistance for premium members.
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default Benefits;