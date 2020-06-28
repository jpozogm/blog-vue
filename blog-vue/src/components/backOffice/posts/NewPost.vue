  
<template>
  <div id="newPost">
    <template>
   
        <form id="newPost">
            <Card class="w-80">
                <template slot="title">
                    <div class="form-group">
                        <label for="user">Title</label>
                        <InputText type="text" name="user" class="form-comtrol mt-10 w-100" v-model="newPost.postTittle" />
                    </div>
                </template>

                <template slot="content">
                    <div class="form-group mt-10">
                        <Textarea type="text" name="user" rows="15" class="form-comtrol mt-10 w-100" v-model="newPost.postContent" />
                    </div>
                </template>

                <template slot="footer">
                    <Button label="SAVE" class="signIn p-button-success p-button-raised btn mt-10" @click="saveNewPost()"/>
                    <Button label="CANCEL" class="signIn p-button-danger p-button-raised btn btn" @click="back()"/>
                </template>
             </Card>
        </form>
   
    </template>
  </div>
</template>



<script>
import * as jwt_decode from 'jwt-decode';

import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Card from 'primevue/card';
import Textarea from 'primevue/textarea';

export default {
    name: 'newPost',
    components: {
      'Button': Button,
      'InputText': InputText,
      'Textarea': Textarea,
      'Card': Card
    },

    data(){
        const token = localStorage.getItem('token');
        const tokenInfo = jwt_decode(token);

        return{
            loading: true,
            errored: false,

            newPost:{
                postAuthorName: tokenInfo.body.user,
                postAuthorNickName: tokenInfo.body.user,
            },
        }
    },    

    methods: {
        back(){
            this.$router.push('/backOffice')
        },

        async saveNewPost(){
            this.$store.dispatch('saveNewPost', this.newPost)
            this.$router.push('/backOffice');

        },
    }
}
</script>

<style>


 .mt-10{
    margin-top: 10px;
  }
  .w-100{
    width: 100%;
  }

   .w-80{
    width: 70%;
    margin: 0 auto;
  }

 .form-group .p-inputtext{
    background-color: white;
    color: black
  }

.form-group textarea{
    padding: 10px;
  }
</style>