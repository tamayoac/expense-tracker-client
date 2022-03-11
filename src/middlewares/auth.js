export default function auth({next, store}) {
  if(!store.getters.isLoggedIn) {
    return next({name: "Login"})
  } else return next()
}