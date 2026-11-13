import { useRef } from 'react';
import { gsap, useGSAP, MOTION_OK } from '../../../lib/gsap';
import classes from './TechMarquee.module.css';

interface TechMarqueeProps {
    items: string[];
}

/** Endlessly scrolling row of technologies. Speeds up briefly while the page is scrolled. */
const TechMarquee = ({ items }: TechMarqueeProps) => {
    const root = useRef<HTMLDivElement>(null);
    const track = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const mm = gsap.matchMedia();
        mm.add(MOTION_OK, () => {
            const loop = gsap.to(track.current, {
                xPercent: -50,
                duration: 30,
                ease: 'none',
                repeat: -1,
            });

            // Nudge the speed while scrolling for a lively feel
            let timeout: ReturnType<typeof setTimeout>;
            const onScroll = () => {
                gsap.to(loop, { timeScale: 3, duration: 0.3 });
                clearTimeout(timeout);
                timeout = setTimeout(() => gsap.to(loop, { timeScale: 1, duration: 0.8 }), 150);
            };
            window.addEventListener('scroll', onScroll, { passive: true });

            return () => {
                window.removeEventListener('scroll', onScroll);
                clearTimeout(timeout);
            };
        });
        return () => mm.revert();
    }, { scope: root });

    // Render the list twice so the loop is seamless
    const doubled = [...items, ...items];

    return (
        <div className={classes.marquee} ref={root}>
            <ul aria-label="Technologies we work with" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>
                {items.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <div className={classes.track} ref={track} aria-hidden="true">
                {doubled.map((item, i) => (
                    <span className={`${classes.item} ${i >= items.length ? classes.dup : ''}`} key={`${item}-${i}`}>
                        {item}
                        <span className={classes.dot} />
                    </span>
                ))}
            </div>
        </div>
    );
};

export default TechMarquee;
