import axiosClient from 'src/access/axiosClient'
import { createContext, useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import auth from 'src/access/auth'

const UserContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
    const [collapsed, setCollapsed] = useState(
        localStorage.getItem('collapsed') === 'true',
    )

    const providerValue = useMemo(
        () => ({ token, setToken, user, setUser, collapsed, setCollapsed }),
        [token, setToken, user, setUser, collapsed, setCollapsed],
    )

    const navigate = useNavigate()

    useEffect(() => {
        console.log("token")
        if (token !== 'null') {
            console.log("abc")
            // Set authenticate token to axios
            axiosClient.defaults.headers.common[
                'Authorization'
            ] = `Bearer ${token}`

            if (token !== localStorage.getItem('token')) {
                // Get current user's data
                auth.getAuthenticatedUser()
                    .then((response) => {
                        setUser(response.data)
                        localStorage.setItem('token', token)
                        localStorage.setItem(
                            'user',
                            JSON.stringify(response.data),
                        )
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
        } else {
            // User logout
            setUser('null')
            localStorage.setItem('token', null)
            localStorage.setItem('user', null)
        }
    }, [token, navigate])

    return (
        <UserContext.Provider value={providerValue}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext
