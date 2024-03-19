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
            backgroundColor: 'rgb(8,44,84)',
            overflow: 'hidden',
        }}>
            <div className="container" style={{
                height: '90%',
                width: '80%',
                borderRadius: '20px',
                backgroundColor: '#71b1eb',
                overflowY: 'auto',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <p className="text-4xl font-bold text-white font-mono mb-8">BUS DETAILS</p>
                <div style={{ width: '80%' }}>
                    <form>
                        <fieldset className="border border-solid border-gray-300 p-2 rounded-md mb-4">
                            <legend className="text-sm text-gray-700 p-2">Enter Bus Number</legend>
                            <input type="number" id="busNumber" name="busNumber" className="w-full h-10 p-3 bg-gray-100" placeholder="Enter Bus Number"></input>
                        </fieldset>

                        <fieldset className="border border-solid border-gray-300 p-2 rounded-md mb-8">
                            <legend className="text-sm text-gray-700 p-2">Enter Bus Stop</legend>
                            <input type="text" id="busStop" name="busStop" className="w-full h-10 p-3 bg-gray-100" placeholder="Enter Bus Stop"></input>
                        </fieldset>
                    </form>
                </div>

                {['Bus Incharge Info', 'Bus Information', 'Route Information'].map((item, index) => (
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
