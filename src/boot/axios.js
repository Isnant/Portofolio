import axios from 'axios'

export default async ({ Vue }) => {
  Vue.prototype.$axios = axios
}

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('user-token')

  if (token) {
    config.headers.Authorization = token
  }
  // else {
  //   window.location.href = '/#/login'
  // }

  // config.withCredentials = true
  // config.withCredentials = false;

  return config
})
