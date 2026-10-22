export const company = {
    name: 'Semax Solutions',
    email: 'info@semaxsolutions.nl',
    phone: {
        label: '+31 6 xx xx xx xx',
        href: 'tel:+316xxxxxxxx',
    },
    address: {
        street: 'P.C. Staalweg 12',
        postalCode: '3731 TJ',
        city: 'Bilthoven',
        country: 'Netherlands',
    },
};

export interface Founder {
    name: string;
    linkedin: string;
}

export const founders: Founder[] = [
    { name: 'Max Verheul', linkedin: 'https://www.linkedin.com/in/maxverheul/' },
    { name: 'Sem Winters', linkedin: 'https://www.linkedin.com/in/sem-winters/' },
];

/** "Max Verheul" -> "MV" */
export const initials = (name: string) => name.split(' ').map(part => part[0]).join('');
