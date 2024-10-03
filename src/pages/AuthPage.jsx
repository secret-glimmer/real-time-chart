import LinksParticles from "../components/LinksParticles.jsx";
import {useMediaQuery} from "react-responsive";
import {Route, Routes, useNavigate} from "react-router-dom";
import {LoginPage} from "./LoginPage.jsx";
import AuthThemeSelector from "../components/AuthThemeSelector.jsx";
import SignupPage from "./SignupPage.jsx";
import {useTheme} from "../context/ThemeContext.jsx";
import {useAuth} from "../context/AuthContext.jsx";
import React, {useEffect} from "react";

function AuthPage()
{
    const isDesktop = useMediaQuery({query: '(min-width: 768px)'});
    const {isDarkMode} = useTheme();
    const navigate = useNavigate();
    const {username} = useAuth()

    useEffect(() =>
    {
        // Re-direct to dashboard page if the user is authenticated.
        if (username) navigate('/dashboard')

    }, [username]);

    return (
        <div className='min-h-screen h-full flex justify-center items-stretch dark:text-white'>

            <div
                className="relative w-screen md:w-[440px] xl:w-[680px] bg-white dark:bg-neutral-900 min-h-screen h-full">
                {!isDesktop &&
                    <AuthThemeSelector className='top-4 dark:bg-neutral-800'/>}

                <Routes>
                    <Route index element={<LoginPage/>}/>
                    <Route path="login" element={<LoginPage/>}/>
                    <Route path="signup" element={<SignupPage/>}/>
                    {/*<Route path="forgot-password" element={<ForgotPasswordPage/>}/>*/}
                </Routes>

                {!isDesktop && <LinksParticles color={isDarkMode ? '#ad9459' : '#ffda83'}
                                               className='!absolute w-full h-full -left-10 top-0'/>}
            </div>

            <div
                className='relative bg-amber-400 dark:bg-neutral-800 grow min-h-screen hidden md:flex flex-col items-center'>
                <div className='mt-36 px-8 z-10 text-center'>
                    <h1 className='text-4xl font-bold'>Welcome to <span
                        className='text-amber-900 dark:text-amber-400 text-nowrap'>Chart Hive</span>
                    </h1>
                    <h2 className='text-lg mt-5 font-medium'>Discover the insights that drive your business</h2>
                </div>

                {isDesktop &&
                    <AuthThemeSelector className='bottom-4 dark:bg-neutral-700'/>}
                {isDesktop &&
                    <LinksParticles className='!absolute w-full h-full' color={isDarkMode ? '#FBBF24' : '#FFFFFF'}/>}
            </div>

        </div>
    );
}

export default AuthPage;

