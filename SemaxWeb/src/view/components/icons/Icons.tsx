import type { SVGProps } from 'react';

const base: SVGProps<SVGSVGElement> = {
    width: 24,
    height: 24,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
};

export const GlobeIcon = (p: SVGProps<SVGSVGElement>) => (
    <svg {...base} {...p}>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </svg>
);

export const WebAppIcon = (p: SVGProps<SVGSVGElement>) => (
    <svg {...base} {...p}>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 9h18M7 13h4M7 16h7M15 13h2" />
    </svg>
);

export const PhoneIcon = (p: SVGProps<SVGSVGElement>) => (
    <svg {...base} {...p}>
        <rect x="6" y="2" width="12" height="20" rx="2.5" />
        <path d="M11 18h2" />
    </svg>
);

export const PlugIcon = (p: SVGProps<SVGSVGElement>) => (
    <svg {...base} {...p}>
        <path d="M18 16L22 12L18 8M6 8L2 12L6 16M14.5 4L9.5 20" />
    </svg>
);

export const CompassIcon = (p: SVGProps<SVGSVGElement>) => (
    <svg {...base} {...p}>
        <circle cx="12" cy="12" r="9" />
        <path d="M15.5 8.5l-2 5-5 2 2-5z" />
    </svg>
);

export const ShieldIcon = (p: SVGProps<SVGSVGElement>) => (
    <svg {...base} {...p}>
        <path d="M12 3l8 3v6c0 4.5-3.4 8.2-8 9-4.6-.8-8-4.5-8-9V6z" />
        <path d="M9 12l2 2 4-4" />
    </svg>
);

export const ArrowRightIcon = (p: SVGProps<SVGSVGElement>) => (
    <svg {...base} width={18} height={18} {...p}>
        <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
);

export const ExternalIcon = (p: SVGProps<SVGSVGElement>) => (
    <svg {...base} width={18} height={18} {...p}>
        <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
    </svg>
);

export const CheckIcon = (p: SVGProps<SVGSVGElement>) => (
    <svg {...base} width={18} height={18} {...p}>
        <path d="M5 12l5 5 9-10" />
    </svg>
);
