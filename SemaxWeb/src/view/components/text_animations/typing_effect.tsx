import { useRef, type ReactNode } from 'react';
import { gsap, useGSAP, MOTION_OK } from '../../../lib/gsap';

/** Reveals text letter by letter when it scrolls into view. Screen readers get the full text at once. */
const TypingEffect = ({ children, speed = 0.01, duration = 0.05 }: { children: ReactNode, speed?: number, duration?: number }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const text = typeof children === 'string' ? children : String(children);

    useGSAP(() => {
        const mm = gsap.matchMedia();
        mm.add(MOTION_OK, () => {
            gsap.from(ref.current!.querySelectorAll('[data-letter]'), {
                opacity: 0,
                duration,
                stagger: speed,
                ease: 'none',
                scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
            });
        });
        return () => mm.revert();
    }, { scope: ref, dependencies: [text, speed, duration] });

    return (
        <span ref={ref} aria-label={text} role="text">
            <span aria-hidden="true">
                {text.split('').map((letter, index) => (
                    <span data-letter key={index}>{letter}</span>
                ))}
            </span>
        </span>
    );
}

export default TypingEffect;
