import { createApp } from 'vue'
import App from './desktop/app.vue'
import router from './desktop/router/index.js'

createApp(App).use(router).mount('#app')
