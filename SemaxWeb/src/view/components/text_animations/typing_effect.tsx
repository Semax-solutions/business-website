import {motion, useInView, useReducedMotion} from 'motion/react';
import { useRef, type ReactNode } from 'react';

const TypingEffect = ({children, speed = 0.01, duration = 0.05}: {children: ReactNode, speed?: number, duration?: number}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const shouldReduceMotion = useReducedMotion();

    // Convert children to string
    const text = typeof children === 'string' ? children : String(children);

    // No letter-by-letter reveal for people who prefer reduced motion
    if (shouldReduceMotion) {
        return <span>{text}</span>;
    }

    return (
        <span ref={ref}>
            {/* aria-label is ignored on a plain span, so screen readers get a visually hidden copy instead.
                Not selectable, so copying the paragraph doesn't paste it twice */}
            <span className='visually-hidden' style={{ userSelect: 'none' }}>{text}</span>
            <span aria-hidden="true">
                {text.split('').map((letter, index) => (
                    <motion.span
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: duration, delay: index * speed }}
                    >
                        {letter}
                    </motion.span>
                ))}
            </span>
        </span>
    );
}

export default TypingEffect;
