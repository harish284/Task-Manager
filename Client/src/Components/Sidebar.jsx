import React from 'react'
import Materialicon from 'material-icons-react'
import {useState, useEffect} from 'react'

const Sidebar = () => {

    const[list,setlist] = useState([])
    const[update,setupdate] = useState(true)

    //GET
    useEffect(() => {
        fetch('http://localhost:3000/taskmanager-get')
        .then(res => res.json())
        .then(data => setlist(data))
    },[update])

    //ADD
    const add = () => {
        fetch('http://localhost:3000/taskmanager-create',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                title:title,
                description:description,
                duedate:duedate,
                category:category 
            })
        }).then(res => res.json())
        .then(data => {
            setupdate((prev) => !prev)
            console.log(data);
        })
    }

    


  return (
    <div className='w-[600px] h-screen bg-slate-200 rounded-r-lg flex flex-col items-center font-title'>
        <div className='text-4xl p-4 mt-8'>
            <h1>Add Task</h1>
        </div>
    <div className='flex flex-col gap-8 text-2xl'>
        <div>
            <h1>Title</h1>
            <input type="text" placeholder='Enter your Task' className='p-1 text-xl rounded-lg'/>
        </div>
        <div>
            <h1>Description</h1>
            <textarea name="Description" placeholder='Enter your description' id="" cols="23" rows="3" className='text-xl rounded-lg w-full'></textarea>
        </div>
        <div>
            <h1>Date</h1>
            <input type="date" className='text-xl p-1 rounded-lg'/>
        </div>
        <div>
            <h1>Category</h1>
            <select name="High" id="" className='text-xl p-1 rounded-lg'>
                <option value="">All</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </select>
        </div>
        <div className='flex justify-center items-center'>
            <button className='bg-yellow-500 p-1 rounded-3xl' onChange={add}>Add Task</button>
            <span><Materialicon icon="add new" colo="black" size={24}></Materialicon></span>
        </div>
        </div>
    </div>
  )
}

export default Sidebar