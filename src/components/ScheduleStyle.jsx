export default function ScheduleStyle(){
    const scheduleStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundPosition: 'center',
        backgroundColor: 'rgb(5, 45, 81)', // Greyish color with 50% opacity
        zIndex: -2, // Ensure the overlay is above the background image
        backgroundSize:'cover',
      };
    return(
        <div className="ScheduleStyle" style={scheduleStyle}>
        </div>
    )
}