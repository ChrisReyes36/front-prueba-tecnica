import { FilterMatchMode } from 'primevue/api'
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import api from '@/api/config'

export const useRoles = () => {
  const toast = useToast()

  const roles = ref([])
  const roleDialog = ref(false)
  const eliminarRoleDialog = ref(false)
  const roleForm = ref({})
  const filters = ref({})
  const submitted = ref(false)
  const permisos = ref([])

  const abrirModal = () => {
    roleForm.value = {}
    submitted.value = false
    roleDialog.value = true
  }

  const cerrarModal = () => {
    roleDialog.value = false
    submitted.value = false
  }

  const obtenerPermisos = async () => {
    try {
      const { data: response } = await api.get('/permisos')
      permisos.value = response.data
    } catch (e) {
      console.log(e.response.data)
      toast.add({
        severity: 'error',
        summary: '¡Error!',
        detail: e.response.data?.errors?.message,
        life: 1500
      })
    }
  }

  const obtenerRoles = async () => {
    try {
      const { data: response } = await api.get('/roles')
      roles.value = response.data
    } catch (e) {
      console.log(e.response.data)
      toast.add({
        severity: 'error',
        summary: '¡Error!',
        detail: e.response.data?.errors?.message,
        life: 1500
      })
    }
  }

  const guardarRole = async () => {
    submitted.value = true
    if (roleForm.value.name && roleForm.value.name.trim()) {
      if (roleForm.value.rol_id) {
        const { data: response } = await api.put(`/roles/update`, roleForm.value)
        if (response.data) {
          toast.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Rol Actualizado',
            life: 3000
          })
          await obtenerRoles()
        }
      } else {
        const { data: response } = await api.post('/roles/store', roleForm.value)
        if (response.data) {
          toast.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Rol Creado',
            life: 3000
          })
          await obtenerRoles()
        }
      }
      roleDialog.value = false
      submitted.value = false
      roleForm.value = {}
    }
  }

  const editarRole = (rol) => {
    roleForm.value.rol_id = rol.id
    roleForm.value.name = rol.name
    roleForm.value.permisos = rol.permissions.map((permiso) => permiso.id)
    roleDialog.value = true
    submitted.value = false
  }

  const confirmarEliminado = (rol) => {
    roleForm.value = rol
    eliminarRoleDialog.value = true
  }

  const eliminarRole = async () => {
    const { data: response } = await api.delete(`/roles/delete/${roleForm.value.id}`)
    if (response.data) {
      eliminarRoleDialog.value = false
      roleForm.value = {}
      toast.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Rol Eliminado',
        life: 3000
      })
      await obtenerRoles()
    }
  }

  const iniciarFiltros = () => {
    filters.value = {
      global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    }
  }

  return {
    confirmarEliminado,
    eliminarRole,
    eliminarRoleDialog,
    editarRole,
    filters,
    cerrarModal,
    iniciarFiltros,
    obtenerPermisos,
    obtenerRoles,
    abrirModal,
    roleDialog,
    roleForm,
    roles,
    guardarRole,
    submitted,
    permisos
  }
}
