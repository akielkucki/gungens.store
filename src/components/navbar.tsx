import React from 'react';
import {categories} from "@/libs/productData";
import {motion} from "framer-motion";
interface NavbarProps {
    setActiveCategory: React.Dispatch<React.SetStateAction<string>>;
    activeCategory: string;
}
const Navbar = ({setActiveCategory, activeCategory}: NavbarProps) => {
    return (
        <nav className="luxury-header sticky top-0 z-30">
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
                                            ? 'text-white font-medium'
                                            : 'text-gray-400 hover:text-gray-200'
                                    }`}
                                >
                                    <Icon className={`h-4 w-4 ${activeCategory === category.id ? 'text-[#d4af37]' : ''}`} />
                                    <span>{category.name}</span>

                                    {activeCategory === category.id && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#d4af37]"
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
    );
};

export default Navbar;