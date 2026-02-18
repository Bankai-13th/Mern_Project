import React, { useEffect, useState } from 'react'
import Getuserdetails from '../../src/assets/GetuserDetails'
import { Useuser } from './UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
function Profile() {

    const navigate=useNavigate()
    let token=localStorage.getItem("token")
    let {user,setUser}=Useuser()
    let [status,setStatus]=useState(false)
    let [password,setPassword]=useState({oldpassword:"",newpassword:""})
    let [pass,setPass]=useState(false)
    let [name,setName]=useState("")
    let [eye,setEye]=useState(false)
    let [eye2,setEye2]=useState(false)
    useEffect(()=>{
       Getuserdetails(setUser)
        if(!token){
          setUser(null)
         navigate("/login")
        }
    },[])

   function handleName(e){
    e.preventDefault();
    setStatus(true);

   }

   function handleUpdate(e){
    e.preventDefault()
    setPass(true)
   }

   function handleUpdateddata(e){
    e.preventDefault()
      setPassword((prev)=>{
        return {
          ...prev,[e.target.name]:e.target.value
        }
      })

   }

  async function handleSubmitName(e){
    e.preventDefault()
    
    let obj={};
    obj["name"]=name
    if(!name){
      return toast.error("name must not empty")
    }
    try {
      let res=await axios.patch("http://localhost:5000/api/user/update/name",obj,{
        headers:{
          Authorization:`Bearer ${token}`
        }
        
      })
      Getuserdetails(setUser)
      setName("")
      setStatus(false)
      return toast.success(res.data.message)
    } catch (error) {
      return toast.error(error?.response?.data?.message)
    }

   }

   async function handleSubmitPassword(e){
    e.preventDefault()
    if(!password.oldpassword || !password.newpassword){
      return toast.error("fields mustnot empty")
    }

    if(password.oldpassword == password.newpassword){
      return toast.error("oldpassword and newpasword should not same")
    }
    try {
      
      let res=await axios.patch("http://localhost:5000/api/user/update/password",password,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      setPass(false)
      setUser(null)
      localStorage.removeItem('token')
      navigate('/login')
      return toast.success(res.data.message)
      
      
    } catch (error) {
      return toast.error(error?.response?.data?.message)
    }
   }

  return (
    <>
  <div className='row'>
    <div className='col-5 m-auto mt-5 '>
      <div className='card'>
        <div className='card-header text-center bg-warning'>
          <h1>User Detail</h1>
         </div> 
         <div className='card-body '>
           <h3 className='fw-bolder '>hello {user?.name}</h3> 
           <button className='btn btn-dark text-warning mt-1' onClick={handleName}>update name</button>
           
           { status && <>
           <button className='btn text-danger btn-dark ms-4' onClick={()=>setStatus(false)}><i className="fa-solid fa-xmark"></i></button>
           <form onSubmit={handleSubmitName}>
            <input type="text" name="name" onChange={(e)=>setName(e.target.value)} value={name}  className='form-control mt-2' placeholder='enter new name'/>
            <button type="submit" className='btn btn-dark text-warning mt-2'>submit</button>
           </form>
           </> 
            }

        <div className='mt-2'>

            <button className='btn btn-dark text-warning mt-2' onClick={handleUpdate}>update password</button> 
          
            { pass && <>
                <button className='btn text-danger btn-dark ms-4 mt-1' onClick={()=>setPass(false)}><i className="fa-solid fa-xmark"></i></button>     
            <form onSubmit={handleSubmitPassword}>
              <div className='input-group mt-2'>
           
                <input type={eye ? "text" : "password"} name="oldpassword" onChange={handleUpdateddata} value={password.oldpassword}  className='form-control mt-2 py-2' placeholder='enter old password'/>
                <button className='btn btn-dark text-warning button-addon1' onClick={(e)=>{
                  e.preventDefault()
                  setEye(true)
                  setTimeout(()=>setEye(false),1000)

                }}><i className='fa-solid fa-eye'></i></button>
          </div>
           <div className='input-group mt-2'>
           
                <input type={eye2 ? "text" : "password"} name="newpassword" onChange={handleUpdateddata} value={password.newpassword}  className='form-control mt-2 py-2' placeholder='enter new password'/>
                <button className='btn btn-dark text-warning button-addon1' onClick={(e)=>{
                  e.preventDefault()
                  setEye2(true)
                  setTimeout(()=>setEye2(false),1000)

                }} ><i className='fa-solid fa-eye'></i></button>
          </div>
          
           <button type="submit" className='btn btn-dark text-warning mt-2'>submit</button>
           </form>
        </>
            }
            </div> 
            
 

         </div>
      </div>

    </div>
  </div>
    </>
   
  )
}

export default Profile