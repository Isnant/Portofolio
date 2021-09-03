import { openURL } from 'quasar'

export default {
  name: 'default',
  data () {
    return {
      leftDrawerOpen: false,
      userInfo: {},
      major: '1.',
      minor: '1.',
      patch: '1',
      lastVersionDate: '03/09/2021 05:00',
      menu: {
        fieldEquipment: false,
        indoorEquipment: false,
        networkEquipmet: false,
        migrationHistory: false,
        fieldHierarchy: false,
        equipmentUploadLog: false,
        masterData: false,
        security: false
      }
    }
  },
  beforeMount () {
    this.$q.loading.show()

    const userToken = localStorage.getItem('user-token')

    if ((userToken === undefined) || (userToken === null)) {
      this.$q.loading.hide()
      this.$router.push('/login')
    } else {
      this.userInfo = JSON.parse(JSON.parse(atob(userToken.split('.')[1])).userInfo)
      const authorities = JSON.parse(atob(userToken.split('.')[1])).authorities
      if (authorities.findIndex(x => x === 'ROLE_03') !== -1) {
        this.menu.fieldEquipment = true
      }
      if (authorities.findIndex(x => x === 'ROLE_04') !== -1) {
        this.menu.indoorEquipment = true
      }
      if (authorities.findIndex(x => x === 'ROLE_05') !== -1) {
        this.menu.networkEquipmet = true
      }
      if (authorities.findIndex(x => x === 'ROLE_06') !== -1) {
        this.menu.migrationHistory = true
      }
      if (authorities.findIndex(x => x === 'ROLE_07') !== -1) {
        this.menu.fieldHierarchy = true
      }
      if (authorities.findIndex(x => x === 'ROLE_08') !== -1) {
        this.menu.equipmentUploadLog = true
      }
      if (authorities.findIndex(x => x === 'ROLE_09') !== -1) {
        this.menu.masterData = true
      }
      if (authorities.findIndex(x => x === 'ROLE_10') !== -1) {
        this.menu.security = true
      }
      this.$q.loading.hide()
    }
  },
  methods: {
    openURL
  }
}
