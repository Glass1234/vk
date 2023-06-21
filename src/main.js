import {createApp} from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import store from './store'
import {loadFonts} from './plugins/webfontloader'
import {createRouter, createWebHistory} from "vue-router";
import FriendPage from "@/views/FriendPage.vue";
import UserProfilePage from "@/views/UserProfilePage.vue";

loadFonts()

const routes = [
    {path: '/friends', component: FriendPage},
    {path: '/', component: UserProfilePage},
    {path: '/id:id', component: UserProfilePage}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

const app = createApp(App)
app.use(vuetify)
    .use(router)
    .use(store)
await store.dispatch('SET_USER_FROM_API')
app.mount('#app')
