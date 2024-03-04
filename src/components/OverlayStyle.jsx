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
        backgroundColor: 'rgba(38, 34, 33, 0.5)', // Greyish color with 50% opacity
        zIndex: -1, // Ensure the overlay is above the background image
        backgroundSize:'cover',
      };

    return (
        <div className="OverlayStyle" style={overlayStyle}>
            <Logo></Logo>
            <TitleCard></TitleCard>
        </div>
    )
}