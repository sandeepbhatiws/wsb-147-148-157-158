"use client"
import React, { useState } from 'react'
import "./login-register.css"
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { userDetails } from '../Redux Toolkit/loginSlice';

export default function page() {

    const [registerFormStatus, setRegisterFormStatus] = useState(false);
    const [loginFormStatus, setLoginFormStatus] = useState(false);

    const router = useRouter();
    const dispatch = useDispatch();

    const registerUser = (event) => {
        event.preventDefault();
        setRegisterFormStatus(true);

        axios.post('http://localhost:8001/api/website/users/register', event.target)
        .then((result) => {
            if(result.data._status == true){
                toast.success(result.data._message);
                setRegisterFormStatus(false);
                dispatch(userDetails({
                    user : result.data._data,
                    token : result.data._token
                }))
                Cookies.set('token', result.data._token);
                router.push('/my-dashboard');
            } else {
                toast.error(result.data._message);
                setRegisterFormStatus(false);
            }
        })
        .catch(() => {
            toast.error('Something went wrong !');
            setRegisterFormStatus(false);
        })
    }

    const loginUser = (event) => {
        event.preventDefault();
        setLoginFormStatus(true);

        axios.post('http://localhost:8001/api/website/users/login', event.target)
        .then((result) => {
            if(result.data._status == true){
                toast.success(result.data._message);
                setLoginFormStatus(false);
                dispatch(userDetails({
                    user : result.data._data,
                    token : result.data._token
                }))
                Cookies.set('token', result.data._token);
                router.push('/my-dashboard');
            } else {
                toast.error(result.data._message);
                setLoginFormStatus(false);
            }
        })
        .catch(() => {
            toast.error('Something went wrong !');
            setLoginFormStatus(false);
        })
    }


  return (
    <div>
    
    <div className="breadcrumbs_area">
        <div className="container">   
            <div className="row">
                <div className="col-12">
                    <div className="breadcrumb_content">
                        <h3>My account</h3>
                        <ul>
                            <li><a href="index.html">home</a></li>
                            <li> {">"}</li>
                            <li>My account</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>         
    </div>

    <div className="customer_login">
        <div className="container">
            <div className="row">
               
                <div className="col-lg-6 col-md-6">
                    <div className="account_form">
                        <h2>login</h2>
                        <form onSubmit={ loginUser }>
                            <p>   
                                <label>Username or email <span>*</span></label>
                                <input type="text" name='email'/>
                             </p>
                             <p>   
                                <label>Passwords <span>*</span></label>
                                <input type="password" name='password'/>
                             </p>   
                            <div className="login_submit">
                               <a href="#">Lost your password?</a>
                                <label htmlFor="remember">
                                    <input id="remember" type="checkbox"/>
                                    Remember me
                                </label>
                                <button type="submit" disabled={ loginFormStatus ? 'disabled' : '' }>
                                    {
                                        loginFormStatus
                                        ?
                                        'Loading....'
                                        :
                                        'Login'
                                    }
                                </button>
                                
                            </div>

                        </form>
                     </div>    
                </div>
                
                <div className="col-lg-6 col-md-6">
                    <div className="account_form register">
                        <h2>Register</h2>
                        <form onSubmit={ registerUser } autoCapitalize='off'>
                            <p>   
                                <label>Name  <span>*</span></label>
                                <input type="text" name='name'/>
                             </p>
                            <p>   
                                <label>Email address  <span>*</span></label>
                                <input type="text" name='email'/>
                             </p>

                            <p>   
                                <label>Mobile Number <span>*</span></label>
                                <input type="text" name='mobile_number'/>
                             </p>

                             <p>   
                                <label>Passwords <span>*</span></label>
                                <input type="password" name='password'/>
                             </p>
                            <div className="login_submit">
                                <button type="submit" disabled={ registerFormStatus ? 'disabled' : '' }>
                                    {
                                        registerFormStatus
                                        ?
                                        'Loading....'
                                        :
                                        'Register'
                                    }
                                    </button>
                            </div>
                        </form>
                    </div>    
                </div>
                
            </div>
        </div>    
    </div>
    
    </div>
  )
}
