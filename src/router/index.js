import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticatedGuard } from './auth-guard'
import permisosRouter from '@/modules/permisos/routes'
import rolesRouter from '@/modules/roles/routes'
import usuariosRouter from '@/modules/usuarios/routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import(/* webpackChunkName: 'layout' */ '@/layout/AppLayout.vue'),
      children: [
        {
          path: '/',
          name: 'dashboard',
          component: () =>
            import(
              /* webpackChunkName: 'dashboard' */ '@/modules/dashboard/views/DashboardView.vue'
            )
        },
        ...permisosRouter,
        ...rolesRouter,
        ...usuariosRouter
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: 'login' */ '@/modules/auth/views/LoginView.vue')
    }
  ]
})

// Validación Token
router.beforeEach(isAuthenticatedGuard)

export default router
