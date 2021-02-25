import { QSpinnerDots } from 'quasar'
export default {
  methods: {
    showLoading () {
      this.$q.loading.show({
        spinner: QSpinnerDots,
        spinnerColor: 'orange-10',
        spinnerSize: 140,
        backgroundColor: 'purple',
        messageColor: 'black'
      })
    },
    showCheckingLoading () {
      this.$q.loading.show({
        spinner: QSpinnerDots,
        message: 'Checking Excel Data...',
        spinnerColor: 'orange-10',
        spinnerSize: 60,
        backgroundColor: 'purple',
        messageColor: 'white',
        messageSize: 60
      })
    },
    showUploadLoading () {
      this.$q.loading.show({
        spinner: QSpinnerDots,
        message: 'Uploading Excel Data...',
        spinnerColor: 'orange-10',
        spinnerSize: 60,
        backgroundColor: 'purple',
        messageColor: 'white',
        messageSize: 60
      })
    }
  }
}
