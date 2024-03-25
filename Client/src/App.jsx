import React,{useState, useEffect} from 'react'
import { Outlet } from 'react-router-dom'
import Home from './Components/Home'
import {Route, Routes,Navigate} from 'react-router-dom'


const App = () => {
  const user = localStorage.getItem('token')
 
  return (
    <> 
      <Home /> 
      <Outlet />  
    </>
  )
}
export default App