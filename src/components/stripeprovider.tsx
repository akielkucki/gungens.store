// components/StripeProvider.tsx
'use client';

import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// Use your publishable key from environment variables if possible
// Or directly use the key as shown here
const stripePromise = loadStripe('pk_test_51L7MUsHFB6WskFnH7rVEikLr4ciK03val0uQWqGPQ1EBlXK0GTBwTA6zLDo9RZWaZvd8Cob0Zq9uEymuUOfKo4zi002l3PUDuI');

interface StripeProviderProps {
    children: React.ReactNode;
}

export const StripeProvider: React.FC<StripeProviderProps> = ({ children }) => {
    return (
        <Elements stripe={stripePromise}>
            {children}
        </Elements>
    );
};

export default StripeProvider;