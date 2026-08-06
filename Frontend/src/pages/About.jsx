import React from 'react'
import { assets } from '../../assets 2/assets_frontend/assets'

const About = () => {
  return (
    <div>
     <div className='text-center text-2xl pt-10 text-gray-500'>
      <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
     </div>
     <div className='my-10 flex flex-col md:flex-row gap-12'>
      <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="" />
      <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum dolores ullam, veniam ab temporibus a, porro inventore, maiores recusandae veritatis laboriosam. Recusandae quod cumque magnam distinctio, quam iste fugiat molestias.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut itaque totam, dolorem tenetur dolor minus nam vel sint dolore sapiente expedita commodi error iste dignissimos nesciunt. Error quia dolores eius!</p>
        <b className='text-gray-800'>Our Vision</b>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam animi pariatur quia temporibus, fugiat cumque dolor id et quae minima eos eaque tenetur placeat impedit praesentium. Assumenda distinctio officia cumque!</p>
      </div>
     </div>
     <div className='text-xl my-4'>
      <p>WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span></p>
     </div>
     <div className='flex flex-col md:flex-row mb-20'>
      <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
        <b>EFFICIENCY:</b>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
      </div>
      <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
        <b>CONVENience:</b>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
      </div>
      <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
        <b>PERSONALISATION:</b>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
      </div>
     </div>
    </div>
  )
}

export default About
