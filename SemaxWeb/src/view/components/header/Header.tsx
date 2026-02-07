import { useState } from 'react';
import NavButton from '../button/navbutton/NavButton';
import classes from './Header.module.css'

const Header = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);

    return (
        <header className={classes.header}>
            <div className={classes.innerHeader}>
                 <img className={classes.logo} alt='Company logo' src='/Header_logo.png'></img>

                <nav className={classes.nav}>
                    <NavButton path='/home'>Home</NavButton>
                    <NavButton path='/home#services'>Services</NavButton>
                    <NavButton path='/home#about'>About</NavButton>
                    <NavButton path='/home#footer-contact'>Contact</NavButton>
                </nav>

                <div className={`${classes.menu} ${isMenuOpen ? classes.menuOpen : ''}`}>
                    <nav className={classes.menuItems} onClick={() => setMenuOpen(false)}>
                        <div className={classes.menuItem}>
                            <NavButton path='/home'>Home</NavButton>
                        </div>
                        <div className={classes.menuItem}>
                            <NavButton path='/home#services'>Services</NavButton>
                        </div>
                        <div className={classes.menuItem}>
                            <NavButton path='/home#about'>About</NavButton>
                        </div>
                        <div className={classes.menuItem}>
                            <NavButton path='/home#footer-contact'>Contact</NavButton>
                        </div>
                    </nav>
                </div>
                <div className={classes.navbarToggle} onClick={() => setMenuOpen(!isMenuOpen)}>
                    <span className={`${classes.iconBar} ${isMenuOpen ? classes.closeFirst : ''}`}></span>
                    <span className={`${classes.iconBar} ${isMenuOpen ? classes.hideMiddle : ''}`}></span>
                    <span className={`${classes.iconBar} ${isMenuOpen ? classes.closeLast : ''}`}></span>
                </div>
            </div>
        </header>
    )
}

export default Header;