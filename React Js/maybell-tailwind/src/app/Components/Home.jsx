"use client";
import React, { useEffect, useState } from 'react'
import Banner from './Banner'
import HomeProductSection from './HomeProductSection'
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Home() {

    const [newArrivals, setNewArrivals] = useState([]);
    const [newRecommendations, setRecommendations] = useState([]);

   useEffect(() => {
     axios.get('https://wscubetech.co/ecommerce-api/products.php',{
        params : {
          categories : 'furniture',
          limit : 4
        }
    })
    .then((result) => {
      setNewArrivals(result.data.data)
    })
    .catch(() => {
        toast.error('Something went wrong !');
    })
   },[]);

   useEffect(() => {
     axios.get('https://wscubetech.co/ecommerce-api/products.php',{
        params : {
          categories : 'laptops',
          limit : 4
        }
    })
    .then((result) => {
      setRecommendations(result.data.data)
    })
    .catch(() => {
        toast.error('Something went wrong !');
    })
   },[]);
    

  return (
    <>
      <Banner/>
      <HomeProductSection title="TOP NEW ARRIVAL" productData={newArrivals}/>
      <HomeProductSection title="RECOMMENDED FOR YOU" productData={newRecommendations}/>
    </>
  )
}
