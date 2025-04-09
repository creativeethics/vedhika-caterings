import React from 'react'
import footerLogo from "../../assets/header-logo.png";

const Footer = () => {
  return (
    <div className='bg-black '>
      <div className="container text-white py-20 flex flex-col items-center justify-center gap-4">
        <img src={footerLogo} alt="logo" className='text-center' />
        <h2 className='text-3xl text-center'>VEDHIKA CATERINGS</h2>
        <p className='text-center'>+61 447 619 106</p>
        <p>Location: 1234, Melbourne, Australia</p>
        <p>Open: 10:00 am – 011:00 pm</p>
        <p className='text-center'>Privacy Policy</p>
        <div className='flex flex-wrap items-center justify-between w-full border-t border-white pt-8 mt-8'>
          <p className='text-center'>Copyright © 2023 Vedhika Caterings. All Rights Reserved.</p>
          <p className='text-center'>Designed by <a href="">Creative Ethics</a></p>
        </div>
      </div>

    </div>
  )
}

export default Footer
