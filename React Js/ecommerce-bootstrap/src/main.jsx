import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import './assets/css/style.css'

import ProductListing from './Components/ProductListing'

createRoot(document.getElementById('root')).render(
    <ProductListing/>
)
