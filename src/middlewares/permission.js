import can from '../helpers/can'
export default function permission({ from, to, store, router, next}) {
 
  const permission = to.meta.permission;
  if(from.name === undefined) {
      store.dispatch('getMe').then(() => {
      if(can(permission)) {
        return next()
      } 
      console.log(from)
      return router.push({name: 'NotFound'})
    })
  }
}