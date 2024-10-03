import {Link} from "react-router-dom";
import React from "react";
import ProviderButton from "../components/ProviderButton.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faApple, faGoogle, faFacebook} from "@fortawesome/free-brands-svg-icons";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";
import {motion} from 'framer-motion'
import {toast} from "react-toastify";
import {useAuth} from "../context/AuthContext.jsx";

export default function SignupPage()
{
    const {supabase, redirectUrl} = useAuth();

    return (
        <motion.div
            className="flex flex-col w-full py-8 px-10 xl:px-36 my-auto min-h-screen h-full gap-12 pt-24 relative scale-95 z-[1]"
            initial={{opacity: 0}}
            animate={{opacity: 1}}>

            <img className='z-10 mx-auto dark:content-[url(/logo-dark.svg)]' src="./logo.svg" width='250'
                 alt="company-logo"/>

            <h1 className='z-10 text-2xl text-center'>Sign up</h1>

            <div className='z-10 flex items-center justify-center gap-4'>
                <ProviderButton icon={faGoogle} onClickHandler={() => supabase.auth.signInWithOAuth({
                    provider: 'google',
                    options: {
                        redirectTo: redirectUrl,
                    },
                })}/>
                <ProviderButton icon={faFacebook}
                                onClickHandler={() => toast('Facebook accounts will be supported soon.')}/>
                < ProviderButton icon={faApple} onClickHandler={() => toast('Apple accounts will be supported soon.')}/>
            </div>

            <h4 className='z-10 text-center'>- or -</h4>

            <div className='z-10 flex flex-col gap-4'>
                <Link to='/auth/signupWithEmail'
                      className='text-black relative flex items-center justify-center bg-amber-400 hover:bg-amber-500 py-3 rounded font-medium transition-colors'>
                    <span>Continue With Email</span>
                    <FontAwesomeIcon icon={faEnvelope} className='absolute right-4'/>
                </Link>
                <span className='text-sm'>Already have an account? <Link to='/auth/login'
                                                                         className='text-amber-800 dark:text-amber-400 font-medium'>Log in</Link></span>
                <span className='text-xs'>By signing up, you agree to our <a
                    className='font-medium text-amber-800 dark:text-amber-400' href="./privacy-policy.html">Privacy Policy</a>.</span>
            </div>
        </motion.div>
    );
}