import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import usuario from './classes/usuario'

//import bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'

createApp(App).use(store).use(router).use(usuario).mount('#app')
