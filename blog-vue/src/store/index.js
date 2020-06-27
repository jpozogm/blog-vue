import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';
import CommentProxyService from '../services/comment-proxy.service';
import LoginService from '../services/login.service.js';
import PostsProxyService from '../services/post-proxy.service';


Vue.use(Vuex, axios);


export default new Vuex.Store({
    
    strict:true,

    state:{
        posts: [],
        post: {},
        comment:{},
        loading: true,
        errored: false,
        token: '',
        signed: false,
    },

    getters:{
        post: state => {return state.post},
        posts: state => {return state.posts},
        comment: state => {return state.comment},
        loading: state => {return state.loading},
        errored: state => {return state.errored},
        token: state => {return state.token},
        signed: state => {return state.signed},
    },

    actions:{
        loadPosts({commit}){
            PostsProxyService.getPosts()
            .then(res => {
              if (res.data) {
                let posts = res.data
                this.loading = false
                commit('SET_POSTS', posts)
              }
            })
            .catch(error => {
                this.error = error.message;
                commit('ERRORED')
            })
            .finally(() => commit('LOADING'))
        },

        loadPost({commit}, id){
            PostsProxyService.getPost(id)
            .then(res => {
              if (res.data) {
                let post = res.data
                this.loading = false
                commit('SET_POST', post)
              }
            })
            .catch(error => {
                this.error = error.message;
                commit('ERRORED')
            })
            .finally(() => commit('LOADING'))
        },

        saveNewPost({commit}, newPost){
            PostsProxyService.saveNewPost(newPost)
            .then(res => {
                if (res.data) {
                    commit('NEW_POST', res.data)
                }
            })
            .catch(error => {
                this.error = error.message;
                commit('ERRORED')
            })
            .finally(() => commit('LOADING'))
        },

        updatePost({commit}, payload){
            const id = payload.id
            const UpdatedPost = payload.updateForm
    
            PostsProxyService.updatePost(id, UpdatedPost)
            .then(res => {
                if (res.data) {
                    console.log('res.data',res.data)
                    commit('UPDATE_POST', res.data)
                }
            })
            .catch(error => {
                this.error = error.message;
                commit('ERRORED')
            })
            .finally(() => commit('LOADING'))
        },

        
        deletePost({commit}, id){
            PostsProxyService.deletePost(id)
            .then(res => {
              if (res.data) {
                this.loading = false
                commit('DELETE_POST', id)
              }
            })
            .catch(error => {
                this.error = error.message;
                commit('ERRORED')
            })
            .finally(() => commit('LOADING'))
        },

        getComment({commit}, id){
            CommentProxyService.getComment(id)
            .then(res => {
                if (res.data) {
                    let comment = res.data
                    this.loading = false
                    commit('GET_COMMENT', comment)
                  }
                })
                .catch(error => {
                    this.error = error.message;
                    commit('ERRORED')
                })
                .finally(() => commit('LOADING'))
        },

        saveNewComment({commit}, payload){
            const id = payload.id
            const comment = payload.newComment

            CommentProxyService.saveNewComment(id, comment)
            .then(res => {
                if (res.data) {
                    commit('NEW_COMMENT', res.data)
                }
            })
            .catch(error => {
                this.error = error.message;
            })
            .finally(() => this.loading = false)
            },

        updateComment({commit}, payload){
            const id = payload.id
            const comment = payload.updatedComment
    
            CommentProxyService.updateComment(id, comment)
            .then(res => {
                if (res.data) {
                    commit('UPDATE_COMMENT', res.data)
                }
            })
            .catch(error => {
                this.error = error.message;
                commit('ERRORED')
            })
            .finally(() => commit('LOADING'))
        },

        deleteComment({commit},id){
            CommentProxyService.deleteComment(id)
           .then(res => {
                if (res.data) {
                    commit('DELETE_COMMENT', id)
                }
           })
           .catch(error => {
            this.error = error.message;
            commit('ERRORED')
           })

        },

        signIn({commit},login){
            return LoginService.signIn(login)
            .then(res => {   
                commit('SIGN_IN', res.data);
                return new Promise(resolve => { resolve(res)})
            })
            .catch(error => {
                this.error = error.message;
                commit('ERRORED')
            })
            .finally(() => commit('LOADING'))
        },

        logOut({commit}){
            commit('LOG_OUT');
        }
    },
    mutations:{
        SET_POSTS (state, posts){
            state.posts = posts   
        },
        SET_POST (state, post){
            state.post = post   
        },

        NEW_POST (state, post){
            const newPosts = [...state.posts, post];
            state.posts = newPosts; 
        },

        UPDATE_POST(state, post){
            const newPost = [...state.posts, post];
            state.posts = newPost;

        },

        DELETE_POST (state, id){
            let index = state.posts.findIndex(post => post.id == id)
            state.posts.splice(index, 1) 
        },
        

        GET_COMMENT(state, comment){
            state.comment = comment 
        },

        NEW_COMMENT(state, comment){
            const newPost = [...state.post.postComments, comment];
            state.post.postComments = newPost;
        },

        UPDATE_COMMENT(state, comment){

            console.log('comment', comment)

            const newPost = [...state.post.postComments, comment];
            state.post.postComments = newPost;

        },

        DELETE_COMMENT(state, id){
            const newPosts = state.post.postComments.filter(comment => comment._id !== id);
            const post = state.post
            const newPost = {...post, postComments: newPosts };

            state.post = newPost;
        },

        SIGN_IN(state, login){
            state.token = login.token;
            state.signed = true;
        },

        LOG_OUT(state){
            state.signed = false;
        },

        LOADING (state){
            state.loading = false;
        },

        ERRORED (state){
            state.errored = true;
        }
    },
    modules:{}
});
