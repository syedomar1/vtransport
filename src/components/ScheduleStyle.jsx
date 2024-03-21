export default function ScheduleStyle() {
  const scheduleStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width:'100%',
    height:'100%', 
    backgroundColor: 'transparent', // Greyish color with 50% opacity rgb(8,44,84)
    zIndex: 0, // Adjust z-index as needed
    overflow:'auto',
  };
  
  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundPosition: 'center',
    backgroundImage: "linear-gradient(rgba(100,100,100,0.5),rgba(0,0,0,0.9))", // Greyish color with 50% opacity
    zIndex: -1, // Ensure the overlay is above the background image
    backgroundSize:'cover',
  };
  
  return <div className="ScheduleStyle" style={scheduleStyle}><div style = {overlayStyle}></div></div>;
}