import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import ButtonLink from '../button/button_link/ButtonLink';
import HeroArt from './HeroArt';
import { ChevronDownIcon } from '../../../assets/Icons';
import { easeOut, enter } from '../../animations/reveal';
import { sectionPath } from '../../content/navigation';
import classes from './Hero.module.css';

const technologies = ['TypeScript', 'JavaScript', 'Java', 'C#', 'SQL'];

const Hero = () => {
    return (
        <section className={classes.hero} aria-labelledby='hero-title'>
            <div className={classes.inner}>
                <div className={classes.content}>
                    <motion.p className={classes.eyebrow} {...enter(0)}>
                        <span className={classes.dot} aria-hidden='true' />
                        Full-stack software & IT consultancy
                    </motion.p>
                    <motion.h1 id='hero-title' className={classes.title} {...enter(0.08)}>
                        Custom software that <span className={classes.highlight}>fits your business</span>
                    </motion.h1>
                    <motion.p className={classes.lead} {...enter(0.16)}>
                        At Semax Solutions, we design and build software around your needs.
                        No generic tools, just powerful technology tailored to your business.
                    </motion.p>
                    <motion.div className={classes.actions} {...enter(0.24)}>
                        <ButtonLink href={sectionPath.contact}>Get in touch</ButtonLink>
                        <ButtonLink href={sectionPath.services} variant='ghost' icon={ChevronDownIcon}>Our services</ButtonLink>
                    </motion.div>
                    <motion.div className={classes.stack} {...enter(0.32)}>
                        <span className={classes.stackLabel}>We work with</span>
                        <ul className={classes.stackList}>
                            {technologies.map(tech => <li key={tech}>{tech}</li>)}
                        </ul>
                    </motion.div>
                </div>

                <motion.div
                    className={classes.art}
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.9, ease: easeOut, delay: 0.2 }}
                >
                    <HeroArt />
                </motion.div>
            </div>

            <Link to={sectionPath.services} className={classes.scrollCue} aria-label='Scroll to services'>
                <ChevronDownIcon aria-hidden='true' />
            </Link>
        </section>
    );
};

export default Hero;
