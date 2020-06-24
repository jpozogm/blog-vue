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


        <ul>
          <li v-for="comment in APIposts.postComments" :key="comment._id">
            <p>{{comment.commentAuthorNickName}}</p>
            <p>{{comment.commentContent}}</p>
          </li>
        </ul>

        <button @click="gotoHome()">Back</button>
      </div>
    </div>
  </section>
</template>

<script>

import PostsProxyService from '../../services/post-proxy.service.js';

export default {
  created() {
    this.post();
  },
  data() {
    return {
      APIposts: [],
      loading: true,
      errored: false
    };
  },
  computed: {},
  methods: {
    gotoHome() {
      this.$router.push("/home");
    },

    post() {
      let id = this.$route.params.id;
      PostsProxyService.getPost(id)
      .then(res => {
        if (res.data) {
          this.APIposts = res.data;
        }
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.loading = false)
    }
  }
};

</script>