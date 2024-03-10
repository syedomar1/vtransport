
ScheduleStyle.jsx
export default function ScheduleStyle(){
    const scheduleStyle = {
        position: 'relative',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundPosition: 'center',
        backgroundColor: 'rgb(5, 45, 81)', // Greyish color with 50% opacity
        zIndex: -2, // Ensure the overlay is above the background image
      };
    return(
        <div className="ScheduleStyle" style={scheduleStyle}>
        </div>
    )
}