import { createApp } from 'vue'
import 'normalize.css'

import './assets/css/index.less'
import App from './App.vue'
import router from './router'
import store from './store'
import { globalRegister } from './global'

const app = createApp(App)

app.use(globalRegister)
app.use(store)
app.use(router)
app.mount('#app')
