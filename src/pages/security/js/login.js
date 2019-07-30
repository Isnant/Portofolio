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
          this.$q.loading.hide()
          this.$router.push('/')
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
