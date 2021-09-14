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
      this.userInfo = {
        username: 'Isnan',
        fullName: 'Isnan Taufikkurrohman',
        email: 'isnantaufikkurohman@gmail.com',
        branch: 'Ciamis - Jawa Barat'
      }
    }
  }
}
