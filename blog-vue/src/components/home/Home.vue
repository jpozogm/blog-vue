<template>
  <div>
    <section v-if="errored">
      <p>Lo sentimos, no es posible obtener la información en este momento, por favor intente nuevamente mas tarde</p>
    </section>

    <section v-else>
      <div v-if="loading">Cargando...</div>

      <div v-else>
        <div class="grid">
          <app-post-card v-for="post in posts" :key="post._id">
            <router-link :to="{name: 'HomeDetails', params: {id: post._id}}">
                <blog-card :heading= "post.postTittle" :author= "post.postAuthorName" :content="post.postContent"></blog-card>
            </router-link>
          </app-post-card>
        </div>
      </div>

      <blog-landing-info heading="What sets our website different">
          <div slot="content" class="acordion">
            <p class="acordion__title">No matter where you are in the process, we’d love to read you</p>

            <Accordion>
              <AccordionTab header="No matter where you are in the process," :active="false">
                The creative process is a model and it very certainly works different for each person. Yet, it can be a starting point to experiment with your very own creative process. The questions is that our community can help you to discover what works for you and we urge you to come up with your own reflections to consciously design for each step. In one way, the "Gym" is our way to experiment with the creative process. 
              </AccordionTab>
              <AccordionTab header="we’d love to read you">
                When you experience life through the eyes of another, you encounter diverse angles on life’s most common situations. Talented authors will naturally inspire empathy for their characters, and empathizing with viewpoints different from your own can feel uncomfortable. Extremely uncomfortable. While reading doesn’t mean that you’ll agree with different perspectives, it does offer you the opportunity to understand them.
              </AccordionTab>
            </Accordion>  
          </div>   
      </blog-landing-info>
    </section>
  </div>
</template>
    

<script>

import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';

import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';

export default {
  name: "Home",
  components: {
    'Accordion': Accordion,
    'AccordionTab': AccordionTab,
  },

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

<style>

  .grid{
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 370px));
      justify-items: stretch;
      justify-content: space-evenly; 
      padding: 10px 20px 10px 90px;
      gap: 20px;
  }

  .test{
      width: 254px; 
      height: 480px;
      z-index: 10;
  }
.p-accordion .p-accordion-header .p-accordion-header-link{
    background: white;
    padding: 5px;
    font-size: 14px;
}
.p-accordion .p-accordion-header .p-accordion-header-link:focus{
  outline-color: transparent;
}
  .p-accordion-tab .p-accordion-header{
    margin-top: 5px;
    background-color: white;
    padding: 5px;
    font-size: 25px;
  }

  .p-accordion .p-accordion-header{
    margin-top: 0px;
    background-color: white;
    padding: 0px;
    font-size: 25px;
  }

  .p-accordion-tab .p-accordion-header-link:focus{
      outline-color: transparent;
  }

  .p-accordion-tab .p-accordion-content{
    background-color: white;
    padding: 5px;
    font-size: 12px;
  }

  .acordion__title{
    color: #fcf9f7;
    font-size: 35px;
    font-style: italic;
  }
  
  a {
    text-decoration: none;
  }
</style>