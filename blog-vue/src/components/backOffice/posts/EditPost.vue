  
<template>
  <div id="newPost">
    <template>
        <form id="updatePost" @submit.prevent="updatePost()">

            <div>
                <h2>{{APIpost.postTittle}}</h2>
                <label>Author:</label>
                <p>{{APIpost.postAuthorName}}</p>
            </div>

                <div class="form-group">
                    <label for="user">Title</label>
                     <input type="text" name="user" v-model="updateForm.postTittle">
                </div>

                <div class="form-group">
                    <input type="text" name="password" v-model="updateForm.postContent">
                </div>

            <button type="submit" class="signIn">SAVE</button> 
            <button class="signIn" @click="back()">CANCEL</button>
        </form>
    </template>
  </div>
</template>



<script>

import PostsProxyService from '../../../services/post-proxy.service';
import * as jwt_decode from 'jwt-decode';

export default {


    name: 'editPost',
    data() {
        const token = localStorage.getItem('token');
        const tokenInfo = jwt_decode(token);

    
        return {
            APIpost: [],
            loading: true,
            errored: false,
            infoToken: tokenInfo,

            updateForm:{
            },
        };
    },

    created() {
        this.post();
    },
    methods: {
        gotoHome() {
            this.$router.push("/BackOffice");
        },

        post() {
            let id = this.$route.params.id;
            PostsProxyService.getPost(id)
            .then(res => {
                if (res.data) {
                this.APIpost = res.data;
                console.log(this.APIpost)
                }
            })
            .catch(error => {
                console.log(error)
                this.errored = true
            })
            .finally(() => this.loading = false)
        },

        back(){
            this.$router.push(`/PrivatePost/${this.APIpost._id}`);
        },

        updatePost(){
            let id = this.$route.params.id;

            PostsProxyService.updatePost(id, this.updateForm)
            .then(res => {
                if (res.data) {
                this.$router.push(`/PrivatePost/${this.APIpost._id}`);
                }
            })
            .catch(error => {
                console.log(error)
                this.errored = true
            })
            .finally(() => this.loading = false)
        }
    }  
}
</script>