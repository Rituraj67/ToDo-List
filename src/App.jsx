import { useState,useEffect,useRef } from 'react'
import Navbar from './components/Navbar'
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';
import './App.css'


function App() {
  const [rander, setrander] = useState(false)
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showCompleted, setshowCompleted] = useState(true)
  useEffect(() => {
    let todoString=localStorage.getItem("todos")
    if(todoString){
      let todos= JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, []);
  

  const saveToLS= () => {
    localStorage.setItem("todos",JSON.stringify(todos))
  }
  
  const handleToggle=(e)=>{
    setshowCompleted(!showCompleted)
  }

  const handleEdit =(e,id)=>{
    let t= todos.filter(item=>item.id===id)
    setTodo(t[0].todo)
    let newtodo= todos.filter(item=>item.id!=id)
    setTodos(newtodo)
    saveToLS()
  }

 const handleDelete=(e,id)=>{
  let newtodo= todos.filter(item=>item.id!=id)
  setTodos(newtodo)
  saveToLS()
 }

 const handleAdd=(e)=>{
  // if(todo.length===0){ alert("!!!Kindly Add Task"); return}
   setTodos([...todos,{id:uuidv4() ,todo, isCompleted:false} ])
   setTodo("")
   saveToLS()
 }
 const handleChange=(e)=>{
  setTodo(e.target.value)
  saveToLS()
 }
 const handleCheck=(e)=>{
  let id= e.target.name
  let index= todos.findIndex(item=>item.id===id)
  todos[index].isCompleted=!todos[index].isCompleted;
  setrander(!rander)
  saveToLS()
  
 }

  return (
    <>
    <Navbar/>

    <div className="flex w-[100%] h-[90vh] ">
      
      <div className=" m-auto flex flex-col gap-4  h-[80vh] w-[90vw] sm:w-[80vw] md:w-[60vw] xl:w-[40vw] p-6 container rounded-[16px] ">
      <div className="self-center font-bold text-xl underline">Schedule your To-Do's at one place</div>
        <div className="addtodo flex flex-col gap-2">
          <div className="font-bold text-md">Add a Task</div>
          <div className='flex gap-4 flex-col'>
            <input  onChange={handleChange} className="taskinput rounded-lg  " type="text" name="" value={todo} id="" />
            <button disabled={todo.length<=0} onClick={handleAdd}  className="bg-[#46d2ffb5] text-[#000] hover:bg-[#00befb] hover:text-black rounded-lg py-1 px-5 font-bold hover:font-semibold disabled:bg-[#3c8da5cc]  ">Save</button>
          </div>
          <div className='flex items-center gap-2' ><input onChange={handleToggle} type="checkbox" name="" checked={showCompleted} id="" /><span className='text-xs font-semibold'>Show Finished Tasks</span></div>
        </div>
        <div className='w-[100%] rounded-full h-[3px] bg-black'></div>

        <div className="font-bold text-md">Your To-Do's List</div>
        <div className="todos flex flex-col gap-2 overflow-auto scroll-smooth">
            {todos.length===0 && <div>You have no task sheduled</div> }
            {todos.map(item=>{
              return (showCompleted || !item.isCompleted) && <div key={item.id} className="todo flex justify-between border border-black p-2 rounded-md ">
              <div className='flex items-center gap-3'>
                <div> < input onChange={handleCheck} className='taskcheck' type="checkbox" checked={item.isCompleted} name={item.id} id="" /></div>
              <div className={item.isCompleted?"line-through":"text"}><span className="overflow-anywhere">{item.todo}</span></div>
              </div>
              <div className="button flex gap-4">
                <button onClick={(e)=>handleEdit(e,item.id)}><FaEdit /></button>
                <button className='edtdltbtn' onClick={(e)=>{window.confirm("Are you sure you want to delete this task")?handleDelete(e,item.id):""}}><MdDeleteForever /></button>
              </div>
              </div>
            
            })}
            
          
        </div>
      </div>

    </div>
    </>
  )
}

export default App
