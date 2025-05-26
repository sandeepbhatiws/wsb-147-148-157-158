import React from 'react'
import Header from './Coomon/Header'
import Footer from './Coomon/Footer'
import { Outlet } from 'react-router-dom'

export default function RootLayout() {
  return (
    <>
        <Header/>

        <Outlet/>

        <Footer/>
    </>
  )
}
