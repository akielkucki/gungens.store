// components/StripeCheckout.tsx
'use client';

import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, CreditCard, User, Mail, MapPin } from 'lucide-react';
import { Product } from '@/libs/productData';

interface StripeCheckoutProps {
    product: Product;
    quantity: number;
}

interface CustomerDetails {
    name: string;
    email: string;
    address: {
        line1: string;
        city: string;
        state: string;
        postal_code: string;
        country: string;
    };
}

export default function StripeCheckout({ product, quantity }: StripeCheckoutProps) {
    const stripe = useStripe();
    const elements = useElements();

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [succeeded, setSucceeded] = useState(false);
    const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
        name: '',
        email: '',
        address: {
            line1: '',
            city: '',
            state: '',
            postal_code: '',
            country: 'US', // Default country
        },
    });

    const totalAmount = product.price * quantity;

    const handleDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === 'line1' || name === 'city' || name === 'state' || name === 'postal_code' || name === 'country') {
            setCustomerDetails(prev => ({
                ...prev,
                address: {
                    ...prev.address,
                    [name]: value
                }
            }));
        } else {
            setCustomerDetails(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet
            return;
        }

        // Validate customer details
        if (!customerDetails.name || !customerDetails.email ||
            !customerDetails.address.line1 || !customerDetails.address.city ||
            !customerDetails.address.state || !customerDetails.address.postal_code) {
            setErrorMessage('Please fill out all required fields');
            return;
        }

        setLoading(true);
        setErrorMessage(null);

        try {
            // Create payment intent on the server
            const response = await fetch('http://localhost:8080/create-payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: totalAmount,
                    productId: product.id,
                    productName: product.name,
                    quantity: quantity,
                    customerDetails: customerDetails // Send customer details to server
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            // Confirm the payment with the client secret
            const cardElement = elements.getElement(CardElement);

            if (!cardElement) {
                throw new Error('Card element not found');
            }

            const { error, paymentIntent } = await stripe.confirmCardPayment(data.clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        name: customerDetails.name,
                        email: customerDetails.email,
                        address: {
                            line1: customerDetails.address.line1,
                            city: customerDetails.address.city,
                            state: customerDetails.address.state,
                            postal_code: customerDetails.address.postal_code,
                            country: customerDetails.address.country,
                        },
                    },
                },
                receipt_email: customerDetails.email,
            });

            if (error) {
                throw new Error(error.message);
            } else if (paymentIntent.status === 'succeeded') {
                setSucceeded(true);
                // You can handle redirecting to a success page or showing a success message
            }
        } catch (error: any) {
            setErrorMessage(error.message || 'An error occurred during payment');
        } finally {
            setLoading(false);
        }
    };

    const cardElementOptions = {
        style: {
            base: {
                color: '#ffffff',
                fontFamily: 'Arial, sans-serif',
                fontSize: '16px',
                '::placeholder': {
                    color: 'rgba(255, 255, 255, 0.6)',
                },
            },
            invalid: {
                color: '#ff5555',
                iconColor: '#ff5555',
            },
        },
    };

    const inputClassName = "w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white mb-3 focus:border-white focus:outline-none transition-colors";

    return (
        <div className="bg-zinc-900 rounded-lg p-6">
            {succeeded ? (
                <div className="text-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex justify-center mb-4"
                    >
                        <CheckCircle className="h-16 w-16 text-green-500" />
                    </motion.div>
                    <h3 className="text-xl font-bold mb-2">Payment Successful!</h3>
                    <p className="text-zinc-400 mb-4">
                        Thank you for your purchase of {product.name}. A confirmation email has been sent to {customerDetails.email}.
                    </p>
                    <motion.button
                        className="w-full bg-white text-black py-3 rounded-lg font-semibold"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => window.location.href = '/'}
                    >
                        Return to Store
                    </motion.button>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <h3 className="text-xl font-bold mb-4">Secure Checkout</h3>

                    <div className="mb-4">
                        <div className="flex justify-between mb-1">
                            <span className="text-zinc-400">Product</span>
                            <span>{product.name}</span>
                        </div>
                        <div className="flex justify-between mb-1">
                            <span className="text-zinc-400">Quantity</span>
                            <span>{quantity}</span>
                        </div>
                        <div className="flex justify-between font-bold">
                            <span>Total</span>
                            <span>${totalAmount.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Customer Information Section */}
                    <div className="border border-zinc-700 rounded-lg p-4 mb-6">
                        <div className="flex items-center mb-4">
                            <User className="h-5 w-5 mr-2" />
                            <span className="font-semibold">Your Information</span>
                        </div>

                        <div className="mb-3">
                            <label className="block text-sm text-zinc-400 mb-1">Full Name *</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="John Doe"
                                value={customerDetails.name}
                                onChange={handleDetailsChange}
                                className={inputClassName}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="block text-sm text-zinc-400 mb-1">Email Address *</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="john@example.com"
                                value={customerDetails.email}
                                onChange={handleDetailsChange}
                                className={inputClassName}
                                required
                            />
                        </div>
                    </div>

                    {/* Billing Address Section */}
                    <div className="border border-zinc-700 rounded-lg p-4 mb-6">
                        <div className="flex items-center mb-4">
                            <MapPin className="h-5 w-5 mr-2" />
                            <span className="font-semibold">Billing Address</span>
                        </div>

                        <div className="mb-3">
                            <label className="block text-sm text-zinc-400 mb-1">Street Address *</label>
                            <input
                                type="text"
                                name="line1"
                                placeholder="123 Main St"
                                value={customerDetails.address.line1}
                                onChange={handleDetailsChange}
                                className={inputClassName}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="mb-3">
                                <label className="block text-sm text-zinc-400 mb-1">City *</label>
                                <input
                                    type="text"
                                    name="city"
                                    placeholder="New York"
                                    value={customerDetails.address.city}
                                    onChange={handleDetailsChange}
                                    className={inputClassName}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="block text-sm text-zinc-400 mb-1">State *</label>
                                <input
                                    type="text"
                                    name="state"
                                    placeholder="NY"
                                    value={customerDetails.address.state}
                                    onChange={handleDetailsChange}
                                    className={inputClassName}
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="mb-3">
                                <label className="block text-sm text-zinc-400 mb-1">Zip Code *</label>
                                <input
                                    type="text"
                                    name="postal_code"
                                    placeholder="10001"
                                    value={customerDetails.address.postal_code}
                                    onChange={handleDetailsChange}
                                    className={inputClassName}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="block text-sm text-zinc-400 mb-1">Country *</label>
                                <select
                                    name="country"
                                    value={customerDetails.address.country}
                                    onChange={e => setCustomerDetails(prev => ({
                                        ...prev,
                                        address: {
                                            ...prev.address,
                                            country: e.target.value
                                        }
                                    }))}
                                    className={inputClassName}
                                    required
                                >
                                    <option value="US">United States</option>
                                    <option value="CA">Canada</option>
                                    <option value="GB">United Kingdom</option>
                                    <option value="AU">Australia</option>
                                    <option value="DE">Germany</option>
                                    <option value="FR">France</option>
                                    {/* Add more countries as needed */}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Payment Information Section */}
                    <div className="border border-zinc-700 rounded-lg p-4 mb-6">
                        <div className="flex items-center mb-4">
                            <CreditCard className="h-5 w-5 mr-2" />
                            <span className="font-semibold">Card Details</span>
                        </div>
                        <CardElement options={cardElementOptions} />
                    </div>

                    {errorMessage && (
                        <div className="bg-red-900/20 border border-red-500 rounded-lg p-3 mb-4 flex items-start">
                            <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-red-400">{errorMessage}</span>
                        </div>
                    )}

                    <motion.button
                        type="submit"
                        disabled={!stripe || loading}
                        className={`w-full py-4 rounded-lg font-semibold flex items-center justify-center
                        ${!stripe || loading ? 'bg-zinc-700 cursor-not-allowed' : 'bg-white text-black hover:bg-zinc-200'}`}
                        whileHover={!loading ? { scale: 1.02 } : {}}
                        whileTap={!loading ? { scale: 0.98 } : {}}
                    >
                        {loading ? 'Processing...' : 'Pay $' + totalAmount.toFixed(2)}
                    </motion.button>

                    <div className="mt-4 text-center text-zinc-500 text-sm">
                        <p>Test card: 4242 4242 4242 4242 | Any future date | Any 3 digits</p>
                        <p className="mt-2">Your information is encrypted and secure.</p>
                    </div>
                </form>
            )}
        </div>
    );
}