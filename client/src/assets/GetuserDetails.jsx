import toast from "react-hot-toast"
import axios from "axios"




async function Getuserdetails(setUser) {

    const token = localStorage.getItem('token')
    
    try {
        let userInfo = await axios.get('http://localhost:5000/api/user/', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        await setUser(userInfo?.data?.user)
        



    } catch (error) {

        return toast.error(error?.response?.data?.message)

    }
}

export default Getuserdetails