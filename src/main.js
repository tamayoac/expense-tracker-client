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
import can from './helpers/can'


Chart.register(...registerables)

const app = createApp(App)
app.use(store)
app.use(router)
app.use(VueUniversalModal, {
    teleportTarget: '#modals',
})
app.config.globalProperties.$can = can;
app.component('multi-select', Multiselect)
app.mount('#app')

