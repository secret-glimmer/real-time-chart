import {createContext, useContext, useEffect, useRef, useState} from "react";
import useSavedPreferences, {saveAllPreferences} from "../hooks/useSavedPreferences.js";
import {defaultGridLayouts} from '../data/dashboardChartsDefaultLayouts.js'
import {useAuth} from "./AuthContext.jsx";

const DashboardLayoutContext = createContext({});
export const useDashboardLayout = () => useContext(DashboardLayoutContext);
export const DashboardLayoutProvider = props =>
{
    const {userID} = useAuth();
    const [layouts, setLayouts] = useSavedPreferences("chart_layouts", defaultGridLayouts);
    const [disabledCharts, setDisabledCharts] = useSavedPreferences("disabled_charts", [])
    const [isEditingLayout, setIsEditingLayout] = useState(false)
    const isFirstRun = useRef(true);

    useEffect(() =>
    {
        if (isFirstRun.current)
        {
            // Skip the first run.
            isFirstRun.current = false;
            return;
        }

        if (!isEditingLayout) saveAllPreferences(userID, layouts, disabledCharts);
    }, [isEditingLayout]);

    return (
        <DashboardLayoutContext.Provider
            value={{layouts, setLayouts, disabledCharts, setDisabledCharts, isEditingLayout, setIsEditingLayout}}>
            {props.children}
        </DashboardLayoutContext.Provider>
    );
};