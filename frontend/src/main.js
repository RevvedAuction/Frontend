import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './main.css';
import 'bootstrap/dist/css/bootstrap.min.css';  // Bootstrap CSS
import 'bootstrap'; // Bootstrap JS


createApp(App)
  .use(router)
  .mount('#app');
