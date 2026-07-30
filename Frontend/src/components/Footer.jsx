import React from 'react'
import { assets } from '../../assets 2/assets_frontend/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      {/* 3-Column Grid Layout */}
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        
        {/* 1. Left Section */}
        <div>
          <img className='mb-5 w-40' src={assets.logo} alt="Prescripto Logo" />
          <p className='w-full md:w-2/3 text-gray-600 leading-6'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta, debitis? Repellendus, repellat voluptates. Est at officiis voluptatum, neque quod possimus voluptatibus earum quia et magnam laudantium tempora hic molestias porro.
          </p>
        </div>

        {/* 2. Center Section */}
        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li className='cursor-pointer hover:text-black transition-all'>Home</li>
            <li className='cursor-pointer hover:text-black transition-all'>About us</li>
            <li className='cursor-pointer hover:text-black transition-all'>Contact us</li>
            <li className='cursor-pointer hover:text-black transition-all'>Privacy policy</li>
          </ul>
        </div>

        {/* 3. Right Section */}
        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>+1-212-456-7809</li>
            <li>greatstackdev@gmail.com</li>
          </ul>
        </div>

      </div>

      {/* Copyright Text */}
      <div>
        <hr className='border-gray-200' />
        <p className='py-5 text-sm text-center text-gray-500'>
          Copyright 2024 @ Prescripto - All Rights Reserved.
        </p>
      </div>
    </div>
  )
}

export default Footer