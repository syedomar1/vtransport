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

  return (
    <section className="h-screen flex justify-center items-start pt-20 md:pt-40">
      <div className="overflow-auto max-w-[90vw] md:max-w-[570px] w-full mx-auto">
        <fieldset className="p-10 pb-20 bg-transparent rounded-3xl border-4 border-white backdrop-blur-md">
          <legend className="text-white text-5xl font-bold">Login</legend>
          <form className="py-4 md:py-0" onSubmit={handleSubmit}>
            <div className="mb-5">
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
                  style: {
                    backgroundColor: "transparent",
                    borderRadius: "999px",
                  },
                }}
                InputLabelProps={{
                  style: { color: "white" },
                }}
                required
                classes={{outlined: "border-white"}} // Apply border color using classes prop
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
                  style: {
                    backgroundColor: "transparent",
                    borderRadius: "999px",
                  },
                }}
                InputLabelProps={{
                  style: { color: "white" },
                }}
                required
                classes={{outlined: "border-white"}} // Apply border color using classes prop
              />
            </div>
            <div className="mt-14 flex justify-center">
              <Link to="/" className="bg-cyan-600 rounded-full text-white text-[18px] leading-[30px] rounded-lg px-8 py-3 hover:bg-green-700">
                <button type="submit" className="w-full md:w-auto">Login</button>
              </Link>
            </div>
          </form>
        </fieldset>
      </div>
    </section>
  );
};

export default Login;
