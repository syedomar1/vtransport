import Logo from "./Logo";
import TitleCard from "./TitleCard";

export default function OverlayStyle() {
    const overlayStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundPosition: 'center',
        backgroundImage: "linear-gradient(rgba(100,100,100,0.3),rgba(0,0,0,0.9))", // Greyish color with 50% opacity
        zIndex: -1, // Ensure the overlay is above the background image
        backgroundSize: 'cover',
    };
    const dashBoard = {
        position: 'absolute',
        top: 200,
        left: 750,
        width: '40vw',
        height: '28vw',
        backgroundColor: 'transparent',
        color: 'white',
        padding: 10,
    };
    const board = {
        position: 'absolute',
        top: '15%',
        left: '0%',
        width: '100%',
        height: '85%',
        backgroundColor: 'rgba(0,0,0,0.8)',
        borderTop: "5px white solid",
        paddingLeft:"20px",
        paddingTop: "10px",
    };

    return (
        <div className="OverlayStyle" style={overlayStyle}>
            {/* <Logo></Logo> */}
            <div style={{ display: "flex", flexDirection: "row" }}>
                <TitleCard></TitleCard>
                <div style={dashBoard}>
                    <span className="TitleCard text-4xl font-bold">UPDATES</span>
                    <div style={board}>
                        <li style={{ fontSize: '25px' }}>Buses will leave at 4:00pm today due to bad weather</li>
                    </div>
                </div>
            </div>
        </div>
    )
}
