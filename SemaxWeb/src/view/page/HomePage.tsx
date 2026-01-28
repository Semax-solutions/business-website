import { useRef } from 'react'
import classes from './css/HomePage.module.css'
import Card from '../components/card/Card'

const HomePage = () => {
    const servicesRef = useRef<null | HTMLElement>(null)

    return (
        <main>
            <section className={`${classes.primaryBackground}`}>
                <div className={`${classes.container} ${classes.home}`}>
                    <div className={classes.innerContainer}>
                        <img className={classes.logo} src="/Semax_Logo.svg" alt="Semax Logo" width={200} />
                        <h1>SEMAX SOLUTIONS</h1>
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

            <section ref={servicesRef} className={`${classes.contentRow} ${classes.whiteBackground}`}>
                <div className={classes.container}>
                    <h1 style={{color: 'black'}}>Our services</h1>
                    <div className={classes.cardContainer}>
                        <Card icon={null} title='Web Development' description='From dynamic, responsive front-end interfaces using JavaScript, TypeScript, HTML, and CSS to powerful back-end solutions in Java, Go, and Python, we build websites and web'/>
                        <Card icon={null} title='Web Development' description='From dynamic, responsive front-end interfaces using JavaScript, TypeScript, HTML, and CSS to powerful back-end solutions in Java, Go, and Python, we build websites and web'/>
                        <Card icon={null} title='Web Development' description='From dynamic, responsive front-end interfaces using JavaScript, TypeScript, HTML, and CSS to powerful back-end solutions in Java, Go, and Python, we build websites and web'/>
                        <Card icon={null} title='Web Development' description='From dynamic, responsive front-end interfaces using JavaScript, TypeScript, HTML, and CSS to powerful back-end solutions in Java, Go, and Python, we build websites and web'/>
                    </div>
                </div>
            </section>
            
        </main>
    )
}

export default HomePage;