import NavBar from "../components/NavBar.jsx";
import SideBar from "../components/SideBar.jsx";
import React, {useContext, useEffect, useState} from "react";
import {useMediaQuery} from "react-responsive";
import Footer from "../components/Footer.jsx";
import Charts from "./Charts.jsx";
import {WebSocketContext} from "../context/WebSocketContext.jsx";
import LoadingPage from "./LoadingPage.jsx";

function DashboardContent()
{
    const chartsData = useContext(WebSocketContext);
    const [isSideBarOpen, setIsSideBarOpen] = useState(false)
    const isDesktop = useMediaQuery({query: '(min-width: 1024px)'});

    useEffect(() =>
    {
        // Automatically open sidebar on big screens
        setIsSideBarOpen(isDesktop);
    }, [isDesktop]);

    return (
        <>
            {!chartsData || chartsData.length <= 0 ?
                <LoadingPage message={"Loading charts..."}/> :
                <>
                    <div className={`min-h-screen relative flex flex-col lg:mr-72`}>
                        <NavBar handleSideBarButtonClick={setIsSideBarOpen}></NavBar>
                        <Charts/>
                        <Footer/>
                    </div>
                    <SideBar isOpen={isSideBarOpen} setIsOpen={setIsSideBarOpen}></SideBar>
                </>
            }
        </>
    )
}

export default DashboardContent;