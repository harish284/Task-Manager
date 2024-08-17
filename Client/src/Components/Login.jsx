import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/login`, { email, password });
            const userdata = response.data;
            if (userdata && userdata.id) {
                sessionStorage.setItem('userId', userdata.id);
                navigate('/body');
            } else {
                window.alert("Invalid username or password");
            }
        } catch (error) {
            window.alert("Error occurred during login. Please try again");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-[#080D18]">
            <div className="w-full max-w-md p-6 bg-slate-500 rounded-lg shadow-lg">
                <h1 className="text-2xl text-white font-bold text-center mb-6">Welcome Back!!!</h1>
                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Enter your email"
                        className="w-full rounded-lg p-3 bg-slate-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Enter Password"
                        className="w-full rounded-lg p-3 bg-slate-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="flex justify-between items-center text-xs text-white">
                        <div className="flex items-center">
                            <input type="checkbox" id="remember-me" className="mr-2" />
                            <label htmlFor="remember-me">Remember me</label>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-yellow-400 text-violet-900 font-semibold rounded-lg p-3 mt-4 transition-colors duration-300 hover:bg-yellow-500"
                    >
                        Login
                    </button>
                </form>
                <div className="flex justify-center items-center mt-6 text-violet-900 font-semibold">
                    <span className="mr-2 text-white" >Don't have an account?</span>
                    <Link to="/SignUp" className="text-yellow-400 hover:underline">Sign up</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
