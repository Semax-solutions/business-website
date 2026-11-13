import type { ReactNode } from 'react';
import { CompassIcon, GlobeIcon, PhoneIcon, PlugIcon, ShieldIcon, WebAppIcon } from '../view/components/icons/Icons';

/* ------------------------------------------------------------------
 * All editable site copy lives here, so text can be changed
 * without touching the page layouts.
 * ------------------------------------------------------------------ */

export interface Service {
    icon: ReactNode;
    title: string;
    description: string;
}

export const services: Service[] = [
    {
        icon: <GlobeIcon />,
        title: 'Websites',
        description: 'Fast, responsive and search-friendly websites that represent your brand. From a sharp landing page to a complete company site that is easy to keep up to date.',
    },
    {
        icon: <WebAppIcon />,
        title: 'Web applications',
        description: 'Dashboards, portals and platforms that run in the browser. Interactive web apps with live data, user accounts and integrations, like Weatherstation.nu.',
    },
    {
        icon: <PhoneIcon />,
        title: 'Native apps',
        description: 'Apps for iOS, Android and desktop that feel at home on every device. Native or cross-platform, depending on what your users and your budget need.',
    },
    {
        icon: <PlugIcon />,
        title: 'Data & API integration',
        description: 'Connect your systems through robust APIs, data pipelines and real-time synchronisation, so your data flows to where it is needed.',
    },
    {
        icon: <CompassIcon />,
        title: 'IT strategy & architecture',
        description: 'Advice on architecture, technology choices and long-term digital strategy. We help you make decisions that still hold up years from now.',
    },
    {
        icon: <ShieldIcon />,
        title: 'Maintenance & support',
        description: 'Monitoring, updates, security patches and performance tuning after launch, so your software keeps running smoothly.',
    },
];

/** Languages & frameworks shown in the scrolling marquee. */
export const technologies: string[] = [
    'TypeScript', 'JavaScript', 'React', 'Node.js', 'Java', 'C#', '.NET',
    'Kotlin', 'Swift', 'Python', 'SQL', 'HTML & CSS',
];

export const processSteps = [
    { title: 'Discover', text: 'We start with your goals, users and existing systems, and translate them into a clear plan.' },
    { title: 'Design', text: 'We choose the architecture and the language that fit your use case, not the other way around.' },
    { title: 'Build', text: 'Short iterations with regular demos, so you see progress and can steer along the way.' },
    { title: 'Launch & support', text: 'We deploy, monitor and keep improving your product after it goes live.' },
];

/* ------------------------------------------------------------------
 * Products
 * Images: put your screenshots in /public/products/<folder>/ using the
 * file names below (or change the paths). Missing images show a placeholder.
 * ------------------------------------------------------------------ */

export interface ProductImage {
    src: string;
    alt: string;
    caption?: string;
    /** width / height of the image, used to size its frame */
    ratio?: number;
}

export interface Product {
    slug: string;
    name: string;
    client: string;
    clientLogo: string;
    tagline: string;
    description: string[];
    features: { title: string; text: string }[];
    tags: string[];
    url: string;
    cover: ProductImage;
    gallery: ProductImage[];
}

export const products: Product[] = [
    {
        slug: 'weatherstation',
        name: 'Weatherstation.nu',
        client: 'Mierij Meteo',
        clientLogo: '/Mierij_Meteo.png',
        tagline: 'A live weather dashboard for professional weather stations: every measurement, warning and trend in one screen.',
        description: [
            'Mierij Meteo has designed and built professional weather measurement equipment since 1983. Together with them we built Weatherstation.nu: an online platform that brings the measurements from their weather stations to the browser.',
            'Each organisation gets its own dashboards with live tiles for wind, temperature, humidity and pressure, interactive charts, a rain radar and heat-stress (WBGT) advice. Layouts are fully customisable, and thresholds trigger warnings when conditions change.',
        ],
        features: [
            { title: 'Live measurements', text: 'Wind direction and speed, gusts, temperature, humidity and pressure, with units you can switch per tile (m/s, km/h, Beaufort, °C/°F, hPa and more).' },
            { title: 'Heat stress (WBGT)', text: 'Wet Bulb Globe Temperature with a colour-coded risk flag and clear work advice for each level.' },
            { title: 'Charts & rain radar', text: 'Interactive charts from 1 hour up to 30 days, next to a live Buienradar rain radar.' },
            { title: 'Warnings & thresholds', text: 'Set your own thresholds and keep a history of every warning that was triggered and resolved.' },
            { title: 'Custom dashboards', text: 'Multiple organisations and dashboards, each with its own drag-and-drop layout, data export and audit log.' },
        ],
        tags: ['Web application', 'Real-time data', 'Data visualisation', 'Multi-tenant', 'API integration'],
        url: 'https://weatherstation.nu',
        cover: { src: '/products/weatherstation/cover.jpg', alt: 'Weatherstation.nu dashboard with wind compass, wind speed, gust, humidity, temperature, WBGT and pressure tiles', ratio: 1305 / 890 },
        gallery: [
            { src: '/products/weatherstation/charts.jpg', alt: 'Weatherstation.nu wind speed, temperature and WBGT charts', caption: 'Interactive charts', ratio: 1305 / 755 },
            { src: '/products/weatherstation/mobile.jpg', alt: 'Weatherstation.nu dashboard on a phone', caption: 'On mobile', ratio: 585 / 1266 },
            { src: '/products/weatherstation/mobile-charts.jpg', alt: 'Weatherstation.nu WBGT, pressure and wind speed chart on a phone', caption: 'Charts on mobile', ratio: 585 / 1266 },
        ],
    },
];
