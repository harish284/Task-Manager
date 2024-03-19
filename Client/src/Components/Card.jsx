import React,{useState} from 'react'
import Materialicon from 'material-icons-react'

const Card = (props) => {
    const {id,setupdate,update} = props
    const[deletecount,setdeletecount] = useState(0)
   

    const Delete=(e)=>{
        console.log(id);
        handledone(id);
    };


    const handledone = (id) => {
        fetch(`https://task-manager-1imi.onrender.com/taskmanager-delete/${id}`,{
            method:'DELETE',
        }).then(res => res.json())
        .then(data => {
            props.setupdate((prev) => !prev)
           setdeletecount(data.count);  
            console.log(deletecount);
            console.log(data);
            console.log(error);
    })
    }


  return (
    
    <div className='w-full bg-slate-300 my-6'>
         <div className={`flex justify-between p-6 font-title rounded-lg font-semibold ${props.category === 'High' ? 'bg-red-600  text-yellow-400'  : 'bg-green-600 text-violet-900'}`}>
                <div>
                    <div>
                        <h1 className=''>{props.title}</h1>
                    </div>
                    <div>
                        <h1>{props.description}</h1>
                    </div>
                    <div>
                        <h1>{props.duedate}</h1>
                    </div>
                </div>
                <div className='flex items-center'>
                   <button onClick={Delete}> <Materialicon icon="done" color="green" size={24}></Materialicon></button>
                </div>
            </div>
    </div>
  )
}

export default Card