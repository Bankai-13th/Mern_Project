import React,{useContext,useState,createContext} from 'react'
import { useNavigate } from 'react-router-dom'

const Context=createContext()

function UserContext(props) {
    let [user,setUser]=useState(null)
   
    
    return (
   
   <Context.Provider value={{user,setUser}}>
        {props.children}

   </Context.Provider>
   
  )
}

export const Useuser=()=>{
    return useContext(Context)
}

export default UserContext