  
<template>
  <div id="newPost">
    <template>
        <form id="newPost" @submit.prevent="saveNewPost()">
            <div class="form-group">
                <label for="user">Title</label>
                <input type="text" name="user" v-model="newPost.postTittle">
            </div>

            <div class="form-group">
                <input type="text" name="password" v-model="newPost.postContent">
            </div>

            <button type="submit" class="signIn">SAVE</button>
            <button class="signIn" @click="back()">CANCEL</button>
        </form>
    </template>
  </div>
</template>



<script>
import * as jwt_decode from 'jwt-decode';
import PostsProxyService from '../../../services/post-proxy.service.js'

export default {
    name: 'newPost',
    data(){
        const token = localStorage.getItem('token');
        const tokenInfo = jwt_decode(token);

        return{
            loading: true,
            errored: false,

            newPost:{
                postAuthorName: tokenInfo.body.user,
                postAuthorNickName: tokenInfo.body.user,
                postTittle: "",
                postContent: "",
            },
        }
    },    

    methods: {
        back(){
            this.$router.push('/backOffice')
        },


        saveNewPost(){
            console.log('newPost', this.newPost)
            PostsProxyService.saveNewPost(this.newPost)
            .then(res => {
                if (res.data) {
                    this.$router.push('/backOffice')
                }
            })
            .catch(error => {
                this.error = error.error.message;
            })
            .finally(() => this.loading = false)
            },
        }
}
</script>