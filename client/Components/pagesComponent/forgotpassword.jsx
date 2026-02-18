import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'

function Forgotpassword() {
    let navigate=useNavigate()
    let [form,setForm]=useState({email:"",newpassword:"",confirmpassword:""})
    let [pass,setPass]=useState(false)
    let [pass2,setPass2]=useState(false)

    function handleChange(e){
        
        setForm((prev)=>{
            return {...prev,[e.target.name]:e.target.value}
        })
    }
   async function handleSubmit (e){
        e.preventDefault()
        if(!form.email){
            return toast.error("email must not be empty")
        }
        if(!form.newpassword){
            return toast.error("newpassword must not empty")
        }
        if(!form.confirmpassword){
            return toast.error("confirm password must not be empty")
        }
        if(form.newpassword !== form.confirmpassword){
            return toast.error("new password and confirmpassword must be equal")
        }

        try {
            let Data=await axios.patch("http://localhost:5000/api/user/forgotpassword",form)
            navigate("/login")
            return toast.success(Data.data.message)
            
            
        } catch (error) {
            return toast.error(error.response.data.message)
            
        }

    }
  return (
    <>
   <div className='vw-100 vh-100 bg-secondary bg-gradient'>
    <div className='col-4 m-auto pt-5'>
        <div className='card'>
            <div className='card-header bg-dark'>
                <h2 className='text-light text-center'>Forgot Password</h2>
            </div>
            <div className='card-body bg-dark'>
                <form onSubmit={handleSubmit} className='d-grid gap-3'>
                   <div className='input-group'> 
                    <span className='input-group-text btn-light'><i className='fa-solid fa-at'></i></span>
                     <input type="email" placeholder='enter email' onChange={handleChange} name='email' value={form.email} className='form-control'/>
                   </div>
                    <div className='input-group'>
                         <input type={pass ? "text" :"password"} placeholder='enter newpassword' onChange={handleChange} name='newpassword' value={form.newpassword} className='form-control'/>
                         <button className='btn-light input-group-text' onClick={(e)=>{
                            e.preventDefault()
                            setPass(true)
                            setTimeout(()=>setPass(false),1000)
                         }}><i className='fa-solid fa-eye'></i></button>
                    </div>
                    <div className='input-group'>
                         <input type={pass2 ? "text" :"password"} placeholder='enter confirmpassword' onChange={handleChange} name='confirmpassword' value={form.confirmpassword} className='form-control'/>
                         <button className='btn-light input-group-text' onClick={(e)=>{
                            e.preventDefault()
                            setPass(true)
                            setTimeout(()=>setPass2(false),1000)
                         }} ><i className='fa-solid fa-eye'></i></button>
                    </div>
                     <input type="submit" value="submit" className='btn btn-primary' />
                </form>
            </div>
        </div>
    </div>
   </div>
    </>
  )
}

export default Forgotpassword