import { ArrowRightIcon } from '../icons/Icons';
import classes from './CtaBanner.module.css';

interface CtaBannerProps {
    title: string;
    text: string;
}

const CtaBanner = ({ title, text }: CtaBannerProps) => (
    <section className="section">
        <div className="wrap">
            <div className={classes.banner} data-reveal>
                <div className={classes.glow} aria-hidden="true" />
                <div className={classes.content}>
                    <h2 className={classes.title}>{title}</h2>
                    <p className={classes.text}>{text}</p>
                </div>
                <a className="btn btn-primary" href="mailto:info@semaxsolutions.nl">
                    Get in touch <ArrowRightIcon />
                </a>
            </div>
        </div>
    </section>
);

export default CtaBanner;
