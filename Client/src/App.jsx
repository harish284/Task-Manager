import React,{useState, useEffect} from 'react'
import Navbar from './Components/Navbar'
import Sidebar from './Components/Sidebar'
import Body from './Components/Body'

const App = () => {
  
  
  const[update,setupdate] = useState(false)
 
  return (
    <div> 
      <Navbar />
      <div className='flex'>
      <Sidebar setupdate={setupdate} /> 
        <Body  update={update} setupdate={setupdate}/> 
      </div >
      </div>
  )
}

export default App