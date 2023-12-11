import React, { useState } from 'react'
import { Cancel, DragHandle, Remove } from "@mui/icons-material";
import { Link } from 'react-router-dom';
function Navbar() {

  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };
  return (
    <nav>
      <div className="container flex justify-between   items-center p-5 ">
        <Link to="/" className='flex items-center align-center gap-2'>
          <span>
            <img src="https://cdn-icons-png.flaticon.com/512/7513/7513034.png" alt="" className='w-16'/>
          </span>
          <span>
            <h1 className='text-2xl hidden lg:block font-bold'>CryptoTM</h1>
          </span>
        </Link>
        <a href='https://metamask.app.link/dapp/cryptotm.netlify.app/' className="btn rounded-2xl block lg:hidden i-glow font-monospace mr-5">click for mobile</a>
        <ul className='flex flex-center gap-5 items-center hidden lg:block lg:flex md:block mr-[100px]'>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
          <Link to="/mainAtm" className="btn bg-blue-700 text-light ml-5 font-bold w-[150px] rounded-full">Connect Wallet</Link>
        </ul>
        <span className='block lg:hidden md:hidden'>
          <DragHandle className=' font-bold text-lg ' onClick={toggleMenu} />
        </span>
        <div className={`fixed inset-y-0 right-0 w-64 blue-blur-glass text-white transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
          <ul className="p-4 flex flex-col gap-5">
            <span className=''>
              <Cancel className='absolute right-4 top-4 font-bold ' onClick={toggleMenu} />
            </span>
            <span className='mt-5 gap-3 flex flex-col text-1xl'>

              <li>Home</li>
              <li>About</li>
              <li>Contact</li>
            </span>
          </ul>
        </div>

      </div>
    </nav>
  )
}

export default Navbar
