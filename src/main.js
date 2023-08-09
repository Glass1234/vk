import {createApp} from 'vue'
import App from './App.vue'
import store from './store'
import {loadFonts} from './plugins/webfontloader'
import VueVirtualScroller from 'vue-virtual-scroller'
import {router} from "@/router";
// Vuetify
import 'vuetify/styles'
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
})

loadFonts()

const app = createApp(App)
app.use(vuetify)
    .use(router)
    .use(store)
    .use(VueVirtualScroller)
await store.dispatch('SET_USER_FROM_API')
app.mount('#app')
