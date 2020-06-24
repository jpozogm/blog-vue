<template>
    <nav id="menu">
        <ul>
            <li>
                <router-link :to="'/BackOffice/'">BACK OFFICE</router-link>
            </li>
            <li>
                <button @click="logOut()">Log Out</button>
            </li>
            <li>
                {{infoToken.body.user}} - {{infoToken.body.role}}
            </li>
        </ul>

    </nav>
</template>

<script>
import * as jwt_decode from 'jwt-decode';

export default {
    name: 'HeaderLoggued',
    methods: {
        logOut() {
            localStorage.removeItem('token');
        }
    },
     data() {
    const token = localStorage.getItem('token');
    const tokenInfo = jwt_decode(token);
        return {
            infoToken: tokenInfo
        };
    }
}
</script>