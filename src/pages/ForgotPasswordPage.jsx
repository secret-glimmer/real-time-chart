import {Link} from "react-router-dom";
import React from "react";
import TextBox from "../components/TextBox.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import {motion} from 'framer-motion'

export default function ForgotPasswordPage()
{
    return (
        <motion.form id="forgot-password-form" method="post"
                     className="flex flex-col w-full py-8 px-10 xl:px-36 my-auto min-h-screen h-full gap-10 justify-center"
                     initial={{opacity: 0}}
                     animate={{opacity: 1}}>

            <img className='z-10 mx-auto dark:content-[url(/logo-dark.svg)]' src="/logo.svg" width='250'
                 alt="company-logo"/>

            <h1 className='z-10 text-2xl text-center'>Recover your password</h1>

            <h4 className='z-10 text-center'>Enter the email that you used when you signed up to recover your
                password. You will receive a password reset link.
            </h4>

            <div className='z-10 flex flex-col gap-4'>
                <TextBox label='Email' type='email' id='email' placeholder='kinangh98@gmail.com'/>
                <button
                    className='text-black relative flex items-center justify-center bg-amber-400 hover:bg-amber-500 py-3 rounded font-medium transition-colors'>
                    <span>Send link</span>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} className='absolute right-4'/>
                </button>
                <Link to='/auth/login' className='text-amber-800 dark:text-amber-400 font-medium text-sm'>Back to
                    login</Link>
            </div>
        </motion.form>
    );
}