import React from 'react'
import { Outlet } from 'react-router-dom'
import Home from './Components/Home'
import SignUp from './Components/SignUp'


const App = () => {
 
  return ( 
    <> 
    <Home /> 
      <Outlet /> 
    </>
  )
}
export default App