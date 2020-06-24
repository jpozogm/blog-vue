<template>
  <div id="newPost">
    <template>
        <form id="updatePost" @submit.prevent="updateComment()">

            <div>
                <h2>{{APIcomment}}</h2>
         
                <label>Author:</label>
                <p>{{APIcomment.commentAuthorNickName}}</p>
                <p>{{APIcomment.commentContent}}</p>
            </div>

                <div class="form-group">
                    <input type="text" name="password" v-model="updatedComment.commentContent">
                </div>

            <button type="submit" class="signIn">SAVE</button> 
            <button class="signIn" @click="back()">CANCEL</button>
        </form>
    </template>
  </div>
</template>



<script>

import CommentsProxyService from '../../../services/comment-proxy.service';
import * as jwt_decode from 'jwt-decode';

export default {
    name: 'editComment',
    data() {
        const token = localStorage.getItem('token');
        const tokenInfo = jwt_decode(token);

    
        return {
            APIcomment: [],
            loading: true,
            errored: false,
            infoToken: tokenInfo,

            updatedComment:{
            },
        };
    },

    created() {
        this.getComment();
    },
    methods: {
        getComment() {
            let id = this.$route.params.id;
            CommentsProxyService.getComment(id)
            .then(res => {
                if (res.data) {
                this.APIcomment = res.data;
                }
            })
            .catch(error => {
                console.log(error)
                this.errored = true
            })
            .finally(() => this.loading = false)
        },

        back(){
            this.$router.push(`/PrivatePost/${this.APIcomment?.commentsPostId[0]}`);
        },

        updateComment(){
            let id = this.$route.params.id;
            CommentsProxyService.updateComment(id, this.updatedComment)
            .then(res => {
                if (res.data) {
                this.$router.push(`/PrivatePost/${this.APIcomment?.commentsPostId[0]}`);
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