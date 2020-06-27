const API_URL = 'http://localhost:3000';
const API_COMMENTS = '/comments/';
import axios from "axios";
import '../business/interceptor/interceptor.js';

export default {

    getComments() {
        const url = `${API_URL}${API_COMMENTS}`;
        return axios.get(url);
    },

    getComment(id) {
        const url = `${API_URL}${API_COMMENTS}${id}`;
        return axios.get(url);  
    },

    saveNewComment(id, newComment){
        const url = `${API_URL}${API_COMMENTS}${id}`;
        return axios.post(url, newComment);
    },

    deleteComment(id) {
        const url = `${API_URL}${API_COMMENTS}${id}`;
        return axios.delete(url); 
    },

    updateComment(id, comment){
        console.log('id', id)
        console.log('comment', comment)

        const url = `${API_URL}${API_COMMENTS}${id}`;
        return axios.put(url, comment);
    },
}

