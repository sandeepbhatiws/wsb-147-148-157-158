import React, { useState } from 'react'
import stateData from '../data/states';
import UserForm from './UserForm';
import UserData from './UserData';

export default function Home() {

    const getData = localStorage.getItem('user_info');
    const users = JSON.parse(getData);

    let [states, setStates] = useState([]);
    let [userInfo, setUserInfo] = useState(users ?? []);


  return (
    <>
        <UserForm states={states} setStates={setStates} userInfo={userInfo} setUserInfo={setUserInfo}/>

        <UserData userInfo={userInfo} setUserInfo={setUserInfo}/>
    </>
  )
}
