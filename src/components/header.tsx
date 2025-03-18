import React from 'react';
import {ShoppingCart} from "lucide-react";
import {motion} from "framer-motion";
import {storeConfig} from "@/libs/storeConfig";

const Header = () => {
    return (
        <header className="border-b border-zinc-800 py-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <motion.h1
                    className="text-2xl font-bold tracking-wider"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 0.5}}
                >
                    {storeConfig.name}<span className="text-zinc-500">.STORE</span>
                </motion.h1>
                <motion.div
                    className="flex items-center space-x-4"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 0.5, delay: 0.2}}
                >
                    <button className="p-2 rounded-full hover:bg-zinc-800 transition-colors">
                        <ShoppingCart className="h-5 w-5"/>
                    </button>
                </motion.div>
            </div>
        </header>
    );
};

export default Header;
