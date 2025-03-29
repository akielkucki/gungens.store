import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.SECRET_KEY || "sk_test_51L7MUsHFB6WskFnHyBN5uhENBBy6R6BnXZZKKiKOOZpfm5YfORaathO4VUF6zKlgM0FhtRlHz3OuxIVeBGYH1NT300T8ZB2UKG");

export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log("Received Body:", body);

        const { products } = body;

        if (!products || !Array.isArray(products)) {
            return NextResponse.json({ error: "Invalid products array", received: body }, { status: 400 });
        }

        const lineItems = products.map((product: { name: string; price: number; quantity: number }) => ({
            price_data: {
                currency: "usd",
                product_data: { name: product.name },
                unit_amount: Math.round(product.price * 100),
            },
            quantity: product.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: "http://localhost:80/success",
            cancel_url: "http://localhost:80/failed",
        });

        console.log("Stripe Session Created:", session.id);
        return NextResponse.json({ id: session.id });
    } catch (error) {
        console.error("Stripe Error:", error);
        return NextResponse.json({ error: "An error occurred while processing your payment" }, { status: 500 });
    }
}
