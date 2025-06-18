import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cartItems: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
        
        const data = {
            id : action.payload.id,
            name : action.payload.name
        }

        const newData = [data, ...state.cartItems];
        state.cartItems = newData;

    },
    updateCart: (state, action) => {
      state.value += action.payload
    },
    deleteCart: (state, action) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToCart, updateCart, deleteCart } = cartSlice.actions

export default cartSlice.reducer