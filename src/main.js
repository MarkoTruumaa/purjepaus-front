import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios";
import VueAxios from "vue-axios";
import 'bootstrap/dist/css/bootstrap.min.css'


createApp(App).use(router).mount('#app')
Vue.use(VueAxios, axios)

import 'bootstrap/dist/js/bootstrap.js'