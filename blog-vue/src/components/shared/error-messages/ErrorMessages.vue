  
<template>
  <div id="Error">
    <Message v-if="errored" severity="warn" :life="10000" :sticky="false">Something was wrong</Message>
  </div>
</template>



<script>
import { mapGetters } from 'vuex'
import Message from 'primevue/message';

export default {
  name: 'ErrorMessages',
  components: {
      'Message': Message,
  },

  computed: {
    ...mapGetters([
        'errored',
    ]),
  }
}
</script>

<style>
.p-message .p-message-wrapper{
    margin-top: -34px;
}

</style>
