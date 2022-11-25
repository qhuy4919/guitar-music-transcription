import axios from 'axios'
import queryString from 'query-string'

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,

    headers: {
        'content-type': 'application/json',
        Authorization: `Beare ${localStorage['user']}`,},
    
    
    paramsSerializer: (params) => queryString.stringify(params, {arrayFormat:'bracket'}),
})

export default axiosClient