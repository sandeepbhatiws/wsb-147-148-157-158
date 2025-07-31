import React, { useState } from 'react'

export default function ShowHidePassword() {

    // let [showPassword, setShowPassword] = useState('password');

    // let passwordType = () => {
    //     if(showPassword == 'password'){
    //         setShowPassword('text');
    //     } else {
    //         setShowPassword('password');
    //     }
    // }


    let [showPassword, setShowPassword] = useState(0);

    let passwordType = () => {
        setShowPassword(!showPassword);
    }

  return (
    // <div>
    //   <input type={ (showPassword == 'password') ? 'password' : 'text' }/>
    //   <button  onClick={passwordType}>{ (showPassword == 'password') ? 'Show' : 'Hide' }</button>
    // </div>

    <div>
      <input type={ (showPassword == 0) ? 'password' : 'text' }/>
      <button  onClick={passwordType}>{ (showPassword == 0) ? 'Show' : 'Hide' }</button>
    </div>
  )
}
