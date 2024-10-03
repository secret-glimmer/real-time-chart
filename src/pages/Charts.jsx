import Card from "../components/Card.jsx";
import React, {useContext, useEffect, useRef, useState} from "react";
import {LineChart} from "../components/LineChart.tsx";
import {BarChart} from "../components/BarChart.tsx";
import {BarList} from "../components/BarList.tsx";
import {DonutChart} from "../components/DonutChart.tsx";
import {CategoryBar} from "../components/CategoryBar.tsx";
import {WebSocketContext} from "../context/WebSocketContext.jsx";
import '/node_modules/react-grid-layout/css/styles.css'
import '/node_modules/react-resizable/css/styles.css'
import {Responsive, WidthProvider} from "react-grid-layout";
import {useDashboardLayout} from "../context/DashboardLayoutContext.jsx";
import {defaultGridLayouts} from '../data/dashboardChartsDefaultLayouts.js'

const ResponsiveGridLayout = WidthProvider(Responsive);

function Charts()
{
    const chartsData = useContext(WebSocketContext);
    const [charts, setCharts] = useState([])
    const {
        layouts,
        setLayouts,
        disabledCharts,
        setDisabledCharts,
        isEditingLayout,
        setIsEditingLayout
    } = useDashboardLayout()
    const scrollMargin = 75; // Distance from the edge to trigger scrolling.
    const scrollSpeed = 20; // Scroll speed.
    const scrollInterval = useRef(null); // Store interval reference.

    useEffect(() =>
    {
        if (isEditingLayout) return;

        setCharts([
            {
                id: 'topSearchQueries',
                title: 'Most Visited Pages',
                children: <BarList data={chartsData.topSearchQueries}/>
            },
            {
                id: 'userActivityByRegion',
                title: 'User Activity by Region',
                children: <>
                    <CategoryBar values={chartsData.userActivityByRegion}/>
                    <span className='flex w-full justify-between mt-4'>
                        <span>Africa</span>
                        <span>Asia</span>
                        <span>Europe</span>
                    </span>
                </>
            },
            {
                id: 'activeUsers',
                title: 'Active Users Over Time',
                children: <LineChart
                    className="h-80"
                    data={chartsData.activeUsersOverTime}
                    index="Time"
                    categories={["ActiveUsers"]}
                />
            },
            {
                id: 'newSignups',
                title: 'New Signups Per Day',
                children: <BarChart
                    data={chartsData.newSignupsPerDay}
                    index="day"
                    categories={["Signups"]}
                />
            },
            {
                id: 'retentionRate',
                title: 'Retention Rate Over Time',
                children: <LineChart
                    className="h-80"
                    data={chartsData.retentionRateOverTime}
                    index="time"
                    categories={["RetentionRate"]}
                />
            },
            {
                id: 'userDemographics',
                title: 'User Demographics',
                children: <DonutChart
                    className='m-auto'
                    label={'Age'}
                    showLabel={true}
                    data={chartsData.userDemographics}
                    category="category"
                    value="age"/>
            },
            {
                id: 'mostPopularFeatures',
                title: 'Most Popular Features',
                children: <BarList data={chartsData.mostPopularFeatures}/>
            },
            {
                id: 'churnRate',
                title: 'Churn Rate',
                children: <LineChart
                    className="h-80"
                    data={chartsData.churnRate}
                    index="time"
                    categories={["ChurnRate"]}
                />
            }
        ])
    }, [chartsData]);

    function toggleCard(id, isEnabled)
    {
        setDisabledCharts((prevDisabledCharts) =>
        {
            if (isEnabled) return [...prevDisabledCharts, id]
            else return prevDisabledCharts.filter(chartId => chartId !== id)
        })
    }

    function updateLayout(currentLayout, allLayouts)
    {
        // Restore all cards height because the Grid component will lose all the heights when the cards are disabled and re-enabled again.
        for (let i = 0; i < currentLayout.length; i++)
            currentLayout[i].h = defaultGridLayouts.sm.find(card => card.i === currentLayout[i].i).h;

        setLayouts(allLayouts)
    }

    // Function to handle scrolling
    const startScrolling = (direction) =>
    {
        stopScrolling(); // Clear any existing interval
        scrollInterval.current = setInterval(() =>
        {
            window.scrollBy(0, scrollSpeed * direction); // Scroll up or down based on direction (-1 for up, 1 for down)
        }, 16); // Runs approximately every 16ms (~60fps)
    };

    const stopScrolling = () =>
    {
        if (!scrollInterval.current) return;

        clearInterval(scrollInterval.current);
        scrollInterval.current = null;
    };

    // Drag handler based on mouse position
    const handleDrag = (layout, oldItem, newItem, placeholder, e) =>
    {
        let clientY;

        // Determine mouse/touch position
        if (e.touches)
            clientY = e.touches[0].clientY;
        else
            clientY = e.clientY;

        const viewportHeight = window.innerHeight;

        // Check if the mouse is near the bottom of the viewport
        if (clientY >= viewportHeight - scrollMargin)
        {
            startScrolling(1); // Scroll down
        }
        // Check if the mouse is near the top of the viewport
        else if (clientY <= scrollMargin)
        {
            startScrolling(-1); // Scroll up
        }
        // Stop scrolling if the mouse is away from the edges
        else stopScrolling();
    };

    useEffect(() =>
    {
        return () => stopScrolling(); // Cleanup the interval on component unmount
    }, []);

    if (chartsData.length <= 0 || charts.length <= 0) return <div className='min-h-screen'></div>;

    if (disabledCharts.length === 8 && !isEditingLayout) return <NoChartsMessage
        setIsEditingLayout={setIsEditingLayout}/>;

    return (
        <div
            className={'md:px-10 py-10 z-10 w-full m-auto px-4 relative overflow-hidden'}>

            <ResponsiveGridLayout
                className="layout grow"
                layouts={layouts}
                breakpoints={{lg: 1000, md: 700, sm: 0}}
                cols={{lg: 3, md: 2, sm: 1}}
                draggableHandle='.drag-handle'
                containerPadding={[0, 0]}
                rowHeight={112}
                isResizable={false}
                width={1210}
                onDrag={handleDrag}
                onDragStop={() => stopScrolling()}
                onLayoutChange={updateLayout}>

                {charts.map((chart) =>
                {
                    const isChartEnabled = !disabledCharts.includes(chart.id);

                    if (isEditingLayout || isChartEnabled)
                        return (
                            <Card
                                id={chart.id}
                                key={chart.id}
                                isEnabled={isChartEnabled}
                                setIsEnabled={toggleCard}
                                title={chart.title}
                                children={chart.children}
                            />
                        );
                    return null;
                })}

            </ResponsiveGridLayout>
            {isEditingLayout && <SaveLayoutButton setIsEditingLayout={setIsEditingLayout}></SaveLayoutButton>}
        </div>
    );
}

function SaveLayoutButton({setIsEditingLayout})
{
    return (
        <button
            className='fixed shadow-lg right-5 lg:hidden bottom-5 z-20 rounded bg-amber-400 hover:bg-amber-300 transition-colors w-12 h-12 flex justify-center items-center'
            title={"Save charts layout"}
            onClick={() => setIsEditingLayout(false)}>
            <svg width='22px' className='fill-black' xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 448 512">
                <path
                    d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
            </svg>
        </button>
    )
}

function NoChartsMessage({setIsEditingLayout})
{
    return <div
        className='grow flex flex-col justify-center items-center text-center text-lg leading-10 gap-4'>
        <h1 className='dark:text-white'>You've Disabled All The Charts</h1>
        <button className='bg-amber-400 hover:bg-amber-500 text-black transition-colors p-1 px-8 rounded'
                onClick={() => setIsEditingLayout(true)}>
            Add Charts
        </button>
    </div>;
}

export default Charts;