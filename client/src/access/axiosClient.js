import axios from 'axios'
import { stringify } from "qs";

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,

    headers: {
        // 'content-type': 'application/json',
    //     // jwt: `Bearer ${localStorage['jwt']}`,localStorage.getItem('jwt')
        // Authorization: `Bearer ${localStorage['jwt']}`,
        // Authorization: 'Bearer '+ (typeof window !== 'undefined' ? localStorage.getItem('jwt') : null),
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        // Authorization: 'Bearer ' + items,
    //     // Cookie: `jwt=${localStorage['jwt']};`
    },
    
    // withCredentials: true,
    // credentials: 'include',
    paramsSerializer: {
        serialize: stringify // or (params) => Qs.stringify(params, {arrayFormat: 'brackets'})
      },
})

export default axiosClient