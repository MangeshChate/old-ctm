import React from 'react'
import cryptoImg from '../assets/ethCoin.jpeg'
import { Diversity1TwoTone, PlayCircleFilled } from '@mui/icons-material'
import { Link } from 'react-router-dom'
function Hero() {
  return (
    <div className='container mt-5 h-[90vh]'>

      <div className="grid grid-cols-1 lg:grid-cols-2  gap-5 lg:gap-0 h-[100%]">
        <div className='flex  items-center align-center p-4 '>
          <div className='text-3xl  lg:text-5xl   '>
            <span className=''>

              Experience Pin-less Perfection with <br />
              <span className='font-bold text-info' >CryptoTM </span> <br />
            </span>
            <span className='text-lg lg:text-3xl '>
              The Epitome of Security

            </span>
            <br />
            <button className="btn bg-blue-700 text-lg font-bold mt-10 rounded-full  text-light flex gap-2 align-center  justify-center">
              <PlayCircleFilled />
              <Link to="/mainAtm">Connect Wallet</Link>
            </button>
          </div>

        </div>
        <div className='flex items-center justify-center  align-center'>
          <span>
            <img src={cryptoImg} alt="" className='w-[340px] lg:w-[550px] rounded-3xl c-glow' />

          </span>


        </div>
      </div>

    </div>
  )
}

export default Hero
