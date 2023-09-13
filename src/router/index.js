import {createRouter, createWebHashHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/LoginView.vue";
import ErrorView from "@/views/ErrorView.vue";
import HarboursView from "@/views/HarboursView.vue";
import SearchView from "@/views/SearchView.vue";
import AboutView from "@/views/AboutView.vue";
import ProfileView from "@/views/ProfileView.vue";
import EditUserView from "@/views/EditUserView.vue";



const routes = [
    {
        path: '/',
        name: 'homeRoute',
        component: HomeView
    },
    {
        path: '/login',
        name: 'loginRoute',
        component: LoginView
    },
    {
        path: '/error',
        name: 'errorRoute',
        component: ErrorView
    },
    {
        path: '/harbours',
        name: 'harboursRoute',
        component: HarboursView
    },
    {
        path: '/search',
        name: 'searchRoute',
        component: SearchView
    },
    {
        path: '/about',
        name: 'aboutRoute',
        component: AboutView
    },
    {
        path: '/profile',
        name: 'profileRoute',
        component: ProfileView
    },

    {
        path: '/edit-user',
        name: 'editUserRoute',
        component: EditUserView
    },




]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
