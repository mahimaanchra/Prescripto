import React from 'react'
import Header from '../components/Header'
import NavBar from '../components/NavBar'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'

const Home = () => {
  return (
    <div>
      <NavBar/>
      <Header/>
      <SpecialityMenu/>
      <TopDoctors/>
    </div>
  )
}

export default Home
