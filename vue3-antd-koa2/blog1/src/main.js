import { createApp } from 'vue'
import App from './App.vue'
//import router from './router'
import { usePlugins } from './plugins/index'

const app = createApp(App)

usePlugins(app)

app.mount('#app')

// app.use
// createApp(App)
// .use(router)
// .mount('#app')
