import {motion} from 'framer-motion';
import ThemeSelector from "./ThemeSelector.jsx";
import {useDashboardLayout} from "../context/DashboardLayoutContext.jsx";
import {useMediaQuery} from "react-responsive";
import UserProfile from "./UserProfile.jsx";

function SideBar({isOpen, setIsOpen})
{
    return (
        <div
            className={`${isOpen ? 'flex' : 'hidden'}  lg:flex fixed top-0 bottom-0 right-0 left-0 z-20 pointer-events-none`}>

            <motion.div
                className='lg:hidden bg-neutral-900 bg-opacity-30 w-full pointer-events-auto'
                onClick={() => setIsOpen(false)}
                animate={isOpen ? {opacity: 1} : {opacity: 0}}
                transition={{duration: 0.3, ease: "easeInOut"}}
            >
            </motion.div>

            <motion.div
                className='z-20 bg-gray-50 dark:bg-neutral-800 dark:text-white min-h-96 overflow-y-auto h-full fixed top-0 bottom-0 right-0 w-72 flex flex-col items-stretch justify-between gap-6 p-5 pointer-events-auto'
                initial="visible"
                animate={isOpen ? "visible" : "hidden"}
                variants={sidebarVariants}
                transition={{duration: 0.3, ease: "easeInOut"}}
            >

                <UserProfile/>

                <h3 className='text-amber-500 flex justify-center items-center gap-4'>
                    <svg width={18} className='fill-amber-500' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path
                            d="M384 96l0 128-128 0 0-128 128 0zm0 192l0 128-128 0 0-128 128 0zM192 224L64 224 64 96l128 0 0 128zM64 288l128 0 0 128L64 416l0-128zM64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32z"/>
                    </svg>
                    Dashboard
                </h3>

                <h3 className='flex justify-center items-center gap-4'>
                    <svg width={18} className='dark:fill-white' xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 512 512">
                        <path
                            d="M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64L0 400c0 44.2 35.8 80 80 80l400 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 416c-8.8 0-16-7.2-16-16L64 64zm406.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L320 210.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L240 221.3l57.4 57.4c12.5 12.5 32.8 12.5 45.3 0l128-128z"/>
                    </svg>
                    Analytics
                </h3>

                <h3 className='flex justify-center items-center gap-4'>
                    <svg width={12} className='dark:fill-white' xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 320 512">
                        <path
                            d="M160 0c17.7 0 32 14.3 32 32l0 35.7c1.6 .2 3.1 .4 4.7 .7c.4 .1 .7 .1 1.1 .2l48 8.8c17.4 3.2 28.9 19.9 25.7 37.2s-19.9 28.9-37.2 25.7l-47.5-8.7c-31.3-4.6-58.9-1.5-78.3 6.2s-27.2 18.3-29 28.1c-2 10.7-.5 16.7 1.2 20.4c1.8 3.9 5.5 8.3 12.8 13.2c16.3 10.7 41.3 17.7 73.7 26.3l2.9 .8c28.6 7.6 63.6 16.8 89.6 33.8c14.2 9.3 27.6 21.9 35.9 39.5c8.5 17.9 10.3 37.9 6.4 59.2c-6.9 38-33.1 63.4-65.6 76.7c-13.7 5.6-28.6 9.2-44.4 11l0 33.4c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-34.9c-.4-.1-.9-.1-1.3-.2l-.2 0s0 0 0 0c-24.4-3.8-64.5-14.3-91.5-26.3c-16.1-7.2-23.4-26.1-16.2-42.2s26.1-23.4 42.2-16.2c20.9 9.3 55.3 18.5 75.2 21.6c31.9 4.7 58.2 2 76-5.3c16.9-6.9 24.6-16.9 26.8-28.9c1.9-10.6 .4-16.7-1.3-20.4c-1.9-4-5.6-8.4-13-13.3c-16.4-10.7-41.5-17.7-74-26.3l-2.8-.7s0 0 0 0C119.4 279.3 84.4 270 58.4 253c-14.2-9.3-27.5-22-35.8-39.6c-8.4-17.9-10.1-37.9-6.1-59.2C23.7 116 52.3 91.2 84.8 78.3c13.3-5.3 27.9-8.9 43.2-11L128 32c0-17.7 14.3-32 32-32z"/>
                    </svg>
                    Sales
                </h3>

                <img src="/background-image.svg" alt="background-image"/>

                <button
                    className='bg-amber-400 hover:bg-amber-500 text-black transition-colors p-2 px-8 rounded'>Upgrade
                </button>

                <span className='inline-flex justify-center items-center gap-4'>
                    <ThemeSelector/>
                    <div className='h-6 w-0.5 bg-amber-300'/>
                    <EditLayoutButton setIsSideBarOpen={setIsOpen}/>
                    </span>

                <a className='text-xs text-center'
                   href="https://www.freepik.com/free-vector/setup-analytics-concept-illustration_7887402.htm#fromView=search&page=1&position=0&uuid=7b87d964-0155-4109-9e27-64a6df28824b">
                    Image by storyset on Freepik </a>
            </motion.div>
        </div>
    );
}

const sidebarVariants = {
    hidden: {x: '100%', opacity: 0}, // Slide off the screen (right side)
    visible: {x: '0%', opacity: 1},  // Slide in to its original position
};

export default SideBar;

function EditLayoutButton({setIsSideBarOpen})
{
    const {isEditingLayout, setIsEditingLayout} = useDashboardLayout()
    const isDesktop = useMediaQuery({query: '(min-width: 1024px)'});

    return (
        <button
            className='hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors w-12 h-12 flex justify-center items-center  rounded-full'
            title={isEditingLayout ? "Save charts layout" : 'Edit charts layout'}
            onClick={() =>
            {
                setIsEditingLayout(currentValue => !currentValue)
                if (!isDesktop) setIsSideBarOpen(false)
            }}>
            {
                isEditingLayout ?
                    <svg className='fill-amber-500' width='19px' xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 448 512">
                        <path
                            d="M64 80c-8.8 0-16 7.2-16 16l0 320c0 8.8 7.2 16 16 16l320 0c8.8 0 16-7.2 16-16l0-320c0-8.8-7.2-16-16-16L64 80zM0 96C0 60.7 28.7 32 64 32l320 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>
                    </svg>
                    :
                    <svg className='fill-black dark:fill-white' width="22px" viewBox="0 0 24 24" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd"
                              d="M5 22C3.34315 22 2 20.6569 2 19V5C2 3.34315 3.34315 2 5 2H19C20.6569 2 22 3.34315 22 5V19C22 20.6569 20.6569 22 19 22H5ZM5 4C4.44772 4 4 4.44772 4 5V8H20V5C20 4.44772 19.5523 4 19 4H5ZM8 10H4V19C4 19.5523 4.44772 20 5 20H8V10ZM10 20V10H20V19C20 19.5523 19.5523 20 19 20H10Z"/>
                    </svg>
            }
        </button>
    )
}