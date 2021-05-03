export default {
  name: 'Login',
  data () {
    return {
      userInfo: {},
      cred: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      this.$q.loading.show()

      this.$axios.post(`${process.env.urlPrefix}auth`, this.cred)
        .then((response) => {
          localStorage.setItem('user-token', response.headers.authorization)
          const userToken = localStorage.getItem('user-token')
          const authorities = JSON.parse(atob(userToken.split('.')[1])).authorities
          if (authorities.length !== 0) {
            this.$router.push('/')
          } else {
            this.$q.notify({
              color: 'negative',
              icon: 'report_problem',
              message: 'Sorry, you do not have access'
            })
            this.$router.push('/login')
          }
          this.$q.loading.hide()
        })
        .catch((error) => {
          this.$q.loading.hide()
          this.$q.notify({
            color: 'negative',
            icon: 'report_problem',
            message: error
          })
        })
    }
  },
  created () {
    localStorage.removeItem('user-token')
  }
}
