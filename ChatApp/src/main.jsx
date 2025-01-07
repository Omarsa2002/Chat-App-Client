import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/carousel/styles.css';
import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx'
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { UserProvider } from './context/UserContext';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <MantineProvider>
        <Notifications/>
          <UserProvider>
            <App />
          </UserProvider>
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
