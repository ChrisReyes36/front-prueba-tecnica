import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import api from '@/api/config'

export const useAuth = () => {
  const router = useRouter()
  const loading = ref(false)
  const form = ref({
    email: '',
    password: ''
  })
  const errores = ref({
    correo: '',
    contrasenia: ''
  })
  const toast = useToast()

  const login = async () => {
    try {
      loading.value = true
      const { data: response } = await api.post('/login', form.value)
      loading.value = false
      toast.add({
        severity: 'success',
        summary: '¡Éxito!',
        detail: '¡Inició sesión correctamente!',
        life: 1500
      })
      if (response?.data) {
        localStorage.setItem('token', response?.data?.access_token)
        const user = await getUser()
        localStorage.setItem('correo', user?.data?.email)
      }
      setTimeout(() => {
        router.push({ name: 'dashboard' })
      }, 1505)
    } catch (e) {
      console.log(e.response.data)
      loading.value = false
      toast.add({
        severity: 'error',
        summary: '¡Error!',
        detail: e.response.data?.errors?.message,
        life: 1500
      })
    }
  }

  const validarBlur = (e) => {
    switch (e.target.id) {
      case 'correo':
        if (!form.value.email) {
          errores.value.correo = 'Debe ingresar el correo'
        } else {
          errores.value.correo = ''
        }
        break
      case 'contrasenia':
        if (!form.value.password) {
          errores.value.contrasenia = 'Debe ingresar la contraseña'
        } else {
          errores.value.contrasenia = ''
        }
        break
      default:
        break
    }
  }

  const getUser = async () => {
    const { data } = await api.get('/user')
    return data
  }

  const logout = async () => {
    const { data: response } = await api.post('/logout')
    if (response?.data) {
      localStorage.clear()
      router.push({ name: 'login' })
    }
  }

  return {
    errores,
    form,
    getUser,
    loading,
    login,
    logout,
    validarBlur
  }
}
