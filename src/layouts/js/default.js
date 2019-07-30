import { openURL } from 'quasar'

export default {
  name: 'default',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      userInfo: {}
    }
  },
  beforeMount () {
    this.$q.loading.show()

    const userToken = localStorage.getItem('user-token')

    if ((userToken === undefined) || (userToken === null)) {
      this.$q.loading.hide()
      this.$router.push('/login')
    }

    this.userInfo = JSON.parse(JSON.parse(atob(userToken.split('.')[1])).userInfo)

    this.$q.loading.hide()
  },
  methods: {
    openURL
  }
}
