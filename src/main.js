import {createApp} from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import store from './store'
import {loadFonts} from './plugins/webfontloader'
import {createRouter, createWebHistory} from "vue-router";
import VueVirtualScroller from 'vue-virtual-scroller'
import UserProfilePage from "@/views/UserProfilePage.vue";
import FriendPage from "@/views/FriendPage.vue";
import AlbumsPage from "@/views/AlbumsPage.vue";
import AlbumPage from "@/views/AlbumPage.vue";

loadFonts()

const routes = [
    {path: '/', component: UserProfilePage},
    {path: '/friends', component: FriendPage},
    {path: '/id:id', component: UserProfilePage},
    {path: '/albums', component: AlbumsPage},
    {path: '/album:id/:album_id', component: AlbumPage},
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

const app = createApp(App)
app.use(vuetify)
    .use(router)
    .use(store)
    .use(VueVirtualScroller)
await store.dispatch('SET_USER_FROM_API')
app.mount('#app')
