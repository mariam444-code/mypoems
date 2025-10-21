import { createApp } from 'vue'
import router from '@/desktop/router/index.js'

// Detecteren of het een mobiel apparaat is
const isMobile = /Android|iPhone|iPad|iPod|Windows Phone|webOS|BlackBerry/i.test(
    navigator.userAgent
)

// Dynamisch importeren van App.vue
const appImport = isMobile
    ? import('@/mobile/app.vue')
    : import('@/desktop/app.vue')

appImport.then(module => {
    const App = module.default
    const app = createApp(App)
    app.use(router)
    app.mount('#app')
})
