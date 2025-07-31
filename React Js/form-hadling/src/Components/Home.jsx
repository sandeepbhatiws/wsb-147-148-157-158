import React, { useState } from 'react'
import stateData from '../data/states';
import UserForm from './UserForm';
import UserData from './UserData';

export default function Home() {

    const getData = localStorage.getItem('user_info');
    const users = JSON.parse(getData);

    let [states, setStates] = useState([]);
    let [userInfo, setUserInfo] = useState(users ?? []);
    let [singleUser, setSingleUser] = useState({
      id: -1,
      name : '',
      email : '',
      mobile_number : '',
      country_name : '',
      state_name : ''
    });


  return (
    <>
        <UserForm states={states} setStates={setStates} userInfo={userInfo} setUserInfo={setUserInfo} singleUser={singleUser} setSingleUser={setSingleUser}/>

        <UserData userInfo={userInfo} setUserInfo={setUserInfo} singleUser={singleUser} setSingleUser={setSingleUser}/>
    </>
  )
}
