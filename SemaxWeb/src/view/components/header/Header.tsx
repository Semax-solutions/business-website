import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import NavButton from '../button/navbutton/NavButton';
import ButtonLink from '../button/button_link/ButtonLink';
import Logo from '../logo/Logo';
import { ArrowRightIcon, MailIcon } from '../../../assets/Icons';
import { company } from '../../content/company';
import { sectionPath } from '../../content/navigation';
import classes from './Header.module.css'

const navItems = [
    { path: sectionPath.home, label: 'Home' },
    { path: sectionPath.services, label: 'Services' },
    { path: sectionPath.about, label: 'About' },
    { path: sectionPath.partners, label: 'Partners' },
];
const menuItems = [...navItems, { path: sectionPath.contact, label: 'Contact' }];

// same breakpoint as the desktop nav in Header.module.css
const desktopQuery = '(min-width: 900px)';

const Header = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isScrolled, setScrolled] = useState(() => window.scrollY > 8);
    const toggleRef = useRef<HTMLButtonElement>(null);
    const { email, address } = company;

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // while the mobile menu is open: lock page scroll, make the page behind it inert
    // (skip link, main and footer: out of the tab order and hidden from screen readers),
    // close it with Escape (returning focus to the toggle), on browser back/forward
    // and when the viewport grows to the desktop nav
    useEffect(() => {
        if (!isMenuOpen) return;

        const root = document.documentElement;
        const behind = document.querySelectorAll<HTMLElement>('#root > :not(header)');
        const desktop = window.matchMedia(desktopQuery);
        const close = () => setMenuOpen(false);
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                close();
                toggleRef.current?.focus();
            }
        };
        const onViewportChange = () => {
            if (desktop.matches) close();
        };

        root.style.overflow = 'hidden';
        behind.forEach(el => { el.inert = true; });
        document.addEventListener('keydown', onKeyDown);
        window.addEventListener('popstate', close);
        desktop.addEventListener('change', onViewportChange);
        return () => {
            root.style.overflow = '';
            behind.forEach(el => { el.inert = false; });
            document.removeEventListener('keydown', onKeyDown);
            window.removeEventListener('popstate', close);
            desktop.removeEventListener('change', onViewportChange);
        };
    }, [isMenuOpen]);

    const closeMenu = () => setMenuOpen(false);
    const isSolid = isScrolled || isMenuOpen;

    return (
        <header className={`${classes.header} ${isSolid ? classes.solid : ''}`}>
            <div className={classes.inner}>
                <Link to={sectionPath.home} className={classes.brand} aria-label='Semax Solutions home' onClick={closeMenu}>
                    <Logo />
                </Link>

                <nav className={classes.nav} aria-label='Main'>
                    <ul className={classes.navList}>
                        {navItems.map(item => (
                            <li key={item.path}>
                                <NavButton path={item.path}>{item.label}</NavButton>
                            </li>
                        ))}
                    </ul>
                    <ButtonLink href={sectionPath.contact} size='sm'>Contact</ButtonLink>
                </nav>

                <button
                    ref={toggleRef}
                    type='button'
                    className={`${classes.toggle} ${isMenuOpen ? classes.toggleOpen : ''}`}
                    aria-expanded={isMenuOpen}
                    aria-controls='mobile-menu'
                    aria-label='Menu'
                    onClick={() => setMenuOpen(open => !open)}
                >
                    <span className={classes.bar} />
                    <span className={classes.bar} />
                    <span className={classes.bar} />
                </button>
            </div>

            <div id='mobile-menu' className={`${classes.menu} ${isMenuOpen ? classes.menuOpen : ''}`} inert={!isMenuOpen}>
                {/* never exposed together with the desktop nav (one of them is always hidden), so both are 'Main' */}
                <nav aria-label='Main'>
                    <ul>
                        {menuItems.map((item, index) => (
                            <li key={item.path}>
                                <NavButton path={item.path} variant='menu' onClick={closeMenu}>
                                    <span className={classes.menuIndex} aria-hidden='true'>
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                    {item.label}
                                    <ArrowRightIcon className={classes.menuArrow} aria-hidden='true' />
                                </NavButton>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className={classes.menuFooter}>
                    <p className={classes.menuLabel}>Get in touch</p>
                    <ButtonLink href={`mailto:${email}`} icon={MailIcon} onClick={closeMenu}>Email us</ButtonLink>
                    <p className={classes.menuContact}>
                        <span className={classes.menuEmail}>{email}</span>
                        {address.street}, {address.postalCode} {address.city}
                    </p>
                </div>
            </div>
            {/* pointer-only shortcut to close; keyboard users have Escape and the toggle */}
            <div className={`${classes.backdrop} ${isMenuOpen ? classes.backdropOpen : ''}`} aria-hidden='true' onClick={closeMenu} />
        </header>
    )
}

export default Header;
