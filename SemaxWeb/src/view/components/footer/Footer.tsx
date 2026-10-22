import { Link } from 'react-router-dom';
import Logo from '../logo/Logo';
import { LinkedinIcon, MailIcon, PhoneIcon } from '../../../assets/Icons';
import { company, founders } from '../../content/company';
import { services } from '../../content/services';
import { sectionPath, servicePath } from '../../content/navigation';
import classes from './Footer.module.css';

const companyLinks = [
    { label: 'About us', path: sectionPath.about },
    { label: 'Partners', path: sectionPath.partners },
    { label: 'Contact', path: sectionPath.contact },
];

const Footer = () => {
    const { name, email, phone, address } = company;

    return (
        <footer className={classes.footer}>
            <div className={classes.inner}>
                <div className={classes.grid}>
                    <div className={classes.brand}>
                        <Logo className={classes.logo} />
                        <p className={classes.tagline}>
                            Software development and IT consultancy from Bilthoven.
                        </p>
                    </div>

                    <div id='footer-contact' className={`${classes.column} ${classes.contact}`}>
                        <h2 className={classes.heading}>Contact</h2>
                        <address className={classes.address}>
                            <p>
                                {name}<br />
                                {address.street}<br />
                                {address.postalCode} {address.city}<br />
                                {address.country}
                            </p>
                            <ul className={classes.list}>
                                <li>
                                    <a className={classes.link} href={phone.href}>
                                        <PhoneIcon className={classes.icon} aria-hidden='true' />
                                        {phone.label}
                                    </a>
                                </li>
                                <li>
                                    <a className={classes.link} href={`mailto:${email}`}>
                                        <MailIcon className={classes.icon} aria-hidden='true' />
                                        {email}
                                    </a>
                                </li>
                                {founders.map(founder => (
                                    <li key={founder.linkedin}>
                                        <a className={classes.link} href={founder.linkedin} target='_blank' rel='noopener noreferrer'>
                                            <LinkedinIcon className={classes.icon} aria-hidden='true' />
                                            {founder.name}
                                            <span className='visually-hidden'>, LinkedIn profile (opens in a new tab)</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </address>
                    </div>

                    <nav className={classes.column} aria-labelledby='footer-services'>
                        <h2 id='footer-services' className={classes.heading}>Services</h2>
                        <ul className={classes.list}>
                            {services.map(service => (
                                <li key={service.id}>
                                    <Link className={classes.link} to={servicePath(service.id)}>{service.title}</Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <nav className={classes.column} aria-labelledby='footer-company'>
                        <h2 id='footer-company' className={classes.heading}>Company</h2>
                        <ul className={classes.list}>
                            {companyLinks.map(link => (
                                <li key={link.path}>
                                    <Link className={classes.link} to={link.path}>{link.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                <div className={classes.bottom}>
                    <p>© {new Date().getFullYear()} {name}</p>
                    <ul className={classes.legal}>
                        <li><Link to='#'>General conditions (NL)</Link></li>
                        <li><Link to='#'>General conditions (EN)</Link></li>
                        <li><Link to='#'>Privacy Statement</Link></li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
