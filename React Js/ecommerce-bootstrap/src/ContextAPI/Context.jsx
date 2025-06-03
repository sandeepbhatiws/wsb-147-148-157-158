import React, { createContext, useState } from 'react'

const ComoonContext = createContext();

export default function Context({children}) {

    var cartData = localStorage.getItem('cartItems');
    var cartData = JSON.parse(cartData);

    var wishlistData = localStorage.getItem('wishlistItems');
    var wishlistData = JSON.parse(wishlistData);

    const [cartItems, setCartItems] = useState(cartData ? cartData : []);
    const [wishlistItems, setWishlistItems] = useState(wishlistData ?? []);

    const userLogin = localStorage.getItem('user_uid');

    const [isLogin, setIsLogin] = useState(userLogin);

    const data = {cartItems, setCartItems, wishlistItems, setWishlistItems, isLogin, setIsLogin}

  return (
    <>
        <ComoonContext.Provider value={data}>
            {children}
        </ComoonContext.Provider>
    </>
  )
}

export { ComoonContext }