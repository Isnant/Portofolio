import { openURL } from 'quasar'

export default {
  name: 'default',
  data () {
    return {
      leftDrawerOpen: false,
      userInfo: {},
      major: '1.',
      minor: '1.',
      patch: '2',
      lastVersionDate: '14/09/2021 05:00',
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
  },
  methods: {
    openURL
  }
}
