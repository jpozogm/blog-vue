<template>
    <div class="login__container">
        <template>
            <form id="SigIn">
                <div class="form-group column">
                    <label for="user" class="form-label">User</label>
                    <input type="text" name="user" class="form-control" v-model="signInForm.user">
                </div>

                <div class="form-group column">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" name="password" class="form-control" v-model="signInForm.password">
                </div>
                <div class="flex">
                    <blog-button @click="signIn(signInForm)" text="SIGN IN" class="button"></blog-button>
                    <blog-button @click="changingSign()" text="SIGN UP" class="sign"></blog-button>
                </div>
            </form>
        </template>

        <template>
            <form id="SignUp">
                <div class="form-group column">
                    <label for="userName" class="form-label">User</label>
                    <input type="text" name="user" class="form-control" v-model="signUpForm.user">
                </div>

                <div class="form-group column">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" name="password" class="form-control" v-model="signUpForm.password">
                </div>

                <div class="form-group column">
                    <label for="repeatPassword" class="form-label">Repeat Password</label>
                    <input type="password" class="form-control" name="repeatPassword">
                </div>

                <div class="form-group column">
                    <label for="role" class="form-label">Role</label>

                    <div class="p-field-radiobutton flex">
                        <RadioButton inputId="Publisher" class="radiobutton" name="role" value="publisher" v-model="signUpForm.role"/>
                        <label for="publisher">publisher</label>
                    </div>
                    <div class="p-field-radiobutton flex">
                        <RadioButton class="radiobutton" inputId="Admin" name="role" value="admin" v-model="signUpForm.role"/>
                        <label for="Admin">Admin</label>
                    </div>
                </div>

                <div class="flex">
                    <blog-button @click="signUp()" text="SIGN UP" class="button"></blog-button>
                    <blog-button @click="changingSign()" text="SIGN IN" class="sign"></blog-button>
                </div>
            </form>
        </template>
    </div>
</template>



<script>
import LoginService from '../../services/login.service.js';
import { mapGetters, mapActions } from 'vuex';

import RadioButton from 'primevue/radiobutton';


export default {
    name: 'login',
    components: {
        'RadioButton': RadioButton
    },
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
            user:"",
            password: "",
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
<style scoped>

.login__container{
    width: 20%;
}

.button {
    --radh-button-background-color: rgb(35, 47, 62);
    --radh-button-color: white;
}

.form-label{
  padding-top: 20px;
  font-size: 20px;
}

.column{
    display: flex;
    flex-direction: column;
}

.form-control{
  border: 1px slolid  rgb(35, 47, 62);
  outline: none;
  height: 30px;
  padding: 0 15px;
  margin: 5px 0;
}


</style>
