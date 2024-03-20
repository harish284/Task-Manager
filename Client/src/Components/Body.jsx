import React,{useEffect,useState} from 'react'
import Materialicon from 'material-icons-react'
import Card from './Card'

const Body = (props) => {
    
    const [list, setList] = useState([])
    const [count, setCount] = useState(0)

    useEffect(() => {
        fetch('https://task-manager-1imi.onrender.com/taskmanager-get')
        .then(res => res.json())
        .then(data => {
            const sortedtask = data.sort((a,b) => new Date(a.duedate) - new Date(b.duedate))
            setList(sortedtask)
            setCount(data.length)
            })
    },[props.update])


  return (
    <div className='w-full bg-slate-300 flex flex-col'>  
        <h1 className='flex justify-center items-center mt-8 text-2xl font-title text-black'>My  Statistics</h1>
            <div className='flex justify-around'>
                <div className='w-[220px] h-[180px] bg-violet-400 rounded-2xl mt-8'>
                    <div className='flex flex-col justify-center items-center text-2xl font-title mt-4 text-white font-semibold'>
                        <div className='flex flex-col items-center justify-center '>
                            <Materialicon icon="folder" color="red-300" size={48}></Materialicon>
                            <h1>Task</h1>
                        </div>
                            <h1>Assigned</h1>
                            <h1>{count}</h1>
                    </div>
                </div>

            <div className='w-[220px] h-[180px] bg-orange-300 rounded-2xl mt-8'>
                <div className='flex flex-col justify-center items-center text-2xl font-title mt-4 text-green-700 font-semibold'>
                    <div className='flex flex-col items-center justify-center '>
                        <Materialicon icon="task" color="red-30" size={48}></Materialicon>
                        <h1 >Task</h1>
                    </div>
                    <div className='flex flex-col items-center'>
                        <h1>Completed</h1>
                        <h1>{count}</h1>
                    </div>
                </div>
            </div>
        </div>
        <div className='flex flex-col items-center font-title'>          
                <h1 className='text-3xl font-title text-black mt-8 ml-8'>My Tasks</h1>
           <div className='flex justify-start gap-8 text-black text-xl mt-4'>
                <div>
                     <h1>In Progress</h1>
                 </div>
                 <div>
                     <button>Completed</button>
                 </div>
           </div>
        </div>
        <div>
        {list.map((task)=>(
        <Card keys={task.id} id={task._id} title={task.title} description={task.description} duedate={task.duedate} category={task.category} count={count} setupdate={props.setupdate} />
      ))}
        </div>
        </div>
 
  )
}

export default Body


// import React, { useEffect, useState } from 'react';
// import MaterialIcon from 'material-icons-react';
// import Card from './Card';

// const Body = (props) => {
//     const [list, setList] = useState([]);
//     const [section, setSection] = useState('In Progress');
//     const [count, setCount] = useState(0)

//     useEffect(() => {
//         fetch('https://task-manager-1imi.onrender.com/taskmanager-get')
//             .then(res => res.json())
//             .then(data => {
//                 setList(data);
//             });
//     }, [props.update]);

//     const filterTasksByStatus = (status) => {
//         return list.filter(task => task.status === status);
//     };

//     const handleSectionChange = (newSection) => {
//         setSection(newSection);
//     };

//     return (
//         <div className='w-full bg-slate-300 flex flex-col'>  
//             <h1 className='flex justify-center items-center mt-8 text-2xl font-title text-black'>My  Statistics</h1>
//             <div className='flex justify-around'>
//                 <div className='w-[220px] h-[180px] bg-violet-400 rounded-2xl mt-8'>
//                     <div className='flex flex-col justify-center items-center text-2xl font-title mt-4 text-white font-semibold'>
//                         <div className='flex flex-col items-center justify-center '>
//                             <MaterialIcon icon="folder" color="red-300" size={48} />
//                             <h1>Task</h1>
//                         </div>
//                         <h1>Assigned</h1>
//                         <h1>{list.length}</h1>
//                     </div>
//                 </div>

//                 <div className='w-[220px] h-[180px] bg-orange-300 rounded-2xl mt-8'>
//                     <div className='flex flex-col justify-center items-center text-2xl font-title mt-4 text-green-700 font-semibold'>
//                         <div className='flex flex-col items-center justify-center '>
//                             <MaterialIcon icon="task" color="red-30" size={48} />
//                             <h1>Task</h1>
//                         </div>
//                         <div className='flex flex-col items-center'>
//                             <h1>Completed</h1>
//                             <h1>{filterTasksByStatus('Completed').length}</h1>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div className='flex flex-col items-center font-title'>          
//                 <h1 className='text-3xl font-title text-black mt-8 ml-8'>My Tasks</h1>
//                 <div className='flex justify-start gap-8 text-black text-xl mt-4'>
//                     <div>
//                     <button onClick={() => handleSectionChange('In Progress')}>In Progress</button>
//                     </div>
//                     <div>
//                         <button onClick={() => handleSectionChange('Completed')}>Completed</button>
//                     </div>
//                 </div>
//             </div>
//             <div>
//                 {section === 'In Progress' && filterTasksByStatus('In Progress').map(task => (
//                     <Card
//                         key={task.id}
//                         id={task._id}
//                         title={task.title}
//                         description={task.description}
//                         duedate={task.duedate}
//                         category={task.category}
//                         setupdate={props.setupdate}
//                     />
//                 ))}
//                 {section === 'Completed' && filterTasksByStatus('Completed').map(task => (
//                     <Card
//                         key={task.id}
//                         id={task._id}
//                         title={task.title}
//                         description={task.description}
//                         duedate={task.duedate}
//                         category={task.category}
//                         setupdate={props.setupdate}
//                     />
//                 ))}
//             </div>
//             <div>
//      {list.map((task)=>(
//         <Card keys={task.id} id={task._id} title={task.title} description={task.description} duedate={task.duedate} category={task.category} count={count} setupdate={props.setupdate} />
//       ))}
//         </div>
//         </div>
//     );
// };

// export default Body;
