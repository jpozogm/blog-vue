<template>
  <div>
    <h1>BACK OFFICE</h1>

       <button class="signIn" @click="newPost()">NEW POST</button>

    <section v-if="errored">
      <p>Lo sentimos, no es posible obtener la información en este momento, por favor intente nuevamente mas tarde</p>
    </section>

    <section v-else>
      <div v-if="loading">Cargando...</div>

      <div v-else>
        <ul>
          <li v-for="post in APIposts" :key="post._id">
            <router-link :to="'/PrivatePost/'+post._id">{{post._id}} - {{post.postTittle}}</router-link>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import PostsProxyService from '../../services/post-proxy.service.js';

export default {
  name: 'BackOffice',
  created() {
    this.posts();
  },
  data() {
    return {
      APIposts: [],
      numberOfPosts: 0,
      loading: true,
      errored: false
    };
  },
  methods: {
    posts() {
      PostsProxyService.getPosts()
      .then(res => {
        if (res.data) {
          this.APIposts = res.data;
          this.numberOfPosts = res.data.count
        }
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.loading = false)
    },

    newPost(){
      this.$router.push('/newPost')
    }
  }
};
</script>




