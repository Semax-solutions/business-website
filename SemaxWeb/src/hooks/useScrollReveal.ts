import type { RefObject } from 'react';
import { gsap, useGSAP, MOTION_OK } from '../lib/gsap';

/**
 * Scroll-triggered reveal animations for everything inside `scope`.
 *
 * - `data-reveal`          → element fades/slides up when it enters the viewport
 * - `data-reveal="left"`   → slides in from the left (also "right")
 * - `data-stagger`         → direct children reveal one after another
 * - `data-parallax="0.2"`  → element drifts while scrolling (value = strength)
 * - `data-clip`            → element is revealed with a clip-path wipe
 *
 * Everything is skipped when the user prefers reduced motion.
 */
export function useScrollReveal(scope: RefObject<HTMLElement | null>) {
    useGSAP(() => {
        const root = scope.current;
        if (!root) return;

        const mm = gsap.matchMedia();
        mm.add(MOTION_OK, () => {
            root.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
                const dir = el.dataset.reveal;
                const x = dir === 'left' ? -60 : dir === 'right' ? 60 : 0;
                const y = x === 0 ? 40 : 0;
                gsap.from(el, {
                    x, y,
                    autoAlpha: 0,
                    duration: 0.9,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: el, start: 'top 85%', once: true },
                });
            });

            root.querySelectorAll<HTMLElement>('[data-stagger]').forEach((group) => {
                gsap.from(group.children, {
                    y: 50,
                    autoAlpha: 0,
                    duration: 0.7,
                    ease: 'power3.out',
                    stagger: 0.1,
                    scrollTrigger: { trigger: group, start: 'top 80%', once: true },
                });
            });

            root.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
                const strength = parseFloat(el.dataset.parallax || '0.15');
                gsap.fromTo(el,
                    { yPercent: -strength * 50 },
                    {
                        yPercent: strength * 50,
                        ease: 'none',
                        scrollTrigger: { trigger: el.parentElement ?? el, start: 'top bottom', end: 'bottom top', scrub: true },
                    });
            });

            root.querySelectorAll<HTMLElement>('[data-clip]').forEach((el) => {
                gsap.fromTo(el,
                    { clipPath: 'inset(12% 12% 12% 12% round 24px)', scale: 1.05 },
                    {
                        clipPath: 'inset(0% 0% 0% 0% round 24px)',
                        scale: 1,
                        duration: 1.2,
                        ease: 'power3.out',
                        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
                    });
            });
        });

        return () => mm.revert();
    }, { scope });
}
