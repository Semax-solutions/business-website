import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import NavButton from '../button/navbutton/NavButton';
import classes from './Header.module.css'
import { gsap, useGSAP, MOTION_OK } from '../../../lib/gsap';
import { pageReady } from '../../../lib/preloader';

const links = [
    { path: '/home', label: 'Home' },
    { path: '/home#services', label: 'Services' },
    { path: '/products', label: 'Products' },
    { path: '/home#about', label: 'About' },
    { path: '/home#footer-contact', label: 'Contact' },
];

const Header = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const headerRef = useRef<HTMLElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    // Lock page scroll while the menu is open, close it with Escape
    useEffect(() => {
        if (!isMenuOpen) return;
        document.body.style.overflow = 'hidden';
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false); };
        window.addEventListener('keydown', onKey);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', onKey);
        };
    }, [isMenuOpen]);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Slide the header in on first load
    useGSAP(() => {
        const mm = gsap.matchMedia();
        mm.add(MOTION_OK, () => {
            const intro = gsap.from(headerRef.current, { yPercent: -100, duration: 0.8, ease: 'power3.out', delay: 0.2, paused: true });
            pageReady.then(() => intro.play());
        });
        return () => mm.revert();
    }, { scope: headerRef });

    // Stagger the mobile menu items when it opens
    useGSAP(() => {
        if (!isMenuOpen) return;
        const mm = gsap.matchMedia();
        mm.add(MOTION_OK, () => {
            gsap.from(`.${classes.menuItem}`, { x: 40, autoAlpha: 0, stagger: 0.06, duration: 0.4, ease: 'power2.out', delay: 0.1 });
        });
        return () => mm.revert();
    }, { scope: menuRef, dependencies: [isMenuOpen] });

    return (
        <>
        <header ref={headerRef} className={`${classes.header} ${scrolled || isMenuOpen ? classes.scrolled : ''}`}>
            <div className={classes.innerHeader}>
                <Link to="/home" aria-label="Semax Solutions home">
                    <img className={classes.logo} alt="Semax Solutions" src="/Header_logo.png" />
                </Link>

                <nav className={classes.nav} aria-label="Main">
                    {links.map((l) => <NavButton key={l.path} path={l.path}>{l.label}</NavButton>)}
                </nav>

                <button
                    type="button"
                    className={classes.navbarToggle}
                    onClick={() => setMenuOpen(!isMenuOpen)}
                    aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={isMenuOpen}
                    aria-controls="mobile-menu"
                >
                    <span className={`${classes.iconBar} ${isMenuOpen ? classes.closeFirst : ''}`}></span>
                    <span className={`${classes.iconBar} ${isMenuOpen ? classes.hideMiddle : ''}`}></span>
                    <span className={`${classes.iconBar} ${isMenuOpen ? classes.closeLast : ''}`}></span>
                </button>
            </div>
        </header>

        {/* Rendered outside <header>: its blur/transform would otherwise trap this fixed panel inside the 80px bar */}
        <div
            ref={menuRef}
            id="mobile-menu"
            className={`${classes.menu} ${isMenuOpen ? classes.menuOpen : ''}`}
            aria-hidden={!isMenuOpen}
        >
            <nav className={classes.menuItems} onClick={() => setMenuOpen(false)} aria-label="Mobile">
                {links.map((l) => (
                    <div className={classes.menuItem} key={l.path}>
                        <NavButton path={l.path}>{l.label}</NavButton>
                    </div>
                ))}
            </nav>
        </div>
        </>
    )
}

export default Header;
