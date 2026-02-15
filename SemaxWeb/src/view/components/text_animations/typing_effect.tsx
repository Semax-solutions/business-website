import {motion, useInView} from 'motion/react';
import { useRef, type ReactNode } from 'react';

const TypingEffect = ({children, speed = 0.01, duration = 0.05}: {children: ReactNode, speed?: number, duration?: number}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    
    // Convert children to string
    const text = typeof children === 'string' ? children : String(children);
    
    return (
        <span ref={ref} aria-label={text}>
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