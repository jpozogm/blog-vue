<template>
  <div>
    <h1>HOME</h1>

    <section v-if="errored">
      <p>Lo sentimos, no es posible obtener la información en este momento, por favor intente nuevamente mas tarde</p>
    </section>

    <section v-else>
      <div v-if="loading">Cargando...</div>

      <div v-else>
        <ul>
          <li v-for="post in posts" :key="post._id">
            <router-link :to="'/post/'+post._id">{{post._id}} - {{post.postTittle}}</router-link>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';
import { mapActions } from 'vuex'

export default {
  name: "Home",
  beforeMount(){
    this.$store.dispatch('loadPosts')
  },

  computed: {
    ...mapGetters([
      'posts',
      'loading',
      'errored'
    ]),

    ...mapActions([
      'loadPosts'
    ])
  }
};
</script>