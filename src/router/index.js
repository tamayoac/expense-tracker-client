import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import Expense from '../views/Expense.vue'
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'
import Category from '../views/Category.vue'
import Role from '../views/Role.vue'
import User from '../views/User.vue'
import Account from '../views/Account.vue'
import PageNotFound from '../views/PageNotFound.vue'
const routes = [
  {
    path: '/',
    redirect: '/login',
    meta: {
        guest: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      guest: true
    }
  },
  {
    path: '/404',
    name: '404',
    component: PageNotFound,
    meta: {
      guest: true
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      auth: true,
      gate: 'view_dashboard'
    },
    
  },
  {
    path: '/expenses',
    name: 'Expenses',
    component: Expense,
    meta: {
      auth: true,
      gate: 'view_category'
    }
  },
  {
    path: '/roles',
    name: 'Roles',
    component: Role,
    meta: {
      auth: true,
      gate: 'view_role'
    }
  },
  {
    path: '/categories',
    name: 'Categories',
    component: Category,
    meta: {
      auth: true,
      gate: 'view_category'
    }
  },
  {
    path: '/users',
    name: 'Users',
    component: User,
    meta: {
      auth: true,
      gate: 'view_user'
    }
  },
  {
    path: '/account',
    name: 'Account',
    component: Account,
    meta: {
      auth: true,
      gate: 'view_account'
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
