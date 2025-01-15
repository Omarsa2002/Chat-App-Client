import classes from './Home.module.css';
import NotLogin from './components/notLogin/NotLogin';
import Users from './components/users/Users.jsx'
import { useUser } from '../../context/UserContext.jsx';

// eslint-disable-next-line react/prop-types
export default function Home({setRefreshKey}) {
    const { userDetails } = useUser();
    const login =  localStorage.getItem("isLogged")
    return (
        <div className={classes.home}>
            {login ? (
                <Users setRefreshKey={setRefreshKey}/>
            ) : (
                <NotLogin />
            )}
        </div>
    );
}
