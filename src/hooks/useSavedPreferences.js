import {useEffect, useState} from "react";
import {useAuth} from "../context/AuthContext.jsx";
import {toast} from "react-toastify";
import {supabase} from '../context/AuthContext.jsx'

const projectKey = 'chart_hive_'
// The keys that has been used so far for preferences, 
// these keys are removed from local storage for the current user when he signs out in order to not conflict with another user's preferences. 
const userPreferencesKeys = [];

// Saves/Loads a value to/from Supabase database.
// Saving happens every time the 'savePreference' method is called.
// Loading happens when this hook is called.
// Returns:
// 1. value: The saved value in db, or if it doesn't exist the 'defaultValue' you provide.
// 2. setValue: A setter for 'value'.
// 3. savePreference: A method that saves 'value' to db.
function useSavedPreferences(key, defaultValue)
{
    const {userID} = useAuth();
    const [value, setValue] = useState(() =>
    {
        // Use the values that are saved in local storage until Supabase fetches the saved data in database.
        const savedValue = localStorage.getItem(projectKey + key);
        return savedValue ? JSON.parse(savedValue) : defaultValue;
    });

    useEffect(() =>
    {
        const getPreference = async () =>
        {
            const {data, error} = await supabase
                .from('chart_hive_user_preferences')
                .select(key)
                .eq('user_id', userID)
                .single();

            if (error && error.details === 'The result contains 0 rows') setValue(defaultValue);

            if (data) setValue(JSON.parse(data[key]) || defaultValue);
        };

        getPreference();
        if (!userPreferencesKeys.includes(key)) userPreferencesKeys.push(key);
    }, []);

    useEffect(() =>
    {
        localStorage.setItem(projectKey + key, JSON.stringify(value));
    }, [value]);


    return [value, setValue];
}

export default useSavedPreferences;

// Save all user preferences to db.
export async function saveAllPreferences(userID, chartLayouts, disableCharts)
{
    const {error} = await supabase
        .from('chart_hive_user_preferences')
        .upsert({
            user_id: userID,
            chart_layouts: JSON.stringify(chartLayouts),
            disabled_charts: JSON.stringify(disableCharts)
        });

    if (error) toast.error('Error saving chart layouts: ' + error.message);
}

// Remove all user preferences from local storage.
export function RemoveAllPreferences()
{
    for (let i = 0; i < userPreferencesKeys.length; i++)
        localStorage.removeItem(projectKey + userPreferencesKeys[i]);
}