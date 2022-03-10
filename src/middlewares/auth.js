import store from '../store'
export default function auth({ next, to }) {
    if(to.matched.some(record => record.meta.auth)) {
      if(!store.getters.isLoggedIn) {
        return next({name: 'Login'})
      } else {
        return next()
      }
    } else if(to.matched.some(record => record.meta.guest)){
      if(store.getters.isLoggedIn) {
        return next({name: 'Dashboard'})
      } else {
        return next()
      }
    } else {
      return next()
    }
  }