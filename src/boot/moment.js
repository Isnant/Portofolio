import moment from 'moment'

export default ({ Vue }) => {
  Vue.filter('formatDate', (value) => {
    if (value) {
      return moment(value).format('DD/MM/YYYY')
    }

    return value
  })

  Vue.filter('formatDateTime', (value) => {
    if (value) {
      return moment(value).format('DD/MM/YYYY HH:mm')
    }

    return value
  })

  Vue.filter('formatStringDate', (value) => {
    if (value) {
      return moment(value).format('DD MMM YYYY')
    }

    return value
  })

  Vue.filter('decimalSeparator', (value) => {
    if (value) {
      return value.toString().replace(/\B(?=(\d{2})+(?!\d))/g, ',')
    }
    return value
  })

  Vue.prototype.$moment = moment

  Vue.prototype.$moment.toDate = (value) => {
    if (value) {
      return moment(value).format('DD/MM/YYYY')
    }

    return value
  }
}
