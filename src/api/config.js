import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: {
    'Content-type': 'application/json; charset=UTF-8'
  }
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(null, async (error) => {
  if (error.response.status === 401) {
    localStorage.clear()
    window.location = '/login'
  }
})

export default api
