  
<template>
  <div id="Header">
    <HeaderNoLoggued v-if="!signed"></HeaderNoLoggued>
    <HeaderLoggued v-if="signed"></HeaderLoggued>
  </div>
</template>



<script>
import HeaderNoLoggued from './HeaderNoLoggued';
import HeaderLoggued from './HeaderLoggued';
import { mapGetters } from 'vuex'


export default {
  name: 'Header',
  components: {
    HeaderNoLoggued,
    HeaderLoggued,
  },

  computed: {
    ...mapGetters([
      'token',
      'signed',
    ]),
  }
}
</script>