
import './App.css'
import { Route, Routes } from "react-router-dom";
import AppHeader from './pages/components/Header/AppHeader'
import Home from './pages/Home/Home';
import SignUp from './pages/signup/SignUp'
import Login from './pages/login/Login';
import ActivateEmail from './pages/activateEmail/ActivateEmail';
import ForgetPassword from './pages/forgetPassword/ForgetPassword';
import UpdatePassword from './pages/updatePassword/UpdatePassword';
import AppFooter from './pages/components/Footer/AppFooter';

function App() {

  return (
    <>
      <AppHeader/>
        <div className='body'>
          <Routes>
            <Route path='/' Component={Home}/>
            <Route path='/signup' Component={SignUp}/>
            <Route path='/login' Component={Login}/>
            <Route path='/activateemail' Component={ActivateEmail}/>
            <Route path='/forgetpassword' Component={ForgetPassword}/>
            <Route path='/updatepassword' Component={UpdatePassword}/>
          </Routes>  
        </div>
      <AppFooter/>
    </>
  )
}

export default App
