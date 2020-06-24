const API_URL = 'http://localhost:3000';
const API_POSTS = '/posts/';
import axios from "axios";
import '../business/interceptor/interceptor.js';

export default {

    getPosts() {
        const url = `${API_URL}${API_POSTS}`;
        return axios.get(url);
    },

    getPost(id) {
        const url = `${API_URL}${API_POSTS}${id}`;
        return axios.get(url);  
    },

    saveNewPost(newPost){
        const url = `${API_URL}${API_POSTS}`;
        return axios.post(url, newPost);
    },

    deletePost(id) {
        const url = `${API_URL}${API_POSTS}${id}`;
        return axios.delete(url);  
    },

    updatePost(id, post){
        const url = `${API_URL}${API_POSTS}${id}`;
        
        return axios.put(url, post);
    },

}

