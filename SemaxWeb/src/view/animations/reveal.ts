import type { MotionProps } from 'motion/react';

/** Same curve as --ease-out in index.css */
export const easeOut = [0.22, 1, 0.36, 1] as const;

/** Fade + rise into place once the element scrolls into view. */
export const reveal = (delay = 0): MotionProps => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6, ease: easeOut, delay },
});

/** Fade + rise on first render (used above the fold). */
export const enter = (delay = 0): MotionProps => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: easeOut, delay },
});
