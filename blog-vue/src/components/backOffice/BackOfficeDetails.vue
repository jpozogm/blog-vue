<template>
  <section v-if="errored">
    <p>Lo sentimos, no es posible obtener la información en este momento, por favor intente nuevamente mas tarde</p>
  </section>

  <section v-else>
    <div v-if="loading">Cargando...</div>

    <div v-else>
      <div>
        <Card>
            <template slot="header">
              Author: {{post.postAuthorName}} 
            </template>

          <template slot="title">
            <h2>{{post.postTittle}}</h2>
          </template>

          <template slot="content">
            {{post.postContent}}
          </template>
      
          <template slot="footer">
            <p class="footerSign">{{post.postAuthorName}} ({{post.postDate.slice(0, 10)}})</p>
            <div v-if="infoToken.body._id === post.user || infoToken.body.role === 'admin'">
              <Button label="Edit" class="signIn p-button-success p-button-raised btn" @click="editPost()"/>
              <Button label="Delete" class="signIn p-button-danger p-button-raised btn" @click="deletePost()"/>
            </div>
          </template>
        </Card>
      </div>
      
      <div v-for="comment in post.postComments" :key="comment._id">
        <Fieldset :legend="comment.commentAuthorNickName">
          {{comment.commentContent}}
       
          <div v-if="infoToken.body._id === comment.userId || infoToken.body.role === 'admin'" class="comment-btn">
            <Button label="Edit" class="signIn p-button-success p-button-raised btn btn-comment" @click="editComment(comment._id)"/>
            <Button label="Delete" class="signIn p-button-danger p-button-raised btn btn-comment" @click="deleteComment(comment._id)"/>
          </div>
        </Fieldset>
      </div>
          
      <NewComment></NewComment>

      <Button label="Back" class="signIn p-button-info p-button-raised btn w-100" @click="gotoHome()"/>
     
    </div>
  </section>
</template>

<script>

import * as jwt_decode from 'jwt-decode';
import NewComment from './comments/NewComment'
import { mapGetters, mapActions } from 'vuex'

import Card from 'primevue/card';
import Button from 'primevue/button';
import Fieldset from 'primevue/fieldset';

export default {
  name: 'backOfficeDetail',
  components: {
    NewComment,
      'Card': Card,
      'Button': Button,
      'Fieldset': Fieldset
  },
  beforeMount(){
    let id = this.$route.params.id;
    this.$store.dispatch('loadPost', id)
  },

  computed: {
    ...mapGetters([
      'post',
      'loading',
      'errored'
    ]),
    ...mapActions([
      'loadPost'
    ])
  },

  data() {
    const token = localStorage.getItem('token');
    const tokenInfo = jwt_decode(token);
    
    return {
      infoToken: tokenInfo
    };
  },

  methods: {
    gotoHome() {
      this.$router.push("/BackOffice");
    },

    editPost(){
      this.$router.push(`/editPost/${this.post._id}`);
    },

    deletePost(){
      let id = this.$route.params.id;
      this.$store.dispatch('deletePost', id)
      this.$router.push("/BackOffice");
    },

    deleteComment(id){
      this.$store.dispatch('deleteComment', id)
    },

    editComment(id){
      this.$router.push(`/editComment/${id}`);
    }
  }
};

</script>


<style>

  .w-100{
    width: 100%;
  }

  section .p-card{
    background: transparent;
    color: black;
    border: 1px solid black;
    border-radius: 5px
  }

    section .p-card .p-card-header{
    padding: 4px 15px;
    background: #1C2833;
    color: white;
    border-radius: 5px 5px 0 0;
    text-align: end;
  }

  section .p-card .p-card-title{
     text-align: end;
  }

   section .p-card .p-card-content{
    font-style: italic;
  }

  section .p-fieldset {
    background: transparent;
    color: black;
    margin: 10px 0;
    font-style: italic;
  }

  section .p-fieldset .p-fieldset-legend {
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

.footerSign{
  text-align: end;
  font-style: italic;
}
</style>
