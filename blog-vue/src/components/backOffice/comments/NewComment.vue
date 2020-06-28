  
<template>
  <div id="newPost">
    <template>
        <form id="newPost">

            <Fieldset :legend="'New Comment'">

                    <div class="form-group">
                        <input id="commentContent" class="no-border" type="text" placeholder="Escribe un comentario..." v-model="newComment.commentContent">
                    </div>

                <div class="comment-btn">
                    <Button label="SAVE" class="signIn p-button-success p-button-raised btn btn-comment" @click="saveNewComment()"/>
                </div>
            </Fieldset>
        </form>
    </template>
  </div>
</template>


<script>
import * as jwt_decode from 'jwt-decode';

import Button from 'primevue/button';
import Fieldset from 'primevue/fieldset';

export default {
    name: 'newComment',
    components: {
      'Button': Button,
      'Fieldset': Fieldset
    },
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

<style>
.no-border{
    border: 1px solid transparent
}

.no-border:focus{
    outline-color: transparent;
}
</style>