export default [
  {
    path: '/permisos',
    name: 'permisos.index',
    component: () => import(/* webpackChunkName: "permisos" */ '../views/PermisosView.vue')
  }
]
