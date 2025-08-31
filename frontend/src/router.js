import { createRouter, createWebHistory } from 'vue-router';

const Home = () => import('./pages/welcomepage.vue');
const AccountSetUp = () => import('./pages/AccountSetUpPage.vue');
const Product = () => import('./pages/productPage.vue');
const AuctionSession = () => import('./pages/auctionSession.vue');
const CarDetails = () => import('./pages/CarDetailsPage.vue');
const AuctionHistory = () => import('./pages/AuctionHistory.vue');
const IndividualForm = () => import('./pages/IndividualForm.vue');

const routes = [
    { path: '/', redirect: '/welcome' },
    { path: '/welcome', component: Home },
    { path: '/account-setup', component: AccountSetUp, meta: { auth: false } },
    { path: '/product', component: Product, meta: { auth: false } },
    { path: '/auction', component: AuctionSession, meta: { auth: true } },
    { path: '/cardetails/:vin', component: CarDetails, meta: { auth: false } },
    { path: '/auction-history', component: AuctionHistory, meta: { auth: true } },
    { path: '/individual-form', component: IndividualForm, meta: { auth: false } },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;