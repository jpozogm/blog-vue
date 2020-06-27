<template>
    <nav id="menu">
        <ul>
            <li>
                <router-link :to="'/BackOffice/'">BACK OFFICE</router-link>
            </li>
            <li>
                <button @click="logOut()">Log Out</button>
            </li>
        </ul>
    </nav>
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