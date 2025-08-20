"use client";
import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie';
import { useState } from 'react';

var userData = Cookies.get("user");
var userData = userData;

const initialState = {
  user: userData ?? '',
  token: Cookies.get("token") ?? '',
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    userDetails: (state,{payload}) => {
      state.user= payload.user
      Cookies.set("user", JSON.stringify(payload.user));

      state.token= payload.token
      Cookies.set("token", payload.token);
    },
    logOut: (state) => {
      console.log('Hello');
      state.user= ''
      Cookies.remove('user');

      state.token= ''
      Cookies.remove('token');
    },
   
  },
})

// Action creators are generated for each case reducer function
export const { userDetails, logOut} = loginSlice.actions

export default loginSlice.reducer