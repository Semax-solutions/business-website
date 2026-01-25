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
                    <NavButton path='/Home'>Home</NavButton>
                    <NavButton path='/Services'>Services</NavButton>
                    <NavButton path='/About'>About</NavButton>
                    <NavButton path='/Contact'>Contact</NavButton>
                </nav>

                <div className={classes.menu}>
                    <div className={classes.navbarToggle} onClick={() => setMenuOpen(!isMenuOpen)}>
                        <span className={classes.iconBar}></span>
                        <span className={classes.iconBar}></span>
                        <span className={classes.iconBar}></span>
                    </div>
                    { isMenuOpen && (
                        <nav className={classes.menuNav}>
                            <NavButton path='/Home'>Home</NavButton>
                            <NavButton path='/Services'>Services</NavButton>
                            <NavButton path='/About'>About</NavButton>
                            <NavButton path='/Contact'>Contact</NavButton>
                        </nav>
                    )
                    }
                </div>
            </div>
        </header>
    )
}

export default Header;