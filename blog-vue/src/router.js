import Vue from 'vue'
import { default as Router, default as VueRouter } from 'vue-router'
import Home from './components/home/Home.vue'
import BackOfficeLayout from './views/BackOfficeLayout'
import HomeLayout from './views/HomeLayout'



Vue.use(VueRouter);



  function guardMyroute(to, from, next){
    var isAuthenticated= false;

    if(localStorage.getItem('token')){
      isAuthenticated = true;
    }else{
      isAuthenticated= false;
    }
      
    if(isAuthenticated) {
      next();
    } else{
      next('/login');
    }
  }


export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  
  routes: [
    { path: '/', redirect: '/home' },
    { 
      path: '/home', component: HomeLayout, children: [
        { path: '', component: Home },
        { path: ':id', name: 'HomeDetails', component: () => import("./components/home/HomeDetails") },
      ]
    },
    {
      path: '/backOffice', component: BackOfficeLayout, children: [
        { path: '/', name: 'backOffice', beforeEnter : guardMyroute, component: () => import('./components/backOffice/BackOffice') },
        { path: ':id', name: 'backOfficeDetail', component: () => import ('./components/backOffice/BackOfficeDetails') },
        { path: '/newPost', name: 'newPost', component: () => import ('./components/backOffice/posts/NewPost')},
        { path: '/editPost/:id', name: 'editPost', component: () => import ('./components/backOffice/posts/EditPost') }, 
        { path: '/editComment/:id', name: 'editComment', component: () => import ('./components/backOffice/comments/EditComment')},
      ]
    },
    { path: '/login', name: 'login', component: () => import ('./components/login/Login') },
  ]
})
