import React from 'react'
import Navbar from './Components/Navbar'
import Sidebar from './Components/Sidebar'
import Body from './Components/Body'

const App = () => {
  return (
    <div>
      <Navbar />
      <div className='flex'>
      <Sidebar />
      <Body />
      </div>
    </div>
  )
}

export default App