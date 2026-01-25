import classes from './css/HomePage.module.css'

const HomePage = () => {
    return (
        <>
            <div className={classes.container}>
                <div className={classes.innerContainer}>
                    <img className={classes.logo} src="/Semax_Logo.svg" alt="Semax Logo" width={200} />
                    <h1>SEMAX SOLUTIONS</h1>
                    <p>
                        At Semax Solutions, we design and build custom software that fits your business.<br></br>
                        No generic tools, just powerful technology tailored to your needs.
                    </p>
                </div>

            </div>
        </>
    )
}

export default HomePage;