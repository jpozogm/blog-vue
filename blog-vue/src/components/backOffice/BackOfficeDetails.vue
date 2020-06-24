<template>
  <section v-if="errored">
    <p>Lo sentimos, no es posible obtener la información en este momento, por favor intente nuevamente mas tarde</p>
  </section>

  <section v-else>
    <div v-if="loading">Cargando...</div>

    <div v-else>

      <div>
        <h2>{{APIposts.postTittle}}</h2>

        <div>
          <label>Author:</label>
          {{APIposts.postAuthorName}}
        </div>
        <div>
          <label>Description:</label>
          {{APIposts.postContent}}
        </div>
        
        <div v-if="infoToken.body._id === APIposts.user || infoToken.body.role === 'admin'">
            <button @click="editPost()">Edit</button>
            <button @click="deletePost()">Delete</button>
        </div>

        <ul>
          <li v-for="comment in APIposts.postComments" :key="comment._id">
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

import PostsProxyService from '../../services/post-proxy.service.js';
import CommentProxyService from '../../services/comment-proxy.service.js';
import * as jwt_decode from 'jwt-decode';
import NewComment from './comments/NewComment'

export default {
  name: 'backOfficeDetail',
  components: {
    NewComment,
  },
  created() {
    this.post();
  },
  data() {
    const token = localStorage.getItem('token');
    const tokenInfo = jwt_decode(token);
    
    return {
      APIposts: [],
      loading: true,
      errored: false,
      infoToken: tokenInfo
    };
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
          this.APIposts = res.data;
          console.log(this.APIposts)
        }
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.loading = false)
    },

    editPost(){
      this.$router.push(`/editPost/${this.APIposts._id}`);
    },

    deletePost(){
      let id = this.$route.params.id;
      PostsProxyService.deletePost(id)
      .then(res => {
        if (res.data) {
          this.$router.push("/BackOffice");
        }
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.loading = false)
    },

    deleteComment(id){
       CommentProxyService.deleteComment(id)
      .then(res => {
        if (res.data) {
          console.log('done')
        }
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.loading = false) 
    },

    editComment(id){
      this.$router.push(`/editComment/${id}`);
    }
  }
};

</script>
