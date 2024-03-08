import React, { useState } from 'react';
import { Link } from 'react-scroll';
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
        <Link spy={true} smooth={true} to='/' onClick={closeNavbar} className='nav-link'>
          <li className='my-4 py-4 border-b border-slate-800 hover:bg-slate-880 hover:text-blue-300 hover:rounded cursor-pointer text-decoration-none'>Home</li>
        </Link>
        <Link spy={true} smooth={true} to='/busRoutes' onClick={closeNavbar} className='nav-link'>
          <li className='my-4 py-4 border-b border-slate-800 hover:bg-slate-880 hover:text-blue-300 hover:rounded cursor-pointer text-decoration-none'>Bus Routes</li>
        </Link>
        <Link spy={true} smooth={true} to='/timings' onClick={closeNavbar} className='nav-link'>
          <li className='my-4 py-4 border-b border-slate-800 hover:bg-slate-880 hover:text-blue-300 hover:rounded cursor-pointer text-decoration-none'>Timings</li>
        </Link>
        <Link spy={true} smooth={true} to='/contacts' onClick={closeNavbar} className='nav-link'>
          <li className='my-4 py-4 border-b border-slate-800 hover:bg-slate-880 hover:text-blue-300 hover:rounded cursor-pointer text-decoration-none'>Contacts</li>
        </Link>
      </ul>
    </div>
  );

  return (
    <nav>
      <div className='h-10vh flex justify-between z-50 text-white lg:py-5 px-20 py-4 bg-slate-700 bg-opacity-70'>
        <div className='flex items-center flex-1'>
        <Link to='/' spy={true} smooth={true}>
            <img src={logo} alt="VIT Logo" className="h-15 w-20 cursor-pointer" onClick={closeNavbar} />
          </Link>
        </div>
        <div className='lg:flex md:flex lg:flex-1 items-center justify-end font-normal hidden'>
          <div className='flex-10'>
            <ul className='flex gap-8 mr-16 text-[18px]'>
              <Link spy={true} smooth={true} to='/' onClick={closeNavbar} className='nav-link'>
                <li className='hover:text-blue-300 transition border-slate-900 cursor-pointer text-decoration-none'>Home</li>
              </Link>
              <Link spy={true} smooth={true} to='/busRoutes' onClick={closeNavbar} className='nav-link'>
                <li className='hover:text-blue-300 transition border-slate-900 cursor-pointer text-decoration-none'>Bus Routes</li>
              </Link>
              <Link spy={true} smooth={true} to='/timings' onClick={closeNavbar} className='nav-link'>
                <li className='hover:text-blue-300 transition border-slate-900 cursor-pointer text-decoration-none'>Timings</li>
              </Link>
              <Link spy={true} smooth={true} to='/contacts' onClick={closeNavbar} className='nav-link'>
                <li className='hover:text-blue-300 transition border-slate-900 cursor-pointer text-decoration-none'>Contacts</li>
              </Link>
            </ul>
          </div>
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







/*
const content =
<>
<div className='lg:hidden block absolute top-16 w-full left-0 tight-0 bg-slate-900 transition'>
  <ul className='text-center text-xl p-20'>
    <Link spy={true} smooth={true} to='/'>
      <li className='my-4 py-4 border-b border-slate-800 hover:bg-slate-880 hover:rounded'>Home</li>
    </Link>
    <Link spy={true} smooth={true} to='/busRoutes'>
      <li className='my-4 py-4 border-b border-slate-800 hover:bg-slate-880 hover:rounded'>Bus Routes</li>
    </Link>
    <Link spy={true} smooth={true} to='/timings'>
      <l className='my-4 py-4 border-b border-slate-800 hover:bg-slate-880 hover:rounded'>Timings</l>
    </Link>
    <Link spy={true} smooth={true} to='contacts'>
      <li className='my-4 py-4 border-b border-slate-800 hover:bg-slate-880 hover:rounded'>Contacts</li>
    </Link>
  </ul>
</div>*/