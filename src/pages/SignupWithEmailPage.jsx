import {Link} from "react-router-dom";
import React, {useState} from "react";
import TextBox from "../components/TextBox.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightFromBracket, faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {motion} from 'framer-motion'
import {toast} from "react-toastify";
import {useAuth} from "../context/AuthContext.jsx";
import {MoonLoader} from "react-spinners";
import Turnstile, {useTurnstile} from 'react-turnstile'
import {useTheme} from "../context/ThemeContext.jsx";

export default function SignupWithEmailPage()
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [isSigningUp, setIsSigningUp] = useState(false);
    const [captchaToken, setCaptchaToken] = useState();
    const turnstile = useTurnstile();
    const {supabase} = useAuth();
    const {isDark} = useTheme();

    const handleSignup = async (e) =>
    {
        e.preventDefault();
        setIsSigningUp(true);

        let result;

        result = await supabase.auth.signUp({
            email,
            password,
            options: {
                captchaToken: captchaToken,
                data: {
                    display_name: username,
                }
            }
        });

        turnstile.reset();

        if (result.error && result.error.code === 'user_already_exists')
        {
            toast.warn('User already exists. Try logging in instead.');
            setIsSigningUp(false);
            return;
        }

        if (result.error)
        {
            toast.error(result.error.message);
            setIsSigningUp(false);
        }
    };

    return (
        <motion.form id="signup-form" method="post"
                     autoComplete='on'
                     onSubmit={handleSignup}
                     className="flex flex-col w-full py-8 px-10 xl:px-36 my-auto min-h-screen h-full gap-7 justify-center relative scale-95 z-[1]"
                     initial={{opacity: 0}}
                     animate={{opacity: 1}}>

            <Link to='/auth/signup' className='absolute left-3 top-3 text-sm'><FontAwesomeIcon icon={faArrowLeft}/> Back</Link>
            <img className='z-10 mx-auto dark:content-[url(/logo-dark.svg)]' src="/logo.svg" width='250'
                 alt="company-logo"/>

            <h1 className='z-10 text-2xl text-center'>Sign up</h1>

            <div className='z-10 flex flex-col gap-4'>
                <TextBox label='Email' type='email' id='email' placeholder='kinangh98@gmail.com' value={email}
                         onValueChange={setEmail}/>
                <TextBox label='Password' type='password' id='password' placeholder='*****' value={password}
                         onValueChange={setPassword}/>
                <TextBox label='User Name' type='text' id='username' placeholder='Ahmad Kinan' value={username}
                         onValueChange={setUsername}/>
                <Turnstile theme={isDark ? 'dark' : 'light'} size='flexible' sitekey="0x4AAAAAAAwfcfOhXN6nAiCh"
                           onSuccess={(token) => setCaptchaToken(token)}/>
                <button
                    type='submit'
                    className='text-black relative flex items-center justify-center bg-amber-400 hover:bg-amber-500 py-3 rounded font-medium transition-colors'>
                    {isSigningUp ? <MoonLoader size='18px'/> :
                        <>
                            <span>Sign Up</span>
                            <FontAwesomeIcon icon={faArrowRightFromBracket} className='absolute right-4'/>
                        </>}
                </button>
                <span className='text-sm'>Already have an account? <Link to='/auth/login'
                                                                         className='text-amber-800 dark:text-amber-400 font-medium'>Log in</Link></span>
                <span className='text-xs'>By signing up, you agree to our <a
                    className='font-medium text-amber-800 dark:text-amber-400' href="../../privacy-policy.html">Privacy Policy</a>.</span>
            </div>
        </motion.form>
    );
}