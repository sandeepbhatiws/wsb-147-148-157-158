"use client";
import React, { useState } from 'react'
import Banner from './Banner'
import HomeProductSection from './HomeProductSection'

export default function Home() {

    const [newArrivals, setNewArrivals] = useState([1,1,1,1]);
    const [newRecommendations, setRecommendations] = useState([1,1,1,1,1,1,1,1]);

  return (
    <>
      <Banner/>
      <HomeProductSection title="TOP NEW ARRIVAL" productData={newArrivals}/>
      <HomeProductSection title="RECOMMENDED FOR YOU" productData={newRecommendations}/>
    </>
  )
}
