import axios from 'axios'

export default async ({ Vue }) => {
  Vue.prototype.$axios = axios
}

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('user-token')

  if (token) {
    config.headers.Authorization = token
  } else {
    window.location.href = '/#/login'
  }

  config.withCredentials = true

  return config
})

axios.interceptors.response.use(response => response, (error) => {
  let errorMessage = ''

  if (error.response !== undefined) {
    if (error.response.status === 401) {
      window.location.href = '/#/login'
    }
  }

  if (error.message !== undefined) {
    errorMessage = error.message
  } else if (error.response !== undefined) {
    if (error.response.data !== undefined) {
      errorMessage = error.response.data.message
    } else {
      errorMessage = error.response
    }
  } else {
    errorMessage = error
  }

  return Promise.reject(errorMessage)
})
