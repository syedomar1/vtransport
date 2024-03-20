import React, { useState } from 'react';

const Navigation = () => {
  const [expanded1, setExpanded1] = useState(false);
  const [expanded2, setExpanded2] = useState(false);
  const [expanded3, setExpanded3] = useState(false);

  return (
    <div className="NavLinkContainer">
      {/* Nav Link 1 */}
      <div className={`NavLink ${expanded1 ? 'expanded' : ''}`} onMouseEnter={() => setExpanded1(true)} onMouseLeave={() => setExpanded1(false)} onClick={() => console.log("Redirect to timing")}>
        <h1>Timing</h1>
      </div>
      
      {/* Nav Link 2 */}
      <div className={`NavLink ${expanded2 ? 'expanded' : ''}`} onMouseEnter={() => setExpanded2(true)} onMouseLeave={() => setExpanded2(false)} onClick={() => console.log("Redirect to schedule")}>
        <h1>Schedule</h1>
      </div>
      
      {/* Nav Link 3 */}
      <div className={`NavLink ${expanded3 ? 'expanded' : ''}`} onMouseEnter={() => setExpanded3(true)} onMouseLeave={() => setExpanded3(false)} onClick={() => console.log("Redirect to track")}>
        <h1>Track</h1>
      </div>
    </div>
  );
}

export default Navigation;
