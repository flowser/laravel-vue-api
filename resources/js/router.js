import VueRouter from 'vue-router';

import Home from './views/Home.vue';
import Login from './views/Login.vue';
import About from './views/about.vue';
import Dashboard from './views/Dashboard.vue';

let routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/dashboard',
        component: Dashboard,
        meta: { middlewareAuth: true }
    }
];

const router = new VueRouter({
    routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.middlewareAuth)) {
        if (!auth.check()) {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            });

            return;
        }
    }

    next();
})
export default router;
