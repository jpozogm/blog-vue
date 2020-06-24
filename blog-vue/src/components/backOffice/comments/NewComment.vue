  
<template>
  <div id="newPost">
    <template>
        <form id="newPost" @submit.prevent="saveNewComment()">
            <span class="ui-float-label">
                <input id="commentContent" type="text" placeholder="Escribe un comentario..." v-model="newComment.commentContent">
            </span>

            <button type="submit" class="signIn">SAVE</button>
        </form>
    </template>
  </div>
</template>



<script>
import * as jwt_decode from 'jwt-decode';
import CommentProxyService from '../../../services/comment-proxy.service.js'

export default {
    name: 'newComment',
    data(){
        const token = localStorage.getItem('token');
        const tokenInfo = jwt_decode(token);

        return{
            loading: true,
            errored: false,

            newComment:{
                commentContent: "",
                commentAuthorNickName: tokenInfo.body.user,
            },
        }
    },    

    methods: {
        back(){
            this.$router.push('/backOffice')
        },

        saveNewComment(){
            let id = this.$route.params.id;
            CommentProxyService.saveNewComment(id, this.newComment)
            .then(res => {
                if (res.data) {
                    console.log("done")
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