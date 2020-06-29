<template>

    <blog-navbar>
        
        <div slot="navbar__items">
            <div class="navbar__btns flex">
                <router-link :to="'/BackOffice/'"><blog-navbar-btn text="BACK OFFICE"></blog-navbar-btn></router-link>    
                <blog-navbar-btn text="LOG OUT" @click="logOut()"></blog-navbar-btn>
            </div>
        </div> 

    </blog-navbar>


 
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'HeaderLoggued',
      computed: {
        ...mapGetters([
        'token',
        ]),
    },
    methods: {
        logOut() {
            this.$store.dispatch('logOut');
            localStorage.removeItem('token');
            this.$router.push('/home'); 
        }
    },
}
</script>