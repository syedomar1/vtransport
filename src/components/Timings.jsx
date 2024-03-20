import React, { useState } from "react";

export default function Timings() {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleItem = index => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    return (
        <div style={{
            position: 'relative',
            height: '100vh',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: "auto",
            backgroundImage: "linear-gradient(rgba(100,100,100,0.5),rgba(0,0,0,0.9))",
        }}>
            <div className="container" style={{
                position: 'absolute',
                top: '20%',
                left: '15%',
                height: '77vh',
                width: '70vw',
                borderRadius: '10px',
                backgroundColor: 'rgba(0,0,0,0.7)',
                padding: '20px',
                paddingTop: "20px",
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}> 
                <div style = {{}}>
                    <p className="text-4xl font-bold text-white font-mono ">BUS DETAILS</p>
                </div>
                <div style={{ width: '80%' }}>
                    <form>
                        <fieldset className="border border-solid border-gray-300 p-2 rounded-md mb-4">
                            <legend className="text-sm text-white p-2">Enter Bus Number</legend>
                            <input type="number" id="busNumber" name="busNumber" className="w-full h-10 p-3 bg-gray-100" placeholder="Enter Bus Number"></input>
                        </fieldset>

                        <fieldset className="border border-solid border-gray-300 p-2 rounded-md mb-8">
                            <legend className="text-sm text-white p-2">Enter Bus Stop</legend>
                            <input type="text" id="busStop" name="busStop" className="w-full h-10 p-3 bg-gray-100" placeholder="Enter Bus Stop"></input>
                        </fieldset>
                    </form>
                </div>

                {['Driver Information', 'Bus Information', 'Route Information'].map((item, index) => (
                    <div key={index} className="mb-6" style={{ width: '80%' }}>
                        <button
                            type="button"
                            onClick={() => toggleItem(index)}
                            className="flex items-center justify-between w-full p-4 rounded-md bg-blue-500 text-white"
                        >
                            <p className="text-xl font-bold">{item}</p>
                            <span>{activeIndex === index ? '-' : '+'}</span>
                        </button>
                        {activeIndex === index && (
                            <div className="p-4 mt-2 rounded-md bg-blue-200 text-blue-900">
                                <p className="text-lg font-bold">LOREM IPSUM DOLOR</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
