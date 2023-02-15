// это точка входа в приложение(одкуда начинает выполняться)

import React from 'react'
import './components/salons/salonStyle.css';
import './App.css';
import ReactDOM from 'react-dom/client'
import App from './App' //главный файл крч

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)