"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function PaymentCompletePage() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const [sessionData, setSessionData] = useState<never>(null);
    const params = useSearchParams();
    const sessionId = params.get("session_id");

    useEffect(() => {
        if (sessionId) {
            fetch("/api/stripe/get-session", {
                method: "POST",
                body: JSON.stringify({ session_id: sessionId }),
                headers: { "Content-Type": "application/json" },
            })
                .then(res => res.json())
                .then(data => setSessionData(data));
        }
    }, [sessionId]);

    if (!sessionData) return <p>Loading...</p>;

    return (
        <div>
            <h1>Payment Complete</h1>
            <pre>{JSON.stringify(sessionData, null, 2)}</pre>
        </div>
    );
}
