import ThemeSelector from "./ThemeSelector.jsx";

export default function AuthThemeSelector({className = ''})
{
    return (
        <ThemeSelector
            className={`z-10 absolute right-4 bg-amber-100 dark:hover:bg-neutral-600 shadow-lg ${className}`}/>
    )
}