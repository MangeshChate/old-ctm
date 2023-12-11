import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'

import Footer from '../components/Footer'

function Home() {
  return (
    <div className='bg-hero-grad text-light'>
    <Navbar/>
    <Hero/>
  
    <Footer/>
    </div>
  )
}

export default Home
