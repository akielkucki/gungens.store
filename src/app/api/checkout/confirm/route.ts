// app/api/checkout/confirm/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { products } from "@/libs/productData";
new Stripe(process.env.SECRET_KEY!, { apiVersion: "2025-02-24.acacia" });
export async function POST(req: Request) {
    try {
        const {
            session_id,
            customer,
            product
        } = await req.json();

        if (!session_id) {
            return NextResponse.json({ error: "Missing session ID" }, { status: 400 });
        }

        // In a real application, you would verify the session with Stripe
        // For this implementation, we'll use the data directly from the request

        const json = {
            customerEmail: customer.email,
            totalPaid: product.price * product.quantity,
            username: customer.username,
            items: [{
                name: product.name,
                quantity: product.quantity,
                unit_price: product.price,
            }],
            deliveryAddress: {
                address: customer.address,
                city: customer.city,
                postalCode: customer.postal_code,
                country: customer.country,
                phone: customer.phone
            }
        };

        // Get all product details
        const data = products;

        // In a real application, send this to your backend service
        try {
            await fetch("http://localhost:5050/purchase", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify([json, ...data.filter((item: any) => item.name === json.items[0].name)]),
            });
        } catch (error) {
            console.error("Error sending purchase data to backend:", error);

        }

        return NextResponse.json({
            success: true,
            order: json
        });
    } catch (error) {
        console.error("Error processing checkout:", error);
        return NextResponse.json(
            { error: "An error occurred processing your order" },
            { status: 500 }
        );
    }
}