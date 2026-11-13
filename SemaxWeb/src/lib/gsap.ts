import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

// Register plugins once for the whole app
gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/** Media query used to only run motion for users that haven't asked for reduced motion. */
export const MOTION_OK = '(prefers-reduced-motion: no-preference)';

export { gsap, ScrollTrigger, SplitText, useGSAP };
