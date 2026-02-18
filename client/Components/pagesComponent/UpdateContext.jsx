import React,{useContext,useState,createContext} from 'react'
import Dashboard from './Dashboard'

let UpdateData=createContext()

function UpdateContext(props) {
    let [updatevalue,setUpdatevalue]=useState("")
   
    
    return (
   
   <UpdateData.Provider value={{updatevalue,setUpdatevalue}}>
      {props.children}

   </UpdateData.Provider>
   
  )
}

export const useUpdate=()=>{
    return useContext(UpdateData)
}

export default UpdateContext