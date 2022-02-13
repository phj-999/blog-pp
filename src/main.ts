import { createApp } from 'vue'
import 'normalize.css'

import './assets/css/index.less'
import App from './App.vue'
import router from './router'
import store, { setupStore } from './store'
import { globalRegister } from './global'

const app = createApp(App)

app.use(globalRegister)
app.use(store)
setupStore()
app.use(router)

app.mount('#app')
