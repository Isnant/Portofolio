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
    }
  }
}
