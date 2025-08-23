import { createRouter, createWebHistory } from 'vue-router';
import store from './store/store'; // import your Vuex store
import { IS_USER_AUTHENTICATE_GETTER } from './store/storeconstants';

const Home = () => import('./pages/welcomepage.vue');
const Login = () => import('./pages/AccountSetUpPage.vue');
const Product = () => import('./pages/productPage.vue');
const AuctionSession = () => import('./pages/auctionSession.vue');

const routes = [
    { path: '/', redirect: '/welcome'},
    { path: '/welcome', component: Home },
    { path: '/account-setup', component: Login, meta: { auth: false } },
    { path: '/product', component: Product, meta: { auth: false } },
    { path: '/auction', component: AuctionSession, meta: { auth: true } },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Navigation guard for auth
router.beforeEach((to, from, next) => {
    const isAuthenticated = store.getters[`auth/${IS_USER_AUTHENTICATE_GETTER}`];

    if (to.meta.auth && !isAuthenticated) {
        // Route requires auth but user isn't authenticated
        next('/login');
    } else if (!to.meta.auth && isAuthenticated && to.path === '/login') {
        // Authenticated user trying to access login/signup
        next('/posts');
    } else {
        next();
    }
});

export default router;