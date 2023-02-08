import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Auth from "../views/Auth";
import Profile from "../views/Profile";
import Settings from "../views/Settings";
import Notes from "../views/Notes";


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/notes',
    name: 'Notes',
    component: Notes
  }
]

const router = new VueRouter({
  routes
})

export default router
