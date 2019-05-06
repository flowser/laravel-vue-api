import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import storeData from "./store/index";
const store = new Vuex.Store(
    storeData
)

import VueRouter from 'vue-router';

import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Logout from './views/Logout.vue';
import Register from './views/Register.vue';
import About from './views/about.vue';
import Dashboard from './views/Dashboard.vue';

let routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: About,
        meta:{
            requiresAuth:true,
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta:{
            requiresVisitor:true,
        }
    },
    {
        path: '/logout',
        name: 'Logout',
        component: Logout
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        meta:{
            requiresVisitor:true,
        }
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta:{
            requiresAuth:true,
        }
    }
];

const router = new VueRouter({
    mode:'history',
    routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      // this route requires auth, check if logged in
      // if not, redirect to login page.
      if (!store.getters.loggedIn) {
        next({
          name: 'Login',
        })
      } else {
        next()
      }
    }else if (to.matched.some(record => record.meta.requiresVisitor)) {
        // if you are logged in buton browser seem snot but if try to log
        // in you will be directed to dashoabrd
        // if logged in, redirect to specified page after loged in.
        if (store.getters.loggedIn) {
          next({
            name: 'About',
          })
        } else {
          next()
        }
      } else {
      next() // make sure to always call next()!
    }
  })

export default router;
