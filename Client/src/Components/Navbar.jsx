import React from 'react'
import Materialicon from 'material-icons-react'
import logo from '../assets/images/LOGO.png'

const Navbar = () => {
  return (
    <div className='flex justify-between items-center p-4 bg-slate-200 rounded-lg text-xl font-title shadow-lg'>
        <div>
          <img src={logo} alt="" className='w-20 h-16'/>
        </div>
        <div className='flex gap-2 font-bold font-title text-3xl ml-8'>
            <h1 className='text-yellow-500'>TASK</h1> 
            <span><h1 className='text-violet-900'>MANAGER</h1></span>
        </div>
        <div className='flex relative items-center gap-4'>
          <input type="text" placeholder='quick find' className='p-2 rounded-lg w-[150px]' />
          <Materialicon icon="search" color='black' size={24}  />
          <Materialicon icon="add" color='black' size={24} />
          <Materialicon icon="notifications" color='black' size={24} />
          <Materialicon icon="person" color='black' size={24} />
        </div>
    </div>
  )
}

export default Navbar