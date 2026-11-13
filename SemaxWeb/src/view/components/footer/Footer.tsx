import { Link } from 'react-router-dom';
import classes from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={classes.footer}>
            <div className={classes.footerContainer}>
                <img className={classes.logo} alt='Company logo' src='/Header_logo.png'></img>

                <div id='footer-contact' className={classes.contact}>
                    <p className={classes.titleInfo}>Contact</p>
                    <p>
                        Semax Solutions
                        <br></br>
                        P.C. Staalweg 12
                        <br></br>
                        3731 TJ Bilthoven
                        <br></br>
                        Netherlands
                        <br></br>
                        <br></br>
                    </p>

                    <div className={classes.linkContainer}>
                        <div className={classes.linkDiv}>
                        <Link className={classes.link} to='tel:+316xxxxxxxx'>
                                <p>+31 6 xx xx xx xx</p>
                            </Link> 
                        </div>
                        <div className={classes.linkDiv}>
                            <img className={classes.icon} alt='Email icon' src='/Email_icon.png'></img>
                            <Link className={classes.link} to='mailto:info@semaxsolutions.nl'>
                                <p>info@semaxsolutions.nl</p>
                            </Link>
                        </div>
                        <div className={classes.linkDiv}>
                            <img className={classes.icon} alt='LinkedIn icon' src='/Linkedin-icon.png'></img>
                            <Link className={classes.link} to='https://www.linkedin.com/in/maxverheul/'>
                                <p>Max Verheul</p>
                            </Link>
                        </div>
                        <div className={classes.linkDiv}>
                            <img className={classes.icon} alt='LinkedIn icon' src='/Linkedin-icon.png'></img>
                            <Link className={classes.link} to='https://www.linkedin.com/in/sem-winters/'>
                                <p>Sem Winters</p>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className={classes.services}>
                    <p className={classes.titleInfo}>Services</p>
                    <ul className={classes.list}>
                        <li><Link to='/home#services'>Websites</Link></li>
                        <li><Link to='/home#services'>Web applications</Link></li>
                        <li><Link to='/home#services'>Native apps</Link></li>
                        <li><Link to='/home#services'>Data &amp; API integration</Link></li>
                        <li><Link to='/home#services'>IT strategy &amp; architecture</Link></li>
                        <li><Link to='/home#services'>Maintenance &amp; support</Link></li>
                    </ul>
                </div>

                <div className={classes.company}>
                    <p className={classes.titleInfo}>Company</p>
                    <ul className={classes.list}>
                        <li><Link to='/products'>Products</Link></li>
                        <li><Link to='/home#about'>About us</Link></li>
                        <li><Link to='/home#partners'>Partners</Link></li>
                        <li><a href='mailto:info@semaxsolutions.nl'>Contact</a></li>
                    </ul>
                </div>
            </div>

            <div className={classes.footerBottom}>
                <div className={classes.footerBottomContainer}>
                    <div className={classes.copyright}>
                        <p>Copyright {new Date().getFullYear()} © Semax Solutions </p>
                    </div>

                    <div className={classes.policyLinks}>
                        <Link to='#'>General conditions (NL)</Link>
                        <Link to='#'>General conditions (EN)</Link>
                        <Link to='#'>Privacy Statement</Link>
                    </div>
                </div>
                
            </div>
        </footer>
    )
}

export default Footer;