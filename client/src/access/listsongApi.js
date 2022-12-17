import axiosClient from './axiosClient'

const listsongApi ={
    getlistall: () => {
        const url = '/audio/get-list-audio/'
        return axiosClient.get(url)
    },
    getcode: (id) => {
        const url = `/audio/get-code/${id}/`
        return axiosClient.get(url)
    },
    deletecode: (id) => {
        const url = `/audio/audio/${id}/`
        return axiosClient.delete(url)
    }
}
export default listsongApi
