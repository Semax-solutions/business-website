import { motion } from 'motion/react';

// Composition built from the Semax hex-cube mark. Purely decorative.

const hexPoints = (cx: number, cy: number, r: number) =>
    Array.from({ length: 6 }, (_, i) => {
        const angle = (Math.PI / 180) * (60 * i - 90);
        return `${(cx + r * Math.cos(angle)).toFixed(1)},${(cy + r * Math.sin(angle)).toFixed(1)}`;
    }).join(' ');

interface CubeProps {
    cx: number;
    cy: number;
    size: number;
    faces?: [top: string, left: string, right: string];
    stroke?: string;
}

/** Isometric cube: three shaded faces, or an outline when only `stroke` is given. */
const Cube = ({ cx, cy, size: s, faces, stroke }: CubeProps) => {
    const w = s * 0.866;
    const top = `M${cx} ${cy - s}L${cx + w} ${cy - s / 2}L${cx} ${cy}L${cx - w} ${cy - s / 2}Z`;
    const left = `M${cx - w} ${cy - s / 2}L${cx} ${cy}L${cx} ${cy + s}L${cx - w} ${cy + s / 2}Z`;
    const right = `M${cx + w} ${cy - s / 2}L${cx} ${cy}L${cx} ${cy + s}L${cx + w} ${cy + s / 2}Z`;

    if (!faces) {
        return (
            <g fill="none" stroke={stroke} strokeWidth={2} strokeLinejoin="round">
                <path d={`${top}${left}${right}`} />
            </g>
        );
    }
    return (
        <g>
            <path d={top} fill={faces[0]} />
            <path d={left} fill={faces[1]} />
            <path d={right} fill={faces[2]} />
        </g>
    );
};

// one slow bob per piece; delay + duration stays under 5s, so nothing keeps moving (WCAG 2.2.2)
const float = (distance: number, duration: number, delay = 0) => ({
    animate: { y: [0, -distance, 0] },
    transition: { duration, delay, ease: 'easeInOut' as const },
});

const HeroArt = () => {
    return (
        <svg viewBox="0 0 520 520" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
            <defs>
                <filter id="semax-hero-shadow" x="-30%" y="-30%" width="160%" height="170%">
                    <feDropShadow dx="0" dy="28" stdDeviation="26" floodColor="#0B1F20" floodOpacity="0.45" />
                </filter>
            </defs>

            {/* hexagon rings */}
            <polygon points={hexPoints(260, 260, 250)} stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
            <polygon points={hexPoints(260, 260, 208)} stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" strokeDasharray="3 9" strokeLinecap="round" />

            {/* the brand mark */}
            <motion.g {...float(10, 4.5)}>
                <g transform="translate(100 100) scale(1.28)" filter="url(#semax-hero-shadow)">
                    <path d="M125 0L233.253 62.5V187.5L125 250L16.7468 187.5V62.5L125 0Z" fill="#FFFFFF" />
                    <path d="M124.603 25L211.205 75L124.603 125L38 75Z" fill="#EEF6F6" />
                    <path
                        d="M211.205 75L124.603 25L38 75M211.205 75V175M211.205 75L124.603 125M211.205 175L124.603 225M211.205 175L200.603 169.736M124.603 225L38 175M124.603 225V213.614M38 175V75M38 175L48.6025 169.736M38 75L124.603 125M124.603 125V132M124.603 125V213.614M124.603 132L48.6025 169.736M124.603 132L200.603 169.736M48.6025 169.736L124.603 213.614M124.603 213.614L200.603 169.736"
                        stroke="#5F9EA0"
                        strokeWidth="5"
                        strokeLinejoin="round"
                    />
                </g>
            </motion.g>

            {/* floating accent cubes */}
            <motion.g {...float(14, 3.8, 0.4)}>
                <Cube cx={440} cy={92} size={30} faces={['#F6C3A6', '#E8956B', '#D27C52']} />
            </motion.g>
            <motion.g {...float(12, 4, 0.8)}>
                <Cube cx={84} cy={408} size={40} faces={['#A9D3D4', '#5F9EA0', '#4A7C7E']} />
            </motion.g>
            <motion.g {...float(8, 3.4, 0.6)}>
                <Cube cx={88} cy={118} size={22} stroke="rgba(255,255,255,0.6)" />
            </motion.g>
            <motion.g {...float(10, 3.6, 1)}>
                <Cube cx={452} cy={404} size={18} stroke="#F6C3A6" />
            </motion.g>
        </svg>
    );
};

export default HeroArt;
