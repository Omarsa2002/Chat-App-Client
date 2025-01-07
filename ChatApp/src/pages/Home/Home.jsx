import classes from './Home.module.css';
import NotLogin from './components/notLogin/NotLogin';
import Users from './components/users/users.jsx';
import { useUser } from '../../context/UserContext.jsx';

export default function Home() {
    const { userDetails } = useUser();
    return (
        <div className={classes.home}>
            {userDetails ? (
                <Users />
            ) : (
                <NotLogin />
            )}
        </div>
    );
}
