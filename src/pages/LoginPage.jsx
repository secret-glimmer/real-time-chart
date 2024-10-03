import {faApple, faGoogle, faFacebook} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import ProviderButton from "../components/ProviderButton.jsx";
import React, {useState} from "react";
import TextBox from "../components/TextBox.jsx";
import {Link} from "react-router-dom";
import {motion} from 'framer-motion'
import {toast} from "react-toastify";
import {useAuth} from "../context/AuthContext.jsx";
import {MoonLoader} from "react-spinners";
import Turnstile, {useTurnstile} from "react-turnstile";
import {useTheme} from "../context/ThemeContext.jsx";

export function LoginPage()
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [captchaToken, setCaptchaToken] = useState();
    const turnstile = useTurnstile();
    const {supabase} = useAuth();
    const {isDark} = useTheme();

    const handleLogin = async (e) =>
    {
        e.preventDefault();
        setIsLoggingIn(true);

        const {error} = await supabase.auth.signInWithPassword({
            email,
            password,
            options: {captchaToken: captchaToken}
        });

        turnstile.reset();
        
        if (error)
        {
            toast.error(error.message);
            setIsLoggingIn(false);
        }
    };

    return (
        <motion.form id="login-form" method="post"
                     autoComplete='on'
                     onSubmit={handleLogin}
                     className="flex flex-col w-full py-8 px-10 xl:px-36 my-auto min-h-screen h-full gap-7 justify-center relative scale-95 z-[1]"
                     initial={{opacity: 0}}
                     animate={{opacity: 1}}>

            <img className='z-10 mx-auto dark:content-[url(/logo-dark.svg)]' src="/logo.svg" width='250'
                 alt="company-logo"/>

            <h1 className='z-10 text-2xl text-center'>Log in</h1>

            <div className='z-10 flex items-center justify-center gap-4'>
                <ProviderButton icon={faGoogle} onClickHandler={() => supabase.auth.signInWithOAuth({
                    provider: 'google',
                })}/>
                <ProviderButton icon={faFacebook}
                                onClickHandler={() => toast('Facebook accounts will be supported soon.')}/>
                <ProviderButton icon={faApple} onClickHandler={() => toast('Apple accounts will be supported soon.')}/>
            </div>

            <h4 className='z-10 text-center'>- or via -</h4>

            <div className='z-10 flex flex-col gap-4'>
                <TextBox label='Email' type='email' id='email' placeholder='kinangh98@gmail.com' value={email}
                         onValueChange={setEmail}/>
                <TextBox label='Password' type='password' id='password' placeholder='*****' value={password}
                         onValueChange={setPassword}/>
                <Turnstile theme={isDark ? 'dark' : 'light'} size='flexible' sitekey="0x4AAAAAAAwfcfOhXN6nAiCh"
                           onSuccess={(token) => setCaptchaToken(token)}/>
                <button
                    className='text-black relative flex items-center justify-center bg-amber-400 hover:bg-amber-500 py-3 rounded font-medium transition-colors'
                    type='submit'>
                    {
                        isLoggingIn ? <MoonLoader size='18px'/> :
                            <>
                                <span>Log in</span>
                                <FontAwesomeIcon icon={faArrowRightFromBracket} className='absolute right-4'/>
                            </>
                    }
                </button>
                {/*<Link to='/auth/forgot-password' className='text-amber-800 dark:text-amber-400 font-medium text-sm'>Forgot*/}
                {/*    password?</Link>*/}
                <span className='text-sm'>Don't have an account? <Link to='/auth/signup'
                                                                       className='text-amber-800 dark:text-amber-400 font-medium'>Sign up</Link>
                    </span>
            </div>
        </motion.form>
    );
}