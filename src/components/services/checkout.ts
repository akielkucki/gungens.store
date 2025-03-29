import { loadStripe, Stripe } from "@stripe/stripe-js";
import axios, { AxiosResponse } from "axios";

interface Product {
    name: string;
    price: number;
    quantity: number;
}

export async function stripeCheckout(products: Product[]): Promise<void> {
    const stripe: Stripe | null = await loadStripe("pk_test_51L7MUsHFB6WskFnH7rVEikLr4ciK03val0uQWqGPQ1EBlXK0GTBwTA6zLDo9RZWaZvd8Cob0Zq9uEymuUOfKo4zi002l3PUDuI");

    if (!stripe) {
        console.error("Stripe failed to load");
        return;
    }

    try {
        const response: AxiosResponse<{ id: string }> = await axios.post(
            "/api/checkoutWithStripe",
            { products },
            { headers: { "Content-Type": "application/json" } }
        );

        if (response.data.id) {
            const result = await stripe.redirectToCheckout({ sessionId: response.data.id });
            if (result?.error) {
                console.error("Stripe redirect error:", result.error.message);
            }
        } else {
            console.error("Invalid session ID received from the server");
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Payment error:", error.message);
            alert(error.message || 'An error occurred during payment');
        } else {
            console.error("An unknown error occurred during payment");
            alert("An unknown error occurred");
        }
    }
}