function NavBar({handleSideBarButtonClick})
{
    return (
        <div
            className='bg-white dark:bg-neutral-700 h-16 flex py-10 lg:px-20 px-5 backdrop-blur bg-opacity-50 dark:bg-opacity-40 sticky top-0 z-20 items-center justify-between'>
            <img src="/logo.svg" className='dark:content-[url(/logo-dark.svg)]' alt="chart-hive-logo" width='200px'/>

            <button
                className='lg:hidden w-12 aspect-square flex justify-center items-center rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors'
                onClick={() => handleSideBarButtonClick((currentValue) => !currentValue)}>
                <svg xmlns="http://www.w3.org/2000/svg" width={15} className='fill-black dark:fill-amber-400'
                     viewBox="0 0 448 512">
                    <path
                        d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"/>
                </svg>
            </button>
        </div>
    );
}

export default NavBar;