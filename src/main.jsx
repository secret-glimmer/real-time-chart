import React, {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.jsx'
import '../index.css';
import {HashRouter} from "react-router-dom";
import {AuthProvider} from "./context/AuthContext.jsx";
import 'react-toastify/dist/ReactToastify.css';
import {ThemeProvider} from "./context/ThemeContext.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <HashRouter>
            <AuthProvider>
                <ThemeProvider>
                    <App/>
                </ThemeProvider>
            </AuthProvider>
        </HashRouter>
    </StrictMode>
)
