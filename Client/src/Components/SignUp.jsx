import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill all the fields.");
      return;
    }

    axios
      .post(`${import.meta.env.VITE_SERVER_URL}/signup`, { name, email, password })
      .then((result) => {
        if (result.data.message === "Email already exists") {
          window.alert("Email already exists. Please use another email.");
        } else if (result.data.message === "Username already exists") {
          window.alert("Username already exists. Please use another username.");
        } else if (result.data.message === "User created successfully") {
          sessionStorage.setItem("userId", result.data.userId);
          console.log(result.data);
          navigate("/body", { state: { userId: result.data.userId } });
        }
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          window.alert(error.response.data.message);
        } else {
          window.alert("Something went wrong. Please try again later.");
        }
      });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#080D18]">
      <div className="w-full max-w-md p-6 bg-slate-600 rounded-lg shadow-lg">
        <h1 className="text-2xl text-white font-bold text-center mb-6">Create Account</h1>
        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full rounded-lg p-3 bg-slate-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Email"
            className="w-full rounded-lg p-3 bg-slate-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-lg p-3 bg-slate-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="w-full bg-yellow-400 text-violet-900 font-semibold rounded-lg p-3 mt-4 transition-colors duration-300 hover:bg-yellow-500"
            type="submit"
          >
            Sign Up
          </button>
        </form>
        <div className="text-center mt-4 text-white font-semibold">or</div>
        <div className="flex justify-center mt-4">
          <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <GoogleLogin
              onSuccess={(CredentialResponse) => {
                const decode = jwtDecode(CredentialResponse?.credential);
                console.log(decode);
                console.log("Login success");
                navigate("/body");
              }}
              onError={() => {
                console.log("Login failed");
              }}
            />
          </GoogleOAuthProvider>
        </div>
        <div className="flex justify-center items-center mt-6 text-white font-semibold">
          <span className="mr-2">Already have an account?</span>
          <Link to="/login" className="text-yellow-400 hover:underline">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;