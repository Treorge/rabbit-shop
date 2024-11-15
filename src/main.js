// import './assets/main.css'
import '@/styles/common.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
//懒加载插件
import { lazyPlugin } from './directives'
//全局注册通用组件
import { componentsPlugin } from './components'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(lazyPlugin)
app.use(componentsPlugin)
app.mount('#app')
