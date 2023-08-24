import UserProfilePage from "@/views/UserProfilePage.vue";
import FriendPage from "@/views/FriendPage.vue";
import AlbumsPage from "@/views/AlbumsPage.vue";
import AlbumPage from "@/views/AlbumPage.vue";
import NewsFeedPage from "@/views/NewsFeedPage.vue";
import MessagesPage from "@/views/MessagesPage.vue";
import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {path: '/', component: UserProfilePage},
    {path: '/friends', component: FriendPage},
    {path: '/id:id', component: UserProfilePage},
    {path: '/albums', component: AlbumsPage},
    {path: '/album:id/:album_id', component: AlbumPage},
    {path: '/feed', component: NewsFeedPage},
    {path: '/messages', component: MessagesPage},
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})
