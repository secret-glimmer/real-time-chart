import React, {useEffect} from "react";
import {WebSocketProvider} from "../context/WebSocketContext.jsx";
import {DashboardLayoutProvider} from "../context/DashboardLayoutContext.jsx";
import DashboardContent from "./DashboardContent.jsx";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext.jsx";

function Dashboard()
{
    const navigate = useNavigate();
    const {username} = useAuth()

    useEffect(() =>
    {
        // Re-direct to login page if the user is not authenticated.
        if (!username)
        {
            console.log('User Name: ', username)
            navigate('/auth/login')
        }

    }, [username]);

    return (
        <WebSocketProvider>
            <DashboardLayoutProvider>
                <DashboardContent/>
            </DashboardLayoutProvider>
        </WebSocketProvider>
    )
}

export default Dashboard;