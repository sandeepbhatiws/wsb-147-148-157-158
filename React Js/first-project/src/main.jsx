import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/css/style.css';
import Home from './Home'
import Counter from './Counter';
import ShowHidePassword from './ShowHidePassword';



createRoot(document.getElementById('root')).render(
  <StrictMode>
      <ShowHidePassword/>
      <Counter/>
    {/* <Home/>      */}
     {/* Open Tag */}


    {/* Closed Tag */}
    {/* <Home></Home>     */}
  </StrictMode>,
)
