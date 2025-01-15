import './App.css';
import { useState } from 'react';
import { Route, Routes } from "react-router-dom";
import { SocketProvider } from './context/SocketContext';
import AppHeader from './pages/components/Header/AppHeader';
import Home from './pages/Home/Home';
import SignUp from './pages/signup/SignUp';
import Login from './pages/login/Login';
import ActivateEmail from './pages/activateEmail/ActivateEmail';
import ForgetPassword from './pages/forgetPassword/ForgetPassword';
import UpdatePassword from './pages/updatePassword/UpdatePassword';
import AppFooter from './pages/components/Footer/AppFooter';
import Chat from './pages/chat/Chat';

function App() {
  const [refreshKey, setRefreshKey] = useState(0); // Add refreshKey state
  return (
    <>
      <SocketProvider>
        <AppHeader />
        <div className='body'>
          <Routes>
            <Route path='/' element={<Home key={refreshKey} setRefreshKey={setRefreshKey} />} /> {/* Pass refreshKey as key */}
            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<Login setRefreshKey={setRefreshKey} />} /> {/* Pass setRefreshKey to Login */}
            <Route path='/activateemail' element={<ActivateEmail />} />
            <Route path='/forgetpassword' element={<ForgetPassword />} />
            <Route path='/updatepassword' element={<UpdatePassword />} />
            <Route path='/Chat' element={<Chat key={refreshKey}/>} />
          </Routes>
        </div>
        <AppFooter />
      </SocketProvider>
    </>
  );
}

export default App;