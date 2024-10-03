import React from "react";
import LoadingPage from "./pages/LoadingPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import {Navigate, Route, Routes} from "react-router-dom";
import {useAuth} from "./context/AuthContext.jsx";
import {ToastContainer} from "react-toastify";
import {useTheme} from "./context/ThemeContext.jsx";

function App()
{
    const {username, isLoading: isLoadingAuth} = useAuth()
    const {isDark} = useTheme();

    if (isLoadingAuth) return <LoadingPage message={'Welcome, please wait...'}/>;

    return (
        <>
            <Routes>
                <Route path="/" element={username ? <Navigate to="/dashboard"/> : <Navigate to="/auth"/>}/>
                <Route path='/auth/*' element={<AuthPage/>}/>
                <Route path="/loading" element={<LoadingPage/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
            </Routes>

            <ToastContainer pauseOnFocusLoss={false} position='bottom-right' draggablePercent={15} autoClose={2500}
                            theme={isDark ? 'dark' : 'light'}/>
        </>
    )
}

export default App