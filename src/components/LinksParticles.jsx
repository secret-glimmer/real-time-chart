import Particles, {initParticlesEngine} from "@tsparticles/react";
import {useEffect, useMemo, useState} from "react";
import {loadSlim} from "@tsparticles/slim";

const LinksParticles = ({color = '#FFFFFF', className}) =>
{
    const [init, setInit] = useState(false);
    useEffect(() =>
    {
        initParticlesEngine(async (engine) =>
        {
            await loadSlim(engine);
        }).then(() =>
        {
            setInit(true);
        });
    }, []);

    const options = useMemo(
        () => ({
            fullScreen: {
                "enable": false
            },
            fpsLimit: 30,
            particles: {
                color: {
                    value: [color, '#ffde93']
                },
                links: {
                    color: {
                        value: [color]
                    },
                    distance: 150,
                    enable: true,
                    width: 1.5,
                },
                move: {
                    direction: "none",
                    enable: true,
                    outModes: {
                        default: "bounce",
                    },
                    speed: 1,
                    straight: false,
                },
                number: {
                    density: {
                        enable: true,
                    },
                    value: 150,
                },
                shape: {
                    type: "circle",
                },
                size: {
                    value: {min: 3, max: 5},
                },
            },
            detectRetina: true,
        }),
        [color],
    );

    return (
        <div className={className}>
            <Particles id='linked-particles' options={options}/>
        </div>
    );
};

export default LinksParticles;