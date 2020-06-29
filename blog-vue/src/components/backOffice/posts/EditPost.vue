  
<template>
  <div id="newPost">
    <template>
        <form id="updatePost">
            <Card class="w-80">

                <template slot="header">
                    <div class="form-group">
                        <label class="label-header">Author: {{post.postAuthorName}}</label>
                    </div>
                </template>

                <template slot="title">
                    <div class="form-group">
                        <label class="title" for="title">Title</label>
                        <InputText type="text" name="title" class="form-comtrol mt-10 w-100" :placeholder="post.postTittle" v-model="updateForm.postTittle" />
                    </div>
                </template>

                <template slot="content">
                    <div class="form-group mt-10">
                        <Textarea type="text" name="content" rows="15" class="form-comtrol mt-10 w-100" :placeholder="post.postContent" v-model="updateForm.postContent" />
                    </div>
                </template>

                <template slot="footer">
                    <Button label="SAVE" class="signIn p-button-success p-button-raised btn mt-10" @click="updatePost()"/>
                    <Button label="CANCEL" class="signIn p-button-danger p-button-raised btn btn" @click="back()"/>
                </template>
            </Card>
        </form>
    </template>
  </div>
</template>



<script>

import * as jwt_decode from 'jwt-decode';
import { mapGetters, mapActions } from 'vuex';

import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Card from 'primevue/card';
import Textarea from 'primevue/textarea';

export default {


    name: 'editPost',
    components: {
      'Button': Button,
      'InputText': InputText,
      'Textarea': Textarea,
      'Card': Card
    },

    beforeMount(){
        let id = this.$route.params.id;
        this.$store.dispatch('loadPost', id)
        this.scrollToTop();
    },

    computed: {
        ...mapGetters([
        'post',
        'loading',
        'errored'
        ]),
        ...mapActions([
        'loadPost',
        ])
    },

    data() {
        const token = localStorage.getItem('token');
        const tokenInfo = jwt_decode(token);

    
        return {
            infoToken: tokenInfo,

            updateForm:{
            },
        };
    },

    methods: {

        async updatePost(){
            let id = this.$route.params.id;
            const payload= {id:id, updateForm:this.updateForm};
            await this.$store.dispatch('updatePost', payload)
            this.$router.push(`/backOffice/${this.post._id}`)
        },

        back(){
            this.$router.push(`/backOffice/${this.post._id}`);
        },
        scrollToTop() {
           
        }
    }  
}
</script>

<style scoped>
    .p-component{
        color: black;
        padding: 15px;
    }
</style>