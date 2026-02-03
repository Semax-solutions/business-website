import { useRef } from 'react'
import classes from './css/HomePage.module.css'
import Card from '../components/card/Card'
import { CodeIcon, DbIcon } from '../../assets/Services';

const HomePage = () => {
    const servicesRef = useRef<null | HTMLElement>(null)

    return (
        <main>
            <section className={`${classes.primaryBackground}`}>
                <div className={`${classes.container} ${classes.home}`}>
                    <div className={classes.innerContainer}>
                        <img className={classes.logo} src="/Semax_Logo.svg" alt="Semax Logo" width={200} />
                        <h1 style={{color: 'white'}}>SEMAX SOLUTIONS</h1>
                        <p>
                            At Semax Solutions, we design and build custom software that fits your business.<br></br>
                            No generic tools, just powerful technology tailored to your needs.
                        </p>
                    </div>
                    <div className={`${classes.arrowDownContainer} ${classes.arrow}`} onClick={() => servicesRef.current?.scrollIntoView({behavior: 'smooth'})}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M4 8L12 16L20 8" stroke="#8B8B8B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className={classes.chevron}/>
                        </svg>
                    </div>
                </div>
            </section>

            <section ref={servicesRef} className={`${classes.contentRow} ${classes.cleanBackground}`}>
                <div className={classes.container}>
                    <h1>Our services</h1>
                    <div className={classes.cardContainer}>
                        <Card icon={<CodeIcon />} title='Software Development' description='From dynamic, responsive front-end interfaces using JavaScript, TypeScript, HTML, and CSS to powerful back-end solutions in Java, C#, and SQL, we build websites and web tailored to your needs.'/>
                        <Card icon={<DbIcon />} title='IT Strategy & Architecture' description='Strategic planning and architectural design to align your technology infrastructure with business objectives. We create scalable, secure and efficient IT code that support your long-term growth and digital transformation.'/>
                        <Card icon={<DbIcon />} title='Data & Api Integration' description='Seamlessly connect your systems and applications through robust APIs and data integrations and automated data pipelines. We enable real-time data synchronization, streamline workflows, and unlock the full potential of your business data.'/>
                        <Card icon={<DbIcon />} title='Management Services' description='Comprehensive IT management and support services to keep your systems running smoothly. From monitoring and maintenance to security updates and performance optimization, we ensure your technology infrastructure operates at peak efficiency.'/>
                        <Card icon={<DbIcon />} title='IT Consulting' description='Expert guidance and strategic advice to navigate complex technology decisions. Our consultants provide actionable insights on digital transformation, technology selection, security best practices, and optimization strategies to drive business success.'/>
                    </div>
                </div>
            </section>

            <section className={`${classes.contentRow} ${classes.whiteBackground}`}>
                <div className={classes.container}>
                    <h1>About us</h1>
                    <div>
                        {/* <p className={classes.about}>
                            We are a full-stack software company specializing in custom built digital solutions. 
                            We design and develop software that is tailored to the specific needs of each business no off-the-shelf products, no unnecessary complexity.
                            With a strong background in software development, we combine technical expertise with strategic IT consultancy. 
                            This allows us to not only build reliable and scalable applications, but also advise on architecture, technology choices, and long-term digital strategy.
                            From modern front-end interfaces to robust back-end systems and integrations, we work closely with our clients to turn ideas into practical, high-quality software that supports real business goals.
                        </p> */}
                        <p className={classes.about}>
                            We are a full-stack software and IT consultancy company. With a strong background in software development, we create custom software solutions and provide strategic IT guidance tailored to your business.
                        </p>
                    </div>
                </div>
            </section>
            
        </main>
    )
}

export default HomePage;