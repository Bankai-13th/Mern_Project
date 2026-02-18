import React from 'react'
import { useNavigate ,Link } from 'react-router-dom'
import UserContext, { Useuser } from '../../Components/pagesComponent/UserContext'

function Navbar() {
    let {setUser}=Useuser()
  let navigate=useNavigate()
  return (
    <>
    <nav className='navbar nav-brand bg-dark'>
        <Link to="/dashboard" className='link'>Dashboard</Link>
        <Link to="/createnotes" className='link'>createnotes</Link>
        <Link to="/profile" className='link'>Profile</Link>
        <button className='btn btn-secondary bg-gradient text-warning fw-bolder' onClick={async()=>{
           await setUser(null)
           localStorage.clear()
           navigate("/login")
         }}>Logout</button>
      </nav>
      </>
  )
}

export default Navbar