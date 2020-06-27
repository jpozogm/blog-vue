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
          <li v-for="post in posts" :key="post._id">
            <router-link :to="'/PrivatePost/'+post._id">{{post._id}} - {{post.postTittle}}</router-link>
          </li>
        </ul>
      </div>
    </section>

<Button label="Submit" />
<Button label="Submit" disabled="disabled" />

    <DataTable :value="posts">
      <Column field="vin" header="Vin"></Column>
      <Column field="year" header="Year"></Column>
      <Column field="brand" header="Brand"></Column>
      <Column field="color" header="Color"></Column>
    </DataTable>
    


  </div>


</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex'


import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';



export default {
  name: 'BackOffice',
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
  },

    components: {
    'DataTable': DataTable,
    'Column': Column,
    'Button': Button
  },

  methods: {
    newPost(){
      this.$router.push('/newPost')
    }
  }
};
</script>




