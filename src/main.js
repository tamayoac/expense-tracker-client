import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '../src/assets/styles/main.css'
import 'vue-universal-modal/dist/index.css'
import VueUniversalModal from 'vue-universal-modal'
import Multiselect from '@vueform/multiselect'
import '@vueform/multiselect/themes/default.css'
import { Chart, registerables } from "chart.js";

Chart.register(...registerables)

createApp(App)
.use(store)
.use(router)
.use(VueUniversalModal, {
    teleportTarget: '#modals',
})
.component('multiselect', Multiselect)
.mount('#app')
