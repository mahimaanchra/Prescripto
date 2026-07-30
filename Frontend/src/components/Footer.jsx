import React from 'react'
import { assets } from '../../assets 2/assets_frontend/assets'

const Footer = () => {
  return (
    <div>
      <div>
        {/*----------------Left Section---------*/}
        <div>
           <img src={assets.logo} alt="" />
           <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta, debitis? Repellendus, repellat voluptates. Est at officiis voluptatum, neque quod possimus voluptatibus earum quia et magnam laudantium tempora hic molestias porro.
           Corporis ex delectus, magnam quos voluptates non, numquam consectetur excepturi odio mollitia amet asperiores dignissimos odit incidunt, voluptatem temporibus dolore minima at commodi iure qui pariatur nemo! Non, laboriosam cumque?
          </p>
        </div>
         {/*----------------Center Section---------*/}
         <div>
           <p>COMPANY</p>
           <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Contact us</li>
            <li>Privacy policy</li>
           </ul>
         </div>
          {/*----------------Right Section---------*/}
          <div>
            <p>GET IN TOUCH</p>
           <ul>
            <li>+1-212-456-7809</li>
            <li>mahimaanhra@gmail.com</li>
           </ul>
          </div>
      </div>
      {/*------------Copyright Text-------------*/}
      <div>
        <hr />
        <p>Copyright 2024@ Prescripto - All Right Reserved</p>
      </div>
    </div>
  )
}

export default Footer
