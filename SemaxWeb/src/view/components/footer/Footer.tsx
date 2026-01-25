import { Link } from 'react-router-dom';
import classes from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={classes.footer}>
            <div className={classes.footerContainer}>
                <img className={classes.logo} alt='Company logo' src='/Header_logo.png'></img>

                <div className={classes.contact}>
                    <p>
                        <strong>Contact</strong>
                        <br></br>
                        <br></br>
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
                            <img className={classes.icon} alt='Email icon' src='/Linkedin-icon.png'></img>
                            <Link className={classes.link} to='https://www.linkedin.com/in/maxverheul/'>
                                <p>Max Verheul</p>
                            </Link>
                        </div>
                        <div className={classes.linkDiv}>
                            <img className={classes.icon} alt='Email icon' src='/Linkedin-icon.png'></img>
                            <Link className={classes.link} to='https://www.linkedin.com/in/sem-winters/'>
                                <p>Sem Winters</p>
                            </Link>
                        </div>
                        
                    
                        
                    </div>
                </div>

                <div className={classes.services}>
                    <p>
                        <strong>Services</strong>
                        <br></br>
                        <br></br>
                        Software development
                        <br></br>
                        IT consulting
                        <br></br>
                    </p>
                </div>

                <div className={classes.company}>
                    <p>
                        <strong>Company</strong>
                        <br></br>
                        <br></br>
                        About us
                        <br></br>
                        Careers
                        <br></br>
                        Contact
                        <br></br>
                    </p>

                </div>
            </div>

            <div className={classes.footerBottom}>
                <div className={classes.footerBottomContainer}>
                    <div className={classes.copyright}>
                        <p>Copyright 2026 © Semax Solutions </p>
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