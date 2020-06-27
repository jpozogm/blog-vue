<template>
  <section v-if="errored">
    <p>Lo sentimos, no es posible obtener la información en este momento, por favor intente nuevamente mas tarde</p>
  </section>

  <section v-else>
    <div v-if="loading">Cargando...</div>

    <div v-else>

      <div>
        <h2>{{post.postTittle}}</h2>

        <div>
          <label>Author:</label>
          {{post.postAuthorName}}
        </div>
        <div>
          <label>Description:</label>
          {{post.postContent}}
        </div>
        
        <div v-if="infoToken.body._id === post.user || infoToken.body.role === 'admin'">
          <button @click="editPost()">Edit</button>
          <button @click="deletePost()">Delete</button>
        </div>

        <ul>
          <li v-for="comment in post.postComments" :key="comment._id">
            <p>{{comment.commentAuthorNickName}}</p>
            <p>{{comment.commentContent}}</p>

            <div v-if="infoToken.body._id === comment.userId || infoToken.body.role === 'admin'">
              <button @click="editComment(comment._id)">Edit</button>
              <button @click="deleteComment(comment._id)">Delete</button>
            </div>
          </li>
        </ul>

        <NewComment></NewComment>

        <button @click="gotoHome()">Back</button>
        
      </div>
    </div>
  </section>
</template>

<script>

import * as jwt_decode from 'jwt-decode';
import NewComment from './comments/NewComment'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'backOfficeDetail',
  components: {
    NewComment,
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
