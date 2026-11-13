import { gsap } from './gsap';

let resolveReady!: () => void;

/** Resolves once the loading screen starts leaving; intro animations wait for this. */
export const pageReady = new Promise<void>((resolve) => { resolveReady = resolve; });

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

const windowLoaded = () => new Promise<void>((resolve) => {
    if (document.readyState === 'complete') resolve();
    else window.addEventListener('load', () => resolve(), { once: true });
});

/** Waits for the page (and fonts) to load, then animates the loading screen away. */
export function startPreloader() {
    const el = document.getElementById('preloader');
    const finish = () => {
        document.documentElement.classList.remove('is-loading');
        resolveReady();
    };
    if (!el) return finish();

    const loaded = Promise.all([windowLoaded(), document.fonts?.ready ?? Promise.resolve(), wait(500)]);

    // Never keep people waiting longer than 5 seconds
    Promise.race([loaded, wait(5000)]).then(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            el.remove();
            return finish();
        }

        // Take over the CSS progress bar from wherever it currently is
        const bar = el.querySelector<HTMLElement>('.pl-bar span');
        const current = bar ? new DOMMatrix(getComputedStyle(bar).transform).a : 0;
        if (bar) bar.style.animation = 'none';

        gsap.timeline({ onComplete: () => el.remove() })
            .fromTo(bar, { scaleX: current }, { scaleX: 1, duration: 0.35, ease: 'power2.out' })
            .to(el.querySelector('.pl-inner'), { y: -24, autoAlpha: 0, duration: 0.35, ease: 'power2.in' }, '+=0.05')
            .add(finish)
            .to(el, { yPercent: -100, duration: 0.85, ease: 'power4.inOut' }, '<');
    });
}
