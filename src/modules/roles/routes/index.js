export default [
  {
    path: '/roles',
    name: 'roles.index',
    component: () => import(/* webpackChunkName: "roles" */ '../views/RolesView.vue')
  }
]
