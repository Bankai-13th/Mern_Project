
import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router'
import Dashboard from '../Components/pagesComponent/Dashboard'
import Signup from '../Components/pagesComponent/Signup'
import Login from '../Components/pagesComponent/Login'
import Forgotpassword from '../Components/pagesComponent/forgotpassword'
import { Useuser } from '../Components/pagesComponent/UserContext'
import Navbar from './assets/Navbar'
import { useEffect } from 'react'
import Profile from '../Components/pagesComponent/Profile'
import CreateNotes from '../Components/pagesComponent/CreateNotes'
import UpdateContext from '../Components/pagesComponent/UpdateContext'

function App() {
  let { user } = Useuser()


  return (
    <>
    <UpdateContext>
      <BrowserRouter>
        {user && <Navbar />}

        <Routes>
          <Route path='/' element={<Check/>} />
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgotpassword' element={<Forgotpassword />} />
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/createnotes' element={<CreateNotes/>}/>
        </Routes>
        <Toaster />
      </BrowserRouter>
    </UpdateContext>
    </>

   
  )
}

const Check=()=>{
  const navigate=useNavigate()
  const isAuth=localStorage.getItem("token");
 if(!isAuth){
   useEffect(()=>{navigate("/login")},[])
  }else{
    useEffect(()=>{
      navigate("/dashboard")
    },[])
  }
}

export default App
