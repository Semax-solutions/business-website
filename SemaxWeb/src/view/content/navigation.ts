// In-app link targets. The homepage lives at '/'; '/home' still works as an alias for old links.
export const sectionPath = {
    home: '/',
    services: '/#services',
    about: '/#about',
    partners: '/#partners',
    contact: '/#contact',
} as const;

/** Link to a single service card, e.g. '/#it-consulting' */
export const servicePath = (id: string) => `/#${id}`;
