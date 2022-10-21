import axiosClient from './axiosClient'

const auth = {
    login: (credentials) => {
        const url = '/login'
        return axiosClient.post(url, credentials)
    },
    register: (credentials) => {
        const url = '/register'
        return axiosClient.post(url, credentials)
    },
    getAuthenticatedUser: () => {
        const url = '/user'
        return axiosClient.get(url)
    },
    forgotPassword: (credentials) => {
        const url = '/forgot-password'
        return axiosClient.post(url, credentials)
    },
    changePassword: (credentials) => {
        const url = '/change-password'
        return axiosClient.post(url, credentials)
    },
}

export default auth
