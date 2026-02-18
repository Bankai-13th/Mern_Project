import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function Signup() {
    let navigate = useNavigate()
    let [pass, setPass] = useState(false)

    let [form, setFormdata] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleData = (e) => {
        setFormdata((d) => {
            return { ...d, [e.target.name]: e.target.value }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!form.name) {
            return toast.error("name must not empty")
        }
        if (!form.email) {
            return toast.error("email must not empty")
        }
        if (!form.password) {
            return toast.error("password must not empty")
        }

        try {
            let Data = await axios.post("http://localhost:5000/api/user/signup", form)
            setFormdata({ name: "", email: "", password: "" })
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
                    <div className='card ' >
                        <div className='card-header text-center bg-dark'>
                            <h1 className='text-light'>User Signup</h1>
                        </div>
                        <div className='card-body bg-dark'>
                            <form onSubmit={handleSubmit} className='d-grid gap-4' >
                                <div >
                                    <input type="text" placeholder='enter name' name='name' className='form-control' onChange={handleData} value={form.name} />
                                </div>
                                <div className='input-group'>
                                    <span className='input-group-text btn-light'><i className="fa-solid fa-at"></i></span>
                                    <input type="email" placeholder='enter email' name='email' className='form-control' onChange={handleData} value={form.email} />
                                </div>
                                <div className='input-group'>
                                    <input type={pass ? "text" : "password"} placeholder='enter password' name="password" className='form-control' onChange={handleData} value={form.password} />
                                    <button className='input-group-text btn-light' onClick={(e) => {
                                        e.preventDefault()
                                        setPass(true)
                                        setTimeout(() => setPass(false), 1000)
                                    }}><i className="fa-solid fa-eye"></i></button>
                                </div>
                                <input type="submit" className='btn btn-primary text-center' />


                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
