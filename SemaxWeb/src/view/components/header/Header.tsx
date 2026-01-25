import NavButton from '../button/navbutton/NavButton';
import classes from './Header.module.css'

const Header = () => {
    return (
        <header className={classes.header}>
            <img className={classes.logo} alt='Company logo' src='/Header_logo.png'></img>

            <nav className={classes.nav}>
                <NavButton path='/Home'>Home</NavButton>
                <NavButton path='/Services'>Services</NavButton>
                <NavButton path='/About'>About</NavButton>
                <NavButton path='/Contact'>Contact</NavButton>
            </nav>
        </header>
    )
}

export default Header;