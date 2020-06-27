<template>
  <div id="newPost">
    <template>
        <form id="updatePost" @submit.prevent="updateComment()">

            <div>
                <label>Author:</label>
                <p>{{comment.commentAuthorNickName}}</p>
                <p>{{comment.commentContent}}</p>
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

import * as jwt_decode from 'jwt-decode';
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex'

export default {
    name: 'editComment',
    beforeMount(){
        let id = this.$route.params.id;
        this.$store.dispatch('getComment', id)
    },

  computed: {
    ...mapGetters([
      'comment',
      'loading',
      'errored'
    ]),
    ...mapActions([
      'getComment',
      //'updateComment'
    ])
  },

    data() {
        const token = localStorage.getItem('token');
        const tokenInfo = jwt_decode(token);

    
        return {
            infoToken: tokenInfo,

            updatedComment:{
                commentAuthorNickName: tokenInfo.body.user,
            },
        };
    },

    methods: {

        back(){
            this.$router.push(`/PrivatePost/${this.comment?.commentsPostId[0]}`);
        },

        async updateComment(){
            let id = this.$route.params.id;
            const payload= {id:id, updatedComment:this.updatedComment};
            await this.$store.dispatch('updateComment', payload)
            this.$router.push(`/PrivatePost/${this.comment?.commentsPostId[0]}`)
        }
    }  
}
</script>