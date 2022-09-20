import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import * as ElIcons from '@element-plus/icons'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)
for (const name in ElIcons) {
    app.component(name,(ElIcons as any)[name])
}

app.use(createPinia())
app.use(router)
app.use(ElementPlus)

app.mount('#app')
