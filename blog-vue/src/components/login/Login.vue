<template>
    <div class="login__container">
        <template v-if="sign">
            <form id="SigIn">
                <div class="form-group column">
                    <label for="user" class="form-label">User</label>
                    <input type="text" name="user" class="form-control" v-model="signInForm.user">
                </div>

                <div class="form-group column">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" name="password" class="form-control" v-model="signInForm.password">
                </div>
                <div class="flex__center">
                    <blog-button @click="signIn(signInForm)" text="SIGN IN" class="button"></blog-button>
                    <blog-button @click="changingSign()" text="SIGN UP" class="sign"></blog-button>
                </div>
            </form>
        </template>

        <template v-else>
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
                    <div class="flex">
                    <label class="radio radio--btn">
                        <input type="radio" class="radio__control" name="role" value="publisher" checked="checked" v-model="signUpForm.role">
                        <span class="radio__custom">
                            Publisher
                        </span>
                    </label>

                    <label class="radio radio--btn">
                        <input type="radio" class="radio__control" name="role" value="admin"  v-model="signUpForm.role">
                        <span class="radio__custom">
                            Admin
                        </span>
                    </label>
                    </div>
                </div> 

                <div class="flex__center">
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




export default {
    name: 'login',

    computed: {
        ...mapGetters([
        'token',
        'errored',
        'sign'
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

        changingSign(){
            this.$store.dispatch('changingSign')
        }

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
  border: 1px solid rgb(35, 47, 62);
  outline: none;
  height: 30px;
  padding: 0 15px;
  margin: 5px 0;
}


.radio{
  position: relative;
  overflow: hidden;
  width: 100%;
  display:inline-block;
  min-height: 18px;
  cursor:pointer;
}
.radio__control{
  position: absolute;
  top: -999rem;
  opacity:0;
}
.radio__custom{
    position: absolute;
    top: 0;
    left: 0;
    width: 18px;
    height: 18px;
    border: 1px solid #999;
    border-radius: 1px;
    display:flex;
    justify-content: center;
    align-items:center;
}


.radio__custom::before{
  content: "";
  height: 6px;
  width: 6px;
  background-color: #333;
  border-radius:1px;
  opacity: 0;
  transition: opacity 0.3s;
}
.radio__control:checked ~ .radio__custom::before{
  opacity: 1;
}

.radio--btn{
  position: relative;
  overflow: hidden;
  display:inline-block;
  min-height: 35px;
  cursor:pointer;
}

.radio--btn .radio__custom{
    position: static;
    width: auto;
    min-height: 30px;
    padding: 3px 16px;
    border:0;
    background-color: white;
    border: 1px solid black;
    color:black;
    font-family: sans-serif;
}
.radio--btn .radio__custom::before{
  display:none;
}
.radio__control:checked ~ .radio__custom{
  background-color: rgba(29, 161, 242, 0.8);
  color: white;
  font-weight: 700;
}
</style>
