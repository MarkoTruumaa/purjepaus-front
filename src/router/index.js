import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import ErrorView from '@/views/ErrorView.vue'
import HarboursView from '@/views/HarboursView.vue'
import SearchView from '@/views/SearchView.vue'
import AboutView from '@/views/AboutView.vue'
import ProfileView from '@/views/ProfileView.vue'
import EditHarbourView from '@/views/EditHarbourView.vue'
import AddHarbourView from '@/views/AddHarbourView.vue'
import CreateNewUser from '@/views/CreateNewUserView.vue'
import HarbourView from '@/views/HarbourView.vue'

const routes = [
  {
    path: '/',
    name: 'homeRoute',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'loginRoute',
    component: LoginView,
  },
  {
    path: '/error',
    name: 'errorRoute',
    component: ErrorView,
  },
  {
    path: '/harbours',
    name: 'harboursRoute',
    component: HarboursView,
  },
  {
    path: '/harbour',
    name: 'harbourRoute',
    component: HarbourView,
  },

  {
    path: '/search',
    name: 'searchRoute',
    component: SearchView,
  },
  {
    path: '/about',
    name: 'aboutRoute',
    component: AboutView,
  },
  {
    path: '/profile',
    name: 'profileRoute',
    component: ProfileView,
  },
  {
    path: '/edit-harbour',
    name: 'editHarbourRoute',
    component: EditHarbourView,
  },
  {
    path: '/add-harbour',
    name: 'addHarbourRoute',
    component: AddHarbourView,
  },
  {
    path: '/new-user',
    name: 'createNewUserRoute',
    component: CreateNewUser,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
