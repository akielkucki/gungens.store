import React, { Suspense } from 'react';
import PaymentCompleteClient from "@/components/paymentcompleteclient";

export default function Page() {
    return (
        <Suspense fallback={<div>Loading payment details…</div>}>
            <PaymentCompleteClient />
        </Suspense>
    );
}
