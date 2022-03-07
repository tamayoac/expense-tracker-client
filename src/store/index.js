import { createStore } from 'vuex'
import auth from './modules/auth';
import user from './modules/user'
import role from './modules/role'
import category from './modules/category'
import expenses from './modules/expenses'
import permission from './modules/permission';
import dashboard from './modules/dasbhboard'
export default createStore({
  state: {
    errors: {},
    loading: false
  },
  getters: {
    errors: state => state.errors,
    loading: state => state.loading
  },
  mutations: {
    SET_ERRORS(state, errors) {
      state.errors =  errors
    },
    CLEAR_ERRORS(state) {
      state.errors = {}
    },
    SET_LOADING(state, loading) {
      state.loading = loading
    }
  },
  actions: {
  },
  modules: {
    auth: auth,
    user: user,
    role: role,
    category: category,
    expenses: expenses,
    permission: permission,
    dashboard: dashboard
  }
})
