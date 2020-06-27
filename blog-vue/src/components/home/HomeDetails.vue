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


        <ul>
          <li v-for="comment in post.postComments" :key="comment._id">
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

import { mapGetters } from 'vuex';
import { mapActions } from 'vuex'

export default {

 name: "HomeDetails",
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

  methods: {
    gotoHome() {
      this.$router.push("/home");
    },
  }
};

</script>