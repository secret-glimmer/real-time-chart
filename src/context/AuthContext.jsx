import {createContext, useContext, useState, useEffect, useMemo} from 'react';
import {createClient} from '@supabase/supabase-js';
import {useNavigate} from "react-router-dom";
import {RemoveAllPreferences} from "../hooks/useSavedPreferences.js";

const supabaseUrl = 'https://urlznusnzjxlkusrpzpn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVybHpudXNuemp4bGt1c3JwenBuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM3MTY4OTYsImV4cCI6MjAzOTI5Mjg5Nn0.tLx4b5x3WXC_M-mICE5tbAxG_RemvyVsOJ2MEZ29p8A';
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
const redirectUrl = window.location.hostname === 'localhost'
        ? 'http://localhost:5173'
        : 'https://kinangh98.github.io/chart-hive/';

const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = props =>
{
    const [username, setUsername] = useState(null);
    const [userID, setUserID] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() =>
    {
        const checkUserSession = async () =>
        {
            const {data: {session}} = await supabase.auth.getSession();

            // Set the user if session exists.
            if (session)
            {
                setUsername(getUserDisplayName(session.user.user_metadata));
                setUserID(session.user.id);
            }

            setIsLoading(false);
        };

        checkUserSession();

        // Listen for auth changes (sign-in, sign-out)
        const {data: authListener} = supabase.auth.onAuthStateChange(
            (event, session) =>
            {
                if (event === 'SIGNED_IN')
                {
                    setUsername(getUserDisplayName(session.user.user_metadata));
                    setUserID(session.user.id);
                    navigate('/dashboard');
                }
                else if (event === 'SIGNED_OUT')
                {
                    setUsername(null);
                    RemoveAllPreferences();
                    navigate('/auth');
                }
            }
        );

        function getUserDisplayName(metaData)
        {
            return metaData.display_name || metaData.full_name;
        }
        
        // Clean up the auth listener when the component unmounts
        return () => authListener?.subscription.unsubscribe();
    }, []);
    
    const contextValue = useMemo(
        () => ({
            supabase,
            username,
            userID,
            isLoading,
            redirectUrl
        }),
        [username, userID, isLoading]
    );
    
    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
};