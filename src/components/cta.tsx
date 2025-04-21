import React from 'react';

const CTA = () => {
    return (
        <div className="mt-24 mb-16 luxury-card rounded-2xl overflow-hidden border border-[#d4af37]">
            <div className="p-12 relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37] rounded-full opacity-10 transform translate-x-1/2 -translate-y-1/2"></div>

                <div className="max-w-2xl relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 gold-gradient-text">Ready to enhance your experience?</h2>
                    <p className="mb-8 text-gray-300">
                        Join thousands of players who have upgraded their gaming experience with our premium services.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button className="luxury-button px-6 py-3 rounded-lg transition-all">
                            Browse All Products
                        </button>
                        <button className="px-6 py-3 bg-transparent border border-[#d4af37] hover:bg-[#171717] text-white font-medium rounded-lg transition-colors hover:shadow-lg hover:shadow-[#d4af37]/20">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CTA;