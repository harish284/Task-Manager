import React from 'react'
import { Outlet } from 'react-router-dom'
import Home from './Components/Home'


const App = () => {
 
  return (
    <> 
      <Home /> 
      <Outlet />  
    </>
  )
}
export default App