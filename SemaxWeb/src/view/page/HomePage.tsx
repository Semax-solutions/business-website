import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom';
import classes from './css/HomePage.module.css'
import Card from '../components/card/Card'
import PartnerCard from '../components/partner_display/partner_card';
import TypingEffect from '../components/text_animations/typing_effect';
import TechMarquee from '../components/marquee/TechMarquee';
import ProductImage from '../components/product_image/ProductImage';
import CtaBanner from '../components/cta/CtaBanner';
import { ArrowRightIcon } from '../components/icons/Icons';
import { processSteps, products, services, technologies } from '../../data/content';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { gsap, SplitText, useGSAP, MOTION_OK } from '../../lib/gsap';
import { pageReady } from '../../lib/preloader';

const HomePage = () => {
    const pageRef = useRef<HTMLElement>(null);
    const heroRef = useRef<HTMLElement>(null);
    const processRef = useRef<HTMLDivElement>(null);
    const location = useLocation();
    const featured = products[0];

    // Scroll to section if url contains hash
    useEffect(() => {
        if (location.hash) {
            const element = document.getElementById(location.hash.replace('#', ''));
            element?.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [location]);

    useScrollReveal(pageRef);

    // Hero intro + ambient motion
    useGSAP(() => {
        const mm = gsap.matchMedia();
        mm.add(MOTION_OK, () => {
            const split = SplitText.create(`.${classes.heroTitle}`, { type: 'words,chars', mask: 'words' });

            const tl = gsap.timeline({ paused: true, defaults: { ease: 'power4.out' } });
            tl.from(`.${classes.heroLogo}`, { scale: 0.6, rotate: -20, autoAlpha: 0, duration: 1 })
              .from(`.${classes.heroEyebrow}`, { y: 20, autoAlpha: 0, duration: 0.6 }, '-=0.6')
              .from(split.chars, { yPercent: 110, duration: 0.9, stagger: 0.025 }, '-=0.4')
              .from(`.${classes.heroLead}`, { y: 30, autoAlpha: 0, duration: 0.8 }, '-=0.6')
              .from(`.${classes.heroActions} > *`, { y: 20, autoAlpha: 0, stagger: 0.1, duration: 0.6 }, '-=0.5')
              .from(`.${classes.scrollHint}`, { autoAlpha: 0, duration: 0.6 }, '-=0.2');
            pageReady.then(() => tl.play());

            // Floating background shapes
            gsap.utils.toArray<HTMLElement>(`.${classes.blob}`).forEach((blob, i) => {
                gsap.to(blob, {
                    x: gsap.utils.random(-80, 80),
                    y: gsap.utils.random(-60, 60),
                    scale: gsap.utils.random(0.85, 1.2),
                    duration: gsap.utils.random(6, 10),
                    ease: 'sine.inOut',
                    repeat: -1,
                    yoyo: true,
                    delay: i * 0.4,
                });
            });

            // Content drifts up and fades as you scroll away from the hero
            gsap.to(`.${classes.heroInner}`, {
                yPercent: -25,
                autoAlpha: 0,
                ease: 'none',
                scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true },
            });

            return () => split.revert();
        });
        return () => mm.revert();
    }, { scope: heroRef });

    // Process timeline: line fills while scrolling, steps light up
    useGSAP(() => {
        const mm = gsap.matchMedia();
        mm.add(MOTION_OK, () => {
            const steps = gsap.utils.toArray<HTMLElement>(`.${classes.step}`);
            const tl = gsap.timeline({
                scrollTrigger: { trigger: processRef.current, start: 'top 75%', end: 'bottom 55%', scrub: 0.6 },
            });
            tl.fromTo(`.${classes.processLineFill}`, { scaleX: 0 }, { scaleX: 1, ease: 'none', duration: steps.length });
            steps.forEach((step, i) => {
                tl.from(step, { y: 30, autoAlpha: 0.15, duration: 0.6 }, i);
                tl.from(step.querySelector(`.${classes.stepDot}`), { scale: 0, duration: 0.4, ease: 'back.out(3)' }, i);
            });
        });
        return () => mm.revert();
    }, { scope: processRef });

    return (
        <main ref={pageRef}>
            {/* ---------------- Hero ---------------- */}
            <section className={classes.hero} ref={heroRef}>
                <div className={classes.heroBg} aria-hidden="true">
                    <span className={`${classes.blob} ${classes.blobA}`} />
                    <span className={`${classes.blob} ${classes.blobB}`} />
                    <span className={`${classes.blob} ${classes.blobC}`} />
                    <div className={classes.grid} />
                </div>

                <div className={`wrap ${classes.heroInner}`}>
                    <img className={classes.heroLogo} src="/Semax_Logo.svg" alt="" width={96} height={96} />
                    <span className={classes.heroEyebrow}>Semax Solutions · Custom software</span>
                    <h1 className={classes.heroTitle}>Software that fits your business.</h1>
                    <p className={classes.heroLead}>
                        Websites, web applications and native apps, built in the language that fits your use case.
                        No generic tools, just technology made for the way you work.
                    </p>
                    <div className={classes.heroActions}>
                        <Link className="btn btn-primary" to="/products">View our work <ArrowRightIcon /></Link>
                        <a className="btn btn-ghost" href="#services">Our services</a>
                    </div>
                </div>

                <a className={classes.scrollHint} href="#services" aria-label="Scroll to services">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M4 8L12 16L20 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </a>
            </section>

            {/* ---------------- Services ---------------- */}
            <section id="services" className={`section ${classes.cream}`}>
                <div className="wrap">
                    <div className={classes.sectionHead} data-reveal>
                        <span className="eyebrow">What we do</span>
                        <h2>Websites, web apps &amp; native apps</h2>
                        <p className="lead">
                            From the first sketch to a product in production: we design, build and maintain software
                            for the web, mobile and desktop, and connect it to the systems you already use.
                        </p>
                    </div>
                    <div className={classes.cardGrid} data-stagger>
                        {services.map((s, i) => (
                            <Card key={s.title} index={i} icon={s.icon} title={s.title} description={s.description} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ---------------- Technologies ---------------- */}
            <section className={`section ${classes.techSection}`}>
                <div className="wrap">
                    <div className={classes.techHead}>
                        <div data-reveal="left">
                            <span className="eyebrow">Our toolbox</span>
                            <h2>The right language for every use case</h2>
                        </div>
                        <p className="lead" data-reveal="right">
                            We are not tied to one stack. Whether it is a fast website, a data-heavy web app or a
                            native mobile app, we pick the languages and frameworks that fit the job, and that your
                            team can maintain later.
                        </p>
                    </div>
                </div>
                <TechMarquee items={technologies} />
            </section>

            {/* ---------------- Featured product ---------------- */}
            <section className={`section ${classes.featured}`}>
                <div className={`wrap ${classes.featuredInner}`}>
                    <div className={classes.featuredText}>
                        <span className="eyebrow" data-reveal>Featured product</span>
                        <h2 data-reveal>{featured.name}</h2>
                        <p className={classes.featuredClient} data-reveal>
                            Built for <strong>{featured.client}</strong>
                        </p>
                        <p className="lead" data-reveal>{featured.tagline}</p>
                        <ul className={classes.tagList} data-stagger>
                            {featured.tags.map((t) => <li key={t}>{t}</li>)}
                        </ul>
                        <div className={classes.featuredActions} data-reveal>
                            <Link className="btn btn-dark" to="/products">Read the case <ArrowRightIcon /></Link>
                            <a className={classes.textLink} href={featured.url} target="_blank" rel="noreferrer">
                                Visit {featured.name}
                            </a>
                        </div>
                    </div>
                    <div className={classes.featuredVisual}>
                        <div className={classes.featuredFrame} style={{ aspectRatio: featured.cover.ratio }} data-clip>
                            <div className={classes.featuredParallax} data-parallax="0.12">
                                <ProductImage src={featured.cover.src} alt={featured.cover.alt} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ---------------- Process ---------------- */}
            <section className={`section ${classes.cream}`}>
                <div className="wrap">
                    <div className={classes.sectionHead} data-reveal>
                        <span className="eyebrow">How we work</span>
                        <h2>From idea to launch, and beyond</h2>
                    </div>
                    <div className={classes.process} ref={processRef}>
                        <div className={classes.processLine} aria-hidden="true">
                            <span className={classes.processLineFill} />
                        </div>
                        <ol className={classes.steps}>
                            {processSteps.map((step, i) => (
                                <li className={classes.step} key={step.title}>
                                    <span className={classes.stepDot} aria-hidden="true" />
                                    <span className={classes.stepNum}>{String(i + 1).padStart(2, '0')}</span>
                                    <h3>{step.title}</h3>
                                    <p>{step.text}</p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </section>

            {/* ---------------- About ---------------- */}
            <section id="about" className="section">
                <div className={`wrap ${classes.about}`}>
                    <div className={classes.aboutText}>
                        <span className="eyebrow" data-reveal>About us</span>
                        <h2 data-reveal>A small team with a full-stack mindset</h2>
                        <p className={classes.aboutBody}>
                            <TypingEffect speed={0.01}>
                                We are a full-stack software and IT consultancy company. With a strong background in software development, we create custom software solutions and provide strategic IT guidance tailored to your business.
                            </TypingEffect>
                        </p>
                        <p className={classes.aboutBody} data-reveal>
                            Because we build websites, web apps and native apps, we can look at the whole picture and
                            advise you honestly on what you actually need.
                        </p>
                    </div>
                    <div className={classes.aboutImage} data-clip>
                        <img src="/Owner-semax.jpg" alt="Max Verheul and Sem Winters, the owners of Semax Solutions" data-parallax="0.1" />
                    </div>
                </div>
            </section>

            {/* ---------------- Partners ---------------- */}
            <section id="partners" className={`section ${classes.cream}`}>
                <div className="wrap">
                    <div className={`${classes.sectionHead} ${classes.center}`} data-reveal>
                        <span className="eyebrow">Our partners</span>
                        <h2>Working together</h2>
                    </div>
                    <div className={classes.partnerGrid} data-stagger>
                        <PartnerCard
                            logoUrl="/Mierij_Meteo.png"
                            name="Mierij Meteo"
                            description="Specialists in professional weather measurement since 1983. Together we built Weatherstation.nu."
                            link="https://mierijmeteonl.nl/"
                        />
                    </div>
                </div>
            </section>

            <CtaBanner
                title="Have an idea for a website or app?"
                text="Tell us what you want to build. We'll think along with you about the best approach, technology and planning."
            />
        </main>
    )
}

export default HomePage;
