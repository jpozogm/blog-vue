import Vue from 'vue'
import Router from 'vue-router'
import BackOffice from './components/backOffice/BackOffice'
import BackOfficeDetails from './components/backOffice/BackOfficeDetails'
import EditComment from './components/backOffice/comments/EditComment'
import EditPost from './components/backOffice/posts/EditPost'
import NewPost from './components/backOffice/posts/NewPost'
import Home from './components/home/Home.vue'
import HomeDetails from './components/home/HomeDetails'
import Login from './components/login/Login'

Vue.use(Router)



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
    { path: '/home', name: 'home', component: Home },
    { path: '/post/:id', name: 'postId', component: HomeDetails },
    { path: '/backOffice', name: 'backOffice', beforeEnter : guardMyroute, component: BackOffice },
    { path: '/PrivatePost/:id', name: 'backOfficePostId', component: BackOfficeDetails },
    { path: '/login', name: 'login', component: Login },
    { path: '/newPost', name: 'newPost', component: NewPost },
    { path: '/editPost/:id', name: 'editPost', component: EditPost },
    { path: '/editComment/:id', name: 'editComment', component: EditComment },
  ]
})

/* path: ‘/backOffice’, component: BackOffice, children: [
  { path: ‘’, name: ‘BackOffice’, component: () => import(“./components/BOPost.vue”) },
  { path: ‘:id’, name: ‘BOPostDetails’, component: () => import(“./components/BOPostDetails.vue”) },
] */