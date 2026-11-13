import { useEffect, useRef } from 'react';
import classes from './css/ProductsPage.module.css';
import ProductImage from '../components/product_image/ProductImage';
import CtaBanner from '../components/cta/CtaBanner';
import { CheckIcon, ExternalIcon } from '../components/icons/Icons';
import { products, type Product } from '../../data/content';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { gsap, SplitText, useGSAP, MOTION_OK } from '../../lib/gsap';
import { pageReady } from '../../lib/preloader';

const ProductCase = ({ product }: { product: Product }) => {
    const galleryRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    // Desktop: pin the gallery and scroll it horizontally
    useGSAP(() => {
        const mm = gsap.matchMedia();
        mm.add(`(min-width: 1025px) and ${MOTION_OK}`, () => {
            const track = trackRef.current!;
            const distance = () => track.scrollWidth - window.innerWidth;

            gsap.to(track, {
                x: () => -distance(),
                ease: 'none',
                scrollTrigger: {
                    trigger: galleryRef.current,
                    start: 'center center',
                    end: () => `+=${distance()}`,
                    pin: true,
                    scrub: 0.8,
                    invalidateOnRefresh: true,
                },
            });
        });
        return () => mm.revert();
    }, { scope: galleryRef });

    return (
        <article className={classes.case} id={product.slug}>
            <div className="wrap">
                <header className={classes.caseHead}>
                    <div>
                        <div className={classes.client} data-reveal>
                            <img src={product.clientLogo} alt={`${product.client} logo`} />
                            <span>Built for {product.client}</span>
                        </div>
                        <h2 className={classes.caseTitle} data-reveal>{product.name}</h2>
                        <p className="lead" data-reveal>{product.tagline}</p>
                    </div>
                    <a className="btn btn-dark" href={product.url} target="_blank" rel="noreferrer" data-reveal>
                        Visit {product.name} <ExternalIcon />
                    </a>
                </header>

                <div className={classes.cover} style={{ aspectRatio: product.cover.ratio }} data-clip>
                    <ProductImage src={product.cover.src} alt={product.cover.alt} />
                </div>

                <div className={classes.details}>
                    <div className={classes.story}>
                        <span className="eyebrow" data-reveal>The project</span>
                        {product.description.map((p, i) => <p key={i} data-reveal>{p}</p>)}
                        <ul className={classes.tags} data-stagger>
                            {product.tags.map((t) => <li key={t}>{t}</li>)}
                        </ul>
                    </div>
                    <ul className={classes.features} data-stagger>
                        {product.features.map((f) => (
                            <li key={f.title}>
                                <span className={classes.check}><CheckIcon /></span>
                                <div>
                                    <h3>{f.title}</h3>
                                    <p>{f.text}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className={classes.gallery} ref={galleryRef}>
                <div className={classes.galleryTrack} ref={trackRef}>
                    <div className={classes.galleryIntro}>
                        <span className="eyebrow">Gallery</span>
                        <h3>A look inside {product.name}</h3>
                    </div>
                    {product.gallery.map((img) => (
                        <figure className={classes.shot} key={img.src}>
                            <div className={classes.shotFrame} style={{ aspectRatio: img.ratio }} data-portrait={img.ratio !== undefined && img.ratio < 1 ? '' : undefined}>
                                <ProductImage src={img.src} alt={img.alt} />
                            </div>
                            {img.caption && <figcaption>{img.caption}</figcaption>}
                        </figure>
                    ))}
                </div>
            </div>
        </article>
    );
};

const ProductsPage = () => {
    const pageRef = useRef<HTMLElement>(null);
    const heroRef = useRef<HTMLElement>(null);

    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, []);

    useScrollReveal(pageRef);

    useGSAP(() => {
        const mm = gsap.matchMedia();
        mm.add(MOTION_OK, () => {
            const split = SplitText.create(`.${classes.heroTitle}`, { type: 'words', mask: 'words' });
            const intro = gsap.timeline({ paused: true, defaults: { ease: 'power4.out' } });
            intro
                .from(`.${classes.heroEyebrow}`, { y: 20, autoAlpha: 0, duration: 0.6 })
                .from(split.words, { yPercent: 110, duration: 1, stagger: 0.08 }, '-=0.3')
                .from(`.${classes.heroLead}`, { y: 24, autoAlpha: 0, duration: 0.8 }, '-=0.6');
            pageReady.then(() => intro.play());

            gsap.to(`.${classes.heroRing}`, { rotate: 360, duration: 40, repeat: -1, ease: 'none' });

            return () => split.revert();
        });
        return () => mm.revert();
    }, { scope: heroRef });

    return (
        <main ref={pageRef}>
            <section className={classes.hero} ref={heroRef}>
                <div className={classes.heroRing} aria-hidden="true" />
                <div className="wrap">
                    <span className={`eyebrow ${classes.heroEyebrow}`}>Our products</span>
                    <h1 className={classes.heroTitle}>Built by Semax, used every day.</h1>
                    <p className={`lead ${classes.heroLead}`}>
                        A selection of the products we have designed and built together with our partners,
                        from first idea to a live platform.
                    </p>
                </div>
            </section>

            {products.map((p) => <ProductCase key={p.slug} product={p} />)}

            <CtaBanner
                title="Your product could be next"
                text="Whether it's a website, a web app or a native app, we'd love to hear what you're working on."
            />
        </main>
    );
};

export default ProductsPage;
