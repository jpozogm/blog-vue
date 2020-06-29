<template>
  <section v-if="errored">
    <p>Lo sentimos, no es posible obtener la información en este momento, por favor intente nuevamente mas tarde</p>
  </section>

  <section v-else>
    <div v-if="loading">Cargando...</div>

    <div v-else>
      <div>

        <blog-post-detail 
          :heading= "post.postTittle" 
          :content="post.postContent"
          :footer= "post.postAuthorName">
        </blog-post-detail>

        <div v-for="comment in post.postComments" :key="comment._id">
          <blog-post-comment :author= "comment.commentAuthorNickName" 
            :content="comment.commentContent"></blog-post-comment>
        </div>

        <blog-button class ="button fadeIn" @click="gotoHome()" text="Back Home"></blog-button>
        
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