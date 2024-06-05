import { FilterMatchMode } from 'primevue/api'
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import api from '@/api/config'

export const useUsuarios = () => {
  const toast = useToast()

  const usuarios = ref([])
  const usuarioDialog = ref(false)
  const eliminarUsuarioDialog = ref(false)
  const usuarioForm = ref({})
  const filters = ref({})
  const submitted = ref(false)
  const roles = ref([])

  const abrirModal = () => {
    usuarioForm.value = {}
    submitted.value = false
    usuarioDialog.value = true
  }

  const cerrarModal = () => {
    usuarioDialog.value = false
    submitted.value = false
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

  const obtenerUsuarios = async () => {
    try {
      const { data: response } = await api.get('/users')
      usuarios.value = response.data
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

  const guardarUsuario = async () => {
    submitted.value = true
    if (usuarioForm.value.name && usuarioForm.value.name.trim()) {
      if (usuarioForm.value.user_id) {
        const { data: response } = await api.put(`/users/update`, usuarioForm.value)
        if (response.data) {
          toast.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Usuario Actualizado',
            life: 3000
          })
          await obtenerUsuarios()
        }
      } else {
        const { data: response } = await api.post('/users/store', usuarioForm.value)
        if (response.data) {
          toast.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Usuario Creado',
            life: 3000
          })
          await obtenerUsuarios()
        }
      }
      usuarioDialog.value = false
      submitted.value = false
      usuarioForm.value = {}
    }
  }

  const editarUsuario = (usuario) => {
    usuarioForm.value.user_id = usuario.id
    usuarioForm.value.name = usuario.name
    usuarioForm.value.email = usuario.email
    usuarioForm.value.rol_id = usuario.roles[0].id
    usuarioDialog.value = true
    submitted.value = false
  }

  const confirmarEliminado = (usuario) => {
    usuarioForm.value = usuario
    eliminarUsuarioDialog.value = true
  }

  const eliminarUsuario = async () => {
    const { data: response } = await api.delete(`/users/delete/${usuarioForm.value.id}`)
    if (response.data) {
      eliminarUsuarioDialog.value = false
      usuarioForm.value = {}
      toast.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Usuario Deleted',
        life: 3000
      })
      await obtenerUsuarios()
    }
  }

  const iniciarFiltros = () => {
    filters.value = {
      global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    }
  }

  return {
    confirmarEliminado,
    eliminarUsuario,
    eliminarUsuarioDialog,
    editarUsuario,
    filters,
    cerrarModal,
    iniciarFiltros,
    obtenerUsuarios,
    abrirModal,
    usuarioDialog,
    usuarioForm,
    usuarios,
    guardarUsuario,
    submitted,
    roles,
    obtenerRoles
  }
}
