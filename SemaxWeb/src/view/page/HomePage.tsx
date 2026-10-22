import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import classes from './css/HomePage.module.css'
import Hero from '../components/hero/Hero';
import SectionHeader from '../components/section_header/SectionHeader';
import Card from '../components/card/Card'
import PartnerCard from '../components/partner_display/partner_card';
import ContactCta from '../components/contact_cta/ContactCta';
import ButtonLink from '../components/button/button_link/ButtonLink';
import TypingEffect from '../components/text_animations/typing_effect';
import { CheckIcon, LinkedinIcon, MapPinIcon } from '../../assets/Icons';
import { services } from '../content/services';
import { founders, initials } from '../content/company';
import { reveal } from '../animations/reveal';
import { sectionPath } from '../content/navigation';

const highlights = [
    { title: 'Custom-built', text: 'Built around your processes. No off-the-shelf products, no unnecessary complexity.' },
    { title: 'Reliable & scalable', text: 'Applications built on solid architecture that can grow with you.' },
    { title: 'Strategic advice', text: 'Guidance on architecture, technology choices and long-term digital strategy.' },
    { title: 'Front to back', text: 'From modern front-end interfaces to robust back-end systems and integrations.' },
];

const HomePage = () => {
    const location = useLocation();
    const isPageLoad = useRef(true);

    // scroll to the section in the url hash (smooth scrolling and the header offset come from CSS)
    useEffect(() => {
        let cancelled = false;
        // wait for the web fonts first: they change text heights, which would move the target mid-scroll
        document.fonts.ready.then(() => {
            if (cancelled) return;
            const pageLoad = isPageLoad.current;
            isPageLoad.current = false;
            if (!location.hash) {
                window.scrollTo({ top: 0 });
                return;
            }
            const target = document.getElementById(location.hash.slice(1));
            if (!target) return;
            target.scrollIntoView();
            // in-app links: move keyboard and screen reader focus along, as a native #anchor jump does.
            // Not on page load (or reload) or native fragment jumps (key 'default'), e.g. the skip link
            if (!pageLoad && location.key !== 'default') {
                if (!target.hasAttribute('tabindex')) {
                    target.setAttribute('tabindex', '-1');
                    target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
                }
                target.focus({ preventScroll: true });
            }
        });
        return () => { cancelled = true; };
    }, [location]);

    return (
        <main id='main'>
            <Hero />

            <section id='services' className={`${classes.section} ${classes.sand}`} aria-labelledby='services-title'>
                <div className={classes.inner}>
                    <SectionHeader
                        eyebrow='What we do'
                        title='Our services'
                        titleId='services-title'
                        intro='Five ways we help, from the first line of code to long-term IT strategy.'
                    />
                    <div className={classes.cardGrid}>
                        {services.map(({ id, Icon, title, description }, index) => (
                            <Card
                                key={id}
                                id={id}
                                icon={<Icon aria-hidden='true' />}
                                title={title}
                                description={description}
                                number={index + 1}
                                delay={(index % 3) * 0.08}
                            />
                        ))}
                        <motion.div className={classes.ctaCard} {...reveal(0.16)}>
                            <h3 className={classes.ctaTitle}>Not sure where to start?</h3>
                            <p className={classes.ctaText}>
                                Tell us about your challenge and we'll help you choose the right approach.
                            </p>
                            <ButtonLink href={sectionPath.contact}>Let's talk</ButtonLink>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* single column: heading, photo, text. From 960px: text left, photo right */}
            <section id='about' className={`${classes.section} ${classes.white}`} aria-labelledby='about-title'>
                <div className={`${classes.inner} ${classes.aboutGrid}`}>
                    <SectionHeader
                        eyebrow='About us'
                        title='Engineering and IT advice in one team'
                        titleId='about-title'
                        align='start'
                        className={classes.aboutHeader}
                    />

                    <motion.figure className={classes.photo} {...reveal(0.1)}>
                        <img
                            src='/Owner-semax.jpg'
                            alt='The two founders of Semax Solutions, Max Verheul and Sem Winters, smiling side by side'
                            width={2295}
                            height={1764}
                            loading='lazy'
                            className={classes.photoImg}
                        />
                        <figcaption className={classes.badge}>
                            <MapPinIcon className={classes.badgeIcon} aria-hidden='true' />
                            Based in Bilthoven, NL
                        </figcaption>
                    </motion.figure>

                    <div className={classes.aboutText}>
                        <p className={classes.aboutLead}>
                            <TypingEffect speed={0.01}>
                                We are a full-stack software and IT consultancy company. With a strong background in software development, we create custom software solutions and provide strategic IT guidance tailored to your business.
                            </TypingEffect>
                        </p>
                        <motion.p className={classes.aboutBody} {...reveal(0.1)}>
                            We combine technical expertise with hands-on consultancy and work closely with our clients
                            to turn ideas into practical, high-quality software that supports real business goals.
                        </motion.p>

                        <motion.ul className={classes.highlights} {...reveal(0.15)}>
                            {highlights.map(item => (
                                <li key={item.title} className={classes.highlight}>
                                    <span className={classes.highlightIcon}><CheckIcon aria-hidden='true' /></span>
                                    <span>
                                        <strong className={classes.highlightTitle}>{item.title}</strong>
                                        <span className={classes.highlightText}>{item.text}</span>
                                    </span>
                                </li>
                            ))}
                        </motion.ul>

                        <motion.div className={classes.founders} {...reveal(0.2)}>
                            <p className={classes.foundersLabel}>Founded by</p>
                            <ul className={classes.founderList}>
                                {founders.map(founder => (
                                    <li key={founder.linkedin}>
                                        <a className={classes.founder} href={founder.linkedin} target='_blank' rel='noopener noreferrer'>
                                            <span className={classes.avatar} aria-hidden='true'>{initials(founder.name)}</span>
                                            <span className={classes.founderText}>
                                                <span className={classes.founderName}>{founder.name}</span>
                                                <span className={classes.founderRole}><span className='visually-hidden'>, </span>Co-founder</span>
                                            </span>
                                            <LinkedinIcon className={classes.founderIcon} aria-hidden='true' />
                                            <span className='visually-hidden'>, LinkedIn profile (opens in a new tab)</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section id='partners' className={`${classes.section} ${classes.sand}`} aria-labelledby='partners-title'>
                <div className={classes.inner}>
                    <SectionHeader
                        eyebrow='Who we work with'
                        title='Our partners'
                        titleId='partners-title'
                        intro='We work together with specialists in their field.'
                    />
                    <div className={classes.partnerContainer}>
                        <PartnerCard
                            logoUrl='/Mierij_Meteo.png'
                            name='Mierij Meteo'
                            description='Specialized in meteorological data and systems.'
                            link='https://mierijmeteonl.nl/'
                        />
                    </div>
                </div>
            </section>

            <ContactCta />
        </main>
    )
}

export default HomePage;
