import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import './assets/css/style.css'

import ProductListing from './Components/ProductListing'
import Home from './Components/Home';
import AboutUs from './Components/AboutUs';
import RootLayout from './Components/RootLayout';
import ProductDetail from './Components/ProductDetail';
import ViewCart from './Components/ViewCart';
import LoginRegister from './Components/LoginRegister';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Routes>
            
            <Route element={<RootLayout/>}>
                <Route path='/' element={<Home/>} />
                <Route path='/about-us' element={<AboutUs/>}/>
                <Route path='/product-listings/:slug?/:sub_slug?' element={<ProductListing/>}/>
                <Route path='/product-details/:id' element={<ProductDetail/>}/>
                <Route path='/view-carts' element={<ViewCart/>}/>

                <Route path='/login-register' element={<LoginRegister/>}/>
            </Route>


            <Route path='admin-panel'>
                <Route path='category'>
                    <Route path='add' element={<AboutUs/>}/>
                    <Route path='view' element={<AboutUs/>}/>
                    <Route path='update' element={<AboutUs/>}/>
                </Route>
                
                <Route path='product/add' element={<AboutUs/>}/>
                <Route path='product/view' element={<AboutUs/>}/>
                <Route path='product/update' element={<AboutUs/>}/>
            </Route>


            

        </Routes>
    </BrowserRouter>
)
