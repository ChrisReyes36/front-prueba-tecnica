import { FilterMatchMode } from 'primevue/api'
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import api from '@/api/config'

export const usePermisos = () => {
  const toast = useToast()

  const permisos = ref([])
  const permisoDialog = ref(false)
  const eliminarPermisoDialog = ref(false)
  const permisoForm = ref({})
  const filters = ref({})
  const submitted = ref(false)

  const abrirModal = () => {
    permisoForm.value = {}
    submitted.value = false
    permisoDialog.value = true
  }

  const cerrarModal = () => {
    permisoDialog.value = false
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

  const guardarPermiso = async () => {
    submitted.value = true
    if (permisoForm.value.name && permisoForm.value.name.trim()) {
      if (permisoForm.value.id) {
        const { data: response } = await api.put(`/permisos/update`, permisoForm.value)
        if (response.data) {
          toast.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Permiso Actualizado',
            life: 3000
          })
          await obtenerPermisos()
        }
      } else {
        const { data: response } = await api.post('/permisos/store', permisoForm.value)
        if (response.data) {
          toast.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Permiso Creado',
            life: 3000
          })
          await obtenerPermisos()
        }
      }
      permisoDialog.value = false
      submitted.value = false
      permisoForm.value = {}
    }
  }

  const editarPermiso = (permiso) => {
    permisoForm.value = { ...permiso }
    permisoDialog.value = true
    submitted.value = false
  }

  const confirmarEliminado = (permiso) => {
    permisoForm.value = permiso
    eliminarPermisoDialog.value = true
  }

  const eliminarPermiso = async () => {
    const { data: response } = await api.delete(`/permisos/delete/${permisoForm.value.id}`)
    if (response.data) {
      eliminarPermisoDialog.value = false
      permisoForm.value = {}
      toast.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Permiso Eliminado',
        life: 3000
      })
      await obtenerPermisos()
    }
  }

  const iniciarFiltros = () => {
    filters.value = {
      global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    }
  }

  return {
    confirmarEliminado,
    eliminarPermiso,
    eliminarPermisoDialog,
    editarPermiso,
    filters,
    cerrarModal,
    iniciarFiltros,
    obtenerPermisos,
    abrirModal,
    permisoDialog,
    permisoForm,
    permisos,
    guardarPermiso,
    submitted
  }
}
