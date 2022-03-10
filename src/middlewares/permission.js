import store from '../store'
import can from '../helpers/can'
export default function permission({ from, to, next, router }) {
  const permission = to.meta.permission;
  if(!from.name) {
   store.dispatch('getMe').then(() => {
      if(!can(permission)) {
        return router.push({name: 'NotFound'})
      } 
      return next()
   })
  
  } else {
    store.dispatch('getMe').then(() => {
      if(!can(permission)) {
        return router.push({name: 'NotFound'})
      } 
      return next()
    })
  }
    
}