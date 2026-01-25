import classes from './css/HomePage.module.css'

const HomePage = () => {
    return (
        <>
            <div className={classes.container}>
                <img className={classes.logo} src="/Semax_Logo.svg" alt="Semax Logo" width={200} />
                Semax Website
            </div>
        </>
    )
}

export default HomePage;