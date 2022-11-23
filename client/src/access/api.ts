import axiosClient from './axiosClient'
import axios from 'axios';
export const QueryAPI = {};

export const CommandAPI = {
    song: {
        single: (data: any) => {
            // const path = '/audio/upload/';
            const url = 'http://52.221.245.51/audio/upload/'
            let config = {
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            };
            return axios.post(url,data,config);
        }
    }
};
