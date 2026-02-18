import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'



export default function Login() {

  let [form, setForm] = useState({ email: "", password: "" })
  let navigate = useNavigate()
  let [pass, setPass] = useState(false)

  function handleChange(e) {
    setForm((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  async function onSubmit(e) {
    e.preventDefault()
    if (!form.email) {
      return toast.error("email is empty")
    }
    if (!form.password) {
      return toast.error("password is empty")
    }


    try {
      let data = await axios.post('http://localhost:5000/api/user/login', form)
      localStorage.setItem('token', data.data.token)
      navigate("/dashboard")
      return toast.success(data.data.message)

    } catch (error) {
    
      return toast.error(error.response.data.message)
    }
  }

  return (
    <>
      <div className='vm-100 vh-100 bg-secondary bg-gradient' >
        <div className='col-4 m-auto pt-5'>
          <div className='card'>
            <div className='card-header bg-dark'>
              <h1 className='text-center text-light  '>User Login</h1>
            </div>
            <div className='card-body bg-dark'>
              <form className='d-grid gap-3' onSubmit={onSubmit}>
                <div className='input-group'>
                  <span className='input-group-text btn-light'><i className="fa-solid fa-at"></i></span>
                  <input type="email" onChange={handleChange} name='email' value={form.email} className='form-control' placeholder='enter email' />
                </div>
                <div className='input-group'>
                  <input type={pass ? "text" : "password"} onChange={handleChange} name='password' value={form.password} className='form-control' placeholder='enter password' />
                  <button className='input-group-text btn-light' onClick={(e) => {
                    e.preventDefault()
                    setPass(true)
                    setTimeout(() => setPass(false), 1000)

                  }}><i className="fa-solid fa-eye"></i></button>
                </div>
                <input type="submit" value="Login" className='btn btn-primary' />  <Link to="/forgotpassword">forgotpassword?</Link>
                <span className='text-light'>Don't have an account <Link to="/signup">signup?</Link></span>

              </form>

            </div>
          </div>
        </div>
      </div>

    </>
  )
}

