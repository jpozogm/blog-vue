<template>
    <div>
        <template>
            <form id="SigIn" @submit.prevent="signIn(signInForm)">
                <div class="form-group">
                    <label for="user">User</label>
                    <input type="text" name="user" v-model="signInForm.user">
                </div>

                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" name="password" v-model="signInForm.password">
                </div>

                <button type="submit" class="signIn">SIGN IN</button>
                <button class="signIn"  @click="changingSign()" >SIGN UP</button>
            </form>
        </template>

        <template>
            <form id="SignUp" @submit.prevent="signUp()">
                <div class="form-group">
                    <label for="userName">User</label>
                    <input type="text" name="user" v-model="signUpForm.user">
                </div>

                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" name="password" v-model="signUpForm.password">
                </div>

                <div class="form-group">
                    <label for="repeatPassword">Repeat Password</label>
                    <input type="password" name="repeatPassword">
                </div>

                <div class="form-group">
                    <label for="role">Role</label>
                    <input type="radio" name="role" value="publisher" checked v-model="signUpForm.role"/> publisher
                    <input type="radio" name="role" value="admin" v-model="signUpForm.role"/> Admin
                </div>

                <button type="submit" class="signIn">SIGN UP</button>
                <button class="signIn" @click="changingSign()">SIGN IN</button>
            </form>
        </template>
    </div>
</template>



<script>
import LoginService from '../../services/login.service.js';
import { mapGetters, mapActions } from 'vuex'
 
export default {
    name: 'login',
    computed: {
        ...mapGetters([
        'token',
        'errored'
        ]),
        ...mapActions([
        'loadPost'
        ])
    },

    data(){
        return{
            signInForm:{
                user: "",
                password: ""
            },
            signUpForm:{
                user: "",
                password: "",
                role: ""
            },
        }
    },

    methods: {
        async signIn(login){
            await this.$store.dispatch('signIn', login)
            localStorage.setItem('token', this.token);
            this.$router.push('/backOffice'); 
        },


        signUp(){
            LoginService.signUp(this.signUpForm)
            .then(res => {

            const form = {
                user: res.data.user,
                password: this.signUpForm.password,
            };
            this.signIn(form);
            })

            .catch(error => {
                 console.log(error)
                  this.errored = true
               })
            .finally(() => this.loading = false)
        },

    } 
}

</script>

