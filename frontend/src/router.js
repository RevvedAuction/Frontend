import { createRouter, createWebHistory } from 'vue-router';

const Home = () => import('./pages/welcomepage.vue');
const AccountSetUp = () => import('./pages/AccountSetUpPage.vue');
const Product = () => import('./pages/productPage.vue');
const AuctionSession = () => import('./pages/auctionSession.vue');
const CarDetails = () => import('./pages/CarDetailsPage.vue');
const Payment = () => import('./pages/PaymentPage.vue');

const routes = [
    { path: '/', redirect: '/welcome' },
    { path: '/welcome', component: Home },
    { path: '/account-setup', component: AccountSetUp, meta: { auth: false } },
    { path: '/product', component: Product, meta: { auth: false } },
    { path: '/auction', component: AuctionSession, meta: { auth: true } },
    { path: '/cardetails/:vin', component: CarDetails, meta: { auth: false } },
    { path: '/payment', component: Payment, meta: { auth: true } },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;