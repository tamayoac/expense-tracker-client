import { createRouter, createWebHistory } from 'vue-router'
import Expense from '../views/Expense.vue'
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'
import Category from '../views/Category.vue'
import Role from '../views/Role.vue'
import User from '../views/User.vue'
import Account from '../views/Account.vue'
import PageNotFound from '../views/PageNotFound.vue'
import Middleware from '../middlewares/index.js'
import store from '../store'
const routes = [
 
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      middleware: [Middleware.Guest]
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      middleware: [Middleware.Auth, Middleware.Permission],
      permission: 'view_dashboard',
      auth: true
    }
  },
  {
    path: '/expenses',
    name: 'Expenses',
    component: Expense,
    meta: {
      middleware: [Middleware.Auth, Middleware.Permission],
      permission: 'view_expense',
    }
  },
  {
    path: '/roles',
    name: 'Roles',
    component: Role,
    meta: {
      middleware: [Middleware.Auth, Middleware.Permission],
      permission: 'view_role',
    }
  },
  {
    path: '/categories',
    name: 'Categories',
    component: Category,
    meta: {
      middleware: [Middleware.Auth, Middleware.Permission],
      permission: 'view_category',
    }
  },
  {
    path: '/users',
    name: 'Users',
    component: User,
    meta: {
      middleware: [Middleware.Auth, Middleware.Permission],
      permission: 'view_user',
    }
  },
  {
    path: '/account',
    name: 'Account',
    component: Account,
    meta: {
      middleware: [Middleware.Auth],
      permission: 'view_account',
    }
  },
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/404',
    name: 'NotFound',
    component: PageNotFound, 
    meta: {
      middleware: [Middleware.Auth, Middleware.Permission],
    }
  },
 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index];
  // If no subsequent Middleware exists,
  // the default `next()` callback is returned.
  if (!subsequentMiddleware) return context.next;

  return (...parameters) => {
    // Run the default Vue Router `next()` callback first.
    context.next(...parameters);
    // Then run the subsequent Middleware with a new
    // `nextMiddleware()` callback.
    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({ ...context, next: nextMiddleware });
  };
}

router.beforeEach((to, from, next) => {
  if(to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
        ? to.meta.middleware
        : [to.meta.middleware];
    
    const context = {
      from,
      next,
      router,
      to,
      store
    };
    const nextMiddleware = nextFactory(context, middleware, 1);

    return middleware[0]({...context, next: nextMiddleware});
  }
  return next();
})

export default router
