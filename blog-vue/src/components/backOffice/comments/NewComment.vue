  
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

export default {
    name: 'newComment',

    data(){
        const token = localStorage.getItem('token');
        const tokenInfo = jwt_decode(token);

        return{
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

        async saveNewComment(){
            let id = this.$route.params.id;
            const payload= {id:id, newComment:this.newComment};
            await this.$store.dispatch('saveNewComment', payload)
            this.newComment.commentContent = "";
        }
    }
}
</script>