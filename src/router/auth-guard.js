export const isAuthenticatedGuard = async (to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.name !== 'login' && !token) next({ name: 'login' })
  else if (to.name === 'login' && token) next({ name: 'dashboard' })
  else next()
}
