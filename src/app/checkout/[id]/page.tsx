// app/checkout/[id]/page.tsx
import {JSX, Suspense} from 'react';
import CheckoutContent from "@/components/checkoutcontent";

export default function CheckoutPage(): JSX.Element {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>}>
            <CheckoutContent />
        </Suspense>
    );
}