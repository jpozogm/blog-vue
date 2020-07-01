import axios from "axios";
const API_URL = 'http://localhost:3000';
const API_LOGIN = '/login/';
const API_USER = '/user/';

export default {

    async signIn(login){ 
        const auth = btoa(`${login.user}:${login.password}`);
        const url = `${API_URL}${API_LOGIN}`;
        
        return await axios.post(url, '', { headers: {Authorization : 'Basic ' +  auth}})
    },
    signUp(form){
        const url = `${API_URL}${API_USER}`;
        return axios.post(url, form)
    },
}
