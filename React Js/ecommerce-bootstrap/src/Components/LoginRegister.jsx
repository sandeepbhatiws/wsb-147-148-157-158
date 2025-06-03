import React, { useContext, useEffect, useState } from 'react'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "firebase/auth";
import app from '../config/firebase';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ComoonContext } from '../ContextAPI/Context';

export default function LoginRegister() {

    const [registerLoading, setRegisterLoading] = useState('Register');
    const [loginLoading, setLoginLoading] = useState('Login');

    const navigate = useNavigate();

    const { isLogin, setIsLogin } = useContext(ComoonContext);

    useEffect(() => {
        if(isLogin){
            navigate('/');
        }
    },[])
    


    const register = (event) => {
        event.preventDefault();
        setRegisterLoading('Loading...')
        
        var email = event.target.email.value;
        var password = event.target.password.value;

        const auth = getAuth(app);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                console.log(user);
                localStorage.setItem('user_uid', user.uid)
                setIsLogin(user.uid)
                // ...
                toast.success('Account Register Successfully !!')
                setRegisterLoading('Register')
                navigate('/')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setRegisterLoading('Register')
                // ..
                toast.error(errorMessage)
            });
    }

    const login = (event) => {
        event.preventDefault();
        setLoginLoading('Loading...')
        
        var email = event.target.email.value;
        var password = event.target.password.value;

        const auth = getAuth(app);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                console.log(user);
                localStorage.setItem('user_uid', user.uid)
                setIsLogin(user.uid)
                // ...
                toast.success('Login Successfully !!')
                setLoginLoading('Login')
                navigate('/')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setLoginLoading('Login')
                // ..
                toast.error(errorMessage)
            });
    }
    return (
        <>
            <div className='container-fluid py-5'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-6'>
                            <div>
                                <h2>Login</h2>
                            </div>
                            <div className='border p-3 rounded-3'>
                                <form onSubmit={login}>
                                    <div class="mb-3">
                                        <label for="exampleInputEmail1" class="form-label">Email Address</label>
                                        <input type="email" class="form-control" id="exampleInputEmail1" name='email' aria-describedby="emailHelp" />
                                    </div>
                                    <div class="mb-3">
                                        <label for="exampleInputPassword1" class="form-label">Password</label>
                                        <input type="password" name='password' class="form-control" id="exampleInputPassword1" />
                                    </div>
                                    <button type="submit" class="btn btn-primary">{loginLoading}</button>
                                </form>
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div>
                                <h2>Register</h2>
                            </div>
                            <div className='border p-3 rounded-3'>
                                <form onSubmit={register}>
                                    <div class="mb-3">
                                        <label for="exampleInputEmail1" class="form-label">Email Address</label>
                                        <input type="email" class="form-control" id="exampleInputEmail1" name='email' aria-describedby="emailHelp" />
                                    </div>
                                    <div class="mb-3">
                                        <label for="exampleInputPassword1" class="form-label">Password</label>
                                        <input type="password" name='password' class="form-control" id="exampleInputPassword1" />
                                    </div>
                                    <button type="submit" class="btn btn-primary">{registerLoading}</button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
