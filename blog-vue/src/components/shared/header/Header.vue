  
<template>
  <div id="Header">
    <HeaderNoLoggued v-if="!isLoggued"></HeaderNoLoggued>
    <HeaderLoggued v-if="isLoggued"></HeaderLoggued>
  </div>
</template>



<script>
import * as jwt_decode from 'jwt-decode';
import HeaderNoLoggued from './HeaderNoLoggued';
import HeaderLoggued from './HeaderLoggued';


export default {
  name: 'Header',
  components: {
    HeaderNoLoggued,
    HeaderLoggued,
  },
  data() {

    
    return {
      isLoggued: false
    };
  },
  
  beforeUpdate(){
    
    const token = localStorage.getItem('token');
    const tokenInfo = jwt_decode(token);

    if (tokenInfo) {
      this.isLoggued = true;
    } else {
      this.isLoggued = false;
    }
  }

}
</script>