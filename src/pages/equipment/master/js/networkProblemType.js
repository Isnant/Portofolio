import showLoading from '../../js/loading.js'
export default {
  mixins: [showLoading],
  data () {
    return {
      dataList: [],
      tableColumns: [
        {
          name: 'hostname',
          label: 'Host Name',
          field: 'hostname',
          align: 'left',
          style: 'width: 100px',
          sortable: true
        },
        {
          name: 'bdf',
          label: 'BDF Code',
          field: 'bdf',
          align: 'left',
          style: 'width: 200px',
          sortable: true
        }
      ],
      paginationNotes: {
        descending: false,
        page: 1,
        rowsPerPage: 10,
        sortBy: 'createdDate'
      },
      showForm: false,
      formData: {
        pid: '',
        fidRegion: '',
        buildingType: '',
        buildingName: '',
        itCode: '',
        area: '',
        region: '',
        city: '',
        locationName: '',
        complexName: '',
        streetName: '',
        streetNumber: '',
        postalCode: '',
        phone: '',
        fax: ''
      }
    }
  },

  methods: {
    doInitPage () {
      // this.$q.loading.show()
      this.showLoading()
      const userToken = localStorage.getItem('user-token')
      const authorities = JSON.parse(atob(userToken.split('.')[1])).authorities
      if (authorities.findIndex(x => x === 'ROLE_06') === -1) {
        this.$router.push('/')
      }
      this.$axios.get(`${process.env.urlPrefix}getHostnameList`)
        .then((response) => {
          this.dataList = response.data
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
    },
    downloadExcel (props) {
      // this.$q.loading.show()
      this.showLoading()
      this.$axios.get(`${process.env.urlPrefix}migrationHistoryExcelDownload`, {
        responseType: 'arraybuffer',
        params: {
          startDate: this.searchVal.reqStartDate,
          endDate: this.searchVal.reqEndDate,
          createdBy: this.searchVal.createdBy
        }
      })
        .then((response) => {
          this.$q.loading.hide()
          const url = window.URL.createObjectURL(new Blob([response.data]), { type: '' })
          const link = document.createElement('a')
          link.href = url
          link.style = 'display: none'
          link.download = 'migration_history.xlsx'
          document.body.appendChild(link)
          link.click()
        })
        .catch((error) => {
          this.$q.loading.hide()
          this.notify({
            color: 'negative',
            icon: 'report_problem',
            message: error
          })
        })
    }
  },
  beforeMount () {
    this.doInitPage()
  }
}
