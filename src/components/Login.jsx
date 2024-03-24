import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:10000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const json = await response.json();

      if (response.ok) {
        localStorage.setItem("token", json.authtoken);
        navigate("/");
      } else {
        console.error(json.message); 
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

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

  return (
    <section  style={overlayStyle} className="h-screen flex justify-center items-start pt-40">
      <fieldset className="w-full max-w-[570px] mx-auto p-10 pb-20 bg-transparent rounded-3xl border-4 border-white backdrop-blur-md" >
        <legend className="text-white text-5xl font-bold"> &nbsp;Login &nbsp; </legend>
        <form className="py-4 md:py-0" onSubmit={handleSubmit}>
          <div className="mb-5 pt-5">
            <TextField
              id="email"
              name="email"
              label="Email"
              value={formData.email}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
              InputProps={{
                className: "text-white placeholder-white",
                style: { backgroundColor: "transparent",
                         borderRadius: "999px",
                         border: "3px white solid"},
              }}
              InputLabelProps={{
                style: { color: "white",}

              }}
              required
            />
          </div>
          <div className="mb-5">
            <TextField
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
              InputProps={{
                className: "text-white placeholder-white",
                style: { backgroundColor: "transparent",
                         borderRadius: "999px",
                         border: "3px white solid"},
              }}
              InputLabelProps={{
                className: "px-20",
                style: { color: "white",}

              }}
              required
            />
          </div>
          <div className="mt-14 flex justify-center">
            <Link to="/" className="bg-cyan-600 rounded-full text-white text-[18px] leading-[30px] rounded-lg px-8 py-3 hover:bg-green-700">
              <button type="submit" className="w-60">
                Login
              </button>
            </Link>
          </div>
        </form>
      </fieldset>
    </section>
  );
};

export default Login;
