import React, { useContext, useEffect, useState } from 'react'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup  } from "firebase/auth";
import app from '../config/firebase';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ComoonContext } from '../ContextAPI/Context';
import { getDatabase, ref, set, onValue  } from "firebase/database";

export default function LoginRegister() {

    const [registerLoading, setRegisterLoading] = useState('Register');
    const [loginLoading, setLoginLoading] = useState('Login');
    const [googleLoading, setGoogleLoading] = useState('Login with Google');

    const navigate = useNavigate();

    const { isLogin, setIsLogin, cartItems, setCartItems } = useContext(ComoonContext);

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

                const db = getDatabase(app);
                const getUsercart = ref(db, 'user_carts/' + user.uid);
                onValue(getUsercart, (snapshot) => {
                    const data = snapshot.val();

                    console.log(data);
                    if(data){
                        localStorage.setItem('cartItems', JSON.stringify(data));
                    } else {
                        set(ref(db, 'user_carts/' + user.uid), cartItems);
                    }
                    
                });

                
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

    const googleLogin = () => {
        setGoogleLoading('Loading...');
        const provider = new GoogleAuthProvider();

        const auth = getAuth(app);
        signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;

            localStorage.setItem('user_uid', user.uid)
            setIsLogin(user.uid)
            toast.success('Login Successfully !!')
            setGoogleLoading('Login with Google')

            const db = getDatabase(app);
            set(ref(db, 'user_carts/' + user.uid), cartItems);
            navigate('/')

        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;

            setGoogleLoading('Login with Google')
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

                                    <button onClick={googleLogin} type="button" class="btn btn-primary ms-3">{googleLoading}</button>
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
