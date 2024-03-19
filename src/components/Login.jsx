import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer"
              required
            />
          </div>
          <div className="mb-5">
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer"
              required
            />
          </div>
          <div className="mt-7 flex justify-center">
          <button
  type="submit"
  className="bg-green-500 rounded-lg text-white text-[18px] leading-[30px] rounded-lg px-8 py-3 hover:bg-green-700"
>
  Login
</button>

          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
