export default {
  data () {
    return {
      userInfo: '',
      role: {
        requestor: true,
        inspector: true,
        hpa: true,
        admin: true,
        tmSales: true,
        rhSales: true
      },
      roles: [],
      show: {
        requestor: false,
        inspector: false,
        hpa: false,
        admin: false,
        tmSales: false,
        rhSales: false
      }
    }
  },
  beforeMount () {
    this.getInitPage()
  },

  methods: {
    getInitPage () {
      const userToken = localStorage.getItem('user-token')
      this.userInfo = JSON.parse(JSON.parse(atob(userToken.split('.')[1])).userInfo)
      if (this.userInfo.branch !== null) {
        this.$axios.get(`${process.env.urlPrefix}getUserInfo`, {
          params: {
            id: this.userInfo.username
          }
        })
          .then((response) => {
            this.instance = response.data.user
            this.instance.roles = this.instance.roles.substr(1, this.instance.roles.length - 2).split(';')
            for (var prop in this.instance.roles) {
              this.roles = this.roles.concat(response.data.listOfRoles.filter(v => v.value === this.instance.roles[prop]))
            }
            this.userInfo.branch = this.userInfo.branch.replace('["', '').replace('","', ', ').replace('"]', '')
          })
          .catch((error) => {
            this.$q.loading.hide()
            this.$q.notify({
              color: 'negative',
              icon: 'report_problem',
              message: error
            })
          })
      } else {
        this.show.requestor = true
      }
    }
  }
}
