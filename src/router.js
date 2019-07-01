import Vue from 'vue'
import Router from 'vue-router'
import Day from './views/Day.vue'
Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'login',
        component: () =>
            import ('./views/Login.vue')
    }, {
        path: '/signUp',
        name: 'signUp',
        component: () =>
            import ('./views/SignUp.vue')
    }, {
        path: '/home',
        name: 'home',
        component: () =>
            import ('./views/Home.vue'),
        children: [{ path: '/', redirect: '/today' }, { path: ':day', name: 'day', component: Day }]

    }]
})