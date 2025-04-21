import React, {useState} from 'react';
import {AnimatePresence, motion} from "framer-motion";

const FAQ = () => {
    // State to track which FAQ item is currently open
    const [activeIndex, setActiveIndex] = useState(null);

    // Toggle function to open/close FAQ items
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    // FAQs data
    const faqs = [
        {
            question: "How long do ranks last?",
            answer: "All ranks are permanent unless otherwise specified. Some special event ranks may have limited duration, which will be clearly indicated in the product description."
        },
        {
            question: "Can I upgrade my existing rank?",
            answer: "Yes! You can upgrade your rank at any time and you'll only pay the difference between your current rank and the new one."
        },
        {
            question: "Are refunds available?",
            answer: "We offer refunds within 48 hours of purchase if you haven't used any of the rank benefits. Please contact our support team for assistance."
        },
        {
            question: "Which payment methods do you accept?",
            answer: "We accept all major credit cards, PayPal, and various cryptocurrency options for your convenience and security."
        }
    ];

    return (
        <div className="mt-24 mb-16">
            <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-3xl font-bold mb-4 gold-gradient-text">Frequently Asked Questions</h2>
                <p className="max-w-2xl mx-auto text-gray-400">
                    Find answers to common questions about our products and services.
                </p>
            </motion.div>

            <div className="max-w-3xl mx-auto">
                {faqs.map((faq, index) => (
                    <motion.div
                        key={index}
                        className="mb-4 border border-gray-800 rounded-lg overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        whileHover={{ scale: 1.01 }}
                    >
                        <motion.div
                            className={`p-4 cursor-pointer flex justify-between items-center ${activeIndex === index ? 'bg-gray-800' : ''}`}
                            onClick={() => toggleFAQ(index)}
                            whileTap={{ scale: 0.98 }}
                        >
                            <h3 className="text-xl font-medium gold-border luxury-accent">{faq.question}</h3>
                            <motion.div
                                animate={{ rotate: activeIndex === index ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </motion.div>
                        </motion.div>

                        <AnimatePresence>
                            {activeIndex === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                >
                                    <div className="p-4 bg-gray-900 text-gray-400 border-t border-gray-800">
                                        <motion.p
                                            initial={{ y: -10, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ duration: 0.2, delay: 0.1 }}
                                        >
                                            {faq.answer}
                                        </motion.p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;