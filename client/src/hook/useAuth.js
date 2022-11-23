import { useContext } from 'react'
import UserContext from 'src/context/UserContext'

const useAuth = () => {
    return useContext(UserContext)
}

export default useAuth
