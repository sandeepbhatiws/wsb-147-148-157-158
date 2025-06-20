import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';

var cartData = JSON.parse(localStorage.getItem('cartItems'));

const initialState = {
  cartItems: cartData ? cartData : [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {

      var checkCart = state.cartItems.filter((v) => {
        if (v.id == action.payload.id) {
          return v;
        }
      })

      if (checkCart.length == 0) {
        const data = {
            id : action.payload.id,
            name : action.payload.name,
            image : action.payload.image,
            price : action.payload.price,
            quantity : 1
        }

        const newData = [data, ...state.cartItems];
        state.cartItems = newData;
        localStorage.setItem('cartItems', JSON.stringify(newData));
        toast.success('Add to Cart succussfully')
      } else {
        var newData = state.cartItems.map((v) => {
          if (v.id == action.payload.id) {

            if(v.quantity < 5){
              v.quantity++;
              toast.success('Update Cart succussfully')
              return v;
            } else {
              toast.error('Maximum quantity reached!')
              return v;
            }
            
          } else {
            return v;
          }
        })

        console.log(newData);

        var newData = [...newData];
        state.cartItems = newData;
        localStorage.setItem('cartItems', JSON.stringify(newData));
        

      } 
    },
    updateCart: (state, action) => {
        if(action.payload.type == 'minus'){
          var newData = state.cartItems.map((v) => {
            if (v.id == action.payload.id) {

              if(v.quantity > 1){
                v.quantity--;
                toast.success('Update Cart succussfully')
                return v;
              } else {
                toast.error('Minimum quantity reached!')
                return v;
              }
              
            } else {
              return v;
            }
          })

          var newData = [...newData];
          state.cartItems = newData;
          localStorage.setItem('cartItems', JSON.stringify(newData));
        } else {
          var newData = state.cartItems.map((v) => {
            if (v.id == action.payload.id) {

              if(v.quantity < 5){
                v.quantity++;
                toast.success('Update Cart succussfully')
                return v;
              } else {
                toast.error('Maximum quantity reached!')
                return v;
              }
              
            } else {
              return v;
            }
          })

          var newData = [...newData];
          state.cartItems = newData;
          localStorage.setItem('cartItems', JSON.stringify(newData));
        }
    },
    deleteCart: (state, action) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToCart, updateCart, deleteCart } = cartSlice.actions

export default cartSlice.reducer