import axios from 'axios'

export default async ({ Vue }) => {
  Vue.prototype.$axios = axios
}

axios.interceptors.response.use(response => response, (error) => {
  let errorMessage = ''

  if (error.response !== undefined) {
    if (error.response.data !== undefined) {
      errorMessage = error.response.data.message
    } else {
      errorMessage = error.response
    }
  } else if (error.message !== undefined) {
    errorMessage = error.message
  } else {
    errorMessage = error
  }

  return Promise.reject(errorMessage)
})
