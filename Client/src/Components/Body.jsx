import React,{useEffect,useState} from 'react'
import Materialicon from 'material-icons-react'
import Card from './Card'
import Navbody from './Navbody'
import axios from 'axios'

const Body = (props) => {
    const [task, setTasks] = useState([])
    const [list, setList] = useState([])
    const[count,setCount] = useState(0)
    const[update,setupdate] = useState(false)


    useEffect(() => {
        const userId = sessionStorage.getItem('userId');        
        fetch(`http://localhost:5000/taskmanagerget/${userId}`)
       .then(res => res.json())
       .then(data => {
           const sortedtask = data.sort((a,b) => new Date(a.duedate) - new Date(b.duedate))
           setList(sortedtask)
           setCount(data.length)
           })
   },[update])

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        const currentDate = new Date();

        if(selectedDate < currentDate.toISOString().split('T')[0]){
            alert('Please select a valid date');
            setduedate('');
        }else{
            setduedate(selectedDate);
        }
    }

    const[title,settitle] = useState('')
    const[description,setdescription] = useState('')
    const[duedate,setduedate] = useState('')
    const[category,setcategory] = useState('')

   
    const add = (e) => {
        e.preventDefault();
        if (!title || !duedate || !category) {
          window.alert('Please fill all the fields.');
          return;
        }
    
        const userId = sessionStorage.getItem('userId');
        const taskData = {
            title:title,
            description:description,
            duedate:duedate,
            category:category,
            userId: userId,
        };
        console.log(userId);
        console.log(taskData);
        axios.post("http://localhost:5000/taskmanagercreate", taskData)
          .then(response => {
            console.log(response.data);
           settitle('');
            setdescription('');
            setduedate('');
            setcategory('');
            setupdate((prev)=>!prev)
          })
          .catch(error => {
            console.error('Error adding task:', error);
          });
      };
    
  return (
    <div>
        <div>
            <Navbody />
        </div>
            <div className='flex'>
                <div className='w-[600px] h-screen bg-slate-200 rounded-r-lg flex flex-col items-center font-title'>
                    <div className='text-xl gap-2 flex font-semibold'>
                        <h1 className='text-violet-900 '>Add </h1>
                        <span><h1 className='text-yellow-500'> Task</h1></span>
                    </div>
                <div className='flex flex-col gap-4 text-xl'>
                     <div>
                        <h1>Title</h1>
                        <input type="text" placeholder='Enter your Task' className='p-1 text-xl rounded-lg' onChange={(e)=>settitle(e.target.value)}/>
                    </div>
                    <div>
                        <h1>Description</h1>
                        <textarea name="Description" placeholder='Enter your description' id="" cols="23" rows="3" className='text-xl rounded-lg w-full' onChange={(d)=>setdescription(d.target.value)}></textarea>
                    </div>
                    <div>
                        <h1>Date</h1>
                        <input type="date" className='text-xl p-1 rounded-lg' onChange={handleDateChange}/>
                    </div>
                    <div>
                        <h1>Category</h1>
                        <select name="High" id="" className='text-xl p-1 rounded-lg' onChange={(e) => setcategory(e.target.value)}>
                            <option value="">All</option>
                            <option value="High">High</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>
                    <div className='flex items-center'>
                        <div className='flex justify-center items-center'>
                            <button className='bg-yellow-500 p-1 rounded-3xl' onClick={add}>Add Task</button>
                        </div>
                    </div>
                </div>
        </div>

    {/* STATISTIS */}
    
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
                        <button>In Progress</button>
                    </div>
                    <div>
                        <button>Completed</button>
                    </div>
                </div>
        </div>
        
        </div>
        </div>
        <div>
            {list.map((task)=>(
            <Card keys={task.id} id={task._id} title={task.title} description={task.description} duedate={task.duedate} category={task.category} count={count} setupdate={setupdate} />
             ))}
        </div>
    </div>
 
  );
};

export default Body


