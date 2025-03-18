import React from 'react';
import Link from "next/link";
import {storeConfig} from "@/libs/storeConfig";
import {ShoppingCart} from "lucide-react";

const Navbar = () => {
    return (
        <header className="border-b border-zinc-800 py-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <Link href="/" className="text-2xl font-bold tracking-wider">
                        {storeConfig.name}<span className="text-zinc-500">.STORE</span>
                    </Link>
                </div>
                <div className="flex items-center space-x-4">
                    <button className="p-2 rounded-full hover:bg-zinc-800 transition-colors">
                        <ShoppingCart className="h-5 w-5"/>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
