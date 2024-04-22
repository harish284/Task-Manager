import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            if (response.ok) {
                const res = await response.json(); 
                localStorage.setItem('token', res.accessToken); 
                window.location = '/Body'; 
            } else {
                setError('Invalid email or password'); 
            }
        } catch (error) {
            console.error("Error:", error);
            setError('Something went wrong. Please try again.'); 
        }
    }

    return (
        <div className='flex  justify-center items-center h-screen bg-gradient-to-b from-white via-pink-300 to-blue-400'>
            <div className='flex flex-col items-center mb-4 p-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg font-title'>
                <div className='rounded-lg flex flex-col items-center'>
                    <h1 className='text-violet-900 font-semibold'>Welcome Back!!!</h1>
                    <form onSubmit={handleLogin} className='flex flex-col'>
                        <input type="text" placeholder='Enter your email' className='rounded-lg p-1 bg-slate-100 mb-4' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" placeholder='Enter Password' className='rounded-lg p-1 bg-slate-100' value={password} onChange={(e) => setPassword(e.target.value)} />
                        <div className='flex justify-between text-xs items-center m-2'>
                            <div>
                                <input type="checkbox" />
                                <label>Remember me</label>
                            </div>
                            <div className='m-2'>
                                <h1>Forgot Password</h1>
                            </div>
                        </div>
                        <div className='flex flex-col items-center font-semibold'>
                            <button type='submit' className='bg-yellow-400 text-violet-900 rounded-lg p-1'>Login</button>
                        </div>
                    </form>
                    <div className='flex mt-4 text-violet-900 font-title font-semibold'>
                        <h1>Don't Have an Account?</h1>
                        <Link to="/SignUp"><h1 className='text-yellow-400'>Sign up</h1></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
