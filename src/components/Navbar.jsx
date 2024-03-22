import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { CiMenuFries } from 'react-icons/ci';
import logo from '../assets/vit_logo.png';

const Navbar = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeNavbar = () => setClick(false); // Function to close the navbar

  const content = (
    <div className='lg:hidden block absolute top-16 w-full left-0 tight-0 bg-slate-900 transition'>
      <ul className='text-center text-xl p-20'>
        <Link to='/' onClick={closeNavbar} className='nav-link'>
          <li className='my-4 py-4 border-b border-slate-800 hover:bg-slate-880 hover:text-blue-300 hover:rounded cursor-pointer text-decoration-none'>Home</li>
        </Link>
        <Link to='/schedule' onClick={closeNavbar} className='nav-link'>
          <li className='my-4 py-4 border-b border-slate-800 hover:bg-slate-880 hover:text-blue-300 hover:rounded cursor-pointer text-decoration-none'>Schedule</li>
        </Link>
        <Link to='/timings' onClick={closeNavbar} className='nav-link'>
          <li className='my-4 py-4 border-b border-slate-800 hover:bg-slate-880 hover:text-blue-300 hover:rounded cursor-pointer text-decoration-none'>Timings</li>
        </Link>
        <Link to='/track' onClick={closeNavbar} className='nav-link'>
          <li className='my-4 py-4 border-b border-slate-800 hover:bg-slate-880 hover:text-blue-300 hover:rounded cursor-pointer text-decoration-none'>Track</li>
        </Link>
      </ul>
    </div>
  );

  return (
    <nav style={{position:'fixed',top:0,left:0,width:'100%',zIndex:"1"}}>
      <div className='h-10vh flex justify-between z-50 text-white lg: py-2 px-20  bg-slate-700 bg-opacity-100 '>
        <div className='flex items-center flex-1'>
          <Link to='/' className="cursor-pointer" onClick={closeNavbar}>
            <img src={logo} alt="VIT Logo" className="h-16 w-32" />
          </Link>
        </div>
        <div className='lg:flex md:flex lg:flex-1 items-center justify-end font-normal hidden'>
          <div className='flex-10'>
            <ul className='flex gap-8 mr-16 text-[18px]'>
              <Link to='/' className='nav-link' onClick={closeNavbar}>
                <li className='hover:text-blue-300 transition border-slate-900 cursor-pointer text-decoration-none'>Home</li>
              </Link>
              <Link to='/schedule' className='nav-link' onClick={closeNavbar}>
                <li className='hover:text-blue-300 transition border-slate-900 cursor-pointer text-decoration-none'>Schedule</li>
              </Link>
              <Link to='/timings' className='nav-link' onClick={closeNavbar}>
                <li className='hover:text-blue-300 transition border-slate-900 cursor-pointer text-decoration-none'>Timings</li>
              </Link>
              <Link to='/track' className='nav-link' onClick={closeNavbar}>
                <li className='hover:text-blue-300 transition border-slate-900 cursor-pointer text-decoration-none'>Track</li>
              </Link>
            </ul>
          </div>
        </div>
        <div className="flex items-center"> {/* This div contains the Login button */}
          <Link to='/login' className='nav-link' onClick={closeNavbar}>
            <button className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded'>
              Login
            </button>
          </Link>
        </div>
        <div>
          {click && content}
        </div>
        <button className='block sm:hidden transition' onClick={handleClick}>
          {click ? <FaTimes /> : <CiMenuFries />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;