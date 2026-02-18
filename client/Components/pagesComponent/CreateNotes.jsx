import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Useuser } from './UserContext'
import Getuserdetails from '../../src/assets/GetuserDetails'
import { useUpdate } from './UpdateContext'


function CreateNotes() {
  let {setUser}=Useuser()
  const navigate=useNavigate()
  let [Note,setNote] = useState("")
  const token = localStorage.getItem("token")
  let {updatevalue,setUpdatevalue}=useUpdate()

 useEffect(()=>{
      setNote(updatevalue)

       Getuserdetails(setUser)
        if(!token){
          setUser(null)
         navigate("/login")
        }
    },[])

  async function UpdateNotes(){
    let obj={Note:[updatevalue,Note]}
    try {
      let res=await axios.patch('http://localhost:5000/api/user/notes/updatenotes',obj,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      setNote("")
      setUpdatevalue(null)
      navigate('/dashboard')
      toast.success(res?.data?.message)
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }

   

  async function handleCreateNotes(e) {
    e.preventDefault()
    if(!Note){
      return toast.error("Note should not empty")
    }
    let obj = { Note };
  
    try {
      let res = await axios.post('http://localhost:5000/api/user/notes/createnotes',obj, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setNote("")
      navigate('/dashboard')

      return toast.success(res?.data?.message)
    } catch (error) {
      return toast.error(error?.response?.data?.message)
    }
  }


  return (
    <>
   
    <div className='row'>
      <div className='col-6 m-auto mt-5'>
        <div className='card'>
          <div className='card-header text-center bg-warning'>
          <h1>Create Notes</h1>
          </div>
          <div className='card-body'>
              <div>
        <textarea name="Note" className='form-control' cols={5} rows={5} onChange={(e)=>setNote(e.target.value)} value={Note}></textarea>
        <hr />
       </div>
       <div >
        <button onClick={updatevalue ? UpdateNotes : handleCreateNotes} className='btn btn-dark text-warning '>{updatevalue ? "UpdateNote" : "Create Note"}</button>
       </div>

          </div>
        </div>
        
      </div>
    </div>
    </>
  )
}

export default CreateNotes