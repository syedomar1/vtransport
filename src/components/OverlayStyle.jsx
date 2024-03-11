import Logo from "./Logo";
import TitleCard from "./TitleCard";
export default function OverlayStyle(){
    const overlayStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundPosition: 'center',
        backgroundColor: 'rgba(19, 19, 19, 0.2)', // Greyish color with 50% opacity
        zIndex: -1, // Ensure the overlay is above the background image
        backgroundSize:'cover',
      };
    const dashBoard = {
        position: 'absolute',
        top: 200,
        left: 700,
        width: '40vw',
        height: '28vw',
        backgroundColor: 'rgba(0,0,0,0.5)',
        color: 'white',
        padding: 10,
        borderRadius:"15px"
    };

    return (
        <div className="OverlayStyle" style={overlayStyle}>
            {/* <Logo></Logo> */}
            <TitleCard></TitleCard>
            <div style = {dashBoard}>
                <h1 className="text-3xl font-semibold">DASHBOARD</h1>
                <hr className="mt-2 border-2 w-76 color-white"/>
                <ul className="py-5 list-disc px-5 text-xl">
                    <li>Due to the red alert being declared in chennai all the buses will leave at 4:00pm.
                        <hr className="mt-2 border-1 w-76 color-white"/>
                    </li>
                    <li>Please make sure all the students who used the college bus get their bus pass from the transport
                        office before 2:00pm without fail.
                        <hr className="mt-2 border-1 w-76 color-white"/>
                    </li>
                </ul>
            </div>
        </div>
    )
}