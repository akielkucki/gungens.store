import React from 'react';
import {Award, Star} from "lucide-react";
import {motion} from "framer-motion";

const Testimonials = () => {
    interface Testimonial {
        id: number;
        name: string;
        role: string;
        content: string;
        avatar: string;
        rating: number;
    }

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

    return (
        <div className="mt-24 mb-16 luxury-section p-8 rounded-2xl">
            <div className="text-center mb-12">
                <div className="inline-block p-3 rounded-lg bg-[#171717] text-[#d4af37] mb-4">
                    <Award className="h-6 w-6" />
                </div>
                <h2 className="text-3xl font-bold mb-4 gold-gradient-text">What Our Players Say</h2>
                <p className="max-w-2xl mx-auto text-gray-400">
                    Don&apos;t just take our word for it - hear from our satisfied members about their experiences.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial) => (
                    <motion.div
                        key={testimonial.id}
                        className="p-6 rounded-xl luxury-card border border-gray-800 shadow-sm hover:shadow-md transition-all duration-300"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(212, 175, 55, 0.15)' }}
                    >
                        <div className="flex items-center space-x-1 mb-4">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                        i < testimonial.rating ? 'text-[#d4af37] fill-[#d4af37]' : 'text-gray-700'
                                    }`}
                                />
                            ))}
                        </div>
                        <p className="text-gray-300 mb-6 italic">&ldquo;{testimonial.content}&ldquo;</p>
                        <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-gray-700 mr-3">
                                {/* Avatar image would go here */}
                            </div>
                            <div>
                                <h4 className="font-bold">{testimonial.name}</h4>
                                <p className="text-sm text-gray-400">{testimonial.role}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Testimonials;