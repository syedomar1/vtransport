export default function ScheduleStyle() {
    const scheduleStyle = {
      position: 'absolute',
      top: 0,
      left: 0,
      width:'100%',
      height:'100%', 
      backgroundColor: 'rgb(8,44,84)', // Greyish color with 50% opacity
      zIndex: -1, // Adjust z-index as needed
      overflow:'auto',
    };
  
    return <div className="ScheduleStyle" style={scheduleStyle}></div>;
  }