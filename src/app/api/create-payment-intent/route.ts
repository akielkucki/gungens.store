// app/api/create-payment-intent/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with your secret key
// IMPORTANT: Never expose your secret key in client-side code
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-02-24.acacia',
});

export async function POST(request: NextRequest) {
    try {
        const { amount, productId, productName } = await request.json();

        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Stripe requires amounts in cents
            currency: 'usd',
            metadata: {
                productId,
                productName,
            },
            // In a production environment, you would want to store customer data
            // and potentially use a Customer ID here
        });

        return NextResponse.json({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error('Error creating payment intent:', error);
        return NextResponse.json(
            { error: 'An error occurred while processing your payment' },
            { status: 500 }
        );
    }
}