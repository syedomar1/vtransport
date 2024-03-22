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
    <section className="h-screen flex justify-center items-start pt-16" style={{ backgroundColor: 'rgb(8,44,84)' }}>
      <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md p-10" style={{ backgroundColor: '#71b1eb' }}>
        <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10 text-white text-center">
          VTransport Login
        </h3>
        <form className="py-4 md:py-0" onSubmit={handleSubmit}>
          <div className="mb-5">
            <TextField
              id="email"
              name="email"
              label="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
              InputProps={{
                className: "text-white",
                style: { backgroundColor: "white" },
              }}
              required
            />
          </div>
          <div className="mb-5">
            <TextField
              id="password"
              name="password"
              label="Enter your password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
              InputProps={{
                className: "text-white",
                style: { backgroundColor: "white" },
              }}
              required
            />
          </div>
          <div className="mt-7 flex justify-center">
            <Link to="/" className="bg-green-500 rounded-lg text-white text-[18px] leading-[30px] rounded-lg px-8 py-3 hover:bg-green-700">
              <button
                type="submit"
              >
                Login
              </button>
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
