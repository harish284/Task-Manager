import React from 'react'
import Materialicon from 'material-icons-react'

const Navbar = () => {
  return (
    <div className='flex justify-between items-center p-4 bg-slate-200 rounded-lg text-xl font-title shadow-lg'>
        <div>
          <h1>LOGO</h1>
        </div>
        <div className='flex relative items-center'>
          <input type="text" placeholder='quick find' className='p-2 rounded-lg' />
          <Materialicon icon="search" color='black' size={24}  />
        </div>
        <div className='flex gap-4'>
          <Materialicon icon="add" color='black' size={24} />
          <Materialicon icon="notifications" color='black' size={24} />
          <Materialicon icon="person" color='black' size={24} />
        </div>
    </div>
  )
}

export default Navbar