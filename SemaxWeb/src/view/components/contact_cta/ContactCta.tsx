import { motion } from 'motion/react';
import ButtonLink from '../button/button_link/ButtonLink';
import { MailIcon, MapPinIcon } from '../../../assets/Icons';
import { reveal } from '../../animations/reveal';
import { company } from '../../content/company';
import classes from './ContactCta.module.css';

const ContactCta = () => {
    const { email, address } = company;

    return (
        <section id='contact' className={classes.section} aria-labelledby='contact-title'>
            <motion.div className={classes.card} {...reveal()}>
                <div className={classes.text}>
                    <p className={classes.eyebrow}>Contact</p>
                    <h2 id='contact-title' className={classes.title}>Have a project in mind?</h2>
                    <p className={classes.lead}>
                        Whether you need a new application, an integration or advice on your IT strategy,
                        send us an email and tell us what you have in mind.
                    </p>
                </div>

                <div className={classes.actions}>
                    <ButtonLink href={`mailto:${email}`} icon={MailIcon}>Email us</ButtonLink>
                    <div className={classes.details}>
                        <a className={classes.email} href={`mailto:${email}`}>{email}</a>
                        <p className={classes.location}>
                            <MapPinIcon className={classes.pin} aria-hidden='true' />
                            {address.street}, {address.city}
                        </p>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default ContactCta;
