// components/GoldShimmerText.tsx
'use client';

import { motion, useAnimation, useInView } from "framer-motion";
import {useEffect, useRef, ReactNode, JSX} from "react";

interface GoldShimmerTextProps {
    children: ReactNode;
    className?: string;
}

export default function GoldShimmerText({ children, className = "" }: GoldShimmerTextProps): JSX.Element {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: false, amount: 0.7 });
    const controls = useAnimation();

    useEffect(() => {
        if (isInView) {
            controls.start({
                backgroundPosition: ["200% 0%", "0% 0%"],
                transition: {
                    duration: 1.5,
                    ease: "easeOut"
                }
            });
        } else {
            // Reset position when out of view for when it comes back in view
            controls.set({
                backgroundPosition: "200% 0%"
            });
        }
    }, [isInView, controls]);

    return (
        <motion.span
            ref={ref}
            className={`bg-clip-text text-transparent ${className}`}
            style={{
                backgroundImage: "linear-gradient(90deg, #BF953F 30%, #FCF6BA 40%, #FBF5B7 45%, #AA771C 60%, #BF953F 100%)",
                backgroundSize: "200% 100%",
                backgroundPosition: "200% 0%",
                backgroundClip: "text",
                WebkitBackgroundClip: "text"
            }}
            animate={controls}
        >
            {children}
        </motion.span>
    );
}