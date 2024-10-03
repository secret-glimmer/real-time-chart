import {createContext, useContext, useEffect, useState} from "react";

const ThemeContext = createContext({});
export const useTheme = () => useContext(ThemeContext);
export const ThemeProvider = props =>
{
    const [isDark, setIsDark] = useState('chartHiveTheme' in localStorage && localStorage.chartHiveTheme === 'dark')

    useEffect(() =>
    {
        if (isDark)
            document.documentElement.classList.add('dark')
        else
            document.documentElement.classList.remove('dark')

        localStorage.chartHiveTheme = isDark ? 'dark' : 'light';
    }, [isDark]);
    
    return (
        <ThemeContext.Provider value={{isDark, setIsDark}}>
            {props.children}
        </ThemeContext.Provider>
    );
};


