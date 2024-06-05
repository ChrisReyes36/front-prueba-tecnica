export default [
  {
    path: '/usuarios',
    name: 'usuarios.index',
    component: () => import(/* webpackChunkName: "usuarios" */ '../views/UsuariosView.vue')
  }
]
