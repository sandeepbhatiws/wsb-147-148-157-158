import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLogin: true,
  isWishlist: false
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login: (state) => {
      state.isLogin = true;
      state.isWishlist = true;
    },
    register: (state) => {
      state.isLogin = true;
      state.isWishlist = true;
    },
    logout: (state) => {
      state.isLogin = false;
      state.isWishlist = false;
    },
  },
})

// Action creators are generated for each case reducer function
export const { login, register, logout } = loginSlice.actions

export default loginSlice.reducer