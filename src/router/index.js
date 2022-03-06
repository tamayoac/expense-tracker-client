import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import Expense from '../views/Expense.vue'
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'
import Category from '../views/Category.vue'
import Role from '../views/Role.vue'
import User from '../views/User.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      guest: true
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      auth: true
    }
  },
  {
    path: '/expenses',
    name: 'Expense',
    component: Expense,
    meta: {
      auth: true
    }
  },
  {
    path: '/roles',
    name: 'Role',
    component: Role,
    meta: {
      auth: true
    }
  },
  {
    path: '/categories',
    name: 'Categories',
    component: Category,
    meta: {
      auth: true
    }
  },
  {
    path: '/users',
    name: 'User',
    component: User,
    meta: {
      auth: true
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    if(!store.getters.isLoggedIn) {
      next({name: 'Login'})
    } else {
      next()
    }
  } else if(to.matched.some(record => record.meta.guest)) {
    if(store.getters.isLoggedIn) {
      next({name: 'Dashboard'})
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
