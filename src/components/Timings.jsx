import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

export default function Timings() {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleItem = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    return (
        <div
            style={{
                position: "absolute",
                top: "0%",
                height: "100vh",
                width: "100%",
                //display: "flex",
                //justifyContent: "center",
                //alignItems: "center",
                backgroundColor: "rgb(8,44,84)",
                overflow: "hidden",
            }}
        >
            <div
                className="container"
                style={{
                    width: "70vw",
                    height: "72vh",
                    borderRadius: "10px 10px 50px 50px",
                    backgroundColor: "#71b1eb",
                    overflowY: "auto",
                    overflowX: "hidden",
                    padding: "20px",
                    paddingTop: "0px",
                    marginTop: "20vh",
                    marginLeft: "auto",
                    marginRight: "auto",
                    display: "flex",
                    flexDirection: "column",
                    //justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <div className="py-5 px-5 mx-10 mb-10 self-start bg-transparent border-l-8 border-white">
                    <p className="text-4xl font-bold text-white font-mono">
                                        BUS DETAILS
                    </p>
                </div>
                
                <div style={{ width: "80%" }}>
                    <form>
                        <Box sx={{ display: 'flex', flexDirection: 'row',  marginBottom:"2.5rem"}}>
                            <TextField
                                id="busNumber"
                                name="busNumber"
                                label="Enter Route Number"
                                className="w-full mb-4"
                                variant="outlined"
                                placeholder="Enter Bus Number"
                                sx={{
                                    mr: 2,
                                    ml:"1vw",
                                    width: '54vw',
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'white',
                                            borderWidth: '2px',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'white',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'white',
                                        },
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: 'white',
                                    },
                                }}
                            />
                            
                        </Box>
                        <hr className="w-full h-10"></hr>
                    </form>
                </div>

                

                {["Bus Incharge Info", "Bus Information", "Route Information"].map((item, index) => (
                    <div key={index} className="mb-6" style={{ width: "80%" }}>
                        <button
                            type="button"
                            onClick={() => toggleItem(index)}
                            className="flex items-center justify-between w-full p-4 rounded-md bg-blue-500 text-white"
                        >
                            <p className="text-xl font-bold">{item}</p>
                            <span>{activeIndex === index ? "-" : "+"}</span>
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
