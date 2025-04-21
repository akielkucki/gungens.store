'use client';

import React, {JSX, useEffect, useState} from 'react';
import {useParams} from 'next/navigation';
import Link from 'next/link';
import {motion} from 'framer-motion';
import {
    ArrowRight,
    CheckCircle,
    ChevronLeft,
    ChevronRight,
    CreditCard,
    CreditCard as CreditCardIcon,
    ShoppingCart,
    Truck
} from 'lucide-react';
import Image from 'next/image';
import {getCategoryName, getProductById, Product} from '@/libs/productData';
import GoldShimmerText from "@/components/ui/goldshimmertext";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CheckoutProgress from "@/components/checkoutprogress";

// Define the checkout stages
type CheckoutStage = 'cart' | 'delivery' | 'payment' | 'confirmation' | 'username';

export default function CheckoutContent(): JSX.Element {
    const params = useParams();
    
    const id = params.id as string;

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedImage, setSelectedImage] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(1);
    const [isCheckout, setIsCheckout] = useState<boolean>(false);
    const [stage, setStage] = useState<CheckoutStage>('cart');

    // Form states
    const [processing, setProcessing] = useState(false);

    //username
    const [username, setUsername] = useState<string>('');
    // Delivery information
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    const [phone, setPhone] = useState('');

    // Payment information
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvc, setCvc] = useState('');
    const [nameOnCard, setNameOnCard] = useState('');

    // Session ID for tracking the payment
    const [sessionId, setSessionId] = useState('');

    // Get product based on ID from URL
    useEffect(() => {
        if (id) {
            const productId = parseInt(id, 10);
            const foundProduct = getProductById(productId);

            if (foundProduct) {
                setProduct(foundProduct);
            }

            setLoading(false);
        }
    }, [id]);

    // Handle quantity change
    const handleQuantityChange = (value: number) => {
        if (value >= 1 && value <= 10) {
            setQuantity(value);
        }
    };

    // Calculate total price
    const calculateTotal = (): string => {
        if (product) {
            return (product.price * quantity).toFixed(2);
        }
        return '0.00';
    };

    // Handle delivery form submission
    const handleDeliverySubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStage('payment');
    };
    const handleUsernameSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStage('delivery');
    };

    // Handle payment form submission
    const handlePaymentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);

        // Create a fake session ID for demo purposes
        const fakeSessionId = `sess_${Date.now()}`;
        setSessionId(fakeSessionId);

        // Simulate payment processing and server call
        try {
            // In a real implementation, you would call your API here
            // For demo purposes, we're just simulating a successful payment after a delay
            setTimeout(async () => {
                // Simulate API call for processing the order
                if (product) {
                    await fetch('/api/checkout/confirm', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            session_id: fakeSessionId,
                            customer: {
                                name: fullName,
                                email: email,
                                address: address,
                                city: city,
                                postal_code: postalCode,
                                country: country,
                                phone: phone,
                                username: username
                            },
                            product: {
                                id: product.id,
                                name: product.name,
                                price: product.price,
                                quantity: quantity
                            }
                        }),
                    });
                }

                setProcessing(false);
                setStage('confirmation');
            }, 1500);
        } catch (error) {
            console.error('Payment error:', error);
            setProcessing(false);
            alert('There was an error processing your payment. Please try again.');
        }
    };

    // Handle buy now click
    const handleBuyNow = () => {
        setIsCheckout(true);
        setStage('username');
    };

    // Handle add to cart click
    const handleAddToCart = () => {
        // Here you could add to cart logic and redirect to cart page
        setIsCheckout(true);
        setStage('delivery');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
                <h1 className="text-2xl mb-4">Product Not Found</h1>
                <p className="mb-6">The product you&#39;re looking for doesn&#39;t exist.</p>
                <Link href="/" className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-zinc-200 transition-colors">
                    Return to Store
                </Link>
            </div>
        );
    }

    const Icon = product.icon;

    const renderConfirmation = () => {
        return (
            <div className="max-w-2xl mx-auto bg-zinc-900 rounded-lg p-8 text-center">
                <div className="flex justify-center mb-6">
                    <CheckCircle className="h-16 w-16 text-green-500" />
                </div>

                <h2 className="text-2xl font-bold mb-4">Order Confirmed!</h2>
                <p className="mb-6 text-zinc-300">Thank you for your purchase. Your order has been received and is being processed.</p>

                <div className="bg-zinc-800 p-6 rounded-lg mb-8">
                    <div className="flex items-start space-x-4 mb-4">
                        {product.images.length > 0 && (
                            <div className="relative w-16 h-16 bg-zinc-800 rounded-md overflow-hidden flex-shrink-0">
                                <Image
                                    src={product.images[0].src}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}
                        <div className="text-left">
                            <h3 className="font-medium mb-1">{product.name}</h3>
                            <div className="text-sm text-zinc-400">
                                <div>Quantity: {quantity}</div>
                                <div>Username: <span className="text-white">{username}</span></div>
                            </div>
                            <div className="font-bold mt-1">${calculateTotal()}</div>
                        </div>
                    </div>

                    <div className="border-t border-zinc-700 pt-4 mt-4 text-left">
                        <div className="text-sm text-zinc-400 mb-2">Order confirmation sent to:</div>
                        <div className="font-medium">{email}</div>

                        <div className="mt-4 text-sm text-zinc-400 mb-2">Delivery address:</div>
                        <div className="font-medium">{fullName}</div>
                        <div className="text-sm text-zinc-300">{address}</div>
                        <div className="text-sm text-zinc-300">{city}, {postalCode}</div>
                        <div className="text-sm text-zinc-300">{country}</div>

                        <div className="mt-4 text-sm text-zinc-400 mb-2">Order ID:</div>
                        <div className="font-mono text-sm">{sessionId.replace('sess_', 'ORD-')}</div>
                    </div>
                </div>

                <Link href="/">
                    <button className="w-full bg-white text-black py-4 rounded-lg font-semibold mt-6">
                        Continue Shopping
                    </button>
                </Link>
            </div>
        );
    };


    const renderDeliveryForm = () => {
        return (
            <div className="max-w-2xl mx-auto bg-zinc-900 rounded-lg p-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Delivery Information</h2>
                    <button
                        onClick={() => setStage('username')}
                        className="text-zinc-400 hover:text-white transition-colors flex items-center"
                    >
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        <span>Back</span>
                    </button>
                </div>

                <CheckoutProgress currentStage={'delivery'}/>

                <div className="mb-6 border-b border-zinc-800 pb-4">
                    <div className="flex items-start space-x-4">
                        {product.images.length > 0 && (
                            <div className="relative w-16 h-16 bg-zinc-800 rounded-md overflow-hidden flex-shrink-0">
                                <Image
                                    src={product.images[0].src}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}
                        <div>
                            <h3 className="font-medium mb-1">{product.name}</h3>
                            <div className="text-sm text-zinc-400">
                                <div>Quantity: {quantity}</div>
                                <div>Username: <span className="text-white">{username}</span></div>
                            </div>
                            <div className="font-bold mt-1">${calculateTotal()}</div>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleDeliverySubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium mb-1">Full Name</label>
                            <input
                                type="text"
                                id="fullName"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-white transition-all"
                                placeholder="John Doe"
                                required
                                autoComplete="name"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-white transition-all"
                                placeholder="your.email@example.com"
                                required
                                autoComplete="email"
                            />
                            <p className="text-xs text-zinc-400 mt-1">We&#39;ll send your receipt to this email</p>
                        </div>
                        <div>
                            <label htmlFor="address" className="block text-sm font-medium mb-1">Address</label>
                            <input
                                type="text"
                                id="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-white transition-all"
                                placeholder="123 Main St, Apt 4B"
                                required
                                autoComplete="street-address"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="city" className="block text-sm font-medium mb-1">City</label>
                                <input
                                    type="text"
                                    id="city"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-white transition-all"
                                    placeholder="New York"
                                    required
                                    autoComplete="address-level2"
                                />
                            </div>
                            <div>
                                <label htmlFor="postalCode" className="block text-sm font-medium mb-1">Postal Code</label>
                                <input
                                    type="text"
                                    id="postalCode"
                                    value={postalCode}
                                    onChange={(e) => setPostalCode(e.target.value)}
                                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-white transition-all"
                                    placeholder="10001"
                                    required
                                    autoComplete="postal-code"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="country" className="block text-sm font-medium mb-1">Country</label>
                            <input
                                type="text"
                                id="country"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-white transition-all"
                                placeholder="United States"
                                required
                                autoComplete="country-name"
                            />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number</label>
                            <input
                                type="tel"
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-white transition-all"
                                placeholder="+1 (555) 123-4567"
                                required
                                autoComplete="tel"
                            />
                            <p className="text-xs text-zinc-400 mt-1">For delivery questions only</p>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-white text-black py-4 rounded-lg font-semibold mt-6 flex items-center justify-center"
                        >
                            <Truck className="h-5 w-5 mr-2" />
                            Continue to Payment
                        </button>
                    </div>
                </form>
            </div>
        );
    };

    const renderPaymentForm = () => {
        return (
            <div className="max-w-2xl mx-auto bg-zinc-900 rounded-lg p-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Payment Details</h2>
                    <button
                        onClick={() => setStage('delivery')}
                        className="text-zinc-400 hover:text-white transition-colors flex items-center"
                    >
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        <span>Back</span>
                    </button>
                </div>

                <CheckoutProgress currentStage={'payment'}/>

                <div className="mb-6 border-b border-zinc-800 pb-4">
                    <div className="flex items-start space-x-4">
                        {product.images.length > 0 && (
                            <div className="relative w-16 h-16 bg-zinc-800 rounded-md overflow-hidden flex-shrink-0">
                                <Image
                                    src={product.images[0].src}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}
                        <div>
                            <h3 className="font-medium mb-1">{product.name}</h3>
                            <div className="text-sm text-zinc-400">
                                <div>Quantity: {quantity}</div>
                                <div>Username: <span className="text-white">{username}</span></div>
                            </div>
                            <div className="font-bold mt-1">${calculateTotal()}</div>
                        </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-zinc-800">
                        <div className="text-sm text-zinc-400">Delivery to:</div>
                        <div className="text-sm">{fullName}</div>
                        <div className="text-sm text-zinc-400">{address}</div>
                        <div className="text-sm text-zinc-400">{city}, {postalCode}</div>
                        <div className="text-sm text-zinc-400">{country}</div>
                    </div>
                </div>

                <form onSubmit={handlePaymentSubmit}>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Payment Method</span>
                            <div className="flex space-x-2">
                                <CreditCardIcon className="h-5 w-5 text-zinc-400" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="nameOnCard" className="block text-sm font-medium mb-1">Name on Card</label>
                            <input
                                type="text"
                                id="nameOnCard"
                                value={nameOnCard}
                                onChange={(e) => setNameOnCard(e.target.value)}
                                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-white transition-all"
                                placeholder="John Doe"
                                required
                                autoComplete="cc-name"
                            />
                        </div>
                        <div>
                            <label htmlFor="cardNumber" className="block text-sm font-medium mb-1">Card Number</label>
                            <input
                                type="text"
                                id="cardNumber"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-white transition-all"
                                placeholder="1234 5678 9012 3456"
                                required
                                autoComplete="cc-number"
                                maxLength={19}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="expiry" className="block text-sm font-medium mb-1">Expiry Date</label>
                                <input
                                    type="text"
                                    id="expiry"
                                    value={expiry}
                                    onChange={(e) => setExpiry(e.target.value)}
                                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-white transition-all"
                                    placeholder="MM/YY"
                                    required
                                    autoComplete="cc-exp"
                                    maxLength={5}
                                />
                            </div>
                            <div>
                                <label htmlFor="cvc" className="block text-sm font-medium mb-1">CVC</label>
                                <input
                                    type="text"
                                    id="cvc"
                                    value={cvc}
                                    onChange={(e) => setCvc(e.target.value)}
                                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-white transition-all"
                                    placeholder="123"
                                    required
                                    autoComplete="cc-csc"
                                    maxLength={4}
                                />
                            </div>
                        </div>

                        <div className="border-t border-zinc-800 mt-6 pt-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-zinc-400">Subtotal</span>
                                <span>${calculateTotal()}</span>
                            </div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-zinc-400">Taxes</span>
                                <span>$0.00</span>
                            </div>
                            <div className="flex items-center justify-between font-bold mt-2 pt-2 border-t border-zinc-800">
                                <span>Total</span>
                                <span>${calculateTotal()}</span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-white text-black py-4 rounded-lg font-semibold mt-6 flex items-center justify-center"
                            disabled={processing}
                        >
                            {processing ? (
                                <span className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                            </span>
                            ) : (
                                <span className="flex items-center">
                                <CreditCard className="h-5 w-5 mr-2" />
                                Pay ${calculateTotal()}
                            </span>
                            )}
                        </button>
                    </div>
                </form>

                <div className="mt-4 text-xs text-zinc-400 text-center">
                    Your payment information is securely processed and encrypted.
                </div>
            </div>
        );
    };

    // Render product details
    const renderProductDetails = () => {
        return (
            <>
                <div className="mb-6">
                    <div className="flex items-center space-x-2 text-zinc-400 text-sm mb-2">
                        <Link href="/" className="hover:text-white transition-colors">
                            Home
                        </Link>
                        <ChevronRight className="h-3 w-3" />
                        <Link href={`/?category=${product.categoryId}`} className="hover:text-white transition-colors">
                            {getCategoryName(product.categoryId)}
                        </Link>
                        <ChevronRight className="h-3 w-3" />
                        <span className="text-white">{product.name}</span>
                    </div>

                    <div className="flex items-start justify-between">
                        <h1 className="text-3xl font-bold mb-2">
                            <GoldShimmerText>{product.name}</GoldShimmerText>
                        </h1>
                        <div className="bg-zinc-900 p-3 rounded-lg">
                            <Icon className="h-6 w-6" />
                        </div>
                    </div>

                    {product.popular && (
                        <div className="inline-block bg-white text-black text-xs font-bold py-1 px-3 tracking-wide mb-4">
                            MOST POPULAR
                        </div>
                    )}

                    <p className="text-2xl font-bold mb-4">${product.price.toFixed(2)}</p>
                    <p className="text-zinc-300 mb-6">{product.description}</p>
                </div>

                <div className="bg-zinc-900 rounded-lg p-6 mb-8">
                    <h3 className="text-lg font-semibold mb-4">Quantity</h3>
                    <div className="flex items-center space-x-4 mb-6">
                        <button
                            onClick={() => handleQuantityChange(quantity - 1)}
                            className="bg-zinc-800 hover:bg-zinc-700 p-2 rounded-md"
                            disabled={quantity <= 1}
                        >
                            <span className="text-xl font-bold">-</span>
                        </button>
                        <span className="text-xl font-semibold">{quantity}</span>
                        <button
                            onClick={() => handleQuantityChange(quantity + 1)}
                            className="bg-zinc-800 hover:bg-zinc-700 p-2 rounded-md"
                            disabled={quantity >= 10}
                        >
                            <span className="text-xl font-bold">+</span>
                        </button>
                    </div>

                    <div className="flex items-center justify-between mb-6">
                        <span className="text-zinc-400">Subtotal:</span>
                        <span className="font-bold">${calculateTotal()}</span>
                    </div>

                    <motion.button
                        onClick={handleAddToCart}
                        className="w-full bg-white text-black py-4 rounded-lg font-semibold text-center flex items-center justify-center"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={product.comingSoon}
                    >
                        <ShoppingCart className="h-5 w-5 mr-2" />
                        {product.comingSoon ? 'Coming Soon' : 'Add to Cart'}
                    </motion.button>

                    <motion.button
                        onClick={handleBuyNow}
                        className="w-full mt-3 bg-zinc-800 hover:bg-zinc-700 py-4 rounded-lg font-semibold text-center flex items-center justify-center"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={product.comingSoon}
                    >
                        <CreditCardIcon className="h-5 w-5 mr-2" />
                        {product.comingSoon ? 'Coming Soon' : 'Buy Now'}
                    </motion.button>
                </div>

                {/* Features */}
                <div className="mb-8">
                    <h3 className="text-xl font-bold mb-4">Features</h3>
                    <ul className="space-y-3">
                        {product.features.map((feature, i) => (
                            <motion.li
                                key={i}
                                className="flex items-start"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: i * 0.05 }}
                            >
                                <ChevronRight className="h-5 w-5 mr-2 flex-shrink-0 text-zinc-500" />
                                <span>{feature}</span>
                            </motion.li>
                        ))}
                    </ul>
                </div>
            </>
        );
    };

    const renderUsernameForm = () => {
        return (
            <div className="max-w-2xl mx-auto bg-zinc-900 rounded-lg p-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Minecraft Username</h2>
                    <button
                        onClick={() => {setIsCheckout(false); setStage('cart');}}
                        className="text-zinc-400 hover:text-white transition-colors flex items-center"
                    >
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        <span>Back</span>
                    </button>
                </div>

                <CheckoutProgress currentStage={'username'}/>

                <div className="mb-6 border-b border-zinc-800 pb-4">
                    <div className="flex items-start space-x-4">
                        {product.images.length > 0 && (
                            <div className="relative w-16 h-16 bg-zinc-800 rounded-md overflow-hidden flex-shrink-0">
                                <Image
                                    src={product.images[0].src}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}
                        <div>
                            <h3 className="font-medium mb-1">{product.name}</h3>
                            <div className="text-sm text-zinc-400">Quantity: {quantity}</div>
                            <div className="font-bold mt-1">${calculateTotal()}</div>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleUsernameSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium mb-1">
                                Enter your Minecraft username
                            </label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-white transition-all"
                                placeholder="YourMinecraftName"
                                required
                                autoComplete="username"
                            />
                            <p className="text-xs text-zinc-400 mt-1">This will be used to deliver the item to your account</p>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-white text-black py-4 rounded-lg font-semibold mt-6 flex items-center justify-center"
                        >
                        <span className="flex items-center">
                            <ArrowRight className="h-5 w-5 mr-2" />
                            Continue to Delivery
                        </span>
                        </button>
                    </div>
                </form>
            </div>
        );
    };

    // Main render function
    return (
        <div className="min-h-screen bg-black text-white">
            <Header />

            <div className="py-4 px-4 sm:px-6 lg:px-8 border-b border-zinc-800">
                <div className="max-w-7xl mx-auto">
                    {isCheckout ? (
                        <button
                            onClick={() => {setIsCheckout(false); setStage('cart');}}
                            className="inline-flex items-center text-zinc-400 hover:text-white transition-colors"
                        >
                            <ChevronLeft className="h-4 w-4 mr-1" />
                            <span>Back to Product</span>
                        </button>
                    ) : (
                        <Link href="/" className="inline-flex items-center text-zinc-400 hover:text-white transition-colors">
                            <ChevronLeft className="h-4 w-4 mr-1" />
                            <span>Back to Store</span>
                        </Link>
                    )}
                </div>
            </div>

            <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                {isCheckout ? (
                    // Render checkout stages
                    <>
                        {stage === 'username' && renderUsernameForm()}
                        {stage === 'delivery' && renderDeliveryForm()}
                        {stage === 'payment' && renderPaymentForm()}
                        {stage === 'confirmation' && renderConfirmation()}
                    </>
                ) : (
                    // Render product details
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Left Column - Product Images */}
                        <div>
                            <div className="bg-zinc-900 rounded-lg overflow-hidden mb-4 relative aspect-[4/3]">
                                {/* Main image */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                    className="w-full h-full relative"
                                >
                                    <Image
                                        src={product.images[selectedImage].src}
                                        alt={product.images[selectedImage].alt}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        priority
                                    />
                                </motion.div>

                                {/* Navigation arrows */}
                                {product.images.length > 1 && (
                                    <>
                                        <button
                                            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full"
                                            onClick={() => setSelectedImage((selectedImage - 1 + product.images.length) % product.images.length)}
                                        >
                                            <ChevronLeft className="h-6 w-6" />
                                        </button>
                                        <button
                                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full"
                                            onClick={() => setSelectedImage((selectedImage + 1) % product.images.length)}
                                        >
                                            <ChevronRight className="h-6 w-6" />
                                        </button>
                                    </>
                                )}
                            </div>

                            {/* Thumbnail row */}
                            {product.images.length > 1 && (
                                <div className="grid grid-cols-4 gap-2">
                                    {product.images.map((image, index) => (
                                        <button
                                            key={image.id}
                                            onClick={() => setSelectedImage(index)}
                                            className={`bg-zinc-900 rounded-md overflow-hidden relative aspect-square ${selectedImage === index ? 'ring-2 ring-white' : 'opacity-60 hover:opacity-100'
                                            }`}
                                        >
                                            <Image
                                                src={image.src}
                                                alt={image.alt}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 25vw, 10vw"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Right Column - Product Details */}
                        <div>
                            {renderProductDetails()}
                        </div>
                    </div>
                )}

                {!isCheckout && (
                    <div className="mt-16 border-t border-zinc-800 pt-12">
                        <h2 className="text-2xl font-bold mb-6">Product Description</h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            <div>
                                <p className="text-zinc-300 mb-8 leading-relaxed">{product.longDescription}</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-4">Benefits</h3>
                                <ul className="space-y-4">
                                    {product.benefits.map((benefit, i) => (
                                        <motion.li
                                            key={i}
                                            className="flex items-start"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, delay: i * 0.1 }}
                                        >
                                            <div className="bg-zinc-900 p-2 rounded-full mr-3 flex-shrink-0">
                                                <ArrowRight className="h-4 w-4" />
                                            </div>
                                            <GoldShimmerText>{benefit}</GoldShimmerText>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}