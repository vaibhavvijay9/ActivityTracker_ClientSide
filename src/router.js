import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home_Default.vue'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'home_default',
            component: Home
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/About.vue')
        }, {
            path: '/login',
            name: 'login',
            component: () =>
                import ( /* webpackChunkName: "login" */ './views/Login.vue')
        }, {
            path: '/signUp',
            name: 'signUp',
            component: () =>
                import ( /* webpackChunkName: "signUp" */ './views/SignUp.vue')
        }, {
            path: '/home',
            name: 'home',
            component: () =>
                import ( /* webpackChunkName: "home" */ './views/Home.vue')
        }
    ]
})