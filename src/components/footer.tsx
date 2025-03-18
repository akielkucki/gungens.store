import React from 'react';
import {storeConfig} from "@/libs/storeConfig";

const Footer = () => {
    return (
        <footer className="border-t border-zinc-800 py-12 px-4 sm:px-6 lg:px-8 mt-24">
            <div className="max-w-7xl mx-auto text-center text-zinc-500 text-sm">
                <p>© 2025 {storeConfig.name}.STORE. All rights reserved.</p>
                <p className="mt-2">Payment methods secured by industry-standard encryption.</p>
            </div>
        </footer>
    );
};

export default Footer;
