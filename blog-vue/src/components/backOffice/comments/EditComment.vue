<template>
  <div id="newPost">
    <template>
        <form id="updatePost">
            <Fieldset :legend="comment.commentAuthorNickName">

                <div>
                    <p>{{comment.commentContent}}</p>
                </div>

                    <div class="form-group">
                        <input type="text" name="password" v-model="updatedComment.commentContent">
                    </div>

                <div class="comment-btn">
                    <Button label="SAVE" class="signIn p-button-success p-button-raised btn btn-comment" @click="updateComment()"/>
                    <Button label="CANCEL" class="signIn p-button-danger p-button-raised btn btn-comment" @click="back()"/>
                </div>
            </Fieldset>
        </form>
    </template>
  </div>
</template>



<script>

import * as jwt_decode from 'jwt-decode';
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex'

import Fieldset from 'primevue/fieldset';
import Button from 'primevue/button';

export default {
    name: 'editComment',
    components: {
        'Fieldset': Fieldset,
        'Button': Button,
    },

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
            this.$router.push(`/backOffice/${this.comment?.commentsPostId[0]}`);
        },

        async updateComment(){
            let id = this.$route.params.id;
            const payload= {id:id, updatedComment:this.updatedComment};
            await this.$store.dispatch('updateComment', payload)
            this.$router.push(`/backOffice/${this.comment?.commentsPostId[0]}`)
        }
    }  
}
</script>

<style>

    .p-fieldset {
        background: transparent;
        color: black;
        margin: 10px 0;
        font-style: italic;
    }

    .p-fieldset .p-fieldset-legend {
        padding: 3px
    }

    .btn + .btn{
        margin-left: 5px;
    }

    .comment-btn .btn-comment{
        font-size: 12px;
        padding: 5px;
        margin-top: 10px;
    }
</style>