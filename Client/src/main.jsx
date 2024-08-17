import React from 'react'
import ReactDom from 'react-dom/client'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import SignUp from './Components/SignUp'
import Login from './Components/Login'
import Body from './Components/Body'
import Home from './Components/Home'
import './index.css'


const router = createBrowserRouter(
  [
    {
      path:"/",
      element : <App />,
    },
    {
      path : "signup",
      element : <SignUp />
    },
    {
      path : "login",
      element : <Login />
    },
    {
      path : "body",
      element : <Body />
    },
    {
      path : "home",
      element : <Home />
    },
  ]
)
ReactDom.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}>
    <App />
  </RouterProvider>
)

