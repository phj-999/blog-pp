import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//自适应  修改设置成24等份，设计稿时1920px的，这样1rem就是80px （1920/24=80）方便使用
import 'lib-flexible/flexible.js'

createApp(App).use(store).use(router).mount('#app')
