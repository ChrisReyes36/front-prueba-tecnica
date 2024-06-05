<script setup>
import { ref } from 'vue'

import AppMenuItem from './AppMenuItem.vue'

const model = ref([
  {
    label: 'Inicio',
    items: [{ label: 'Inicio', icon: 'pi pi-fw pi-home', to: '/', name: 'dashboard' }]
  },
  {
    label: 'Permisos',
    items: [
      { label: 'Permisos', icon: 'pi pi-fw pi-lock', to: '/permisos', name: 'permisos.index' }
    ]
  },
  {
    label: 'Roles',
    items: [
      { label: 'Roles', icon: 'pi pi-fw pi-users', to: '/roles', name: 'roles.index' }
    ]
  },
  {
    label: 'Usuarios',
    items: [
      { label: 'Usuarios', icon: 'pi pi-fw pi-user', to: '/usuarios', name: 'usuarios.index' }
    ]
  }
])
</script>

<template>
  <ul class="layout-menu">
    <template v-for="(item, i) in model" :key="item">
      <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
      <li v-if="item.separator" class="menu-separator"></li>
    </template>
  </ul>
</template>

<style lang="scss" scoped></style>
