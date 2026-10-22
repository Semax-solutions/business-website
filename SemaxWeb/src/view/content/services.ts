import type { ComponentType, SVGProps } from 'react';
import { ApiIcon, CodeIcon, ConsultingIcon, LayersIcon, MonitorIcon } from '../../assets/Services';

export interface Service {
    /** anchor id of the service card, used by the footer links */
    id: string;
    title: string;
    description: string;
    Icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export const services: Service[] = [
    {
        id: 'software-development',
        title: 'Software Development',
        description: 'From dynamic, responsive front-end interfaces using JavaScript, TypeScript, HTML and CSS to powerful back-end solutions in Java, C# and SQL, we build websites and web applications tailored to your needs.',
        Icon: CodeIcon,
    },
    {
        id: 'it-strategy-architecture',
        title: 'IT Strategy & Architecture',
        description: 'Strategic planning and architectural design to align your technology infrastructure with your business objectives. We create scalable, secure and efficient IT solutions that support your long-term growth and digital transformation.',
        Icon: LayersIcon,
    },
    {
        id: 'data-api-integration',
        title: 'Data & API Integration',
        description: 'Seamlessly connect your systems and applications through robust APIs, data integrations and automated data pipelines. We enable real-time data synchronization, streamline workflows and unlock the full potential of your business data.',
        Icon: ApiIcon,
    },
    {
        id: 'management-services',
        title: 'Management Services',
        description: 'Comprehensive IT management and support services to keep your systems running smoothly. From monitoring and maintenance to security updates and performance optimization, we ensure your technology infrastructure operates at peak efficiency.',
        Icon: MonitorIcon,
    },
    {
        id: 'it-consulting',
        title: 'IT Consulting',
        description: 'Expert guidance and strategic advice to navigate complex technology decisions. We provide actionable insights on digital transformation, technology selection, security best practices and optimization strategies to drive business success.',
        Icon: ConsultingIcon,
    },
];
