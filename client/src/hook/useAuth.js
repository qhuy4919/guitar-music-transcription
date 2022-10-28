import { useContext } from 'react'
import UserContext from 'src/context/UserContext'

const useAuth = () => {
    console.log("ok 123")
    console.log(UserContext)
    return useContext(UserContext)
}

export default useAuth
