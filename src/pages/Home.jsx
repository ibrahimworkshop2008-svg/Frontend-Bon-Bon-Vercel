import React from 'react'
import Navbar from '../componets/Navbar'
import Hero from '../componets/Hero'
import FlavorSection from '../componets/FlavourSection'
import DonutBox from '../componets/DonutBox'
import OurStory from '../componets/OurStory'
import GiftsFlowers from '../componets/GiftsFlowers'
import DeliveryPayment from '../componets/DeliveryPayment'

const Home = () => {
  return (
    <div>
        <Hero />
        <FlavorSection />
        <DonutBox />
        <OurStory />
        <GiftsFlowers />
        <DeliveryPayment />

    </div>
  )
}

export default Home