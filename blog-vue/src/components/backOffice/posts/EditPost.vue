  
<template>
  <div id="newPost">
    <template>
        <form id="updatePost" @submit.prevent="updatePost()">

            <div>
                <h2>{{post.postTittle}}</h2>
                <label>Author:</label>
                <p>{{post.postAuthorName}}</p>
            </div>

                <div class="form-group">
                    <label for="user">Title</label>
                     <input type="text" name="user" v-model="updateForm.postTittle">
                </div>

                <div class="form-group">
                    <input type="text" name="password" v-model="updateForm.postContent">
                </div>

            <button type="submit" class="signIn">SAVE</button> 
            <button class="signIn" @click="back()">CANCEL</button>
        </form>
    </template>
  </div>
</template>



<script>

import * as jwt_decode from 'jwt-decode';
import { mapGetters, mapActions } from 'vuex';

export default {


    name: 'editPost',
    beforeMount(){
        let id = this.$route.params.id;
        this.$store.dispatch('loadPost', id)
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
            this.$router.push(`/PrivatePost/${this.post._id}`)
        },

        back(){
            this.$router.push(`/PrivatePost/${this.post._id}`);
        }
    }  
}
</script>