import classes from './ContactForm.module.css';

const ContactForm = () => {
    return (
        <form className={classes.contactForm}>
            <input className={classes.input} type='text' placeholder='First name' required />
            <input className={classes.input} type='text' placeholder='Last name' required />
            <input className={classes.input} type='email' placeholder='Your Email' required />
            <input className={classes.input} type='tel' placeholder='Your Phone Number' required/>
            <input className={classes.input} type='text' placeholder='Subject' required />
            <textarea className={classes.textarea} placeholder='Your Message' required />
            <button className={classes.submitButton} type='submit'>Send Message</button>
        </form>
    )
}

export default ContactForm;