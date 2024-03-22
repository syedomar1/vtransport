import React from "react";
import TitleCard from "./TitleCard";
export default function OverlayStyle() {
    // const overlayStyle = {
    //     position: 'relative',
    //     width: '100vw',
    //     height: '100vh',
    // };

    const imageStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'url("./public/vit_bg.png")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        zIndex: 0,
    };

    const dashBoard = {
        position: 'absolute',
        top: '30vh',
        left: 'calc(50% - 20vw)',
        width: '40vw',
        height: '28vw',
        backgroundColor: 'rgba(0,0,0,0.5)',
        color: 'white',
        padding: '2.5vw',
        borderRadius: '3.75vw',
        marginLeft:"20vw",
        zIndex: 1,
    };

    return (
        <div className="OverlayStyle" >
            <div style={imageStyle}></div>
            <TitleCard></TitleCard>
            <div style={dashBoard}>
                <h1 className="text-3xl font-semibold">DASHBOARD</h1>
                <hr className="mt-2 border-2 w-76 color-white" />
                <ul className="py-5 list-disc px-5 text-xl">
                    <li>Due to the red alert being declared in Chennai, all the buses will leave at 4:00pm.
                        <hr className="mt-2 border-1 w-76 color-white" />
                    </li>
                    <li>Please make sure all the students who used the college bus get their bus pass from the transport office before 2:00pm without fail.
                        <hr className="mt-2 border-1 w-76 color-white" />
                    </li>
                </ul>
            </div>
        </div>
    );
}
