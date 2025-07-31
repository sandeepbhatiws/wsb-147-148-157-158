import React, { useEffect, useState } from 'react'
import Header from './Coomon/Header'
import axios from 'axios';
import { toast } from 'react-toastify';
import ProductCard from './ProductCard';
import PlaceHolder from './PlaceHolder';

export default function Home() {

  const [bestSelling, setBestSelling] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://wscubetech.co/ecommerce-api/products.php', {
      params :{
        limit : 8,
        categories: 'mens-shirts,mens-shoes'
      }
    })
    .then((result) => {
      setBestSelling(result.data.data)
      setLoading(false)
    })
    .catch(() => {
      toast.error('Something went wrong !!');
    })
  },[])

  useEffect(() => {
    axios.get('https://wscubetech.co/ecommerce-api/products.php', {
      params :{
        limit : 8,
        categories : 'furniture,home-decoration'
      }
    })
    .then((result) => {
      setTopRated(result.data.data)
    })
    .catch(() => {
      toast.error('Something went wrong !!');
    })
  },[])

  return (
    <>

          <div className='container-fluid'>
        <div className='container'>
          <div className='row text-center p-3'>
            <h1>Best Sellings</h1>
          </div>

          <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {/* <!-- Product 1 --> */}

            {
              loading 
              ?
                <>
                  <PlaceHolder/>
                  <PlaceHolder/>
                  <PlaceHolder/>
                  <PlaceHolder/>
                </>
              :
                bestSelling.map((v, i) => {
                  return (
                    <ProductCard key={i} data={v} />
                  )
                })
            }


          </div>

        </div>
      </div>
      

      {
        topRated.length > 0
        ?
          <div className='container-fluid'>
        <div className='container'>
          <div className='row text-center p-3'>
            <h1>Top Rated</h1>
          </div>

          <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {/* <!-- Product 1 --> */}

            {
              topRated.map((v, i) => {
                return (
                  <ProductCard key={i} data={v} />
                )
              })
            }


          </div>

        </div>
      </div>
        :

        ''
      }
    </>
  )
}
