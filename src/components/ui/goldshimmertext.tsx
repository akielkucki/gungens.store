import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

const GoldShimmerText = ({ children }: {children: React.ReactNode}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false });
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
        }
    }, [isInView, controls]);

    return (
        <motion.span
            ref={ref}
            className="bg-clip-text text-transparent"
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
};

export default GoldShimmerText;