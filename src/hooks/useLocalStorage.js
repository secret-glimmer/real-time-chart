import {useEffect, useState} from "react";

const project_key = 'chart_hive_'

function useLocalStorage(key, defaultValue)
{
    const [value, setValue] = useState(() =>
    {
        const savedValue = localStorage.getItem(project_key + key);
        return savedValue ? JSON.parse(savedValue) : defaultValue;
    });

    useEffect(() =>
    {
        localStorage.setItem(project_key + key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}

export default useLocalStorage;
