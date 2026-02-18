import React, { useEffect } from 'react'
import { Useuser } from './UserContext'

import Getuserdetails from '../../src/assets/GetuserDetails'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { useUpdate } from './UpdateContext'
import toast from 'react-hot-toast'

function Dashboard() {
 
 let [Data,setData]=useState([])
 
  let { user,setUser } = Useuser()
  const navigate=useNavigate()
  let token=localStorage.getItem("token")
  let {setUpdatevalue}=useUpdate()

  

  useEffect(() => {
    
   Getuserdetails(setUser)
    if(!token){
      setUser(null)
     navigate("/login")
    }
    async function getNotes(){
      let Notes=await axios.get('http://localhost:5000/api/user/notes/',{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      setData(Notes?.data?.message)

    }
    getNotes()
  },[])

  function handleUpdate(i){
  setUpdatevalue(Data[i]?.Note)
  navigate('/createnotes')
  }

 async function handleDelete(i){
 
 let obj=Data[i];
 
  
  try {
    let newNotes = Data.filter((e)=>{
      if(Data[i].Note !== e.Note){
        return e;
      }
    })
    
     let res=await axios.delete('http://localhost:5000/api/user/notes/deletenotes',{data:obj,headers:{Authorization:`Bearer ${token}`}})
    setData(newNotes);
     toast.success(res?.data?.message)
  } catch (error) {
    console.log(error)
 return toast.error(error?.response?.data?.message)
  }
 
  }


  return (
    <>

      <h1 className='fw-bolder'>Hi ,{user?.name} </h1>

      <div className='row'>
        <div className='col-8 m-auto mt-3'>
          <div className='card'>
            <div className='card-header text-center bg-warning'>
              <h1>Notes</h1>
            </div>
            <div className='card-body '>
              
              {Data.map((e,i)=>{
                return  <div className='row' key={i}>
                  <div className='col-12'> 
                    <div className='card mt-2'>
                      <div className='card-body'>
                        {e?.Note}
                        <div className='float-end'>
                          <button className='btn btn-dark text-warning' onClick={()=>handleUpdate(i)}>Update</button>
                          <button className='ms-2 btn btn-dark text-warning' onClick={()=>handleDelete(i)}> Delete</button>
                        </div>
                      
                      </div>
                   
                    </div>
                    
                  </div>
                 
                
                </div>
                
                
              })} 
             
            </div>
          </div>
        </div>
      </div>



    </>
  )
}

export default Dashboard
