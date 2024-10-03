function Footer()
{
    return (
        <div
            className='relative overflow-hidden w-full min-h-16 p-4 bg-amber-400 dark:bg-neutral-800 flex md:flex-row gap-4 flex-col justify-evenly items-center text-black dark:text-white'>
            <a className='order-2 z-20' href="https://kinangh98.github.io/">© 2024 Ahmed Kinan Ghbash</a>
            <img src="/logo-neutral.svg" className='z-20 order-1 md:order-3 dark:content-[url(/logo-dark.svg)] '
                 alt="chart-hive-logo" width='160px'/>
        </div>
    );
}

export default Footer;