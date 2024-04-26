import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google'
import { GoogleOAuthProvider } from '@react-oauth/google'
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username:name, email, password })
            });
            const data = await response.json();
            console.log("Data received:", data);
            // window.location = '/Body';
            navigate("/body");
        } catch (error) {
            console.error("Error:", error);
        }
    }

    return (
        <div className='flex justify-center items-center h-screen bg-gradient-to-b from-white via-pink-300 to-blue-400'>
            <div className='flex flex-col items-center font-title'>
                <div className='flex flex-col items-center p-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg'>
                    <h1 className='text-violet-900 font-semibold'>Create Account</h1>
                    <div className='py-2'>
                        <input type="text" placeholder='Username' className='rounded-lg p-1 bg-slate-100' value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className='pb-2'>
                        <input type="text" placeholder='Email' className='rounded-lg p-1 bg-slate-100' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='pb-2'>
                        <input type="password" placeholder='Password' className='rounded-lg p-1 bg-slate-100' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className='flex flex-col items-center font-semibold'>
                        <button className='bg-yellow-400 p-1 mt-2 rounded-lg text-violet-900 font-semibold' type='submit' onClick={handleSignup}>Sign Up</button>
                        <h1>or</h1>
                    </div>
                    <div>
                    <GoogleOAuthProvider clientId='452990621506-l4ipanq3p9cn95hhnbnno10d88l5iisn.apps.googleusercontent.com'>
                    <GoogleLogin onSuccess={(CredentialResponse)=> {
                        const decode = jwtDecode(CredentialResponse?.credential);
                        console.log(decode)
                        window.location = '/Body';
                    }
                    } 
                        onError={()=>{
                            console.log("loginfailed");
                        }} 
                        ></GoogleLogin> 
                        </GoogleOAuthProvider>
                    </div>
                    <div className='flex mt-1 text-violet-900 font-title font-semibold'>
                        <h1>Already Have an Account?</h1>
                        <Link to="/login"><h1 className='text-yellow-400'>Login</h1></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
