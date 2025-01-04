import classes from './Home.module.css'
import NotLogin from './components/notLogin/NotLogin';


export default function Home() {
    return (
        <div className={classes.home}>
            {localStorage.length? <></>: <NotLogin/>}
        </div>
    );
}