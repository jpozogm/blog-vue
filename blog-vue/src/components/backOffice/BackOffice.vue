<template>
  <div>
    <h1>BACK OFFICE</h1>

    <section v-if="errored">
      <p>Lo sentimos, no es posible obtener la información en este momento, por favor intente nuevamente mas tarde</p>
    </section>

    <section v-else>
      <div v-if="loading">Cargando...</div>

      <div v-else>
        <DataTable :value="posts" selectionMode="single" @row-select="onRowSelect" dataKey="id" class="light-panel">

          <template #header>
            <div style="line-height:1.87em" class="p-clearfix">
              List of Posts
            </div>

            <Button label="NEW POST" class="signIn p-button-info p-button-raised w-30" @click="newPost()"/>
          </template>

          <Column field="postTittle" header="Tittle"></Column>
          <Column field="postAuthorName" header="Author"></Column>
          <Column field="postComments.length" header="Comments number"></Column>

          
          <template #footer>
            In total there are {{posts ? posts.length : 0 }} posts.
          </template>
        </DataTable>
      </div>

    </section>


 
  </div>
</template>

<script>

import { mapGetters } from 'vuex';
import { mapActions } from 'vuex'


import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import 'primevue/resources/themes/vela-teal/theme.css';
import 'primeicons/primeicons.css'


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
    },

    onRowSelect(event) {
      this.$router.push(`/backOffice/${event.data._id}`);
    }
  }
};
</script>

<style>
 .p-component{
    border: 1px solid black;
    border-radius: 5px;
    box-shadow:  0px 2px 2px rgba(8, 8, 0, 0.15);
 }
  
.p-datatable .p-datatable-header .w-30 {
  width: 30%;
  border-radius: 5px;
  box-shadow: 0 0 0 0 transparent;
}
.p-datatable .p-datatable-header {
  display: flex;
  justify-content: space-between;
  background-color: rgba(21, 89, 121, 0.2);
  color: black;
}
.p-datatable .p-datatable-tbody > tr{
  color: rgb(0, 122, 217);
  background-color: none;
}

.p-datatable .p-datatable-wrapper .p-datatable-thead > tr > th{
  text-align: center; 
  font-size: 20px;
  text-transform: capitalize;
}
.p-datatable .p-datatable-tbody > tr > td {
   text-align: center; 
}

.p-datatable .p-datatable-tbody > tr:nth-child(odd){
  background-color: transparent;
}

.p-datatable .p-datatable-tbody > tr:nth-child(even){
    background-color: rgba(0, 122, 217, 0.1) ;
}

.p-datatable.p-datatable-hoverable-rows .p-datatable-tbody > tr:not(.p-highlight):hover{
  background-color:  rgba(33, 47, 61, 0.2);
  color: black;
  font-style: italic;
}

.p-datatable .p-datatable-footer {
  font-style: italic;
}

</style>


