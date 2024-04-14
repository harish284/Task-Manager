import React,{useState} from 'react'
import Materialicon from 'material-icons-react'

const Card = (props) => {
    const {id,setupdate,update} = props
    const[deletecount,setdeletecount] = useState(0)
    
    //DELETE REQUEST
    const Delete=(e)=>{
        console.log(id);
        handledone(id);
        setdeletecount(deletecount+1);
        console.log(deletecount);
    };

    const handledone = (id) => {
        fetch(`https://task-manager-1imi.onrender.com/taskmanager-delete/${id}`,{
            method:'DELETE',
        }).then(res => {
            if(res.ok){
                console.log('Task Deleted');
                setdeletecount(prevCount => prevCount+1);
                console.log(deletecount);
                setupdate(prev => !prev);
        }else{
            throw new Error('Something went wrong');
        }
    })
    }


  return (
    
    <div className='w-full bg-slate-300 my-6'>
         <div className={`flex justify-between p-6 font-title rounded-lg ${props.category === 'High' ? 'bg-red-600  text-' : 'bg-green-600 text-white'}`}>
                <div>
                    <div>
                        <h1 className='font-semibold'>{props.title}</h1>
                    </div>
                    <div>
                        <h1 className='font-regular'>{props.description}</h1>
                    </div>
                    <div>
                        <h1>{props.duedate}</h1>
                    </div>
                </div>
                <div className='flex items-center font-bold'>
                   <button onClick={Delete}> <Materialicon icon="done" color="white" size={36}></Materialicon></button>
                </div>
            </div>
    </div>
  )
}

export default Card