import { createApp } from 'vue'
import App from './App.vue'
import './main.css'
import * as VueRouter from 'vue-router'

createApp(App)
.use(VueRouter.createRouter({
    history: VueRouter.createWebHistory(process.env.BASE_URL),
    routes: [{
        path: '/session',
        component: () => import('./pages/auctionSession.vue')
    }
    , {
        path: '/product',
        component: () => import('./pages/productPage.vue')
    }
    , {
        path: '/welcome',
        component: () => import('./pages/welcomepage.vue')
    }]
}))
.mount('#app')
