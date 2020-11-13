import axios from 'axios';

const HOSTNAME = "http://localhost:8000/tasks";

export const tasks = {
    
    get: async () => {
        return axios.get( HOSTNAME );
    },

    post: async ( body:any ) => {
        return axios.post( HOSTNAME , body);
    },

    patch: async ( id:number, body:any ) => {
        return axios.patch(`${HOSTNAME}/${id}`, body);
    },

}