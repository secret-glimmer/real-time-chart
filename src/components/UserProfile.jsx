import {useAuth} from "../context/AuthContext.jsx";
import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown, faAngleUp, faArrowRightFromBracket} from '@fortawesome/free-solid-svg-icons';
import {MoonLoader} from "react-spinners";
import {useTheme} from "../context/ThemeContext.jsx";

export default function UserProfile()
{
    const {username, supabase} = useAuth();
    const [isClicked, setIsClicked] = useState(false)
    const [isSigningOut, setIsSigningOut] = useState(false)
    
    const {isDark} = useTheme();

    return (
        <div
            className={`relative rounded transition-colors ${isClicked && 'bg-white dark:bg-neutral-700 shadow-lg'}`}>
                <span
                    className='flex justify-between items-center gap-2 hover:bg-neutral-200 dark:hover:bg-neutral-600 cursor-pointer rounded py-2 px-3 z-50 relative'
                    onClick={() => setIsClicked((prev) => !prev)}>
                    <img src="./user-profile-image.svg" width='40' alt="user-profile-image"/>
                    <h3 className='grow text-center'>{username}</h3>
                    <FontAwesomeIcon icon={isClicked ? faAngleUp : faAngleDown}/>
                </span>

            {isClicked && <>
                <div
                    className='shadow-lg absolute top-10 z-40 left-0 right-0 bg-white dark:bg-neutral-700 rounded pt-4'>
                    <button type='button'
                            className='relative p-4 w-full hover:bg-neutral-200 dark:hover:bg-neutral-600 rounded'
                            onClick={() =>
                            {
                                if (isSigningOut) return;
                                supabase.auth.signOut();
                                setIsSigningOut(true);
                            }}>
                        {isSigningOut ? <div className='flex justify-center items-center'>
                                <MoonLoader size='18px'
                                            color={isDark ? 'white' : 'black'}/></div>
                            : <>
                                Sign out
                                <span className='absolute right-3 top-0 bottom-0 inline-flex items-center'>
                             <FontAwesomeIcon icon={faArrowRightFromBracket}/></span>
                            </>}
                    </button>
                </div>
                <div className='fixed z-30 top-0 bottom-0 right-0 left-0' onClick={() => setIsClicked(false)}></div>
            </>}

        </div>
    );
}